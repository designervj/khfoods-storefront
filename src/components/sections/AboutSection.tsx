'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import EditableText from "@/components/shared/EditableText";
import { getLocalizedString } from "@/lib/i18n/locale";

interface SectionBlock {
  id: string;
  type: string;
  adminTitle: string;
  props?: Record<string, any>;
  content?: { id: string; type: string; props: Record<string, any> }[];
}

interface AboutSectionProps {
  sections: SectionBlock[];
  locale: string;
  isEditable: boolean;
  createSaveHandler: (sectionId: string, fieldPath: string) => (value: string) => Promise<void>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection({ sections, locale, isEditable, createSaveHandler }: AboutSectionProps) {
  const section = sections.find(s => s.adminTitle === 'About Us');
  if (!section) return null;

  const since = section.props?.since;
  const title = section.props?.title;
  const titleHighlight = section.props?.titleHighlight;
  const para1 = section.props?.para1;
  const para2 = section.props?.para2;
  const ctaButton = section.props?.ctaButton;
  const ctaLink = section.props?.ctaLink;
  const image = section.props?.image;
  const badge = section.props?.badge;

  return (
    <motion.section
      className="w-full bg-white text-black py-10 md:py-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.div
              variants={itemVariants}
              className="bg-[#F9F9F9] rounded-[2rem] p-8 md:p-12 lg:p-14 flex flex-col justify-center h-full min-h-[300px]"
            >
              <EditableText
                value={getLocalizedString(since, locale)}
                onSave={createSaveHandler(section.id, 'props.since')}
                isEditable={isEditable}
                tag="span"
                className="uppercase tracking-widest text-xs font-bold text-[#ecb984] mb-3"
                placeholder="SINCE 1990"
              />
              <h2 className="text-3xl sm:text-3xl md:text-3xl font-bold leading-tight mb-4">
                <EditableText
                  value={getLocalizedString(title, locale)}
                  onSave={createSaveHandler(section.id, 'props.title')}
                  isEditable={isEditable}
                  tag="span"
                  placeholder="Enter title..."
                />{' '}
                <span className="text-[#ecb984]">
                  <EditableText
                    value={getLocalizedString(titleHighlight, locale)}
                    onSave={createSaveHandler(section.id, 'props.titleHighlight')}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="highlight"
                  />
                </span>
              </h2>
              <div className="space-y-6 text-[#5A6475] text-[15px] leading-relaxed mb-8 max-w-md">
                <EditableText
                  value={getLocalizedString(para1, locale)}
                  onSave={createSaveHandler(section.id, 'props.para1')}
                  isEditable={isEditable}
                  tag="p"
                  placeholder="Enter paragraph 1..."
                  multiline
                  rows={3}
                />
                <EditableText
                  value={getLocalizedString(para2, locale)}
                  onSave={createSaveHandler(section.id, 'props.para2')}
                  isEditable={isEditable}
                  tag="p"
                  placeholder="Enter paragraph 2..."
                  multiline
                  rows={3}
                />
              </div>
              <div>
                <Link
                  href={getLocalizedString(ctaLink, locale) || '#'}
                  className="text-black text-[13px] uppercase tracking-widest font-medium hover:text-gray-500 transition-colors inline-block mt-2"
                >
                  <EditableText
                    value={getLocalizedString(ctaButton, locale)}
                    onSave={createSaveHandler(section.id, 'props.ctaButton')}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="Learn More"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="h-[500px] lg:h-auto w-full relative overflow-hidden rounded-[2rem]"
          >
            <img
              src={getLocalizedString(image, locale)}
              alt="About KH Food"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white py-3 px-6 rounded-xl">
              <EditableText
                value={getLocalizedString(badge, locale)}
                onSave={createSaveHandler(section.id, 'props.badge')}
                isEditable={isEditable}
                tag="p"
                className="font-bold text-[15px] tracking-wide text-black"
                placeholder="Badge text"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
