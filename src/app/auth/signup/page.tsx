"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  AlertCircle,
  CheckCircle,
  Leaf,
  Store,
  Truck,
} from "lucide-react";
import { useAuth, type AccountType } from "@/lib/auth-context";

export default function SignupPage() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "retailer" as AccountType,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailExists(false);
    setSuccess(false);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { error, emailExists } = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.phone,
        formData.accountType,
      );

      if (emailExists) {
        setEmailExists(true);
      } else if (error) {
        setError(
          error.message || "Failed to create account. Please try again.",
        );
      } else {
        setSuccess(true);
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
          {success ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={26} className="text-forest" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-forest italic mb-2">
                Check your email
              </h2>
              <p className="text-bark-500 text-sm mb-1">
                We sent a verification link to
              </p>
              <p className="text-forest font-medium text-sm mb-6 break-all">
                {formData.email}
              </p>
              <p className="text-bark-400 text-xs mb-8 leading-relaxed">
                Click the link in the email to activate your account. Once verified, you can sign in below.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex w-full items-center justify-center gap-2 bg-forest text-cream py-3 rounded-full font-semibold text-sm hover:bg-forest-400 transition-all"
              >
                Go to sign in
              </Link>
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center mt-3 text-bark-400 hover:text-bark-600 text-sm transition-colors"
              >
                Return home
              </Link>
            </div>
          ) : (
            <>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-forest/[0.06] flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} className="text-forest-400" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-forest italic">
              Create Account
            </h2>
            <p className="mt-2 text-bark-400 text-sm">
              Join Vyapaar Global as a retail partner
            </p>
          </div>

          {/* Email already exists */}
          {emailExists && (
            <div className="mb-6 p-4 bg-terra/5 border border-terra/20 rounded-xl">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle
                  size={18}
                  className="text-terra mt-0.5 flex-shrink-0"
                />
                <div className="text-sm">
                  <p className="font-semibold text-terra mb-1">
                    This email is already in use
                  </p>
                  <p className="text-bark-500 break-all">{formData.email}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/auth/login?email=${encodeURIComponent(formData.email)}`}
                  className="flex-1 text-center bg-forest text-cream py-2.5 rounded-full text-xs font-semibold hover:bg-forest-400 transition-all"
                >
                  Sign in instead
                </Link>
                <Link
                  href={`/auth/forgot-password?email=${encodeURIComponent(formData.email)}`}
                  className="flex-1 text-center border border-forest/15 text-bark-600 py-2.5 rounded-full text-xs font-semibold hover:bg-forest/[0.04] transition-all"
                >
                  Reset password
                </Link>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !emailExists && (
            <div className="mb-6 p-4 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
              <AlertCircle
                size={18}
                className="text-accent-rose mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-accent-rose">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset>
              <legend className="block text-sm font-medium text-bark-600 mb-2">
                I&apos;m signing up as a
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    {
                      value: "retailer" as const,
                      label: "Retailer",
                      hint: "I buy products",
                      Icon: Store,
                    },
                    {
                      value: "supplier" as const,
                      label: "Supplier",
                      hint: "I sell products",
                      Icon: Truck,
                    },
                  ]
                ).map(({ value, label, hint, Icon }) => {
                  const selected = formData.accountType === value;
                  return (
                    <label
                      key={value}
                      className={`relative flex flex-col items-start gap-1 p-3 rounded-xl border cursor-pointer transition-all ${
                        selected
                          ? "border-terra bg-terra/5"
                          : "border-forest/8 bg-cream hover:border-forest/15"
                      }`}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value={value}
                        checked={selected}
                        onChange={() =>
                          setFormData({ ...formData, accountType: value })
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className={selected ? "text-terra" : "text-bark-400"}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            selected ? "text-forest" : "text-bark-600"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      <span className="text-[11px] text-bark-400">{hint}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-bark-600 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-bark-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (emailExists) setEmailExists(false);
                  }}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-bark-600 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-bark-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                  placeholder="+1 234 567 890"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-bark-600 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-bark-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-0.5 rounded border-forest/20 bg-cream accent-forest"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-bark-500"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-terra hover:text-terra-500 transition-colors font-medium"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-terra hover:text-terra-500 transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-cream py-3.5 rounded-full font-semibold hover:bg-forest-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-bark-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-terra hover:text-terra-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
