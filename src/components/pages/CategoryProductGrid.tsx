"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { getAllProducts, KhProduct } from "@/lib/ecommerceData";
import { useParams } from "next/navigation";

export default function CategoryProductGrid({ categoryId }: { categoryId: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  
  const allProducts = useMemo(() => getAllProducts(locale), [locale]);
  
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p: KhProduct) => p.categorySlug === categoryId);
  }, [allProducts, categoryId]);

  if (filteredProducts.length === 0) {
    return <div className="text-center py-10 text-gray-500">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {filteredProducts.map((product) => {
        // Split name into main part and bracketed part to match screenshot design
        const nameParts = product.name.match(/^(.*?)\s*(\(.*?\))?$/);
        const mainName = nameParts?.[1] || product.name;
        const bracketName = nameParts?.[2] || "";

        return (
          <div key={product.id} className="bg-white rounded-md p-0 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_35px_-5px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full">
            <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] flex items-center justify-center p-2 mb-2">
              <img 
                src={product.image || product?.gallery?.[0]?.url || "/assets/Image/Sofa.jpg"} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="bg-[#faf7f2] rounded-b-md py-5 px-3 text-center flex flex-col justify-center gap-1.5 flex-1 min-h-[120px] border border-[#f0e8df]">
              <h3 className="font-bold text-[16px] leading-snug text-[#2d3748]">
                <Link href={`/product/${product.slug}`} className="hover:text-[#c89255] transition-colors flex flex-col gap-1">
                  <span>{mainName}</span>
                  {bracketName && <span className="text-[13px] font-semibold text-gray-500">{bracketName}</span>}
                </Link>
              </h3>
              <div className="font-black text-[18px] tracking-tight mt-1 text-[#c89255]">
                ${product.price?.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
