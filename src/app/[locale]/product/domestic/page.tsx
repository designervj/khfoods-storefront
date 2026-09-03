"use client";

import React from "react";
import CategoryProductGrid from "@/components/pages/CategoryProductGrid";
import PageHeroSection from "@/components/sections/PageHeroSection";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, Leaf, Users } from "lucide-react";
import { translateStatic } from "@/lib/i18n/locale";

export default function DomesticPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = (text: string) => translateStatic(text, locale);

  const heroSections = [
    {
      id: "hero",
      type: "page-hero",
      adminTitle: "Page Hero",
      props: {
        title: { en: "Domestic", hi: "घरेलू" },
        backgroundImage: "/Image/bg-banner.png",
        breadcrumb: [
          { label: { en: "Product", hi: "उत्पाद" }, href: null },
          { label: { en: "DOMESTIC SHIPPING", hi: "घरेलू शिपिंग" }, href: null }
        ]
      }
    }
  ];

  return (
    <div className="domestic-page-wrapper bg-[#fafafa]">
      <PageHeroSection 
        sections={heroSections}
        locale={locale}
        isEditable={false}
        createSaveHandler={() => async () => {}}
        heroTitle="Page Hero"
      />

      {/* Feature Section */}
      <section className="bg-white py-14 md:py-20 border-y border-border/50">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-black mb-3">{t("Why Choose KH Foods?")}</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl mx-auto">{t("We deliver premium peanuts across the country with consistent freshness, careful packing, and dependable service.")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Truck className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Fast Shipping")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Reliable delivery support across domestic locations.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ShieldCheck className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Premium Quality")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Every batch is checked for freshness, taste, and crunch.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Leaf className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("100% Natural")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Simple processing that keeps the peanut flavor clean.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Users className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Family Owned")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("A California peanut tradition built with care since 1991.")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container mx-auto px-[5%]">
          <h2 className="text-3xl font-bold text-foreground mb-8 tracking-wide uppercase pb-8 text-center border-b border-none">{t("DOMESTIC SHIPPING")}</h2>
          <CategoryProductGrid categoryId="domestic" />
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="container mx-auto px-[5%]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-black/10 z-10" />
              <img src="/Image/product-banner-img.png" alt="Quality Assurance" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-[#ecb984]/20 text-[#c89255] font-bold text-sm tracking-widest uppercase rounded-full">{t("Our Guarantee")}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide leading-tight">{t("Committed to")} <span className="text-[#ecb984]">{t("Excellence")}</span></h2>
              <p className="text-[15px] md:text-base text-muted leading-relaxed">
                From our California farms directly to your table, we oversee every step of the process. Our domestic shipping ensures that our peanuts retain their perfect roast, crunch, and flavor by the time they reach your doorstep. We pack our products in specially designed, air-tight packaging to lock in freshness.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Air-tight freshness seal')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Strict quality control checks')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Sustainable packaging materials')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale CTA Section */}
      <section className="relative py-24 bg-[#1a202c] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ecb984 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-[5%] relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide pb-4">{t("Need Bulk Quantities?")}</h2>
          <p className="text-[15px] md:text-base text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">{t("We offer specialized pricing and logistics solutions for domestic distributors, retailers, and restaurants. Partner with KhFoods for reliable supply.")}</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#ecb984] hover:bg-[#c89255] text-white font-bold tracking-widest uppercase transition-colors duration-300 rounded-sm">
            {t("Contact Sales Team")}
          </Link>
        </div>
      </section>
    </div>
  );
}
