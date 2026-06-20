'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const wishlist = useAppSelector((state) => state.auth.user?.wishlist || []);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'wishlist') dispatch(setCurrentPageBySlug('wishlist'));
  }, [dispatch, currentPages]);

  const getLocalizedHref = (href: string) => {
    if (href === '/') return locale === 'en' ? '/' : `/${locale}`;
    return locale === 'en' ? href : `/${locale}${href}`;
  };

  return (
    <main className="section-padding">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{currentPages?.sections?.[0]?.props?.heading?.[locale] || 'My Wishlist'}</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto mb-6 text-[var(--text-muted)]" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-[var(--text-secondary)] mb-8">Save items you love to your wishlist.</p>
            <Link href={getLocalizedHref('/shop')} className="btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="card-product">
                <div className="aspect-square bg-[var(--surface)]">
                  {item.images?.[0] && <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-[var(--primary)] font-bold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
