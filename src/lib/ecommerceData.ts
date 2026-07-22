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
