'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EditableText from "@/components/shared/EditableText";
import { getLocalizedString } from "@/lib/i18n/locale";

interface SectionBlock {
  id: string;
  type: string;
  adminTitle: string;
  props?: Record<string, any>;
  content?: { id: string; type: string; props: Record<string, any> }[];
}

interface HeroSectionProps {
  sections: SectionBlock[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

export default function HeroSection({ sections, locale, isEditable, createSaveHandler }: HeroSectionProps) {
  const section = sections.find(s => s.adminTitle === 'Hero');
  if (!section) return null;

  const subtitle = section.props?.subtitle;
  const title = section.props?.title;
  const videoSrc = section.props?.videoSrc;
  const ctaButton = section.props?.ctaButton;
  const ctaLink = section.props?.ctaLink;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={getLocalizedString(videoSrc, locale)}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-4 opacity-90"
          >
            <div className="h-px w-10 sm:w-24 bg-white" />
            <EditableText
              value={getLocalizedString(subtitle, locale)}
              onSave={createSaveHandler(section.id, 'props.subtitle')}
              isEditable={isEditable}
              tag="p"
              className="text-[var(--primary)] uppercase tracking-[0.2em] text-[10px] sm:text-sm md:text-base font-semibold text-center whitespace-nowrap"
              placeholder="Enter subtitle..."
            />
            <div className="h-px w-10 sm:w-24 bg-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[34px] sm:text-[56px] md:text-[80px] lg:text-[100px] font-extrabold uppercase text-white leading-none text-center break-words max-w-[92vw] md:whitespace-nowrap md:max-w-none"
          >
            <EditableText
              value={getLocalizedString(title, locale)}
              onSave={createSaveHandler(section.id, 'props.title')}
              isEditable={isEditable}
              tag="span"
              placeholder="Enter title..."
            />
          </motion.h1>
        </div>
      </div>
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 w-full px-5 sm:px-10 flex justify-end z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link
            href={getLocalizedString(ctaLink, locale) || '#shop'}
            className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-md shadow font-semibold flex items-center gap-2 hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <EditableText
              value={getLocalizedString(ctaButton, locale)}
              onSave={createSaveHandler(section.id, 'props.ctaButton')}
              isEditable={isEditable}
              tag="span"
              placeholder="SHOP NOW"
            />
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
