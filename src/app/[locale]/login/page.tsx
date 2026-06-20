"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { loginThunk } from "@/redux/slices/ecommerce/authSlice";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await dispatch(loginThunk({ email, password })).unwrap();
      if (response.user) {
        router.push("/");
      }
    } catch (err: any) {
      setError(err || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-[var(--text-secondary)]">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-3 mb-6 text-sm text-[var(--error)] bg-[var(--error)]/10 rounded-[var(--radius-md)] border border-[var(--error)]/20">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input pl-10" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input pl-10 pr-10" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)]">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full gap-2">
            {loading ? "Signing In..." : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[var(--primary)] hover:underline font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
}
