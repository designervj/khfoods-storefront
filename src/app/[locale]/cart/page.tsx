'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { getLocalizedString, translateStatic } from '@/lib/i18n/locale';
import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
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
    <main className="bg-white px-4 pb-28 pt-8 md:px-0 md:py-[var(--section-padding)]">
      <div className="container-custom px-0 md:px-4">
        <h1 className="mb-8 text-[28px] font-bold leading-tight text-[#111111] md:mb-10 md:text-3xl pb-8">{getLocalizedString(currentPages?.sections?.[0]?.props?.heading, locale) || t('Your Cart')}</h1>

        {cartItems.length === 0 ? (
          <div className="mx-auto flex min-h-[360px] max-w-sm flex-col items-center justify-center rounded-[28px] bg-white px-4 py-8 text-center md:min-h-[420px] md:max-w-xl md:border md:border-[#eee2d5] md:shadow-[0_16px_45px_rgba(17,17,17,0.06)]">
            <ShoppingBag size={56} className="mb-5 text-gray-400 md:size-16" />
            <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#111111] md:text-2xl">{t('Your cart is empty')}</h2>
            <p className="mb-7 max-w-xs text-sm leading-5 text-gray-500">{t("Looks like you haven't added anything yet.")}</p>
            <Link href={getLocalizedHref('/shop')} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#eaba88] px-7 text-sm font-bold text-[#111111] transition hover:bg-[#d4925a]">
              {t('Continue Shopping')}
            </Link>
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
                    <span className="text-sm text-[var(--text-muted)]">{t('Qty:')} {item.quantity}</span>
                  </div>
                  <button className="p-2 text-[var(--error)] hover:bg-[var(--error)]/10 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="card-theme p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">{t('Order Summary')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t('Subtotal')}</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t('Shipping')}</span><span className="font-semibold">{t('Calculated at checkout')}</span></div>
                <hr className="border-[var(--border)]" />
                <div className="flex justify-between text-base"><span className="font-bold">{t('Total')}</span><span className="font-bold text-[var(--primary)]">${subtotal.toFixed(2)}</span></div>
              </div>
              <Link href={getLocalizedHref('/checkout')} className="btn-primary w-full mt-6 gap-2">
                {t('Proceed to Checkout')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
