'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { getLocalizedString } from '@/lib/i18n/locale';

export default function CheckoutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'checkout') dispatch(setCurrentPageBySlug('checkout'));
  }, [dispatch, currentPages]);

  return (
    <main className="section-padding">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{currentPages?.sections?.[0]?.props?.heading?.[locale] || 'Checkout'}</h1>
        <div className="card-theme p-8">
          <p className="text-[var(--text-secondary)] text-center py-8">Checkout form will be integrated here with Stripe/Razorpay payment gateway.</p>
        </div>
      </div>
    </main>
  );
}
