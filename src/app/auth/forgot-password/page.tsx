"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, Leaf } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warmth">
      <div className="max-w-md w-full">
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-10 shadow-soft-lg border border-forest/5">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-forest/[0.06] flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} className="text-forest-400" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-forest italic">
              Reset Password
            </h2>
            <p className="mt-2 text-bark-400 text-sm">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-emerald-500" />
              </div>
              <h3 className="font-display text-lg font-semibold text-forest italic mb-2">Check Your Email</h3>
              <p className="text-bark-400 text-sm mb-6">
                We&apos;ve sent a password reset link to <strong className="text-forest">{email}</strong>. Click the link in the email to set a new password.
              </p>
              <p className="text-bark-300 text-xs">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button onClick={() => setSubmitted(false)} className="text-terra font-medium hover:text-terra-500">
                  try again
                </button>.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-accent-rose/5 border border-accent-rose/15 rounded-xl">
                  <p className="text-sm text-accent-rose">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-bark-600 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-bark-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-cream border border-forest/8 rounded-xl text-bark placeholder:text-bark-400 focus:outline-none focus:border-terra/30 focus:ring-2 focus:ring-terra/8 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forest text-cream py-3.5 rounded-full font-semibold hover:bg-forest-400 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-bark-400 hover:text-forest transition-colors">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
