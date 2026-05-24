"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Leaf } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: params.get("email") ?? "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(
          error.message || "Failed to sign in. Please check your credentials.",
        );
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "block w-full pl-10 pr-3 py-3 bg-cream border border-forest/8 rounded-xl text-bark placeholder:text-bark-400 focus:outline-none focus:border-terra/30 focus:ring-2 focus:ring-terra/8 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warmth">
      <div className="max-w-md w-full animate-fade-up">
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-10 shadow-soft-lg border border-forest/5">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-forest/[0.06] flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} className="text-forest-400" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-forest italic">
              Welcome Back
            </h2>
            <p className="mt-2 text-bark-400 text-sm">
              Sign in to your Vyapaar Global account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
              <AlertCircle
                size={18}
                className="text-accent-rose mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-accent-rose">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-bark-600 mb-2"
              >
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-bark-600 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-bark-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-10 py-3 bg-cream border border-forest/8 rounded-xl text-bark placeholder:text-bark-400 focus:outline-none focus:border-terra/30 focus:ring-2 focus:ring-terra/8 transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-bark-400 hover:text-bark-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-forest/20 bg-cream accent-forest"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-bark-500"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-terra hover:text-terra-500 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-cream py-3.5 rounded-full font-semibold hover:bg-forest-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-bark-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-terra hover:text-terra-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warmth" />}>
      <LoginContent />
    </Suspense>
  );
}
