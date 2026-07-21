'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store/hooks';
import { selectCartItemCount } from '@/redux/slices/ecommerce/cartSlice';

// Icons based on the user's screenshot
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function MobileBottomNav() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  const cartCount = useAppSelector(selectCartItemCount);

  const href = (path: string) => {
    if (path === '/') return locale === 'en' ? '/' : `/${locale}`;
    return locale === 'en' ? path : `/${locale}${path}`;
  };

  const navItems = [
    { label: 'Home', icon: HomeIcon, path: '/' },
    { label: 'Account', icon: UserIcon, path: '/account' },
    { label: 'Shop', icon: ShopIcon, path: '/shop' },
    { label: 'Wishlist', icon: HeartIcon, path: '/wishlist' },
    { label: 'Cart', icon: BagIcon, path: '/cart' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-between px-2 h-16">
        {navItems.map((item, index) => {
          const isActive = pathname === href(item.path);
          const isCart = item.label === 'Cart';
          
          return (
            <Link
              key={index}
              href={href(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
                isActive ? 'text-[#FF6B00]' : 'text-gray-500 hover:text-black'
              }`}
            >
              <div className="relative">
                <item.icon />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 bg-[#FF6B00] text-white rounded-full text-[9px] font-bold flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
