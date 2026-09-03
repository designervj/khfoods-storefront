'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import PageHeroSection from '@/components/sections/PageHeroSection';
import FeaturesBar from '@/components/sections/FeaturesBar';
import { getLocalizedString } from '@/lib/i18n/locale';
import { translateStatic } from '@/lib/i18n/locale';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck, Utensils } from 'lucide-react';

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
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
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">{t('Loading...')}</div></div>;
  }

  const story = currentPages.sections.find(s => s.adminTitle === 'Story');
  const values = currentPages.sections.find(s => s.adminTitle === 'What We Value');
  const mission = currentPages.sections.find(s => s.adminTitle === 'Mission');

  const fadeInUp: any = { 
    hidden: { opacity: 0, y: 40 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
  };
  
  const staggerContainer: any = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
  };

  const scaleIn: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="overflow-hidden bg-[#fafafa]">
      <PageHeroSection
        sections={currentPages.sections}
        locale={locale}
        isEditable={isEditable}
        createSaveHandler={createSaveHandler}
        heroTitle="Page Hero"
      />

      {story && (
        <section className="relative w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ecb984]/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex flex-col lg:flex-row items-center relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Text Card overlapping the image */}
              <div className="lg:w-[45%] lg:absolute lg:left-0 lg:z-10 order-2 lg:order-1 mt-[-60px] lg:mt-0 relative px-4 lg:px-0">
                <motion.div variants={fadeInUp} className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-gray-50">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-[#ecb984]"></div>
                    <EditableText 
                      value={getLocalizedString(story.props?.since, locale)} 
                      onSave={createSaveHandler(story.id, 'props.since')} 
                      isEditable={isEditable} 
                      tag="span" 
                      className="text-[#c89255] uppercase tracking-widest text-[10px] font-bold" 
                      placeholder="SINCE 1990" 
                    />
                  </div>

                  <h2 className="text-3xl font-bold tracking-wide text-[#1a202c] leading-tight mb-6">
                    <EditableText value={getLocalizedString(story.props?.title, locale)} onSave={createSaveHandler(story.id, 'props.title')} isEditable={isEditable} tag="span" placeholder="Enter title..." />
                    <br />
                    <span className="text-[#ecb984]">
                      <EditableText value={getLocalizedString(story.props?.titleHighlight, locale)} onSave={createSaveHandler(story.id, 'props.titleHighlight')} isEditable={isEditable} tag="span" placeholder="highlight" />
                    </span>
                  </h2>
                  
                  <div className="space-y-4 text-gray-500 text-sm leading-[1.8] pt-3">
                    <EditableText value={getLocalizedString(story.props?.para1, locale)} onSave={createSaveHandler(story.id, 'props.para1')} isEditable={isEditable} tag="p" placeholder="Enter paragraph 1..." multiline rows={3} />
                    <EditableText value={getLocalizedString(story.props?.para2, locale)} onSave={createSaveHandler(story.id, 'props.para2')} isEditable={isEditable} tag="p" placeholder="Enter paragraph 2..." multiline rows={3} />
                  </div>
                </motion.div>
              </div>

              {/* Image Section */}
              <motion.div variants={scaleIn} className="w-full lg:w-[65%] lg:ml-auto h-[450px] sm:h-[550px] relative order-1 lg:order-2 rounded-[2.5rem] overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={getLocalizedString(story.props?.image, locale)} 
                  alt="About KH Food" 
                  className="w-full h-full object-cover" 
                />

              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-[0_15px_30px_rgb(0,0,0,0.16)] lg:flex"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf5ed] text-sm font-bold text-[#ecb984]">
                  30+
                </div>
                <EditableText value={getLocalizedString(story.props?.badge, locale)} onSave={createSaveHandler(story.id, 'props.badge')} isEditable={isEditable} tag="p" className="text-xs font-bold uppercase leading-tight text-[#1a202c]" placeholder="Badge text" />
              </motion.div>

            </motion.div>
          </div>
        </section>
      )}

      {values && values.content && (
        <section className="relative py-24 lg:py-32 bg-[#fafafa] overflow-hidden">
          {/* Light section dynamic background */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#ecb984]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeInUp}>
                <EditableText 
                  value={getLocalizedString(values.props?.title, locale)} 
                  onSave={createSaveHandler(values.id, 'props.title')} 
                  isEditable={isEditable} 
                  tag="h2" 
                  className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a202c] mb-4" 
                  placeholder="Section title..." 
                />
              </motion.div>
              {values.props?.subtitle && (
                <motion.div variants={fadeInUp}>
                  <EditableText 
                    value={getLocalizedString(values.props?.subtitle, locale)} 
                    onSave={createSaveHandler(values.id, 'props.subtitle')} 
                    isEditable={isEditable} 
                    tag="p" 
                    className="text-gray-600 text-[15px] md:text-base max-w-2xl mx-auto" 
                    placeholder="Subtitle..." 
                  />
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {values.content.map((item, idx) => {
                const title = getLocalizedString(item.props?.title, locale);
                
                const icons = [HeartPulse, ShieldCheck, Utensils];
                const Icon = icons[idx] || ShieldCheck;

                return (
                  <motion.div 
                    key={item.id} 
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#fdf5ed] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ecb984]/20 transition-all duration-300">
                      <Icon className="h-7 w-7 text-[#c89255]" strokeWidth={1.8} />
                    </div>
                    <EditableText 
                      value={title} 
                      onSave={createSaveHandler(values.id, `content.${idx}.props.title`)} 
                      isEditable={isEditable} 
                      tag="h3" 
                      className="text-lg font-bold text-[#1a202c] mb-3" 
                      placeholder="Value title..." 
                    />
                    <EditableText 
                      value={getLocalizedString(item.props?.description, locale)} 
                      onSave={createSaveHandler(values.id, `content.${idx}.props.description`)} 
                      isEditable={isEditable} 
                      tag="p" 
                      className="text-gray-500 text-sm leading-[1.8]" 
                      placeholder="Value description..." 
                      multiline 
                      rows={4} 
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* New Impact/Stats Section */}
      <section className="relative py-20 bg-[#ecb984] text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "Years of Heritage", value: "30+" },
              { label: "Happy Customers", value: "10K+" },
              { label: "Natural Ingredients", value: "100%" },
              { label: "Premium Products", value: "50+" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
                <span className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-80">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {mission && (
        <section className="relative py-24 bg-white flex items-center justify-center">
          <motion.div 
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={scaleIn}>
              <EditableText 
                value={getLocalizedString(mission.props?.heading, locale)} 
                onSave={createSaveHandler(mission.id, 'props.heading')} 
                isEditable={isEditable} 
                tag="h2" 
                className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-[#c89255] pb-4" 
                placeholder="Mission heading..." 
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EditableText 
                value={getLocalizedString(mission.props?.content, locale)} 
                onSave={createSaveHandler(mission.id, 'props.content')} 
                isEditable={isEditable} 
                tag="p" 
                className="text-[15px] md:text-base text-[#0f172a] leading-relaxed font-semibold mx-auto tracking-tight" 
                placeholder="Mission content..." 
                multiline 
                rows={6} 
              />
            </motion.div>
          </motion.div>
        </section>
      )}

      <FeaturesBar />
    </main>
  );
}
