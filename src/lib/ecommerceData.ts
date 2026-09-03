import ecommerceData from "@/data/ecommerce/ecommerce.json";
import { translateStatic } from "@/lib/i18n/locale";

export interface KhProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  nutritionImage?: string;
  sku?: string;
  details?: string[];
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

type ProductDetailContent = {
  sku: string;
  description: string;
  details: string[];
  nutritionImage: string;
  gallery?: { url: string }[];
};

const nutritionLabel6Oz = "https://khfood.com/wp-content/uploads/2019/11/Nutrition-label-for-6-oz_750x240.jpg";
const nutritionLabel16Oz = "https://worp.khfood.com/wp-content/uploads/2019/11/Nutrition-facts-label-bag-16-oz-_750x240-300x100.jpg";

const containerDetails = [
  "Plastic container/lid with a sealed film to ensure freshness.",
  "Non-GMO Verified",
  "All Natural Ingredients: Salt and Peanuts",
  "Made in USA",
];

const containerExtendedDetails = [
  "Plastic container/lid with a sealed film to ensure freshness.",
  "Non-GMO Verified",
  "All Natural Ingredients: Salt and Peanuts",
  "Gluten-Free",
  "No Preservatives Added",
  "Made in USA",
];

const bagDetails = [
  "Vacuumed sealed zipped bag to ensure freshness",
  "Non-GMO Verified",
  "All Natural Ingredients: Salt and Peanuts",
  "Gluten-Free",
  "No Preservatives Added",
  "Made in USA",
];

const productDetailsBySlug: Record<string, ProductDetailContent> = {
  "roasted-peanuts-14-packs": {
    sku: "DOKH-14C-6",
    description: "14 Packs, 6 oz each",
    details: containerDetails,
    nutritionImage: nutritionLabel6Oz,
  },
  "roasted-peanuts-21-packs": {
    sku: "DOKH-21C-6",
    description: "21 Packs, 6 oz each",
    details: containerDetails,
    nutritionImage: nutritionLabel6Oz,
    gallery: [
      { url: "https://khfood.com/wp-content/uploads/2019/11/2Q6A4622-3-scaled.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Box_image.png" },
      { url: "https://khfood.com/wp-content/uploads/2020/03/UNADJUSTEDNONRAW_thumb_6-e1584061674831.jpg" },
    ],
  },
  "roasted-peanuts-6-bags": {
    sku: "DOKH-6BA-16",
    description: "6 Bags, 16 oz each",
    details: bagDetails,
    nutritionImage: nutritionLabel16Oz,
  },
  "roasted-peanuts-8-packs": {
    sku: "DOKH-8C-6",
    description: "8 Packs, 6 oz each",
    details: containerExtendedDetails,
    nutritionImage: nutritionLabel6Oz,
    gallery: [
      { url: "https://khfood.com/wp-content/uploads/2023/08/2Q6A4963.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Box_image.png" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Image-1.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Image-4.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/henrique-felix-dMFIBmDYaIQ-unsplash-scaled.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/no-revisions-oO3sXE73unQ-unsplash-scaled.jpg" },
    ],
  },
  "roasted-peanuts-6-bags-2-taiwan": {
    sku: "TAKH-6BA-16",
    description: "6 Bags, 16 oz each",
    details: bagDetails,
    nutritionImage: nutritionLabel16Oz,
  },
  "roasted-peanuts-12-bags-taiwan": {
    sku: "TAKH-12BA-16",
    description: "12 Bags, 16 oz each",
    details: bagDetails,
    nutritionImage: nutritionLabel16Oz,
  },
  "roasted-peanuts-14-packs-2-taiwan": {
    sku: "TAKH-14C-6",
    description: "14 Packs, 6 oz each",
    details: containerExtendedDetails,
    nutritionImage: nutritionLabel6Oz,
    gallery: [
      { url: "https://khfood.com/wp-content/uploads/2019/11/2Q6A4971.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Box_image.png" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/no-revisions-oO3sXE73unQ-unsplash-scaled.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/henrique-felix-dMFIBmDYaIQ-unsplash-scaled.jpg" },
    ],
  },
  "roasted-peanuts-24-packs-taiwan": {
    sku: "TAKH-24C-6",
    description: "24 Packs, 6 oz each",
    details: containerExtendedDetails,
    nutritionImage: nutritionLabel6Oz,
    gallery: [
      { url: "https://khfood.com/wp-content/uploads/2019/11/2Q6A4622-3-scaled.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Image-2.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2019/12/Box_image.png" },
      { url: "https://khfood.com/wp-content/uploads/2019/10/peanuts21cont.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/no-revisions-oO3sXE73unQ-unsplash-scaled.jpg" },
      { url: "https://khfood.com/wp-content/uploads/2023/08/henrique-felix-dMFIBmDYaIQ-unsplash-scaled.jpg" },
    ],
  },
};

const productSlugAliases: Record<string, string> = {
  "roasted-peanuts-6-bags-taiwan": "roasted-peanuts-6-bags-2-taiwan",
  "roasted-peanuts-14-packs-taiwan": "roasted-peanuts-14-packs-2-taiwan",
};

const productPricesBySlug: Record<string, number> = {
  "roasted-peanuts-14-packs": 58,
  "roasted-peanuts-21-packs": 80,
  "roasted-peanuts-6-bags": 65,
  "roasted-peanuts-8-packs": 36,
  "roasted-peanuts-6-bags-2-taiwan": 90,
  "roasted-peanuts-12-bags-taiwan": 148,
  "roasted-peanuts-14-packs-2-taiwan": 89,
  "roasted-peanuts-24-packs-taiwan": 138,
};

function resolveProductSlug(slug: string) {
  return productSlugAliases[slug] || slug;
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
    const slug = resolveProductSlug(product.slug || slugify(name));
    const detailContent = productDetailsBySlug[slug];

    return {
      id: product.id || product._id || product.slug || product.sku || slugify(name),
      slug,
      name,
      price: productPricesBySlug[slug] ?? asNumber(product.pricing?.price ?? product.pricing?.basePrice ?? product.price),
      image,
      nutritionImage: detailContent?.nutritionImage,
      sku: detailContent?.sku || product.sku,
      details: detailContent?.details,
      categorySlug,
      categoryName,
      description: detailContent?.description || product.description || `Premium quality ${name} from KhFoods.`,
      rating: 4.5,
      reviews: 12,
      gallery: detailContent?.gallery || [{ url: image }],
    };
  });
}

