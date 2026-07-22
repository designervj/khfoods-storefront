"use client";

import React from "react";
import CategoryProductGrid from "@/components/pages/CategoryProductGrid";
import PageHeroSection from "@/components/sections/PageHeroSection";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, Leaf, Users } from "lucide-react";

export default function DomesticPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

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

      <div className="container mx-auto px-[5%] py-16">
        <h2 className="text-3xl font-extrabold text-foreground mb-8 tracking-wider uppercase pb-8 text-center border-b border-none">DOMESTIC SHIPPING</h2>
        <CategoryProductGrid categoryId="domestic" />
      </div>

      {/* Feature Section */}
      <section className="bg-white py-16 md:py-24 border-y border-border/50">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-foreground mb-4">Why Choose KH Foods?</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">We take pride in delivering the finest peanuts across the country with uncompromising quality and service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Truck className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Fast Shipping</h3>
              <p className="text-muted">Reliable and swift delivery across all domestic locations.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Premium Quality</h3>
              <p className="text-muted">Every batch is rigorously tested for taste and crunchiness.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Leaf className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">100% Natural</h3>
              <p className="text-muted">Processed naturally without harmful chemicals or additives.</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#ecb984]/20 flex items-center justify-center mb-6 group-hover:bg-[#ecb984] group-hover:text-white transition-colors duration-300">
                <Users className="w-8 h-8 text-[#c89255] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Family Owned</h3>
              <p className="text-muted">A tradition of excellence passed down through generations since 1991.</p>
            </div>
          </div>
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
              <div className="inline-block px-4 py-1.5 bg-[#ecb984]/20 text-[#c89255] font-bold text-sm tracking-widest uppercase rounded-full">Our Guarantee</div>
              <h2 className="text-4xl font-extrabold text-foreground uppercase tracking-tight leading-tight">Committed to <span className="text-[#ecb984]">Excellence</span></h2>
              <p className="text-lg text-muted leading-relaxed">
                From our California farms directly to your table, we oversee every step of the process. Our domestic shipping ensures that our peanuts retain their perfect roast, crunch, and flavor by the time they reach your doorstep. We pack our products in specially designed, air-tight packaging to lock in freshness.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Air-tight freshness seal</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Strict quality control checks</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <span className="font-semibold text-foreground">Sustainable packaging materials</span>
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight pb-4">Need Bulk Quantities?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">We offer specialized pricing and logistics solutions for domestic distributors, retailers, and restaurants. Partner with KhFoods for reliable supply.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#ecb984] hover:bg-[#c89255] text-white font-bold tracking-widest uppercase transition-colors duration-300 rounded-sm">
            Contact Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
}
