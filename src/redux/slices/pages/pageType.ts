export type LocalizedString = { en: string; [locale: string]: string };

export type PageType = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "about" | "contact" | "faq" | "terms" | "privacy" | "returns";

export type SectionType = "hero" | "grid" | "product-grid" | "featured-collections" | "testimonials" | "cart-items" | "checkout-form" | "faq-accordion" | "cta" | "text" | "image" | "metrics" | "accordion";

export interface ContentItem { id: string; type: string; props: Record<string, any>; }

export interface PageBlock { id: string; type: SectionType; adminTitle: string; props?: Record<string, any>; content?: ContentItem[]; }

export interface Page {
  pageType: PageType;
  slug: string;
  isPublished: boolean;
  seo?: { title: LocalizedString; description: LocalizedString; keywords?: LocalizedString; ogImage?: string; };
  sections: PageBlock[];
}

export interface PagesState {
  allPages: Page[];
  currentPages: Page | null;
  isAllPageFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  isEditablePage: boolean;
}
