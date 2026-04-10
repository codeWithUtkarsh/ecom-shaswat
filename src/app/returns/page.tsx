import { RotateCcw, Clock, AlertTriangle, CheckCircle, XCircle, Mail } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Policies</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-5">
            Returns & Refund Policy
          </h1>
          <p className="text-bark-400 text-base leading-relaxed mb-12">
            We stand behind the quality of every product we sell. If something isn&apos;t right, we&apos;ll make it right.
          </p>

          <div className="space-y-8">
            <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5">
              <div className="flex items-center gap-3 mb-4">
                <RotateCcw size={18} className="text-forest-400" />
                <h2 className="font-display text-xl font-semibold text-forest italic">Return Window</h2>
              </div>
              <p className="text-bark-400 text-sm leading-relaxed">
                You have <strong className="text-forest">7 days</strong> from the date of delivery to report any issues with your order. After 7 days, we may not be able to process a return or refund for perishable goods.
              </p>
            </div>

            <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5">
              <h2 className="font-display text-xl font-semibold text-forest italic mb-4">Eligible for Return</h2>
              <div className="space-y-2.5">
                {[
                  "Damaged or broken items on arrival",
                  "Incorrect products received",
                  "Products past their expiry date on delivery",
                  "Quality not matching the described grade",
                  "Short shipment (missing items from your order)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-bark-500">
                    <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5">
              <h2 className="font-display text-xl font-semibold text-forest italic mb-4">Not Eligible for Return</h2>
              <div className="space-y-2.5">
                {[
                  "Change of mind after delivery",
                  "Products opened and partially used (unless defective)",
                  "Damage caused by improper storage after delivery",
                  "Orders placed in error (contact us before dispatch)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-bark-500">
                    <XCircle size={15} className="text-accent-rose shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={16} className="text-forest-400" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-forest italic mb-1.5">Refund Timeline</h3>
                <p className="text-bark-400 text-sm leading-relaxed">
                  Once we approve your return, refunds are processed within 5–7 business days. Refunds are issued to the original payment method. For credit account customers, the amount is credited to your account balance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                <Mail size={16} className="text-forest-400" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-forest italic mb-1.5">How to Request a Return</h3>
                <p className="text-bark-400 text-sm leading-relaxed">
                  Email <span className="text-terra font-medium">orders@vyapaarglobal.com</span> with your order number, photos of the issue, and a brief description. Our team will respond within 24 hours with next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
