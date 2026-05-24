"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Lock,
  MessageSquare,
  Package,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

interface BatchItem {
  id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  quoted_price: number | null;
}

interface AdminBatch {
  batch_id: string;
  user_id: string;
  customer_email: string | null;
  customer_name: string | null;
  message: string | null;
  status: "pending" | "quoted" | "accepted" | "rejected" | "closed";
  sales_notes: string | null;
  order_id: string | null;
  created_at: string;
  quoted_at: string | null;
  items: BatchItem[];
}

const STATUS_FILTERS: Array<{ value: string; label: string }> = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "quoted", label: "Quoted" },
  { value: "accepted", label: "Accepted" },
  { value: "closed", label: "Closed" },
];

export default function AdminQuotesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [batches, setBatches] = useState<AdminBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("pending");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth/login");
  }, [authLoading, user, router]);

  const load = async () => {
    setLoading(true);
    setError(null);
    setForbidden(false);
    try {
      const data = await api.admin.quoteRequests.list(statusFilter || undefined);
      setBatches(data.batches as AdminBatch[]);
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("admin")) setForbidden(true);
      else setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, statusFilter]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-warmth flex items-center justify-center">
        <p className="text-bark-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen bg-warmth flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-cream-50 rounded-3xl p-10 border border-forest/5">
          <div className="w-14 h-14 rounded-full bg-bark-100 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-bark-500" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">
            Admin access only
          </h1>
          <p className="text-bark-400 text-sm mb-6">
            Your account is not authorized to view the admin dashboard.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-terra hover:text-terra-500 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">
              Admin
            </span>
            <h1 className="font-display text-4xl font-bold text-forest italic leading-tight mt-3 flex items-center gap-3">
              Quote Requests
              <ShieldCheck size={24} className="text-forest" />
            </h1>
            {!loading && (
              <p className="text-bark-400 text-sm mt-2">
                {batches.length} {batches.length === 1 ? "batch" : "batches"}
                {statusFilter ? ` in ${statusFilter}` : ""}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  statusFilter === f.value
                    ? "bg-forest text-cream"
                    : "border border-forest/8 text-bark-500 hover:bg-forest/[0.04]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
            <AlertCircle size={14} className="text-accent-rose mt-0.5 flex-shrink-0" />
            <p className="text-xs text-accent-rose">{error}</p>
          </div>
        )}

        {loading ? (
          <p className="text-bark-400 text-sm italic">Loading…</p>
        ) : batches.length === 0 ? (
          <div className="max-w-2xl">
            <div className="bg-cream-50 rounded-3xl p-10 border border-forest/5 text-center">
              <div className="w-16 h-16 rounded-full bg-forest/[0.04] flex items-center justify-center mx-auto mb-5">
                <MessageSquare size={28} className="text-bark-300" />
              </div>
              <h2 className="font-display text-xl font-semibold text-forest italic">
                No quote batches
                {statusFilter ? ` in '${statusFilter}'` : ""}
              </h2>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((b) => (
              <AdminBatchCard key={b.batch_id} batch={b} onSent={load} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function statusBadge(status: AdminBatch["status"]) {
  const map: Record<AdminBatch["status"], { label: string; bg: string; text: string; Icon: any }> = {
    pending:  { label: "Pending",  bg: "bg-bark-100/60",     text: "text-bark-500", Icon: Clock },
    quoted:   { label: "Quoted",   bg: "bg-terra/10",        text: "text-terra",    Icon: CreditCard },
    accepted: { label: "Accepted", bg: "bg-forest/10",       text: "text-forest",   Icon: CheckCircle },
    closed:   { label: "Closed",   bg: "bg-forest/10",       text: "text-forest",   Icon: CheckCircle },
    rejected: { label: "Rejected", bg: "bg-accent-rose/10",  text: "text-accent-rose", Icon: AlertCircle },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.bg} ${s.text}`}>
      <s.Icon size={11} /> {s.label}
    </span>
  );
}

function AdminBatchCard({
  batch,
  onSent,
}: {
  batch: AdminBatch;
  onSent: () => void;
}) {
  const editable = batch.status === "pending" || batch.status === "quoted";
  const [expanded, setExpanded] = useState(batch.status === "pending");
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      batch.items.map((i) => [i.id, i.quoted_price != null ? String(i.quoted_price) : ""])
    )
  );
  const [notes, setNotes] = useState<string>(batch.sales_notes ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const created = new Date(batch.created_at).toLocaleString("en-GB");

  const grandTotal = batch.items.reduce((sum, item) => {
    const p = Number(prices[item.id]);
    return sum + (Number.isFinite(p) ? p * item.quantity : 0);
  }, 0);

  const handleSend = async () => {
    setSubmitError(null);
    const itemsPayload: Array<{ id: string; quoted_price: number }> = [];
    for (const item of batch.items) {
      const p = Number(prices[item.id]);
      if (!Number.isFinite(p) || p <= 0) {
        setSubmitError(`Price for "${item.product_name}" must be positive.`);
        return;
      }
      itemsPayload.push({ id: item.id, quoted_price: p });
    }
    setSubmitting(true);
    try {
      await api.admin.quoteRequests.replyBatch(batch.batch_id, {
        items: itemsPayload,
        sales_notes: notes.trim() || undefined,
      });
      onSent();
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to send quote");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50 border border-forest/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-5 hover:bg-forest/[0.02] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {statusBadge(batch.status)}
              <span className="text-[11px] text-bark-300">{created}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest/[0.06] text-[11px] font-semibold text-forest">
                <Package size={10} /> {batch.items.length}{" "}
                {batch.items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-forest mb-1">
              <span className="font-semibold">
                {batch.customer_name || batch.customer_email || "(unknown)"}
              </span>
              {batch.customer_name && batch.customer_email && (
                <span className="text-bark-400 text-xs">
                  {batch.customer_email}
                </span>
              )}
            </div>
            <div className="text-xs text-bark-500 line-clamp-1">
              {batch.items.map((i) => `${i.product_name} ×${i.quantity}`).join(" · ")}
            </div>
            {batch.items.some((i) => i.quoted_price != null) && (
              <p className="text-xs text-terra font-medium mt-1.5">
                Total quoted: £{batch.items.reduce(
                  (s, i) => s + (i.quoted_price ?? 0) * i.quantity, 0
                ).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-forest/6 p-5 bg-cream/30">
          {batch.message && (
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-bark-400 uppercase tracking-wider mb-1">
                Customer note (shared across all items)
              </p>
              <p className="text-sm text-bark-600 leading-relaxed italic border-l-2 border-forest/15 pl-3">
                &ldquo;{batch.message}&rdquo;
              </p>
            </div>
          )}

          {editable ? (
            <>
              <p className="text-[10px] font-semibold text-bark-400 uppercase tracking-wider mb-2">
                Price per unit (GBP)
              </p>
              <div className="space-y-2 mb-4">
                {batch.items.map((item) => {
                  const p = Number(prices[item.id]);
                  const lineTotal =
                    Number.isFinite(p) && p > 0 ? p * item.quantity : null;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white border border-forest/8 rounded-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-forest italic text-sm line-clamp-1">
                          {item.product_name}
                        </p>
                        <p className="text-[11px] text-bark-400 mt-0.5">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-bark-400">£</span>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={prices[item.id]}
                          onChange={(e) =>
                            setPrices((prev) => ({ ...prev, [item.id]: e.target.value }))
                          }
                          className="w-24 px-2 py-1.5 bg-cream border border-forest/8 rounded-lg text-sm text-forest text-right focus:outline-none focus:border-terra/30"
                          placeholder="0.00"
                        />
                        <span className="text-xs text-bark-400">/unit</span>
                      </div>
                      <div className="w-24 text-right flex-shrink-0">
                        {lineTotal != null && (
                          <span className="text-xs text-terra font-semibold">
                            £{lineTotal.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mb-4 px-3 py-2 bg-forest/[0.04] rounded-xl">
                <span className="text-sm font-semibold text-forest">
                  Batch total
                </span>
                <span className="font-display text-lg font-bold text-terra">
                  £{grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="mb-3">
                <label className="block text-[10px] font-semibold text-bark-400 uppercase tracking-wider mb-1.5">
                  Note to customer (optional)
                </label>
                <input
                  type="text"
                  maxLength={2000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-forest/8 rounded-lg text-sm text-forest focus:outline-none focus:border-terra/30"
                  placeholder="MOQ, lead time, certifications…"
                />
              </div>

              {submitError && (
                <p className="text-xs text-accent-rose mb-2">{submitError}</p>
              )}

              <button
                onClick={handleSend}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-forest-400 transition-all disabled:opacity-50"
              >
                <Send size={12} />
                {submitting
                  ? "Sending…"
                  : batch.status === "quoted"
                  ? "Update quote"
                  : "Send quote to customer"}
              </button>
              <p className="text-[10px] text-bark-400 mt-2">
                Customer will receive one email with all {batch.items.length}{" "}
                {batch.items.length === 1 ? "item" : "items"} and a link to pay.
              </p>
            </>
          ) : (
            <div className="text-xs text-bark-500 space-y-2">
              {batch.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-forest/8"
                >
                  <div>
                    <p className="font-display font-semibold text-forest italic text-sm line-clamp-1">
                      {item.product_name}
                    </p>
                    <p className="text-[11px] text-bark-400 mt-0.5">
                      Quantity {item.quantity}
                      {item.quoted_price != null && ` · £${item.quoted_price.toFixed(2)}/unit`}
                    </p>
                  </div>
                  {item.quoted_price != null && (
                    <p className="text-sm font-bold text-terra">
                      £{(item.quoted_price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              ))}
              {batch.status === "accepted" && batch.order_id && (
                <p className="pt-2">
                  Customer accepted. Order id:{" "}
                  <span className="font-mono text-[11px]">{batch.order_id}</span>
                </p>
              )}
              {batch.status === "closed" && <p className="pt-2">Completed.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
