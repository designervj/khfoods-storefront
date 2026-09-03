export const defaultSubCategories = [
  {
    id: "cat-1",
    type: "item",
    props: {
      label: { en: "Domestic", hi: "घरेलू", zh: "美國境內" }
    }
  },
  {
    id: "cat-2",
    type: "item",
    props: {
      label: { en: "International", hi: "अंतरराष्ट्रीय", zh: "國際" }
    }
  },
  {
    id: "cat-3",
    type: "item",
    props: {
      label: { en: "Gift Boxes", hi: "गिफ्ट बॉक्स", zh: "禮盒" }
    }
  },
  {
    id: "cat-4",
    type: "item",
    props: {
      label: { en: "Wholesale", hi: "थोक", zh: "批發" }
    }
  },
  {
    id: "cat-5",
    type: "item",
    props: {
      label: { en: "All Products", hi: "सभी उत्पाद", zh: "全部產品" }
    }
  }
];

export const defaultPills = (productCount: number) => [
  {
    label: { en: "Items", hi: "आइटम" },
    value: "120+",
    isBold: true
  },
  {
    label: { en: "Delivery", hi: "डिलीवरी" },
    value: "Free",
    isBold: true
  },
  {
    label: { en: "Rated", hi: "रेटेड" },
    value: "Top",
    isBold: true
  }
];

export const defaultPageHeadSection = {
  id: "shop-page-head",
  type: "section",
  adminTitle: "Category Page Head",
  layout: "fullwidth",
  columns: null,
  props: {
    badge: {
      en: "Our Collection",
      hi: "हमारा संग्रह",
      zh: "我們的系列"
    },
    heading: {
      en: "The Full Collection",
      hi: "पूरा संग्रह",
      zh: "完整系列"
    },
    description: {
      en: "Explore our full collection of premium roasted peanuts, packed fresh and made with simple natural ingredients.",
      hi: "हमारे प्रीमियम भुनी हुई मूंगफली के पूरे संग्रह को देखें, ताज़ा पैक और सरल प्राकृतिक सामग्री से बना।",
      zh: "探索我們完整的高級烘焙花生系列，新鮮包裝並以簡單天然成分製成。"
    }
  },
  content: defaultSubCategories
};
