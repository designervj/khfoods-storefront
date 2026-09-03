import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReduxProvider } from '@/redux/provider';
import BlueprintProvider from '@/components/providers/BlueprintProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EditModeToggle from '@/components/shared/EditModeToggle';
import MobileBottomNav from '@/components/shared/MobileBottomNav';
import CartDrawer from '@/components/ecommerce/CartDrawer';
import AdminBar from '@/components/layout/AdminBar';
import { translateStatic } from '@/lib/i18n/locale';
import '@/styles/globals.css';

const FALLBACK_FAVICON = '/Image/favicon%20(1).png';
const BACKEND_URL = process.env.FASTAPI_URL || process.env.BACKEND_API_URL || 'http://localhost:8000';
const TENANT_DB_NAME = process.env.TENANT_DB_NAME || process.env.NEXT_PUBLIC_TENANT_DB;

/* ── Montserrat via next/font — self-hosted, zero layout shift ── */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

async function getBlueprintFavicon(): Promise<string> {
  try {
    const headers = new Headers();
    if (TENANT_DB_NAME) headers.set('x-tenant-db', TENANT_DB_NAME);

    const response = await fetch(`${BACKEND_URL}/platform/business-blueprint`, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) return FALLBACK_FAVICON;

    const json = await response.json();
    const payload = json?.data?.payload || json?.payload || json?.data || json;
    return (
      payload?.business_profile?.favicon ||
      payload?.business?.brand?.businessDna?.faviconUrl ||
      payload?.business?.brand?.faviconRef ||
      FALLBACK_FAVICON
    );
  } catch {
    return FALLBACK_FAVICON;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const favicon = await getBlueprintFavicon();

  return {
    title: 'KH Food - Premium Peanuts, Naturally Good',
    description: 'Discover premium peanut snacks at KH Food. Natural ingredients, no preservatives.',
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const t = (text: string) => translateStatic(text, locale);

  return (
    <html lang={locale} suppressHydrationWarning className={montserrat.variable}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
        <ReduxProvider>
          <BlueprintProvider context="public">
            <AdminBar />
            <a href="#main-content" className="skip-to-content">{t('Skip to content')}</a>
            <Header />
            <main id="main-content" className="flex-grow pt-[var(--navbar-height)] pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
            <CartDrawer />
            {/* <EditModeToggle /> */}
          </BlueprintProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
