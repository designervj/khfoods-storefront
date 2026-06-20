'use client';

import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface BrandSliderSectionProps {
  sections: { id: string; type: string; adminTitle: string; props?: Record<string, any>; content?: { id: string; type: string; props: Record<string, any> }[] }[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function BrandSliderSection({ sections, locale, isEditable, createSaveHandler }: BrandSliderSectionProps) {
  const section = sections.find(s => s.adminTitle === 'Partner Brands');
  if (!section) return null;

  const brands = section.content || [];
  const autoplayDelay = section.props?.autoplayDelay || 3000;

  return (
    <section className="bg-white md:py-20 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={5}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="!py-4"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex items-center justify-center h-full px-2">
                <img
                  src={getLocalizedString(brand.props.image, locale)}
                  alt={getLocalizedString(brand.props.name, locale)}
                  className="h-24 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
