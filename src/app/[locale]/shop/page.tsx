import shopData from "@/lib/data/pages/shopPage.json";
import CategoryPage from "@/components/pages/CategoryPage";

export default function ShopPage() {
  const sections = shopData.sections || [];
  return <CategoryPage isShopPage={true} sections={sections} />;
}
