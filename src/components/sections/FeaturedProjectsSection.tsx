'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface FeaturedProjectsSectionProps {
  sections: Array<{ id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: Array<{ id: string; type: string; props: Record<string, any> }> }>;
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function FeaturedProjectsSection({ sections, locale, isEditable, createSaveHandler }: FeaturedProjectsSectionProps) {
  const section = sections.find(s => s.adminTitle === 'Discover Our World');
  if (!section) return null;

  const items = section.content || [];

  return (
    <section className="bg-black py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <EditableText
            value={getLocalizedString(section.props?.heading, locale)}
            onSave={createSaveHandler(section.id, 'props.heading')}
            isEditable={isEditable}
            tag="h2"
            className="text-white uppercase text-3xl md:text-[48px] font-bold tracking-wide"
            placeholder="Section heading..."
          />
        </motion.div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                  {item.props?.image && (
                    <img
                      src={getLocalizedString(item.props.image, locale)}
                      alt={getLocalizedString(item.props?.title, locale)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {item.props?.category && (
                    <span className="inline-block bg-[#EAB159] text-black text-[10px] uppercase font-bold tracking-wider px-4 py-1.5 rounded-full mb-3">
                      {getLocalizedString(item.props.category, locale)}
                    </span>
                  )}
                  <EditableText
                    value={getLocalizedString(item.props?.title, locale)}
                    onSave={createSaveHandler(section.id, `content.${items.indexOf(item)}.props.title`)}
                    isEditable={isEditable}
                    tag="h3"
                    className="text-white uppercase text-2xl font-bold"
                    placeholder="Item title..."
                  />
                  <div className="flex items-center gap-2 text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium uppercase tracking-wider">Explore</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
