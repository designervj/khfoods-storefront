import {
  mapBackendProducts,
  mapBackendCategories,
  type KhCategory,
  type KhProduct,
} from "@/lib/ecommerceData";

const BACKEND_URL = process.env.KALP_ADMIN_API_URL || process.env.FASTAPI_URL || process.env.BACKEND_API_URL || "https://admin.kalptree.xyz/api";
const TENANT_DB_NAME = process.env.TENANT_DB_NAME || process.env.NEXT_PUBLIC_TENANT_DB || "kp_k_h_food";

type ProductFeed = {
  products: KhProduct[];
  categories: KhCategory[];
};

function candidateBackendUrls() {
  const urls = [BACKEND_URL];
  if (process.env.NODE_ENV !== "production") urls.unshift("http://localhost:5177/api");
  return Array.from(new Set(urls.map((url) => url.replace(/\/$/, ""))));
}

function publicProductsUrl(base: string, params: Record<string, string> = {}) {
  const url = new URL(`${base}/public/commerce/products/${encodeURIComponent(TENANT_DB_NAME)}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url;
}

export async function getLiveProducts(params: Record<string, string> = {}): Promise<ProductFeed> {
  let lastError: unknown;
  for (const baseUrl of candidateBackendUrls()) {
    try {
      const response = await fetch(publicProductsUrl(baseUrl, { perPage: "100", ...params }), {
        cache: "no-store",
        headers: { accept: "application/json" },
      });
      if (!response.ok) {
        lastError = new Error(`Product feed returned ${response.status}`);
        if (response.status === 404) continue;
        throw lastError;
      }

      const body = await response.json();
      const backendCategories = Array.isArray(body?.categories) ? body.categories : [];
      const backendProducts = Array.isArray(body?.data)
        ? body.data
        : Array.isArray(body?.products)
          ? body.products
          : [];

      return {
        products: mapBackendProducts(backendProducts, backendCategories),
        categories: mapBackendCategories(backendCategories),
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Product feed unavailable");
}

export async function getLiveProductBySlug(slug: string): Promise<KhProduct | undefined> {
  const { products } = await getLiveProducts();
  return products.find((product) => product.slug === slug || product.id === slug);
}
