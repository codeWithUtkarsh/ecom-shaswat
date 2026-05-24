"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle,
  CreditCard,
  MessageSquare,
  Package,
  XCircle,
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

interface QuoteBatch {
  batch_id: string;
  user_id: string;
  message: string | null;
  status: "pending" | "quoted" | "accepted" | "rejected" | "closed";
  sales_notes: string | null;
  order_id: string | null;
  created_at: string;
  quoted_at: string | null;
  items: BatchItem[];
}

const STATUS_STYLES: Record<
  QuoteBatch["status"],
  { label: string; bg: string; text: string; Icon: any }
> = {
  pending: {
    label: "Pending sales review",
    bg: "bg-bark-100/60",
    text: "text-bark-500",
    Icon: Clock,
  },
  quoted: {
    label: "Quote ready",
    bg: "bg-terra/10",
    text: "text-terra",
    Icon: CreditCard,
  },
  accepted: {
    label: "Accepted — payment pending",
    bg: "bg-forest/10",
    text: "text-forest",
    Icon: CheckCircle,
  },
  closed: {
    label: "Completed",
    bg: "bg-forest/10",
    text: "text-forest",
    Icon: CheckCircle,
  },
  rejected: {
    label: "Declined",
    bg: "bg-accent-rose/10",
    text: "text-accent-rose",
    Icon: XCircle,
  },
};

export default function MyQuotesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [batches, setBatches] = useState<QuoteBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.quoteRequests
      .list()
      .then((data) => {
        if (cancelled) return;
        setBatches(data.batches as QuoteBatch[]);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || "Failed to load quote requests");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleAccept = async (batchId: string) => {
    setAcceptError(null);
    setAcceptingId(batchId);
    try {
      const { checkout_url } = await api.quoteRequests.acceptBatch(batchId);
      window.location.href = checkout_url;
    } catch (err: any) {
      setAcceptError(err?.message || "Failed to start checkout. Please try again.");
      setAcceptingId(null);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-warmth flex items-center justify-center">
        <p className="text-bark-400 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-bark-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/account" className="hover:text-forest transition-colors">
            Account
          </Link>
          <span>/</span>
          <span className="text-forest font-medium">Quote Requests</span>
        </div>

        <div className="mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">
            My Account
          </span>
          <h1 className="font-display text-4xl font-bold text-forest italic leading-tight mt-3">
            Quote Requests
          </h1>
          {!loading && batches.length > 0 && (
            <p className="text-bark-400 text-sm mt-2">
              {batches.length} {batches.length === 1 ? "submission" : "submissions"}
            </p>
          )}
        </div>

        {acceptError && (
          <div className="mb-4 p-3 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
            <AlertCircle size={14} className="text-accent-rose mt-0.5 flex-shrink-0" />
            <p className="text-xs text-accent-rose">{acceptError}</p>
          </div>
        )}

        {loading ? (
          <p className="text-bark-400 text-sm italic">Loading…</p>
        ) : error ? (
          <p className="text-accent-rose text-sm italic">{error}</p>
        ) : batches.length === 0 ? (
          <div className="max-w-2xl">
            <div className="bg-cream-50 rounded-3xl p-10 border border-forest/5 text-center">
              <div className="w-16 h-16 rounded-full bg-forest/[0.04] flex items-center justify-center mx-auto mb-5">
                <MessageSquare size={28} className="text-bark-300" />
              </div>
              <h2 className="font-display text-xl font-semibold text-forest italic mb-2">
                No quote requests yet
              </h2>
              <p className="text-bark-400 text-sm mb-6 max-w-sm mx-auto">
                Sourced products show a &ldquo;Price on request&rdquo; tag.
                Add them to your basket and submit a quote request to get UK
                landed pricing from our sourcing team.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all"
              >
                Browse catalogue <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((b) => (
              <BatchCard
                key={b.batch_id}
                batch={b}
                accepting={acceptingId === b.batch_id}
                onAccept={() => handleAccept(b.batch_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BatchCard({
  batch,
  accepting,
  onAccept,
}: {
  batch: QuoteBatch;
  accepting: boolean;
  onAccept: () => void;
}) {
  const style = STATUS_STYLES[batch.status];
  const total = batch.items.reduce(
    (sum, i) => sum + (i.quoted_price ?? 0) * i.quantity,
    0
  );
  const allQuoted = batch.items.every((i) => i.quoted_price != null);
  const created = new Date(batch.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-cream-50 border border-forest/5 rounded-2xl p-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${style.bg} ${style.text}`}
            >
              <style.Icon size={11} />
              {style.label}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest/[0.06] text-[11px] font-semibold text-forest">
              <Package size={10} /> {batch.items.length}{" "}
              {batch.items.length === 1 ? "item" : "items"}
            </span>
            <span className="text-[11px] text-bark-300">
              Submitted {created}
            </span>
          </div>
        </div>

        {batch.status === "quoted" && allQuoted && (
          <div className="text-right flex-shrink-0">
            <p className="text-[11px] text-bark-400 uppercase tracking-wider">
              Total
            </p>
            <p className="font-display text-2xl font-bold text-terra">
              £{total.toFixed(2)}
            </p>
          </div>
        )}
        {batch.status === "accepted" && batch.order_id && (
          <Link
            href="/orders"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-400 transition-colors"
          >
            View order <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        {batch.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-3 bg-cream border border-forest/5 rounded-xl"
          >
            <div className="flex-1 min-w-0">
              {item.product_id ? (
                <Link
                  href={`/products/detail/${item.product_id}`}
                  className="font-display font-semibold text-forest italic text-sm hover:text-terra transition-colors line-clamp-1"
                >
                  {item.product_name}
                </Link>
              ) : (
                <p className="font-display font-semibold text-bark-500 italic text-sm line-clamp-1">
                  {item.product_name}
                </p>
              )}
              <p className="text-[11px] text-bark-400 mt-0.5">
                Quantity: {item.quantity}
                {item.quoted_price != null &&
                  ` · £${Number(item.quoted_price).toFixed(2)} per unit`}
              </p>
            </div>
            {item.quoted_price != null && (
              <p className="text-sm font-semibold text-terra flex-shrink-0">
                £{(Number(item.quoted_price) * item.quantity).toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Customer message */}
      {batch.message && (
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-bark-400 uppercase tracking-wider mb-1">
            Your note
          </p>
          <p className="text-xs text-bark-500 leading-relaxed border-l-2 border-forest/10 pl-3 italic">
            &ldquo;{batch.message}&rdquo;
          </p>
        </div>
      )}

      {/* Sales note */}
      {batch.sales_notes && batch.status !== "pending" && (
        <div className="mb-4 p-3 bg-forest/[0.04] rounded-lg">
          <p className="text-[10px] font-semibold text-forest uppercase tracking-wider mb-1">
            Note from sales
          </p>
          <p className="text-xs text-bark-600 leading-relaxed">
            {batch.sales_notes}
          </p>
        </div>
      )}

      {/* Action */}
      {batch.status === "quoted" && allQuoted && (
        <div className="pt-3 border-t border-forest/6 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[11px] text-bark-400">
            VAT and shipping added at checkout
          </p>
          <button
            onClick={onAccept}
            disabled={accepting}
            className="inline-flex items-center gap-2 bg-terra text-white py-2.5 px-6 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {accepting ? "Redirecting…" : "Accept & checkout"}
            {!accepting && <ArrowRight size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
