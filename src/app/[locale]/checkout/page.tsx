'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { CreditCard, Lock, ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { translateStatic } from '@/lib/i18n/locale';

export default function CheckoutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.items);
  const currentPages = useAppSelector((state) => state.pages.currentPages);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'checkout') dispatch(setCurrentPageBySlug('checkout'));
  }, [dispatch, currentPages]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      alert(t('Payment Successful! Thank you for your order.'));
      router.push(`/${locale}/product/all-product`);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <Link href={`/${locale}/cart`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#c89255] transition-colors">
            <ChevronLeft size={16} className="mr-1" /> {t('Back to Cart')}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a202c]">{t('Secure Checkout')}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Forms */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Shipping Details */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#fdf5ed] flex items-center justify-center text-[#c89255]">
                  <MapPin size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#1a202c]">{t('Shipping Information')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('First Name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Last Name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="Doe" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Email Address')}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Street Address')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="123 Peanut St" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('City')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="New York" />
                </div>
                <div className="space-y-2 flex gap-4">
                  <div className="w-1/2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('State')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="NY" />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('ZIP')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="10001" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <form onSubmit={handlePayment} className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fdf5ed] flex items-center justify-center text-[#c89255]">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-[#1a202c]">{t('Payment Method')}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <Lock size={14} className="text-green-500" /> {t('Secure')}
                </div>
              </div>

              {/* Mock Card Input */}
              <div className="bg-[#1a202c] rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center backdrop-blur-md border border-white/10">
                    <div className="w-6 h-4 bg-yellow-400/80 rounded-sm"></div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500/80 -ml-4 mix-blend-screen"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent text-2xl tracking-widest placeholder:text-white/30 border-none outline-none focus:ring-0 font-mono" maxLength={19} required />
                  <div className="flex justify-between font-mono text-sm">
                    <input type="text" placeholder="MM/YY" className="w-20 bg-transparent placeholder:text-white/30 border-none outline-none focus:ring-0 uppercase" maxLength={5} required />
                    <input type="password" placeholder="CVC" className="w-16 bg-transparent text-right placeholder:text-white/30 border-none outline-none focus:ring-0" maxLength={3} required />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Name on Card')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c89255]/50 focus:border-[#c89255] transition-all bg-gray-50/50" placeholder="John Doe" required />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || cartItems.length === 0}
                className="w-full mt-8 bg-[#1a202c] hover:bg-[#2d3748] text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> {t('Processing...')}</>
                ) : (
                  <><Lock size={18} /> {t('Pay')} ${total.toFixed(2)}</>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-[#1a202c] mb-6">{t('Order Summary')}</h3>
              
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">{t('Your cart is empty.')}</div>
              ) : (
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-[#1a202c] line-clamp-2">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{t('Qty:')} {item.quantity}</span>
                          <span className="font-bold text-[#c89255]">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-6 space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t('Subtotal')}</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('Shipping')}</span>
                  <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                  <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">{t('Total')}</span>
                    <span className="text-sm text-gray-400">{t('Including Taxes')}</span>
                  </div>
                  <span className="text-2xl font-black text-[#1a202c]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
