'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import PageHeroSection from '@/components/sections/PageHeroSection';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

export default function NutritionPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'nutrition') dispatch(setCurrentPageBySlug('nutrition'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">Loading...</div></div>;
  }

  const benefitsSection = currentPages.sections.find(s => s.adminTitle === 'Health Benefits');
  const factsSection = currentPages.sections.find(s => s.adminTitle === 'Nutrition Facts');

  return (
    <main>
      <PageHeroSection
        sections={currentPages.sections}
        locale={locale}
        isEditable={isEditable}
        createSaveHandler={createSaveHandler}
        heroTitle="Page Hero"
      />
      
      {benefitsSection && benefitsSection.content && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <EditableText value={getLocalizedString(benefitsSection.props?.title, locale)} onSave={createSaveHandler(benefitsSection.id, 'props.title')} isEditable={isEditable} tag="h2" className="text-4xl font-bold uppercase tracking-tight text-black" placeholder="Section title..." />
              {benefitsSection.props?.subtitle && (
                <div className="mt-4">
                  <EditableText value={getLocalizedString(benefitsSection.props?.subtitle, locale)} onSave={createSaveHandler(benefitsSection.id, 'props.subtitle')} isEditable={isEditable} tag="p" className="text-gray-500 text-lg" placeholder="Subtitle..." />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefitsSection.content.map((item, idx) => {
                const title = getLocalizedString(item.props?.title, locale);
                
                let Icon = null;
                if (idx === 0) { // High Protein
                  Icon = <svg className="w-12 h-12 text-[#FFD100] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
                } else if (idx === 1) { // Heart Healthy
                  Icon = <svg className="w-12 h-12 text-[#FFD100] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>;
                } else { // All Natural
                  Icon = <svg className="w-12 h-12 text-[#FFD100] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
                }

                return (
                  <div key={item.id} className="bg-[#f5f5f7] rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
                    {Icon}
                    <EditableText value={title} onSave={createSaveHandler(benefitsSection.id, `content.${idx}.props.title`)} isEditable={isEditable} tag="h3" className="text-xl font-bold text-black mb-3" placeholder="Benefit title..." />
                    <EditableText value={getLocalizedString(item.props?.description, locale)} onSave={createSaveHandler(benefitsSection.id, `content.${idx}.props.description`)} isEditable={isEditable} tag="p" className="text-gray-600 text-sm leading-relaxed" placeholder="Benefit description..." multiline rows={3} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {factsSection && (
        <section className="py-20 bg-black text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[600px]">
                <img src={getLocalizedString(factsSection.props?.image, locale) || '/Image/Peanut.jpg'} alt="Peanuts" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <div>
                <EditableText value={getLocalizedString(factsSection.props?.title, locale)} onSave={createSaveHandler(factsSection.id, 'props.title')} isEditable={isEditable} tag="h2" className="text-3xl md:text-5xl font-bold uppercase mb-6" placeholder="Facts title..." />
                <EditableText value={getLocalizedString(factsSection.props?.description, locale)} onSave={createSaveHandler(factsSection.id, 'props.description')} isEditable={isEditable} tag="p" className="text-gray-400 text-lg mb-10" placeholder="Facts description..." />
                
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="border-l-2 border-[#FFD100] pl-4">
                      <EditableText value={getLocalizedString(factsSection.props?.[`fact${num}_label`], locale)} onSave={createSaveHandler(factsSection.id, `props.fact${num}_label`)} isEditable={isEditable} tag="p" className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-1" placeholder="Label..." />
                      <EditableText value={getLocalizedString(factsSection.props?.[`fact${num}_value`], locale)} onSave={createSaveHandler(factsSection.id, `props.fact${num}_value`)} isEditable={isEditable} tag="p" className="text-3xl font-bold text-white" placeholder="Value..." />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
