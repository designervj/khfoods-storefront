'use client';

import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';

interface BlogSectionProps {
  sections: { id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: { id: string; type: string; props: Record<string, any> }[] }[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function BlogSection({ sections, locale, isEditable, createSaveHandler }: BlogSectionProps) {
  const section = sections.find(s => s.adminTitle === 'Blog / News');
  if (!section) return null;

  const featured = section.props?.featured;
  const articles = section.content || [];

  return (
    <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
        <div>
          <EditableText
            value={getLocalizedString(section.props?.subtitle, locale)}
            onSave={createSaveHandler(section.id, 'props.subtitle')}
            isEditable={isEditable}
            tag="p"
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2"
            placeholder="Subtitle..."
          />
          <EditableText
            value={getLocalizedString(section.props?.title, locale)}
            onSave={createSaveHandler(section.id, 'props.title')}
            isEditable={isEditable}
            tag="h2"
            className="text-3xl sm:text-3xl lg:text-3xl font-bold uppercase tracking-tight text-black"
            placeholder="Title..."
            multiline
            rows={2}
          />
        </div>
        {section.props?.ctaButton && (
          <Link
            href={locale === 'en' ? section.props?.ctaLink || '#' : `/${locale}${section.props?.ctaLink || ''}`}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
          >
            {getLocalizedString(section.props?.ctaButton, locale)}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {featured && (
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            <img
              src={getLocalizedString(featured.image, locale)}
              alt={getLocalizedString(featured.title, locale)}
              className="h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
              <div className="mb-4">
                <EditableText
                  value={getLocalizedString(featured.category, locale)}
                  onSave={createSaveHandler(section.id, 'props.featured.category')}
                  isEditable={isEditable}
                  tag="span"
                  className="bg-white text-gray-800 text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full"
                  placeholder="Category..."
                />
              </div>
              <EditableText
                value={getLocalizedString(featured.title, locale)}
                onSave={createSaveHandler(section.id, 'props.featured.title')}
                isEditable={isEditable}
                tag="h3"
                className="text-2xl sm:text-[28px] font-bold text-white mb-2 leading-tight"
                placeholder="Featured title..."
              />
              <EditableText
                value={getLocalizedString(featured.description, locale)}
                onSave={createSaveHandler(section.id, 'props.featured.description')}
                isEditable={isEditable}
                tag="p"
                className="text-sm text-white/80 line-clamp-2"
                placeholder="Featured description..."
                multiline
                rows={2}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {articles.map((article, idx) => (
            <article key={article.id} className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="relative w-full sm:w-[220px] shrink-0">
                <img
                  src={getLocalizedString(article.props.image, locale)}
                  alt={getLocalizedString(article.props.title, locale)}
                  className="w-full h-[180px] sm:h-[150px] object-cover rounded-xl"
                />
              </div>
              <div className="flex-1 min-w-0">
                <EditableText
                  value={getLocalizedString(article.props.date, locale)}
                  onSave={createSaveHandler(section.id, `content.${idx}.props.date`)}
                  isEditable={isEditable}
                  tag="p"
                  className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1.5"
                  placeholder="Date..."
                />
                <EditableText
                  value={getLocalizedString(article.props.title, locale)}
                  onSave={createSaveHandler(section.id, `content.${idx}.props.title`)}
                  isEditable={isEditable}
                  tag="h4"
                  className="font-bold text-lg md:text-xl leading-tight mb-2 text-black"
                  placeholder="Article title..."
                />
                <EditableText
                  value={getLocalizedString(article.props.description, locale)}
                  onSave={createSaveHandler(section.id, `content.${idx}.props.description`)}
                  isEditable={isEditable}
                  tag="p"
                  className="text-sm text-gray-500 line-clamp-2"
                  placeholder="Article description..."
                  multiline
                  rows={2}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
