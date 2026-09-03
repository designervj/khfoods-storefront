"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Edit2, Minus, Plus, Package, Calendar } from "lucide-react";
import { useAppDispatch } from "@/redux/store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  selectCartTotal,
  selectCartItemCount,
  selectCartItems,
  updateQuantity,
  removeItem,
  closeCart,
  selectIsCartOpen,
} from "@/redux/slices/ecommerce/cartSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { translateStatic } from "@/lib/i18n/locale";

export default function CartDrawer() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = (text: string) => translateStatic(text, locale);
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartItemCount);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [activePanel, setActivePanel] = useState<"note" | "estimate" | null>(null);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleUpdateQuantity = (id: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-[1999]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 right-0 sm:left-auto w-full sm:max-w-[420px] bg-white z-[2000] flex flex-col shadow-2xl sm:border-l border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {t('Shopping Cart')} ({cartCount})
              </h2>
              <button
                onClick={handleClose}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 overscroll-contain">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-bold">
                  {t('Your cart is empty.')}
                </div>
              ) : (
                items.map((item) => {
                  return (
                    <div key={item.id} className="flex gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
                        <img
                          src={item.image || "/images/placeholder.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 leading-tight">
                            {item.name}
                          </h3>
                          {item.variantName && (
                            <p className="text-xs text-gray-500 mt-1">
                              Variant: {item.variantName}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[#D4A820] font-bold text-sm">
                              Rs. {item.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center h-8 rounded-lg border border-gray-200 bg-white px-1">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-500">
                            <Link href={`/product/${item.productId}`} onClick={handleClose} className="p-1 hover:text-gray-900 transition-colors">
                              <Edit2 size={14} />
                            </Link>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-1 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 border-y border-gray-200 divide-x divide-gray-200">
              <button
                onClick={() => setActivePanel("note")}
                className="flex items-center justify-center gap-2 py-3.5 sm:py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Calendar size={16} /> {t('Add Note')}
              </button>
              <button
                onClick={() => setActivePanel("estimate")}
                className="flex items-center justify-center gap-2 py-3.5 sm:py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Package size={16} /> {t('Estimate')}
              </button>
            </div>

            {/* Footer */}
            <div className="shrink-0 p-4 sm:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-6 bg-gray-50">
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <span className="text-lg font-bold text-gray-900">{t('Subtotal')}</span>
                <span className="text-lg font-black text-gray-900">
                  Rs. {cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <label className="flex items-center gap-3 mb-5 sm:mb-6 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreedToTerms ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'}`}>
                  {agreedToTerms && <X size={14} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                  {t('I agree with')} <strong className="text-gray-900">{t('Terms & Conditions')}</strong>
                </span>
              </label>

              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={handleClose}
                  className="flex items-center justify-center w-full py-3 rounded-xl border border-black text-black font-semibold hover:bg-black/5 transition-colors"
                >
                  {t('View Cart')}
                </Link>
                <button
                  onClick={() => {
                    handleClose();
                    router.push(locale === "en" ? "/checkout" : `/${locale}/checkout`);
                  }}
                  disabled={!agreedToTerms || items.length === 0}
                  className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-colors ${
                    !agreedToTerms || items.length === 0
                      ? "bg-black/5 text-gray-400 cursor-not-allowed"
                      : "bg-[#111111] text-white hover:bg-black hover:-translate-y-0.5 shadow-lg"
                  }`}
                >
                  {t('Checkout')}
                </button>
              </div>
            </div>

            {/* Overlay Backdrop */}
            <AnimatePresence>
              {activePanel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActivePanel(null)}
                  className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-40"
                />
              )}
            </AnimatePresence>

            {/* Sliding Panels */}
            <AnimatePresence>
              {activePanel && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-x-0 bottom-0 bg-[#f6f6f6] z-50 border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {activePanel === "note" && (
                    <div className="p-6 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-6">
                        <Calendar size={20} />
                        <h3 className="text-lg font-bold">{t('Add Order Note')}</h3>
                      </div>
                      <textarea
                        placeholder={t('How can we help you?')}
                        rows={6}
                        className="w-full p-4 rounded-xl border border-gray-200 bg-white resize-none focus:outline-none focus:border-black mb-6"
                      />
                      <div className="space-y-3">
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl bg-black text-white font-black hover:bg-black/90 transition-colors"
                        >
                          {t('Save')}
                        </button>
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl border border-black text-black font-black hover:bg-black/5 transition-colors bg-white"
                        >
                          {t('Cancel')}
                        </button>
                      </div>
                    </div>
                  )}

                  {activePanel === "estimate" && (
                    <div className="p-6 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-6">
                        <Package size={20} />
                        <h3 className="text-lg font-bold">{t('Estimate Shipping')}</h3>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm text-gray-500 mb-2">{t('Country/region')}</label>
                          <select className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black appearance-none">
                            <option>{t('United States')}</option>
                            <option>{t('India')}</option>
                            <option>{t('United Kingdom')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-2">{t('Province')}</label>
                          <select className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black appearance-none">
                            <option>{t('Alabama')}</option>
                            <option>{t('California')}</option>
                            <option>{t('New York')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-2">{t('Postal/ZIP code')}</label>
                          <input
                            type="text"
                            placeholder={t('Postal/ZIP code')}
                            className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl bg-black text-white font-black hover:bg-black/90 transition-colors"
                        >
                          {t('Estimate Shipping')}
                        </button>
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl border border-black text-black font-black hover:bg-black/5 transition-colors bg-white"
                        >
                          {t('Cancel')}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
