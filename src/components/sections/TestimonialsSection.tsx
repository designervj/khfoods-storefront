'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface TestimonialsSectionProps {
  sections: Array<{ id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: Array<{ id: string; type: string; props: Record<string, any> }> }>;
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function TestimonialsSection({ sections, locale, isEditable, createSaveHandler }: TestimonialsSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const section = sections.find(s => s.adminTitle === 'Testimonials');
  if (!section) return null;

  const testimonials = section.content || [];

  return (
    <section className="bg-[#f5f5f7] py-14 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <div>
            <EditableText
              value={getLocalizedString(section.props?.reviewCount, locale)}
              onSave={createSaveHandler(section.id, 'props.reviewCount')}
              isEditable={isEditable}
              tag="span"
              className="text-sm font-medium text-[#EAB159] uppercase tracking-[0.15em] mb-2 block"
              placeholder="Review count..."
            />
            <EditableText
              value={getLocalizedString(section.props?.heading, locale)}
              onSave={createSaveHandler(section.id, 'props.heading')}
              isEditable={isEditable}
              tag="h2"
              className="text-3xl md:text-3xl font-bold text-gray-900"
              placeholder="Heading..."
            />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          modules={[Autoplay]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.2 },
          }}
        >
          {testimonials.map((item) => {
            const rating = Number(item.props?.rating) || 0;

            return (
              <SwiperSlide key={item.id}>
                <motion.div
                  className="bg-white rounded-3xl shadow-sm px-6 py-8 sm:px-8 lg:px-10 lg:py-10 min-h-[320px] lg:h-[350px] flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <EditableText
                      value={getLocalizedString(item.props?.name, locale)}
                      onSave={createSaveHandler(section.id, `content.${testimonials.indexOf(item)}.props.name`)}
                      isEditable={isEditable}
                      tag="h4"
                      className="text-lg font-semibold text-gray-900"
                      placeholder="Name..."
                    />
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-200 flex-shrink-0" fill="currentColor">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.316C9.366 11.56 11 13.09 11 15.5c0 2.507-2.108 4.5-4.5 4.5-1.533 0-2.854-.618-3.833-1.679zM12.583 17.321C11.553 16.227 11 15 11 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.316C17.366 11.56 19 13.09 19 15.5c0 2.507-2.108 4.5-4.5 4.5-1.533 0-2.854-.618-3.833-1.679z" />
                    </svg>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mb-4" />

                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= rating ? 'fill-[#f6b500] text-[#f6b500]' : 'fill-gray-200 text-gray-200'}
                      />
                    ))}
                  </div>

                  <EditableText
                    value={getLocalizedString(item.props?.message, locale)}
                    onSave={createSaveHandler(section.id, `content.${testimonials.indexOf(item)}.props.message`)}
                    isEditable={isEditable}
                    tag="p"
                    className="text-gray-600 leading-relaxed line-clamp-4 flex-1"
                    placeholder="Testimonial message..."
                    multiline
                    rows={4}
                  />
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
