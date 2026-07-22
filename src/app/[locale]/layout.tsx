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
import '@/styles/globals.css';

/* ── Montserrat via next/font — self-hosted, zero layout shift ── */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KH Food - Premium Peanuts, Naturally Good',
  description: 'Discover premium peanut snacks at KH Food. Natural ingredients, no preservatives.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning className={montserrat.variable}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
        <ReduxProvider>
          <BlueprintProvider context="public">
            <AdminBar />
            <a href="#main-content" className="skip-to-content">Skip to content</a>
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
