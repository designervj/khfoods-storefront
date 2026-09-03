"use client";

import React from 'react';
import { ShoppingCart, Lock, Users, Heart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { translateStatic } from '@/lib/i18n/locale';

export default function FeaturesBar() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);

  const features = [
    {
      icon: <ShoppingCart size={24} strokeWidth={2} color="white" />,
      title: 'FREE SHIPPING',
      subtitle: 'All domestic orders'
    },
    {
      icon: <Lock size={24} strokeWidth={2} color="white" />,
      title: 'SECURE PAYMENTS',
      subtitle: 'Confirm'
    },
    {
      icon: <Users size={24} strokeWidth={2} color="white" />,
      title: 'CUSTOMER PRIORITY',
      subtitle: 'Quick responses'
    },
    {
      icon: <Heart size={24} strokeWidth={2} fill="white" color="white" />,
      title: 'MADE WITH LOVE',
      subtitle: 'Best services'
    }
  ];

  return (
    <div className="w-full bg-[#faf5f0] py-8 border-t border-[#eaba88]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start lg:justify-items-center">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-[#eaba88] flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[#1a202c] font-bold tracking-wide uppercase text-[15px]">{t(item.title)}</span>
                <span className="text-gray-600 font-medium text-[14px]">{t(item.subtitle)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
