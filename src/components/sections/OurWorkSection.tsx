'use client';

import { ArrowRight, Building2, LayoutGrid, Home } from "lucide-react";
import EditableText from "@/components/shared/EditableText";
import { getLocalizedString, translateStatic } from "@/lib/i18n/locale";
import Link from "next/link";

interface SectionBlock {
  id: string;
  type: string;
  adminTitle: string;
  props?: Record<string, any>;
  content?: { id: string; type: string; props: Record<string, any> }[];
}

interface OurWorkSectionProps {
  sections: SectionBlock[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 className="w-6 h-6 text-black" />,
  grid: <LayoutGrid className="w-6 h-6 text-black" />,
  home: <Home className="w-6 h-6 text-black" />,
};

const getOfferCta = (title: string, locale: string) => {
  const normalizedTitle = title.toLowerCase();
  const localizedHref = (path: string) => locale === 'en' ? path : `/${locale}${path}`;

  if (normalizedTitle.includes('wholesale') || normalizedTitle.includes('थोक') || normalizedTitle.includes('批發')) {
    return { label: translateStatic('SIGN UP', locale), href: localizedHref('/contact') };
  }

  if (normalizedTitle.includes('international') || normalizedTitle.includes('अंतरराष्ट्रीय') || normalizedTitle.includes('國際')) {
    return { label: translateStatic('SHOP NOW', locale), href: localizedHref('/product/international') };
  }

  return { label: translateStatic('SHOP NOW', locale), href: localizedHref('/product/all-product') };
};

export default function OurWorkSection({ sections, locale, isEditable, createSaveHandler }: OurWorkSectionProps) {
  const section = sections.find(s => s.adminTitle === 'What We Offer');
  if (!section) return null;

  const title = section.props?.title;
  const items = section.content || [];

  return (
    <section className="py-14 md:py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-black uppercase tracking-wide">
            <EditableText
              value={getLocalizedString(title, locale)}
              onSave={createSaveHandler(section.id, 'props.title')}
              isEditable={isEditable}
              tag="span"
              placeholder="What We Offer"
            />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 md:px-0 px-4">
          {items.map((item, idx) => {
            const itemTitle = getLocalizedString(item.props?.title, locale);
            const cta = getOfferCta(itemTitle, locale);

            return (
              <div key={item.id} className="group flex h-full flex-col items-start text-left rounded-3xl border border-[#ead8c4] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-[#f3d5b0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {iconMap[getLocalizedString(item.props?.icon, locale)] || <Building2 className="w-6 h-6 text-black" />}
                </div>
                <h3 className="text-lg font-bold text-black uppercase tracking-tight mb-3">
                  <EditableText
                    value={itemTitle}
                    onSave={createSaveHandler(section.id, `content.${idx}.props.title`)}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="Service title..."
                  />
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px] max-w-sm">
                  <EditableText
                    value={getLocalizedString(item.props?.description, locale)}
                    onSave={createSaveHandler(section.id, `content.${idx}.props.description`)}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="Service description..."
                    multiline
                    rows={3}
                  />
                </p>
                <Link
                  href={cta.href}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#e8c99f] bg-[#fff7ee] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#7a4b1f] transition-colors hover:border-[#d9a866] hover:bg-[#f3d5b0] hover:text-black"
                >
                  {cta.label}
                  <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
