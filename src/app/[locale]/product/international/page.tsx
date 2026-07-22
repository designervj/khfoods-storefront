"use client";

import React from "react";
import CategoryProductGrid from "@/components/pages/CategoryProductGrid";
import PageHeroSection from "@/components/sections/PageHeroSection";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Globe2, ShieldCheck, Leaf, Plane } from "lucide-react";

export default function InternationalPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

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

      <div className="container mx-auto px-[5%] py-16">
        <h2 className="text-3xl font-extrabold text-foreground mb-8 tracking-wider uppercase pb-8 text-center border-b border-none">INTERNATIONAL SHIPPING</h2>
        <CategoryProductGrid categoryId="international" />
      </div>

      {/* Feature Section */}
      <section className="bg-white py-16 md:py-24 border-y border-border/50">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-foreground mb-4 pb-4">Global Reach, Premium Quality</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">We export our finest roasted peanuts worldwide, ensuring that our California-grown quality reaches you no matter where you are.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Globe2 className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Worldwide Delivery</h3>
              <p className="text-muted">Extensive logistics network to deliver globally across multiple continents.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Export Standards</h3>
              <p className="text-muted">Strict compliance with international food safety and quality regulations.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Leaf className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">100% Natural</h3>
              <p className="text-muted">Pure, unadulterated peanuts grown organically in California.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Plane className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Air-tight Freight</h3>
              <p className="text-muted">Specialized packaging that survives long transit times without losing freshness.</p>
            </div>
          </div>
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
              <div className="inline-block px-4 py-1.5 bg-[#ecb984]/20 text-[#c89255] font-bold text-sm tracking-widest uppercase rounded-full">Global Promise</div>
              <h2 className="text-4xl font-extrabold text-foreground uppercase tracking-tight leading-tight">Crossing <span className="text-[#ecb984]">Borders</span></h2>
              <p className="text-lg text-muted leading-relaxed">
                Taking our local California heritage to the global stage requires precision and care. We utilize industry-leading export packaging methods designed to combat moisture, humidity, and pressure changes during international transit. No matter where you are located, you receive the same unmatched crunch and flavor.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Customs-compliant documentation</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Multi-layered protective packaging</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Dedicated international support</span>
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight pb-4">Become an Importer</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">Looking to introduce premium California peanuts to your local market? We welcome international partnerships, distributors, and bulk importers.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#ecb984] hover:bg-[#c89255] text-white font-bold tracking-widest uppercase transition-colors duration-300 rounded-sm">
            Inquire About Export
          </Link>
        </div>
      </section>
    </div>
  );
}
