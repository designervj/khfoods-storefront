'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'cart') dispatch(setCurrentPageBySlug('cart'));
  }, [dispatch, currentPages]);

  const getLocalizedHref = (href: string) => {
    if (href === '/') return locale === 'en' ? '/' : `/${locale}`;
    return locale === 'en' ? href : `/${locale}${href}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="section-padding">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{currentPages?.sections?.[0]?.props?.heading?.[locale] || 'Your Cart'}</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto mb-6 text-[var(--text-muted)]" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-[var(--text-secondary)] mb-8">Looks like you haven't added anything yet.</p>
            <Link href={getLocalizedHref('/shop')} className="btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card-theme p-4 flex items-center gap-4">
                  <div className="w-20 h-20 bg-[var(--surface)] rounded-[var(--radius-md)] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.variantName && <p className="text-sm text-[var(--text-muted)]">{item.variantName}</p>}
                    <p className="text-[var(--primary)] font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)]">Qty: {item.quantity}</span>
                  </div>
                  <button className="p-2 text-[var(--error)] hover:bg-[var(--error)]/10 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="card-theme p-6 h-fit">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span className="font-semibold">Calculated at checkout</span></div>
                <hr className="border-[var(--border)]" />
                <div className="flex justify-between text-lg"><span className="font-bold">Total</span><span className="font-bold text-[var(--primary)]">${subtotal.toFixed(2)}</span></div>
              </div>
              <Link href={getLocalizedHref('/checkout')} className="btn-primary w-full mt-6 gap-2">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
