import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/ecommerceData';
import ProductDetailPage from '@/components/pages/ProductDetailPage';

export async function generateStaticParams() {
  const products = getAllProducts('en');
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
