'use client';

import { Building2, LayoutGrid, Home } from "lucide-react";
import EditableText from "@/components/shared/EditableText";
import { getLocalizedString } from "@/lib/i18n/locale";

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

export default function OurWorkSection({ sections, locale, isEditable, createSaveHandler }: OurWorkSectionProps) {
  const section = sections.find(s => s.adminTitle === 'What We Offer');
  if (!section) return null;

  const title = section.props?.title;
  const items = section.content || [];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 md:px-0 px-4">
          {items.map((item, idx) => (
            <div key={item.id} className="flex flex-col items-start text-left">
              <div className="mb-6 w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                {iconMap[item.props?.icon] || <Building2 className="w-6 h-6 text-black" />}
              </div>
              <h3 className="text-lg font-bold text-black uppercase tracking-tight mb-3">
                <EditableText
                  value={getLocalizedString(item.props?.title, locale)}
                  onSave={createSaveHandler(section.id, `content.${idx}.props.title`)}
                  isEditable={isEditable}
                  tag="span"
                  placeholder="Service title..."
                />
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
