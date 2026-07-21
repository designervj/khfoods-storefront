"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RotateCcw, Info, Check } from "lucide-react";
import { useAppDispatch } from "@/redux/store/hooks";
import { addToCartThunk } from "@/redux/slices/ecommerce/cartSlice";
import { KhProduct, getAllProducts } from "@/lib/ecommerceData";
import { useParams } from "next/navigation";

export default function ProductDetailPage({ product }: { product: KhProduct }) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdded, setIsAdded] = useState(false);

  const dispatch = useAppDispatch();
  const allProducts = getAllProducts(locale);
  const relatedProducts = allProducts.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      maxQuantity: 10,
    };
    dispatch(addToCartThunk(cartItem));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formattedPrice = `Rs. ${product.price.toLocaleString("en-IN")}`;
  const galleryImages = product.gallery || [{ url: product.image }];

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-24 pb-20">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
          <Link href={locale === 'en' ? '/' : `/${locale}`} className="hover:text-[#D4A820] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={locale === 'en' ? '/shop' : `/${locale}/shop`} className="hover:text-[#D4A820] transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={locale === 'en' ? `/category/${product.categorySlug}` : `/${locale}/category/${product.categorySlug}`} className="hover:text-[#D4A820] transition-colors uppercase">
            {product.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 lg:border-r border-gray-100 bg-gray-50/50">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm mb-6">
                <img
                  src={galleryImages[selectedImage].url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {galleryImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === idx ? "border-[#D4A820] shadow-md" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img src={img.url} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.categoryName}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-extrabold text-black tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-[#D4A820]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i >= Math.floor(product.rating) ? "text-gray-300" : ""} />
                  ))}
                  <span className="ml-2 font-bold text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 hover:text-black cursor-pointer transition-colors underline decoration-dotted">{product.reviews} Reviews</span>
              </div>
              
              <div className="text-4xl font-black text-[#D4A820] mb-8">
                {formattedPrice}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full h-14 px-4 w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md ${
                    isAdded 
                      ? "bg-green-500 text-white hover:bg-green-600" 
                      : "bg-[#D4A820] text-white hover:bg-[#b58f1a] hover:shadow-xl hover:-translate-y-0.5"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 mt-auto">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="text-[#D4A820]" size={24} />
                  <span className="font-medium text-sm">Free Delivery Available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <RotateCcw className="text-[#D4A820]" size={24} />
                  <span className="font-medium text-sm">Easy Returns</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full border border-[#D4A820] flex items-center justify-center text-[#D4A820] font-bold text-xs">100%</div>
                  <span className="font-medium text-sm">Natural Ingredients</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Info className="text-[#D4A820]" size={24} />
                  <span className="font-medium text-sm">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-extrabold text-black mb-10 text-center uppercase tracking-tight">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={locale === 'en' ? `/product/${rp.slug}` : `/${locale}/product/${rp.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-2 block">{rp.categoryName}</span>
                    <h3 className="font-bold text-xl text-black mb-2 leading-tight group-hover:text-[#D4A820] transition-colors">{rp.name}</h3>
                    <p className="text-[#D4A820] font-black text-lg">Rs. {rp.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
