import ecommerceData from "@/data/ecommerce/ecommerce.json";

export interface KhProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  nutritionImage?: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  rating: number;
  reviews: number;
  gallery: { url: string }[];
}

export interface KhCategory {
  id: string;
  slug: string;
  name: string;
  image: string;
}

type BackendProduct = {
  id?: string;
  _id?: string;
  slug?: string;
  name?: string;
  price?: number | string;
  pricing?: { price?: number | string; basePrice?: number | string };
  image?: string;
  images?: string[];
  gallery?: Array<string | { url?: string }>;
  primaryImage?: string;
  categoryIds?: string[];
  primaryCategoryId?: string;
  category?: { id?: string; _id?: string; name?: string; slug?: string };
  description?: string;
  sku?: string;
};

type BackendCategory = {
  id?: string;
  _id?: string;
  slug?: string;
  name?: string;
  title?: string;
  image?: string;
  bannerImageUrl?: string;
};

function asNumber(value: unknown, fallback = 0) {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function firstImage(product: BackendProduct) {
  const galleryImage = product.gallery?.[0];
  if (typeof galleryImage === "string") return galleryImage;
  return (
    galleryImage?.url ||
    product.primaryImage ||
    product.image ||
    product.images?.[0] ||
    "/Image/khfood_logo.png"
  );
}

export function mapBackendCategories(categories: BackendCategory[] = []): KhCategory[] {
  return categories.map((category) => {
    const name = category.name || category.title || "Category";
    return {
      id: category.id || category._id || slugify(name),
      slug: category.slug || slugify(name),
      name,
      image: category.image || category.bannerImageUrl || "/Image/khfood_logo.png",
    };
  });
}

export function mapBackendProducts(products: BackendProduct[] = [], categories: BackendCategory[] = []): KhProduct[] {
  const mappedCategories = mapBackendCategories(categories);
  return products.map((product) => {
    const name = product.name || "KH Food Product";
    const categoryId = product.primaryCategoryId || product.categoryIds?.[0] || product.category?.id || product.category?._id || "all";
    const category = mappedCategories.find((item) => item.id === categoryId || item.slug === categoryId);
    const categoryName = product.category?.name || category?.name || "Products";
    const categorySlug = product.category?.slug || category?.slug || slugify(categoryName);
    const image = firstImage(product);

    return {
      id: product.id || product._id || product.slug || product.sku || slugify(name),
      slug: product.slug || slugify(name),
      name,
      price: asNumber(product.pricing?.price ?? product.pricing?.basePrice ?? product.price),
      image,
      categorySlug,
      categoryName,
      description: product.description || `Premium quality ${name} from KhFoods.`,
      rating: 4.5,
      reviews: 12,
      gallery: [{ url: image }],
    };
  });
}

export function getAllProducts(locale: string = "en"): KhProduct[] {
  const productsSection = ecommerceData.content.find((sec) => sec.id === "sec_ecommerce_products");
  // @ts-ignore
  const rawProducts = productsSection?.content.filter((item) => item.type === "product-card") || [];

  return rawProducts.map((p: any) => {
    const title = p.props.title.value[locale] || p.props.title.value.en;
    const category = p.props.category.value[locale] || p.props.category.value.en;
    const slug = p.props.link.value.replace("/product/", "");
    const catSlug = category.toLowerCase().replace(/\\s+/g, "-");

    return {
      id: p.id,
      slug,
      name: title,
      price: p.props.price.value,
      image: p.props.image.value,
      categorySlug: catSlug,
      categoryName: category,
      description: `Premium quality ${title} from KhFoods.`,
      rating: p.props.ratings?.value || 4.5,
      reviews: p.props.reviews?.value || 12,
      gallery: [{ url: p.props.image.value }]
    };
  });
}

export function getProductBySlug(slug: string, locale: string = "en"): KhProduct | undefined {
  const products = getAllProducts(locale);
  return products.find(p => p.slug === slug);
}

export function getAllCategories(locale: string = "en"): KhCategory[] {
  const catsSection = ecommerceData.content.find((sec) => sec.id === "sec_ecommerce_categories");
  // @ts-ignore
  const rawCats = catsSection?.content.filter((item) => item.type === "category-item") || [];

  return rawCats.map((c: any) => {
    const title = c.props.title.value[locale] || c.props.title.value.en;
    const slug = c.props.link.value.replace("/category/", "");
    return {
      id: c.id,
      slug,
      name: title,
      image: c.props.image.value
    };
  });
}
