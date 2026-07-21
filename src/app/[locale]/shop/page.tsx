"use client";

import React from "react";
import CategoryPage from "@/components/pages/CategoryPage";
import shopData from "@/lib/data/pages/shopPage.json";

export default function ShopPage() {
  const sections = shopData.sections || [];
  return <CategoryPage isShopPage={true} sections={sections} />;
}
