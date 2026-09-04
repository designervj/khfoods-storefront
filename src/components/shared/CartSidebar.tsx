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
  updateQuantity,
  removeItem,
  updateCartItemThunk,
  removeCartItemThunk
} from "@/redux/slices/ecommerce/cartSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { translateStatic } from "@/lib/i18n/locale";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = (text: string) => translateStatic(text, locale);
  const localizedHref = (path: string) => locale === "en" ? path : `/${locale}${path}`;
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartItemCount);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [activePanel, setActivePanel] = useState<"note" | "estimate" | null>(null);

  const handleUpdateQuantity = (cartItemId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      dispatch(updateQuantity({ id: cartItemId, quantity: newQty })); // Optimistic update
      dispatch(updateCartItemThunk({ id: cartItemId, quantity: newQty }));
    }
  };

  const handleRemove = (cartItemId: string) => {
    dispatch(removeItem(cartItemId)); // Optimistic update
    dispatch(removeCartItemThunk(cartItemId));
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
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[1999]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-white z-[2000] flex flex-col shadow-2xl border-l border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {t('Shopping Cart')} ({cartCount})
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-bold">
                  {t('Your cart is empty.')}
                </div>
              ) : (
                items.map((item) => {
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
                        <img
                          src={item.image || "/placeholder.jpg"}
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
                              {t('Variant:')} {item.variantName}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-red-600 font-bold text-sm">
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
                            <Link href={localizedHref(`/product/${item.productId}`)} onClick={onClose} className="p-1 hover:text-gray-900 transition-colors">
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
                className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Calendar size={16} /> {t('Add Note')}
              </button>
              <button
                onClick={() => setActivePanel("estimate")}
                className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Package size={16} /> {t('Estimate')}
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">{t('Subtotal')}</span>
                <span className="text-lg font-black text-gray-900">
                  Rs. {cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreedToTerms ? 'bg-orange-600 border-orange-600' : 'border-gray-300 group-hover:border-orange-600'}`}>
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
                  onClick={onClose}
                  className="flex items-center justify-center w-full py-3 rounded-xl border border-orange-600 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
                >
                  {t('View Cart')}
                </Link>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                  disabled={!agreedToTerms || items.length === 0}
                  className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-colors ${
                    !agreedToTerms || items.length === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-orange-600 text-white hover:bg-orange-700 hover:-translate-y-0.5 shadow-orange-600/20 shadow-lg"
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
                  className="absolute inset-x-0 bottom-0 bg-gray-50 z-50 border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
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
                        className="w-full p-4 rounded-xl border border-gray-200 bg-white resize-none focus:outline-none focus:border-orange-600 mb-6"
                      />
                      <div className="space-y-3">
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl bg-orange-600 text-white font-black hover:bg-orange-700 transition-colors"
                        >
                          {t('Save')}
                        </button>
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl border border-gray-300 text-gray-700 font-black hover:bg-gray-100 transition-colors bg-white"
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
                          <select className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-orange-600 appearance-none">
                            <option>{t('United States')}</option>
                            <option>{t('India')}</option>
                            <option>{t('United Kingdom')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-2">{t('Province')}</label>
                          <select className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-orange-600 appearance-none">
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
                            className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-orange-600"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl bg-orange-600 text-white font-black hover:bg-orange-700 transition-colors"
                        >
                          {t('Estimate Shipping')}
                        </button>
                        <button
                          onClick={() => setActivePanel(null)}
                          className="w-full py-4 rounded-xl border border-gray-300 text-gray-700 font-black hover:bg-gray-100 transition-colors bg-white"
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
