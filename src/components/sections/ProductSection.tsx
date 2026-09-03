'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface ProductSectionProps {
  sections: Array<{ id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: Array<{ id: string; type: string; props: Record<string, any> }> }>;
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function ProductSection({ sections, locale, isEditable, createSaveHandler }: ProductSectionProps) {
  const section = sections.find(s => s.adminTitle === 'Products');
  if (!section) return null;

  const promoCard = section.props?.promoCard || {};
  const products = section.content || [];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-custom flex flex-col lg:flex-row gap-6 lg:gap-8">
        <motion.div
          className="w-full lg:w-[42%] relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] lg:min-h-[350px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          {promoCard.image && (
            <img src={getLocalizedString(promoCard.image, locale)} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-10">
            <EditableText
              value={getLocalizedString(promoCard.title, locale)}
              onSave={createSaveHandler(section.id, 'props.promoCard.title')}
              isEditable={isEditable}
              tag="h3"
              className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 leading-tight whitespace-pre-line"
              placeholder="Promo title..."
            />
            <EditableText
              value={getLocalizedString(promoCard.description, locale)}
              onSave={createSaveHandler(section.id, 'props.promoCard.description')}
              isEditable={isEditable}
              tag="p"
              className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed"
              placeholder="Promo description..."
              multiline
              rows={2}
            />
            <Link
              href={promoCard.ctaLink || '/'}
              className="inline-flex items-center justify-center bg-white text-black rounded-full px-6 py-3 text-[13px] md:text-sm font-bold uppercase tracking-widest w-fit hover:bg-gray-100 transition-colors mt-auto"
            >
              <EditableText
                value={getLocalizedString(promoCard.ctaButton, locale)}
                onSave={createSaveHandler(section.id, 'props.promoCard.ctaButton')}
                isEditable={isEditable}
                tag="span"
                placeholder="CTA text..."
              />
              <span className="ml-2 font-bold text-lg leading-none transform -translate-y-px">↗</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {products.map((product, idx) => {
            const name = getLocalizedString(product.props?.name, locale);
            const rawSlug = getLocalizedString(product.props?.slug, locale);
            const slug = rawSlug.startsWith('/') ? rawSlug.substring(1) : rawSlug;
            const href = locale === 'en' ? `/${slug}` : `/${locale}/${slug}`;

            return (
              <Link key={product.id} href={href} className="group block">
                <article className="relative h-[280px] sm:h-[320px] lg:h-[350px] rounded-2xl bg-[#f7f7f7] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    {product.props?.image && (
                      <img
                        src={getLocalizedString(product.props.image, locale)}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {product.props?.qty && (
                    <span className="absolute top-4 left-4 bg-[#FFD100] text-black text-xs font-bold px-3 py-1 rounded-full">
                      {getLocalizedString(product.props.qty, locale)}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <EditableText
                      value={name}
                      onSave={createSaveHandler(section.id, `content.${idx}.props.name`)}
                      isEditable={isEditable}
                      tag="h4"
                      className="font-bold text-[22px] leading-tight mb-1"
                      placeholder="Product name..."
                    />
                    {product.props?.price && (
                      <span className="text-sm font-medium text-white/90">{getLocalizedString(product.props.price, locale)}</span>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
