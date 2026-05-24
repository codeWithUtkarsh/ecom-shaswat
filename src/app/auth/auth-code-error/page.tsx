import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warmth">
      <div className="max-w-md w-full">
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-10 shadow-soft-lg border border-forest/5 text-center">
          <div className="w-14 h-14 rounded-full bg-accent-rose/10 flex items-center justify-center mx-auto mb-5">
            <AlertCircle size={26} className="text-accent-rose" />
          </div>

          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">
            Sign-in didn&apos;t complete
          </h1>
          <p className="text-bark-400 text-sm mb-6 leading-relaxed">
            We couldn&apos;t finish signing you in. The link may have expired
            or been used already. Please try again.
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="inline-flex w-full items-center justify-center gap-2 bg-forest text-cream py-3 rounded-full font-semibold text-sm hover:bg-forest-400 transition-all"
            >
              Back to sign in <ArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 border border-forest/10 text-bark-600 py-3 rounded-full font-semibold text-sm hover:bg-forest/[0.04] transition-all"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
