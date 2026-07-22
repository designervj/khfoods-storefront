"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchOrders } from "@/redux/slices/ecommerce/ordersThunk";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, ChevronRight, ArrowRight, ShoppingBag, Calendar, CreditCard, AlertCircle } from "lucide-react";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const { orders, loading: ordersLoading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders());
  }, [dispatch, isAuthenticated]);

  const formatDate = (dateString: string) => {
    try { return new Date(dateString).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }); }
    catch { return dateString; }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);

  if (authLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center gap-2 mb-8 text-sm text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-[var(--text)]">Orders</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
        <p className="text-[var(--text-secondary)] mb-10">View and track your order history.</p>

        {ordersLoading ? (
          <div className="space-y-4 animate-pulse">{[1,2,3].map(n => <div key={n} className="card-theme p-8 h-32"></div>)}</div>
        ) : error ? (
          <div className="card-theme p-8 text-center">
            <AlertCircle size={40} className="mx-auto mb-4 text-[var(--error)]" />
            <h3 className="text-lg font-bold mb-2">Failed to load orders</h3>
            <p className="text-[var(--text-secondary)] mb-4">{error}</p>
            <button onClick={() => dispatch(fetchOrders())} className="btn-primary">Try Again</button>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const orderId = order.id || order._id;
              const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
              return (
                <div key={orderId} className="card-theme p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Order</span>
                      <h3 className="text-lg font-bold">{order.orderNumber}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(order.createdAt)}</span>
                      <span className="flex items-center gap-1"><Package size={14} /> {itemsCount} items</span>
                      <span className="font-bold text-[var(--primary)]">{formatPrice(order.pricing.total)}</span>
                    </div>
                    <Link href={`/orders/${orderId}`} className="btn-primary text-sm gap-1">
                      View <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-theme p-12 text-center">
            <ShoppingBag size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-[var(--text-secondary)] mb-6">Start shopping and place your first order.</p>
            <Link href="/product/all-product" className="btn-primary">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