export function getAllProducts(locale: string = "en"): KhProduct[] {
  const productsSection = ecommerceData.content.find((sec) => sec.id === "sec_ecommerce_products");
  // @ts-ignore
  const rawProducts = productsSection?.content.filter((item) => item.type === "product-card") || [];

  return rawProducts.map((p: any) => {
    const title = translateStatic(p.props.title.value[locale] || p.props.title.value.en, locale);
    const rawCategory = p.props.category.value.en;
    const category = translateStatic(p.props.category.value[locale] || rawCategory, locale);
    const slug = p.props.link.value.replace("/product/", "");
    const resolvedSlug = resolveProductSlug(slug);
    const catSlug = rawCategory.toLowerCase().replace(/\\s+/g, "-");
    const image = p.props.image.value;
    const detailContent = productDetailsBySlug[resolvedSlug];

    return {
      id: p.id,
      slug: resolvedSlug,
      name: title,
      price: productPricesBySlug[resolvedSlug] ?? p.props.price.value,
      image,
      nutritionImage: detailContent?.nutritionImage,
      sku: detailContent?.sku,
      details: detailContent?.details,
      categorySlug: catSlug,
      categoryName: category,
      description: detailContent?.description || `Premium quality ${title} from KhFoods.`,
      rating: p.props.ratings?.value || 4.5,
      reviews: p.props.reviews?.value || 12,
      gallery: detailContent?.gallery || [{ url: image }]
    };
  });
}

export function getProductBySlug(slug: string, locale: string = "en"): KhProduct | undefined {
  const products = getAllProducts(locale);
  const resolvedSlug = resolveProductSlug(slug);
  return products.find(p => p.slug === resolvedSlug);
}

export function getAllCategories(locale: string = "en"): KhCategory[] {
  const catsSection = ecommerceData.content.find((sec) => sec.id === "sec_ecommerce_categories");
  // @ts-ignore
  const rawCats = catsSection?.content.filter((item) => item.type === "category-item") || [];

  return rawCats.map((c: any) => {
    const title = translateStatic(c.props.title.value[locale] || c.props.title.value.en, locale);
    const slug = c.props.link.value.replace("/category/", "");
    return {
      id: c.id,
      slug,
      name: title,
      image: c.props.image.value
    };
  });
}
