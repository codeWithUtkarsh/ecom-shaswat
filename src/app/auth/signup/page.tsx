"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.phone,
      );

      if (error) {
        setError(
          error.message || "Failed to create account. Please try again.",
        );
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 2000);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "block w-full pl-10 pr-3 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-navy placeholder:text-surface-400 focus:outline-none focus:border-orange/40 focus:ring-2 focus:ring-orange/10 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 aurora">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-soft-lg border border-surface-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy">Create Account</h2>
            <p className="mt-2 text-surface-500">
              Join Vyapaar Global as a retail partner
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle
                size={20}
                className="text-accent-rose mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-accent-rose">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
              <CheckCircle
                size={20}
                className="text-green-600 mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-green-700">
                Account created successfully! Please check your email to verify
                your account.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-navy/70 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-surface-400" />
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

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy/70 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-surface-400" />
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-navy/70 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={20} className="text-surface-400" />
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy/70 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-surface-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-10 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-navy placeholder:text-surface-400 focus:outline-none focus:border-orange/40 focus:ring-2 focus:ring-orange/10 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-surface-400" />
                  ) : (
                    <Eye size={20} className="text-surface-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-navy/70 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-surface-400" />
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

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 rounded border-surface-300 bg-surface-50"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-surface-500"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-orange hover:text-orange-dark transition-colors"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-orange hover:text-orange-dark transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-navy-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating Account..."
                : success
                  ? "Account Created!"
                  : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-orange hover:text-orange-dark transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
