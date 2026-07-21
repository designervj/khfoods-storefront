'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store/hooks';
import { selectPublicNavigation } from '@/redux/slices/blueprint';
import { selectCartItemCount } from '@/redux/slices/ecommerce/cartSlice';
import { getLocalizedString } from '@/lib/i18n/locale';
import headerData from '@/lib/data/pages/headerData.json';
import CartSidebar from '@/components/shared/CartSidebar';

/* ═══════════════════════════════════════════════════════════════════
   SVG ICONS — pixel-perfect matches from the reference image
═══════════════════════════════════════════════════════════════════ */

/** Language / Globe icon (matches the 🌐 in top-bar) */
const LangIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/** Facebook — classic 'f' path */
const FbIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/** YouTube — rectangle with play triangle */
const YtIcon = () => (
  <svg width="15" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

/** LinkedIn — 'in' square */
const LiIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/** Globe (second icon in social row — matches reference) */
const GlobeIconSm = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/** ChevronDown */
const ChevDown = ({ open }: { open: boolean }) => (
  <svg
    width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/** Hamburger / Close */
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/** Shopping bag SVG */
const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);



/* ═══════════════════════════════════════════════════════════════════
   HEADER COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const blueprintNav = useAppSelector(selectPublicNavigation);
  const cartCount = useAppSelector(selectCartItemCount);

  const navigationItems: any[] = (blueprintNav?.public as any) || (headerData.navigation as any[]);
  const topBar = (headerData as any).topBar;

  /* Close mega-menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setOpenIndex(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const href = (path: string) =>
    path === '/' ? (locale === 'en' ? '/' : `/${locale}`) : (locale === 'en' ? path : `/${locale}${path}`);

  const isActive = (item: any) =>
    pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">

      {/* ── TOP UTILITY BAR ──────────────────────────────────────── */}
      <div style={{ backgroundColor: '#f5d9a8' }} className="hidden md:block">
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 36 }}
        >
          {/* Welcome text */}
          <span style={{ fontSize: 12, color: '#3d2800', fontWeight: 500, letterSpacing: '0.02em' }}>
            {topBar ? getLocalizedString(topBar.welcome, locale) : 'Welcome to Khfoods!'}
          </span>

          {/* Right utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 12, color: '#3d2800', fontWeight: 500 }}>
            {/* Store locator */}
            <Link href={href('/contact')} style={{ color: 'inherit', textDecoration: 'none' }}
              className="hover:opacity-70 transition-opacity">
              {topBar ? getLocalizedString(topBar.storeLocator, locale) : 'Store locator'}
            </Link>

            <span style={{ color: '#c9a06a' }}>|</span>

            {/* Wholesale */}
            <Link href={href('/contact')} style={{ color: 'inherit', textDecoration: 'none' }}
              className="hover:opacity-70 transition-opacity">
              {topBar ? getLocalizedString(topBar.wholesale, locale) : 'Wholesale'}
            </Link>

            <span style={{ color: '#c9a06a' }}>|</span>

            {/* Language selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
              className="hover:opacity-70 transition-opacity">
              <LangIcon />
              <span style={{ fontWeight: 600, fontSize: 11 }}>{locale === 'hi' ? 'HI' : 'EN'}</span>
            </div>

            <span style={{ color: '#c9a06a' }}>|</span>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" className="hover:opacity-70 transition-opacity" style={{ color: '#3d2800' }}>
                <FbIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                aria-label="YouTube" className="hover:opacity-70 transition-opacity" style={{ color: '#3d2800' }}>
                <YtIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn" className="hover:opacity-70 transition-opacity" style={{ color: '#3d2800' }}>
                <LiIcon />
              </a>
              <a href="#" aria-label="Website"
                className="hover:opacity-70 transition-opacity" style={{ color: '#3d2800' }}>
                <GlobeIconSm />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ──────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#1c1c1a' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* MOBILE HAMBURGER (LEFT) */}
          <div className="flex md:hidden items-center z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 6 }}
              className="hover:text-[#D4A820] transition-colors -ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* LOGO (CENTER ON MOBILE, LEFT ON DESKTOP) */}
          <Link 
            href={href('/')} 
            className="flex items-center flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <Image
              src="/Image/khfood_logo.png"
              alt="KH Foods Logo"
              width={148}
              height={46}
              priority
              style={{ objectFit: 'contain', height: 46, width: 'auto' }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-0">
            {navigationItems.map((item: any, index: number) => {
              const hasMega = item.megaMenu && item.megaMenu.length > 0;
              const active = isActive(item);
              const isOpen = openIndex === index;

              return (
                <div key={index} style={{ position: 'relative' }}>
                  <button
                    onMouseEnter={() => hasMega ? setOpenIndex(index) : undefined}
                    onClick={() => {
                      if (hasMega) {
                        setOpenIndex(isOpen ? null : index);
                      } else {
                        window.location.href = href(item.href);
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '0 18px', height: 68,
                      fontSize: 13, fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: active || isOpen ? '#D4A820' : '#ffffff',
                      background: 'none', border: 'none', cursor: 'pointer',
                      transition: 'color 0.18s',
                    }}
                    className="hover:!text-[#D4A820]"
                  >
                    {getLocalizedString(item.label, locale)}
                    {hasMega && <ChevDown open={isOpen} />}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* SHOP + Cart */}
          <div className="flex items-center gap-4 md:gap-8 z-10">
            <Link
              href={href('/shop')}
              className="hidden md:flex items-center gap-2 hover:!text-[#D4A820] transition-colors"
              style={{ color: '#ffffff' }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', color: 'inherit' }}>SHOP</span>
            </Link>

            {/* We can add a Search icon here in the future if needed to fully match the screenshot */}
            <button
              onClick={() => setIsCartSidebarOpen(true)}
              style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff' }}
              className="hover:!text-[#D4A820] transition-colors"
            >
              <div style={{ position: 'relative' }}>
                <BagIcon />
                <span style={{
                  position: 'absolute', top: -8, right: -8,
                  minWidth: 18, height: 18,
                  backgroundColor: '#FF6B00', color: '#fff',
                  borderRadius: '50%', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 2px',
                }}>
                  {cartCount}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── MEGA MENU DROPDOWN ───────────────────────────────────── */}
      {openIndex !== null && (() => {
        const activeItem = navigationItems[openIndex];
        if (!activeItem?.megaMenu) return null;
        return (
          <div
            onMouseLeave={() => setOpenIndex(null)}
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e5e5e5',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              width: '100%',
            }}
          >
            <div
              style={{
                maxWidth: 1280, margin: '0 auto', padding: '36px 24px 40px',
                display: 'flex', gap: 0,
              }}
            >
              {/* Left label */}
              <div style={{ minWidth: 200, paddingRight: 40, borderRight: '1px solid #e5e5e5', marginRight: 40 }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.02em', margin: 0 }}>
                  {getLocalizedString(activeItem.label, locale)}
                </p>
              </div>

              {/* Columns */}
              <div style={{ display: 'flex', gap: 48, flex: 1 }}>
                {activeItem.megaMenu.map((col: any, ci: number) => (
                  <div key={ci} style={{ minWidth: 120 }}>
                    {/* Category heading */}
                    <p style={{
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: '#111',
                      margin: '0 0 12px 0',
                    }}>
                      {getLocalizedString(col.category, locale)}
                    </p>
                    {/* Items */}
                    {col.items.map((sub: any, si: number) => (
                      <Link
                        key={si}
                        href={href(sub.href)}
                        onClick={() => setOpenIndex(null)}
                        style={{
                          display: 'block',
                          fontSize: 14, fontWeight: 400,
                          color: '#D4A820',
                          textDecoration: 'none',
                          marginBottom: 8,
                          transition: 'color 0.15s',
                        }}
                        className="hover:!text-[#b8860b]"
                      >
                        {getLocalizedString(sub.label, locale)}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── MOBILE MENU ──────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#1c1c1a', borderTop: '1px solid rgba(255,255,255,0.08)', maxHeight: 'calc(100vh - 68px)', overflowY: 'auto' }} className="md:hidden">
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 24px 20px' }}>
            {navigationItems.map((item: any, index: number) => {
              const hasMega = item.megaMenu && item.megaMenu.length > 0;
              const isOpen = mobileOpenIndex === index;
              return (
                <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => {
                      if (hasMega) {
                        setMobileOpenIndex(isOpen ? null : index);
                      } else {
                        window.location.href = href(item.href);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '14px 0',
                      fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: isActive(item) ? '#D4A820' : '#fff',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    {getLocalizedString(item.label, locale)}
                    {hasMega && <ChevDown open={isOpen} />}
                  </button>
                  {hasMega && isOpen && (
                    <div style={{ paddingBottom: 12 }}>
                      {item.megaMenu.map((col: any, ci: number) => (
                        <div key={ci} style={{ marginBottom: 10 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', margin: '0 0 4px 8px' }}>
                            {getLocalizedString(col.category, locale)}
                          </p>
                          {col.items.map((sub: any, si: number) => (
                            <Link
                              key={si}
                              href={href(sub.href)}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{ display: 'block', padding: '6px 8px', fontSize: 13, color: '#D4A820', textDecoration: 'none' }}
                            >
                              {getLocalizedString(sub.label, locale)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Cart link */}
            <Link
              href={href('/cart')}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 0', marginTop: 4,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
              }}
            >
              <BagIcon />
              SHOP ({cartCount})
            </Link>
          </div>
        </div>
      )}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
    </header>
  );
}
