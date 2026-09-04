'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString, translateStatic } from '@/lib/i18n/locale';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
  const dispatch = useAppDispatch();
  const [openId, setOpenId] = useState<string | null>(null);

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'faq') dispatch(setCurrentPageBySlug('faq'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">{t('Loading...')}</div></div>;
  }

  const header = currentPages.sections.find(s => s.adminTitle === 'FAQ Header');
  const accordion = currentPages.sections.find(s => s.adminTitle === 'FAQ Accordion');

  return (
    <main className="section-padding">
      <div className="container-custom">
        {header && (
          <div className="text-center mb-12">
            <EditableText value={getLocalizedString(header.props?.heading, locale)} onSave={createSaveHandler(header.id, 'props.heading')} isEditable={isEditable} tag="h1" className="text-3xl md:text-4xl font-bold mb-4" placeholder="FAQ heading..." />
            <EditableText value={getLocalizedString(header.props?.subheading, locale)} onSave={createSaveHandler(header.id, 'props.subheading')} isEditable={isEditable} tag="p" className="text-[15px] md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto" placeholder="FAQ subheading..." multiline rows={2} />
          </div>
        )}
        {accordion && accordion.content && (
          <div className="max-w-3xl mx-auto space-y-4">
            {accordion.content.map((item, idx) => (
              <div key={item.id} className="card-theme overflow-hidden">
                <button onClick={() => setOpenId(openId === item.id ? null : item.id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--surface)] transition-colors">
                  <EditableText value={getLocalizedString(item.props?.question, locale)} onSave={createSaveHandler(accordion.id, `content.${idx}.props.question`)} isEditable={isEditable} tag="span" className="font-semibold text-base md:text-lg" placeholder="Question..." />
                  <ChevronDown size={20} className={`transition-transform ${openId === item.id ? 'rotate-180' : ''}`} />
                </button>
                {openId === item.id && (
                  <div className="px-6 pb-6">
                    <EditableText value={getLocalizedString(item.props?.answer, locale)} onSave={createSaveHandler(accordion.id, `content.${idx}.props.answer`)} isEditable={isEditable} tag="p" className="text-[var(--text-secondary)] leading-relaxed" placeholder="Answer..." multiline rows={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
