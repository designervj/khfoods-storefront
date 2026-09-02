import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/ecommerceData';
import { getLiveProducts } from '@/lib/liveProducts';
import ProductDetailPage from '@/components/pages/ProductDetailPage';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const liveFeed = await getLiveProducts().catch(() => null);
  const product = liveFeed?.products.find((item) => item.slug === slug || item.id === slug) || getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} relatedProducts={liveFeed?.products} />;
}
