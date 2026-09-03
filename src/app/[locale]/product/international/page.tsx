"use client";

import React from "react";
import CategoryProductGrid from "@/components/pages/CategoryProductGrid";
import PageHeroSection from "@/components/sections/PageHeroSection";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Globe2, ShieldCheck, Leaf, Plane } from "lucide-react";
import { translateStatic } from "@/lib/i18n/locale";

export default function InternationalPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = (text: string) => translateStatic(text, locale);

  const heroSections = [
    {
      id: "hero",
      type: "page-hero",
      adminTitle: "Page Hero",
      props: {
        title: { en: "International", hi: "अंतरराष्ट्रीय" },
        backgroundImage: "/Image/bg-banner.png",
        breadcrumb: [
          { label: { en: "Product", hi: "उत्पाद" }, href: null },
          { label: { en: "INTERNATIONAL SHIPPING", hi: "अंतरराष्ट्रीय शिपिंग" }, href: null }
        ]
      }
    }
  ];

  return (
    <div className="international-page-wrapper bg-[#fafafa]">
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#9a6b35]">{t("International Support")}</p>
            <h2 className="text-3xl font-bold uppercase tracking-wide text-black mb-3">{t("Global Reach, Premium Quality")}</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl mx-auto">{t("We prepare KH Food peanuts for international delivery with careful packing, export-ready handling, and consistent quality.")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Globe2 className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Worldwide Delivery")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Coordinated shipping support for customers outside the domestic market.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ShieldCheck className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Export Standards")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Product handling is planned around export quality and documentation needs.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Leaf className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("100% Natural")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Simple ingredients and a clean roast keep the peanut flavor authentic.")}</p>
            </div>
            <div className="group rounded-3xl border border-[#ead8c4] bg-[#faf7f2] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Plane className="w-6 h-6 text-[#9a6b35]" />
              </div>
              <h3 className="text-base font-bold mb-2 uppercase tracking-tight text-black">{t("Air-tight Freight")}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{t("Protective packing helps maintain freshness during longer transit.")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container mx-auto px-[5%]">
          <h2 className="text-3xl font-bold text-foreground mb-8 tracking-wide uppercase pb-8 text-center border-b border-none">{t("INTERNATIONAL SHIPPING")}</h2>
          <CategoryProductGrid categoryId="international" />
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="container mx-auto px-[5%]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-black/10 z-10" />
              <img src="/Image/product-banner-img.png" alt="Global Shipping" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6 order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 bg-[#ecb984]/20 text-[#c89255] font-bold text-sm tracking-widest uppercase rounded-full">{t("Global Promise")}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide leading-tight">{t("Crossing")} <span className="text-[#ecb984]">{t("Borders")}</span></h2>
              <p className="text-[15px] md:text-base text-muted leading-relaxed">
                Taking our local California heritage to the global stage requires precision and care. We utilize industry-leading export packaging methods designed to combat moisture, humidity, and pressure changes during international transit. No matter where you are located, you receive the same unmatched crunch and flavor.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Customs-compliant documentation')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Multi-layered protective packaging')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">{t('Dedicated international support')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partnership CTA Section */}
      <section className="relative py-24 bg-[#1a202c] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ecb984 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-[5%] relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide pb-4">{t("Become an Importer")}</h2>
          <p className="text-[15px] md:text-base text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">{t("Looking to introduce premium California peanuts to your local market? We welcome international partnerships, distributors, and bulk importers.")}</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#ecb984] hover:bg-[#c89255] text-white font-bold tracking-widest uppercase transition-colors duration-300 rounded-sm">
            {t("Inquire About Export")}
          </Link>
        </div>
      </section>
    </div>
  );
}
