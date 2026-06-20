"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchOrderById } from "@/redux/slices/ecommerce/ordersThunk";
import { clearSelectedOrder } from "@/redux/slices/ecommerce/ordersSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Package, Calendar, CreditCard, MapPin, AlertCircle } from "lucide-react";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated, loading: authLoading } = useAppSelector((state) => state.auth);
  const { selectedOrder, loading: orderLoading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated && id) dispatch(fetchOrderById(id));
    return () => { dispatch(clearSelectedOrder()); };
  }, [dispatch, isAuthenticated, id]);

  const formatDate = (dateString: string) => {
    try { return new Date(dateString).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return dateString; }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(price);

  if (authLoading || orderLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) return null;

  if (error) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-2xl text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-[var(--error)]" />
          <h2 className="text-2xl font-bold mb-2">Error loading order</h2>
          <p className="text-[var(--text-secondary)] mb-6">{error}</p>
          <Link href="/orders" className="btn-primary gap-2"><ArrowLeft size={18} /> Back to Orders</Link>
        </div>
      </div>
    );
  }

  if (!selectedOrder) return null;

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center gap-2 mb-8 text-sm text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/orders" className="hover:text-[var(--primary)]">Orders</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-[var(--text)]">{selectedOrder.orderNumber}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{selectedOrder.orderNumber}</h1>
            <p className="text-[var(--text-secondary)] flex items-center gap-2 mt-1"><Calendar size={16} /> {formatDate(selectedOrder.createdAt)}</p>
          </div>
          <Link href="/orders" className="btn-outline gap-2"><ArrowLeft size={18} /> Back</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-theme p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment</h3>
            <p className="text-2xl font-bold text-[var(--primary)]">{formatPrice(selectedOrder.pricing.total)}</p>
            <p className="text-sm text-[var(--text-muted)]">Via {selectedOrder.payment.method}</p>
          </div>
          <div className="card-theme p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Package size={18} /> Items</h3>
            <p className="text-2xl font-bold">{selectedOrder.items.length} items</p>
          </div>
          <div className="card-theme p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={18} /> Shipping</h3>
            <p className="text-sm">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
          </div>
        </div>

        <div className="card-theme overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="font-semibold">Order Items</h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {selectedOrder.items.map((item, idx) => (
              <div key={idx} className="p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-[var(--surface)] rounded-[var(--radius-md)] overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-[var(--text-muted)]">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
