'use client';

import React from 'react';
import Link from 'next/link';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface BreadcrumbItem {
  label: { en: string; [locale: string]: string };
  href: string | null;
}

interface PageHeroSectionProps {
  sections: { id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: any[] }[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
  heroTitle?: string;
}

export default function PageHeroSection({ sections, locale, isEditable, createSaveHandler, heroTitle }: PageHeroSectionProps) {
  const section = sections.find(s => s.adminTitle === (heroTitle || 'Page Hero'));
  if (!section) return null;

  const backgroundImage = section.props?.backgroundImage;
  const breadcrumbs: BreadcrumbItem[] = section.props?.breadcrumb || [];

  return (
    <section
      className="relative overflow-hidden pt-[120px]"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto max-w-7xl min-h-[260px] md:min-h-[320px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <EditableText
            value={getLocalizedString(section.props?.title, locale)}
            onSave={createSaveHandler(section.id, 'props.title')}
            isEditable={isEditable}
            tag="h1"
            className="text-3xl md:text-5xl font-bold text-black uppercase"
            placeholder="Page title..."
          />
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-sm mt-4">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                const label = getLocalizedString(item.label, locale);
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-gray-400">&rsaquo;</span>}
                    {item.href && !isLast ? (
                      <Link href={item.href} className="text-gray-500 hover:text-black transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <span className="text-black font-medium">{label}</span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
