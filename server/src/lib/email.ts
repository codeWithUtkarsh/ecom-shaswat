import { Resend } from 'resend';
import { env } from '../config/env';

let cachedClient: Resend | null = null;

function getClient(): Resend | null {
  if (!env.RESEND_API_KEY) return null;
  if (!cachedClient) cachedClient = new Resend(env.RESEND_API_KEY);
  return cachedClient;
}

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
}

/**
 * Send a transactional email via Resend.
 *
 * Gracefully no-ops if RESEND_API_KEY is unset — logs a warning so the absence
 * is visible during dev, but doesn't throw. This means the quote/order flows
 * keep working before Resend is configured; emails just don't go out.
 */
export async function sendEmail(msg: EmailMessage): Promise<{ ok: boolean; reason?: string }> {
  const client = getClient();
  if (!client) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping email to ${Array.isArray(msg.to) ? msg.to.join(',') : msg.to} (subject: ${msg.subject})`
    );
    return { ok: false, reason: 'no_api_key' };
  }

  try {
    const result = await client.emails.send({
      from: env.FROM_EMAIL,
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
    });
    if (result.error) {
      console.error('[email] Resend error:', result.error);
      return { ok: false, reason: result.error.message };
    }
    return { ok: true };
  } catch (err: any) {
    console.error('[email] send failed:', err);
    return { ok: false, reason: err?.message };
  }
}

/* ------------------------------------------------------------------ *
 *  Template helpers — minimal HTML, safe to extend later with proper
 *  templating (React Email, Handlebars, etc.) if volumes grow.
 * ------------------------------------------------------------------ */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const wrap = (innerHtml: string) => `
<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7f4ee;padding:24px;color:#2d3a2e;">
  <div style="max-width:560px;margin:0 auto;background:#fffdf8;border-radius:16px;padding:32px;border:1px solid rgba(45,58,46,0.06);">
    ${innerHtml}
    <hr style="border:none;border-top:1px solid rgba(45,58,46,0.08);margin:24px 0;" />
    <p style="font-size:12px;color:#8a8175;margin:0;">Vyapaar Global — premium Indian & ethnic products for UK retailers.</p>
  </div>
</body></html>`;

export function quoteRequestSalesNotification(opts: {
  customerEmail: string;
  productName: string;
  quantity: number;
  message: string | null;
  quoteRequestId: string;
}) {
  return wrap(`
    <p style="font-size:11px;font-weight:600;letter-spacing:0.15em;color:#c47a3a;text-transform:uppercase;margin:0 0 8px;">New Quote Request</p>
    <h2 style="font-family:Georgia,serif;font-style:italic;color:#2d3a2e;font-size:24px;margin:0 0 20px;">${escapeHtml(opts.productName)}</h2>
    <table style="width:100%;font-size:14px;color:#4a534b;">
      <tr><td style="padding:6px 0;">Customer:</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(opts.customerEmail)}</td></tr>
      <tr><td style="padding:6px 0;">Quantity:</td><td style="padding:6px 0;font-weight:600;">${opts.quantity}</td></tr>
      <tr><td style="padding:6px 0;">Request ID:</td><td style="padding:6px 0;font-family:monospace;font-size:12px;">${escapeHtml(opts.quoteRequestId)}</td></tr>
    </table>
    ${opts.message ? `<div style="margin-top:20px;padding:16px;background:#f7f4ee;border-radius:12px;"><p style="font-size:12px;color:#8a8175;margin:0 0 4px;font-weight:600;">Customer note</p><p style="margin:0;font-size:14px;line-height:1.6;color:#4a534b;">${escapeHtml(opts.message)}</p></div>` : ''}
  `);
}

export function quoteRequestCustomerConfirmation(opts: {
  productName: string;
  quantity: number;
}) {
  return wrap(`
    <p style="font-size:11px;font-weight:600;letter-spacing:0.15em;color:#c47a3a;text-transform:uppercase;margin:0 0 8px;">Quote Request Received</p>
    <h2 style="font-family:Georgia,serif;font-style:italic;color:#2d3a2e;font-size:24px;margin:0 0 16px;">Thanks — we've got your request</h2>
    <p style="font-size:15px;line-height:1.6;color:#4a534b;margin:0 0 16px;">
      We received your quote request for <strong>${escapeHtml(opts.productName)}</strong> (quantity: ${opts.quantity}).
    </p>
    <p style="font-size:15px;line-height:1.6;color:#4a534b;margin:0 0 16px;">
      Our sourcing team will reply with a quote within <strong>1–2 business days</strong>. You can track the status of your request in your account.
    </p>
  `);
}

export function quoteBatchRepliedCustomerNotification(opts: {
  items: Array<{ productName: string; quantity: number; quotedPrice: number }>;
  currency: string;
  salesNotes: string | null;
  frontendUrl: string;
}) {
  const grandTotal = opts.items.reduce(
    (sum, i) => sum + i.quotedPrice * i.quantity,
    0
  );
  const itemRows = opts.items
    .map(
      (i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid rgba(45,58,46,0.06);">
        <p style="margin:0;font-size:14px;color:#2d3a2e;font-weight:600;">${escapeHtml(i.productName)}</p>
        <p style="margin:2px 0 0;font-size:12px;color:#8a8175;">${i.quantity} units × ${opts.currency} ${i.quotedPrice.toFixed(2)}/unit</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid rgba(45,58,46,0.06);text-align:right;font-size:14px;color:#2d3a2e;font-weight:600;">${opts.currency} ${(i.quotedPrice * i.quantity).toFixed(2)}</td>
    </tr>`
    )
    .join('');
  const summary = opts.items.length === 1
    ? `Your quote for <strong>${escapeHtml(opts.items[0].productName)}</strong> is ready.`
    : `Your quote for <strong>${opts.items.length} items</strong> is ready.`;
  return wrap(`
    <p style="font-size:11px;font-weight:600;letter-spacing:0.15em;color:#c47a3a;text-transform:uppercase;margin:0 0 8px;">Your Quote is Ready</p>
    <h2 style="font-family:Georgia,serif;font-style:italic;color:#2d3a2e;font-size:24px;margin:0 0 12px;">${opts.items.length === 1 ? escapeHtml(opts.items[0].productName) : 'Quote ready for review'}</h2>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4a534b;">${summary}</p>
    <div style="background:#f7f4ee;padding:20px;border-radius:12px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;">
        ${itemRows}
        <tr>
          <td style="padding:14px 0 0;font-size:16px;color:#2d3a2e;font-weight:700;">Total</td>
          <td style="padding:14px 0 0;font-size:18px;color:#c47a3a;font-weight:700;text-align:right;">${opts.currency} ${grandTotal.toFixed(2)}</td>
        </tr>
      </table>
    </div>
    ${opts.salesNotes ? `<div style="margin-bottom:20px;"><p style="font-size:12px;color:#8a8175;margin:0 0 6px;font-weight:600;">Note from sales</p><p style="margin:0;font-size:14px;line-height:1.6;color:#4a534b;">${escapeHtml(opts.salesNotes)}</p></div>` : ''}
    <p style="margin:0 0 20px;font-size:13px;line-height:1.6;color:#8a8175;">Tax (VAT) is calculated at checkout based on your billing address. Shipping is free over £500.</p>
    <a href="${opts.frontendUrl}/account/quotes" style="display:inline-block;background:#c47a3a;color:#fffdf8;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:600;font-size:14px;">Review &amp; accept quote</a>
  `);
}
