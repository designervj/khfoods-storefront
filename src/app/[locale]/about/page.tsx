'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import PageHeroSection from '@/components/sections/PageHeroSection';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'about') dispatch(setCurrentPageBySlug('about'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">Loading...</div></div>;
  }

  const story = currentPages.sections.find(s => s.adminTitle === 'Story');
  const values = currentPages.sections.find(s => s.adminTitle === 'What We Value');
  const mission = currentPages.sections.find(s => s.adminTitle === 'Mission');

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <main>
      <PageHeroSection
        sections={currentPages.sections}
        locale={locale}
        isEditable={isEditable}
        createSaveHandler={createSaveHandler}
        heroTitle="Page Hero"
      />

      {story && (
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
                <motion.div variants={itemVariants} className="bg-[#F5F5F7] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center h-full min-h-[300px]">
                  <EditableText value={getLocalizedString(story.props?.since, locale)} onSave={createSaveHandler(story.id, 'props.since')} isEditable={isEditable} tag="span" className="uppercase tracking-widest text-xs font-bold text-[#ecb984] mb-3" placeholder="SINCE 1990" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                    <EditableText value={getLocalizedString(story.props?.title, locale)} onSave={createSaveHandler(story.id, 'props.title')} isEditable={isEditable} tag="span" placeholder="Enter title..." />
                    <span className="text-[#ecb984]"> <EditableText value={getLocalizedString(story.props?.titleHighlight, locale)} onSave={createSaveHandler(story.id, 'props.titleHighlight')} isEditable={isEditable} tag="span" placeholder="highlight" /></span>
                  </h2>
                  <div className="space-y-4 text-gray-700 text-base sm:text-lg mb-6 max-w-md">
                    <EditableText value={getLocalizedString(story.props?.para1, locale)} onSave={createSaveHandler(story.id, 'props.para1')} isEditable={isEditable} tag="p" placeholder="Enter paragraph 1..." multiline rows={3} />
                    <EditableText value={getLocalizedString(story.props?.para2, locale)} onSave={createSaveHandler(story.id, 'props.para2')} isEditable={isEditable} tag="p" placeholder="Enter paragraph 2..." multiline rows={3} />
                  </div>
                </motion.div>
              </div>
              <motion.div variants={itemVariants} className="h-[500px] lg:h-auto w-full relative overflow-hidden rounded-[2rem]">
                <img src={getLocalizedString(story.props?.image, locale)} alt="About KH Food" className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm py-3 px-6 rounded-xl shadow-sm">
                  <EditableText value={getLocalizedString(story.props?.badge, locale)} onSave={createSaveHandler(story.id, 'props.badge')} isEditable={isEditable} tag="p" className="font-bold text-lg" placeholder="Badge text" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {values && values.content && (
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <EditableText value={getLocalizedString(values.props?.title, locale)} onSave={createSaveHandler(values.id, 'props.title')} isEditable={isEditable} tag="h2" className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black" placeholder="Section title..." />
              {values.props?.subtitle && (
                <div className="mt-4">
                  <EditableText value={getLocalizedString(values.props?.subtitle, locale)} onSave={createSaveHandler(values.id, 'props.subtitle')} isEditable={isEditable} tag="p" className="text-gray-500 text-lg" placeholder="Subtitle..." />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.content.map((item, idx) => {
                const title = getLocalizedString(item.props?.title, locale);
                
                // Select icon based on title or index
                let Icon = null;
                if (idx === 0) { // Health
                  Icon = (
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8">
                      <path d="M6 3v7a2 2 0 0 1-2 2H3V3h1zm0 0v18" /> {/* Fork */}
                      <path d="M19 3v10a2 2 0 0 1-2 2h-1V3h3zm-1 12v6" /> {/* Knife */}
                      <circle cx="12" cy="11" r="5" /> {/* Plate */}
                      <path d="M12 11c.4-.4 1.2-.8 1.8-.8.8 0 1.2.4 1.2 1.2 0 1.2-2 2.5-3 2.5s-3-1.3-3-2.5c0-.8.4-1.2 1.2-1.2.6 0 1.4.4 1.8.8z" fill="#5C3A21" /> {/* Heart */}
                    </svg>
                  );
                } else if (idx === 1) { // Quality
                  Icon = (
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      <circle cx="5.5" cy="18.5" r="0.5" fill="#5C3A21" />
                    </svg>
                  );
                } else { // Taste
                  Icon = (
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#5C3A21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-8">
                      <path d="M7 11c1.5 3 4 4.5 5 4.5s3.5-1.5 5-4.5" />
                      <path d="M12 15.5v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1" />
                      <path d="M5 9l2 2 M19 9l-2 2" />
                    </svg>
                  );
                }

                return (
                  <div key={item.id} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                      {Icon}
                      <EditableText value={title} onSave={createSaveHandler(values.id, `content.${idx}.props.title`)} isEditable={isEditable} tag="h3" className="text-2xl font-bold text-black mb-3" placeholder="Value title..." />
                      <EditableText value={getLocalizedString(item.props?.description, locale)} onSave={createSaveHandler(values.id, `content.${idx}.props.description`)} isEditable={isEditable} tag="p" className="text-gray-500 text-sm leading-relaxed" placeholder="Value description..." multiline rows={3} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {mission && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <EditableText value={getLocalizedString(mission.props?.heading, locale)} onSave={createSaveHandler(mission.id, 'props.heading')} isEditable={isEditable} tag="h2" className="text-3xl md:text-4xl font-bold mb-6 uppercase" placeholder="Mission heading..." />
            <EditableText value={getLocalizedString(mission.props?.content, locale)} onSave={createSaveHandler(mission.id, 'props.content')} isEditable={isEditable} tag="p" className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto" placeholder="Mission content..." multiline rows={6} />
          </div>
        </section>
      )}
    </main>
  );
}
