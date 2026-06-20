'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
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

  const hero = currentPages.sections.find(s => s.adminTitle === 'About Hero');
  const story = currentPages.sections.find(s => s.adminTitle === 'Story');
  const values = currentPages.sections.find(s => s.adminTitle === 'What We Value');
  const mission = currentPages.sections.find(s => s.adminTitle === 'Mission');

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <main>
      {hero && (
        <section className="relative overflow-hidden pt-[120px] bg-[#f5f5f7]">
          <div className="mx-auto max-w-7xl min-h-[260px] md:min-h-[320px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <EditableText value={getLocalizedString(hero.props?.heading, locale)} onSave={createSaveHandler(hero.id, 'props.heading')} isEditable={isEditable} tag="h1" className="text-3xl md:text-5xl font-bold text-black uppercase" placeholder="Page title..." />
              <EditableText value={getLocalizedString(hero.props?.subheading, locale)} onSave={createSaveHandler(hero.id, 'props.subheading')} isEditable={isEditable} tag="p" className="text-gray-500 mt-3 max-w-xl mx-auto" placeholder="Subheading..." multiline rows={2} />
            </div>
          </div>
        </section>
      )}

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
        <section className="py-16 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <EditableText value={getLocalizedString(values.props?.title, locale)} onSave={createSaveHandler(values.id, 'props.title')} isEditable={isEditable} tag="h2" className="text-3xl md:text-4xl font-bold uppercase" placeholder="Section title..." />
              {values.props?.subtitle && (
                <EditableText value={getLocalizedString(values.props?.subtitle, locale)} onSave={createSaveHandler(values.id, 'props.subtitle')} isEditable={isEditable} tag="p" className="text-gray-500 mt-2" placeholder="Subtitle..." />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.content.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                  <div className="h-48 overflow-hidden">
                    <img src={getLocalizedString(item.props?.image, locale)} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <EditableText value={getLocalizedString(item.props?.title, locale)} onSave={createSaveHandler(values.id, `content.${idx}.props.title`)} isEditable={isEditable} tag="h3" className="text-xl font-bold mb-2" placeholder="Value title..." />
                    <EditableText value={getLocalizedString(item.props?.description, locale)} onSave={createSaveHandler(values.id, `content.${idx}.props.description`)} isEditable={isEditable} tag="p" className="text-gray-600 text-sm" placeholder="Value description..." multiline rows={3} />
                  </div>
                </div>
              ))}
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
