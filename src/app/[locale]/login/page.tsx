"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import { loginThunk } from "@/redux/slices/ecommerce/authSlice";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { translateStatic } from "@/lib/i18n/locale";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = (text: string) => translateStatic(text, locale);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (main) {
      main.style.paddingTop = '0';
      main.style.paddingBottom = '0';
      return () => {
        main.style.paddingTop = 'var(--navbar-height)';
        main.style.paddingBottom = '';
      };
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await dispatch(loginThunk({ email, password })).unwrap();
      if (response.user) {
        router.push(locale === "en" ? "/" : `/${locale}`);
      }
    } catch (err: any) {
      setError(err || t("Authentication failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbfbfb]">
      {/* Left Side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#063A1D] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500" />
        <img 
          src="/Image/Peanut.jpg" 
          alt="Premium Peanuts" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 h-full text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg"
          >
            <div className="mb-6">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-white/30 text-white/90">
                {t('Premium Quality')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-wide">
              {t('Best Peanuts')} <br className="hidden xl:block" />{t('on Earth')}
            </h1>
            <p className="text-white/80 text-[15px] md:text-base leading-relaxed font-medium max-w-md">
              {t('Experience the perfect balance of health and taste. Sign in to manage your orders, wishlist, and exclusive offers.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-2 text-gray-500 hover:text-[#063A1D] font-bold text-sm transition-colors z-50 group bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none px-4 py-2 lg:px-0 lg:py-0 rounded-full shadow-sm lg:shadow-none border border-gray-100 lg:border-none"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {t('Back to Home')}
        </Link>

        {/* Decorative background blur on mobile */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#ecb984]/20 rounded-full blur-[80px] lg:hidden pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#063A1D]/10 rounded-full blur-[80px] lg:hidden pointer-events-none" />
        
        <div className="w-full max-w-[440px] relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <div className="mb-10 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a202c] tracking-wide mb-3">
                {t('Welcome back')}
              </h2>
              <p className="text-gray-500 font-medium">
                {t('Please enter your details to sign in.')}
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 mb-8 text-sm text-red-600 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">{t('Email Address')}</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c89255] transition-colors">
                    <Mail size={20} strokeWidth={2.5} />
                  </div>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full h-14 pl-12 pr-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#c89255] focus:ring-4 focus:ring-[#c89255]/10 outline-none transition-all duration-200 font-semibold" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-gray-700">{t('Password')}</label>
                  <Link href="#" className="text-xs font-bold text-[#c89255] hover:text-[#063A1D] transition-colors">
                    {t('Forgot Password?')}
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c89255] transition-colors">
                    <Lock size={20} strokeWidth={2.5} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full h-14 pl-12 pr-12 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#c89255] focus:ring-4 focus:ring-[#c89255]/10 outline-none transition-all duration-200 font-semibold tracking-wide" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c89255] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full h-14 bg-[#063A1D] text-white rounded-2xl font-bold text-[15px] tracking-wide uppercase flex items-center justify-center gap-3 hover:bg-[#0a4d28] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:active:scale-100 shadow-[0_8px_25px_rgba(6,58,29,0.2)] group"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      {t('SIGNING IN...')}
                    </div>
                  ) : (
                    <>
                      {t('SIGN IN')}
                      <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <p className="text-center text-gray-500 font-medium mt-8">
            {t("Don't have an account?")}{" "}
            <Link href="/register" className="text-[#c89255] hover:text-[#063A1D] font-bold transition-colors">
              {t('Create an account')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
