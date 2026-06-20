'use client';

import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { logout } from '@/redux/slices/ecommerce/authSlice';
import Link from 'next/link';
import { User, Package, Heart, LogOut } from 'lucide-react';

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-md text-center">
          <User size={64} className="mx-auto mb-6 text-[var(--text-muted)]" />
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="text-[var(--text-secondary)] mb-8">Sign in to access your account.</p>
          <Link href="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="card-theme p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-2xl font-bold text-[var(--btn-primary-text)]">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-[var(--text-secondary)]">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/orders" className="card-theme p-6 text-center hover:shadow-lg transition-all">
            <Package size={32} className="mx-auto mb-3 text-[var(--primary)]" />
            <h3 className="font-semibold">Orders</h3>
          </Link>
          <Link href="/wishlist" className="card-theme p-6 text-center hover:shadow-lg transition-all">
            <Heart size={32} className="mx-auto mb-3 text-[var(--primary)]" />
            <h3 className="font-semibold">Wishlist</h3>
          </Link>
          <button onClick={() => dispatch(logout())} className="card-theme p-6 text-center hover:shadow-lg transition-all cursor-pointer">
            <LogOut size={32} className="mx-auto mb-3 text-[var(--error)]" />
            <h3 className="font-semibold">Logout</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
