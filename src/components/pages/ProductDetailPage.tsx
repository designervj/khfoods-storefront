"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, Share2, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { addToCart, openCart } from "@/redux/slices/ecommerce/cartSlice";
import { KhProduct, getAllProducts } from "@/lib/ecommerceData";
import { useParams } from "next/navigation";
import { useEffect, useCallback } from 'react';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from "@/components/shared/EditableText";

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ProductDetailPage({
  product,
  relatedProducts: relatedProductsProp,
}: {
  product: KhProduct;
  relatedProducts?: KhProduct[];
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const dispatch = useAppDispatch();
  const allProducts = relatedProductsProp || getAllProducts(locale);
  const relatedProducts = allProducts.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'product-detail') dispatch(setCurrentPageBySlug('product-detail'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  const productTabsSection = currentPages?.sections?.find((s: any) => s.id === 'product-tabs-1');
  const relatedSection = currentPages?.sections?.find((s: any) => s.id === 'related-products-1');

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      maxQuantity: 10,
    };
    dispatch(addToCart(cartItem));
    dispatch(openCart());
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formattedPrice = `₹${product.price.toFixed(2)}`;
  const galleryImages = product.gallery || [{ url: product.image }];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner (from original site style) */}
      <div className="bg-[#f7f7f7] py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center text-sm md:text-[15px] font-normal gap-y-1">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="text-[#e2a865] hover:text-[#c48d4e] transition-colors whitespace-nowrap">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={locale === 'en' ? `/category/${product.categorySlug}` : `/${locale}/category/${product.categorySlug}`} className="text-[#e2a865] hover:text-[#c48d4e] transition-colors whitespace-nowrap">
              {product.categoryName}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left: Product Images */}
          <div className="w-full md:w-1/2">
            <div className="relative mb-6">
              <img
                src={galleryImages[selectedImage].url}
                alt={product.name}
                className="w-full h-auto object-contain cursor-zoom-in"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 ${
                      selectedImage === idx ? "opacity-100" : "opacity-70 hover:opacity-100"
                    } transition-opacity`}
                  >
                    <img src={img.url} alt={`${product.name} ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-[32px] text-[#333333] font-normal mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="text-[#4b4b4b] text-[16px] leading-7 mb-8">
              {product.description || (
                <div className="space-y-4">
                  <p className="font-semibold text-[#333333]">21 Packs, 6 oz each</p>
                  <ul className="list-disc pl-5 space-y-1">
                  <li>Non-GMO Verified</li>
                  <li>All Natural Ingredients: Salt and Peanuts</li>
                  <li>Made in USA</li>
                </ul>
                </div>
              )}
            </div>

            <div className="text-[30px] font-normal text-[#333333] mb-8">
              {formattedPrice}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-11 text-center text-gray-700 border-2 border-gray-400 focus:outline-none p-0 m-0"
                  min="1"
                />
                
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="bg-[#3b2f2d] hover:bg-[#2b2220] text-white px-8 h-11 text-[13px] font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 uppercase"
                >
                  {isAdded ? (
                    <><Check size={16} /> Added</>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>

              {/* Payment Buttons matching reference */}
              <button className="w-full max-w-[320px] bg-black hover:bg-gray-900 text-white h-[44px] rounded-[4px] flex items-center justify-center transition-colors">
                <span className="sr-only">Apple Pay</span>
                <svg viewBox="0 0 49 20" width="49" height="20" fill="currentColor">
                  <path d="M18.8 9.9c0-3.3 2.7-4.9 2.8-4.9-1.5-2.2-3.9-2.5-4.7-2.6-2-.2-4 .8-5 1.5-1 1-3.6 4-3.6 8.5 0 2.9 1 5.9 3 7.8 1.4 1.4 3 2.5 4.8 2.5 2 0 2.9-.6 5-.6 2.1 0 2.9.6 5 .6 1.7 0 3.3-1 4.7-2.4 1.7-1.9 2.4-3.9 2.4-4-.1-.1-2.9-1.1-2.9-4.3zm-3.3-8.1c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.9.8-3.9 1.9-.8.9-1.5 2.5-1.3 3.9 1.5.1 3-.7 3.9-1.7zm15.7 3.6h4.5c2.3 0 3.9 1.4 3.9 3.8v9h-2.9v-1.7c-.8 1.3-2.1 2-3.8 2-2.3 0-4-1.6-4-4 0-2.3 1.6-4 4.3-4h3.4v-1c0-1.4-1.1-2.2-2.5-2.2-1.3 0-2.3.6-2.5 1.6h-2.8c.2-2.2 2.2-3.5 4.9-3.5zm4.5 7v1.1c0 1.5-1 2.3-2.4 2.3-1.4 0-2.3-.8-2.3-1.9 0-1.1.9-1.9 2.3-1.9h2.4zm10.7-7l4 10h-3.1l-1-2.8h-4.3l-.9 2.8h-3l5.2-12.9h3.1zm-3.5 5.5l-1.4 3.8h2.8l-1.4-3.8zM24.7 5.4h4.5c2.9 0 4.7 1.7 4.7 4.3 0 2.6-1.8 4.3-4.7 4.3h-1.6v4.8h-2.9V5.4zm2.9 6.4h1.5c1.2 0 1.9-.7 1.9-2s-.7-2-1.9-2h-1.5v4z" />
                </svg>
              </button>

              <button className="w-full max-w-[320px] bg-[#00d65f] hover:bg-[#00c055] text-black font-semibold h-[44px] rounded-[4px] flex items-center justify-center gap-2 transition-colors">
                Pay securely with <svg width="45" height="16" viewBox="0 0 45 16" fill="currentColor"><path d="M42.2 0H31c-1.3 0-2.2.9-2.2 2.2v11.6c0 1.3.9 2.2 2.2 2.2h11.2c1.3 0 2.2-.9 2.2-2.2V2.2c0-1.3-.9-2.2-2.2-2.2zm-2.8 11.5l-3.3-4.8 3-4h-2.5l-1.8 2.5-1.9-2.5h-2.4l3 4.1-3.2 4.7h2.5l2-2.9 2.1 2.9h2.5zM12.9 4.3c-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8-1.7-3.8-3.8-3.8zm0 5.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7.6-5.6v7.3h2V4.5h-2zm-12.7 0v7.3h2V4.5h-2zM4.1 4.5v7.3h2V4.5h-2zM0 4.5v7.3h2V4.5H0z" /><circle cx="12.9" cy="8.1" r="1.3" /></svg>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-2 mb-8 text-[#999999]">
              <div className="text-[15px]">
                <span className="font-normal mr-1">SKU:</span> DOKH-21C-6 <span className="mx-1">/</span>
                <span className="font-normal mr-1">Category:</span>
                <Link href={`/category/${product.categorySlug}`} className="text-[#e2a865] hover:text-[#c48d4e] transition-colors">{product.categoryName}</Link>
              </div>
            </div>

            {/* Nutrition Facts block matching image */}
            <div className="w-full max-w-[500px] mt-4">
              <img 
                src={product.nutritionImage || "/images/nutrition-facts-placeholder.jpg"} 
                alt="Nutrition Facts" 
                className="w-full h-auto object-contain border border-gray-300"
              />
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Share2 size={16} /> Share:</span>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"><FacebookIcon /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all"><TwitterIcon /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"><LinkedinIcon /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-t border-gray-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-[18px] font-semibold tracking-wide transition-colors relative ${activeTab === 'description' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <EditableText value={productTabsSection?.props?.descriptionTab?.[locale] || 'Description'} onSave={createSaveHandler('product-tabs-1', 'props.descriptionTab')} isEditable={isEditable} />
              {activeTab === 'description' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('additional')}
              className={`pb-4 text-[18px] font-semibold tracking-wide transition-colors relative ${activeTab === 'additional' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <EditableText value={productTabsSection?.props?.additionalTab?.[locale] || 'Additional information'} onSave={createSaveHandler('product-tabs-1', 'props.additionalTab')} isEditable={isEditable} />
              {activeTab === 'additional' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-[18px] font-semibold tracking-wide transition-colors relative ${activeTab === 'reviews' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <EditableText value={productTabsSection?.props?.reviewsTab?.[locale] || 'Reviews'} onSave={createSaveHandler('product-tabs-1', 'props.reviewsTab')} isEditable={isEditable} /> ({product.reviews})
              {activeTab === 'reviews' && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black"></span>}
            </button>
          </div>

          <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-[15px]">
            {activeTab === 'description' && (
              <div className="animate-in fade-in duration-500">
                <EditableText tag="p" className="mb-4" multiline value={productTabsSection?.props?.descriptionContent1?.[locale] || "Are you looking for a healthy snack? Look no further than KH Roasted Peanuts! Our peanuts are roasted perfectly without any oil, making them a healthier alternative to other snacks. And because they're packed with protein and fiber, they'll keep you full and satisfied until your next meal."} onSave={createSaveHandler('product-tabs-1', 'props.descriptionContent1')} isEditable={isEditable} />
                <EditableText tag="p" multiline value={productTabsSection?.props?.descriptionContent2?.[locale] || "Enjoy our peanuts as a snack on the go or sprinkle them on your salad."} onSave={createSaveHandler('product-tabs-1', 'props.descriptionContent2')} isEditable={isEditable} />
              </div>
            )}
            {activeTab === 'additional' && (
              <div className="animate-in fade-in duration-500">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 bg-gray-50 font-semibold w-1/3">Weight</th>
                      <td className="py-3 px-4 italic">N/A</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 bg-gray-50 font-semibold w-1/3">Dimensions</th>
                      <td className="py-3 px-4 italic">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="animate-in fade-in duration-500">
                <p className="italic text-gray-500 mb-6">There are no reviews yet.</p>
                <div className="border border-gray-200 p-6 sm:p-8 rounded-sm">
                  <h3 className="text-[20px] font-semibold text-black mb-2">Be the first to review "{product.name}"</h3>
                  <p className="text-gray-500 text-sm mb-6">Your email address will not be published. Required fields are marked *</p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm font-semibold text-gray-700">Your rating *</span>
                    <div className="flex gap-1 text-gray-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 cursor-pointer hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      ))}
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your review *</label>
                      <textarea rows={4} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                        <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input type="email" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" required />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <input type="checkbox" id="save-info" className="w-4 h-4" />
                      <label htmlFor="save-info" className="text-sm text-gray-600">Save my name, email, and website in this browser for the next time I comment.</label>
                    </div>
                    <button type="submit" className="bg-[#111111] hover:bg-[#333333] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors mt-4">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EditableText tag="h2" className="text-[32px] text-[#111111] font-normal mb-8" value={relatedSection?.props?.title?.[locale] || 'Related products'} onSave={createSaveHandler('related-products-1', 'props.title')} isEditable={isEditable} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <div key={rp.id} className="group relative">
                  <div className="relative border border-gray-200 overflow-hidden mb-4">
                    <Link href={locale === 'en' ? `/product/${rp.slug}` : `/${locale}/product/${rp.slug}`}>
                      <img src={rp.image} alt={rp.name} className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity" />
                    </Link>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                      <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-700 hover:bg-[#111111] hover:text-white transition-colors tooltip" title="Add to Wishlist">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href={locale === 'en' ? `/product/${rp.slug}` : `/${locale}/product/${rp.slug}`}>
                      <h3 className="text-[15px] font-normal text-[#333333] hover:text-[#D4A820] transition-colors mb-1 truncate">{rp.name}</h3>
                    </Link>
                    <div className="text-[#111111] font-semibold text-[15px]">₹{rp.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
