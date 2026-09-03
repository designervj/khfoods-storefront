'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import PageHeroSection from '@/components/sections/PageHeroSection';
import FeaturesBar from '@/components/sections/FeaturesBar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EditableText from '@/components/shared/EditableText';
import { Ban, Crown, Hand } from 'lucide-react';
import { translateStatic } from '@/lib/i18n/locale';

export default function ProcessPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'process') {
      dispatch(setCurrentPageBySlug('process'));
    }
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { 
      await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); 
    };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="animate-pulse text-[#c89255] font-semibold text-lg tracking-widest uppercase">
          Loading Process...
        </div>
      </div>
    );
  }

  const sectionsObj: any = currentPages.sections;

  // Animation Variants
  const fadeInUp: any = { 
    hidden: { opacity: 0, y: 40 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
  };
  
  const staggerContainer: any = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
  };

  const timelineSteps = [
    {
      title: "Harvesting & Sourcing",
      desc: "Our journey begins at premium farms where we select only the finest, naturally grown peanuts. We ensure optimal harvesting conditions for maximum freshness.",
      image: "/Image/Peanut.jpg"
    },
    {
      title: "Stringent Sorting",
      desc: "Every batch undergoes rigorous quality control. We meticulously remove any imperfect peanuts to ensure you only get the highest grade products.",
      image: "/Image/Peanut.jpg"
    },
    {
      title: "The Roasting Process",
      desc: "We use an oil-free, all-natural roasting technique. This specialized process enhances the natural flavor profile without adding extra fat or unhealthy oils.",
      image: "/Image/Peanut.jpg"
    },
    {
      title: "Sealed for Freshness",
      desc: "Finally, the peanuts are immediately packaged in specialized containers to lock in the flavor, crunch, and nutritional benefits until they reach you.",
      image: "/Image/Peanut.jpg"
    }
  ];

  return (
    <main className="overflow-hidden bg-[#fafafa]">
      {/* Dynamic Page Hero (From CMS) */}
      <PageHeroSection
        sections={currentPages.sections}
        locale={locale}
        isEditable={isEditable}
        createSaveHandler={createSaveHandler}
        heroTitle="Page Hero"
      />

      {/* 2. Step-by-Step Interactive Timeline */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#ecb984]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeInUp} className="text-[#c89255] uppercase tracking-widest text-sm font-bold block mb-4">
              <EditableText
                value={sectionsObj?.process_hero?.subtitle || t("How It's Made")}
                onSave={createSaveHandler('process_hero', 'subtitle')}
                isEditable={isEditable}
              />
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#1a202c] tracking-wide">
              <EditableText
                value={sectionsObj?.process_hero?.title || t("Our Journey to Perfection")}
                onSave={createSaveHandler('process_hero', 'title')}
                isEditable={isEditable}
              />
            </motion.h2>
          </motion.div>

          <div className="space-y-24 md:space-y-32 mt-16">
            {timelineSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-full lg:w-1/2 relative group">
                  {/* Decorative background behind image */}
                  <div className={`absolute inset-0 bg-[#e3b584] rounded-[3rem] transform scale-105 opacity-20 transition-transform duration-700 ${idx % 2 === 0 ? 'rotate-3 group-hover:rotate-6' : '-rotate-3 group-hover:-rotate-6'}`}></div>
                  <img src={step.image} alt={step.title} className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl transition-transform duration-700" />
                  
                  {/* Floating Step Number Overlay */}
                  <div className={`absolute -top-6 md:-top-8 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center z-20 border-4 border-[#fafafa] ${idx % 2 === 0 ? 'left-2 md:-left-8' : 'right-2 md:-right-8'}`}>
                    <span className="text-2xl md:text-3xl font-bold text-[#e3b584]">0{idx + 1}</span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6 md:px-8">
                  <div className="inline-flex items-center gap-4">
                    <div className="w-12 h-[3px] bg-[#e3b584] rounded-full"></div>
                    <span className="text-[#c89255] uppercase tracking-widest text-sm font-bold">{t('Phase')} 0{idx + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1a202c] leading-tight">
                    <EditableText
                      value={sectionsObj?.timeline?.[idx]?.title || t(step.title)}
                      onSave={createSaveHandler(`timeline.${idx}`, 'title')}
                      isEditable={isEditable}
                    />
                  </h3>
                  <p className="text-gray-500 text-[15px] md:text-base leading-relaxed">
                    <EditableText
                      value={sectionsObj?.timeline?.[idx]?.desc || t(step.desc)}
                      onSave={createSaveHandler(`timeline.${idx}`, 'desc')}
                      isEditable={isEditable}
                      multiline={true}
                    />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The KH Food Difference */}
      <section className="py-14 md:py-20 bg-[#faf7f2] text-[#1a202c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-[#ecb984]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
              <EditableText
                value={sectionsObj?.difference?.title || t("The KH Food Difference")}
                onSave={createSaveHandler('difference', 'title')}
                isEditable={isEditable}
              />
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 text-[15px] md:text-base max-w-2xl mx-auto leading-relaxed">
              <EditableText
                value={sectionsObj?.difference?.desc || t("We do things the hard way because it's the right way. No shortcuts, just pure dedication to quality.")}
                onSave={createSaveHandler('difference', 'desc')}
                isEditable={isEditable}
                multiline={true}
              />
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: "No Preservatives", desc: "We rely on natural processes and packaging to keep our products fresh, never on artificial chemicals.", icon: Ban },
              { title: "Hand-Crafted Quality", desc: "Every batch is monitored by human experts who ensure the color, smell, and taste are absolutely perfect.", icon: Hand },
              { title: "Generational Expertise", desc: "Over 30 years of family experience goes into perfecting our unique, oil-free roasting method.", icon: Crown },
            ].map((diff, i) => {
              const Icon = diff.icon;

              return (
              <motion.div key={i} variants={fadeInUp} className="bg-white border border-[#ead8c4] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3d5b0] text-[#9a6b35]">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold mb-4 text-[#e3b584]">
                  <EditableText
                    value={sectionsObj?.difference_items?.[i]?.title || t(diff.title)}
                    onSave={createSaveHandler(`difference_items.${i}`, 'title')}
                    isEditable={isEditable}
                  />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <EditableText
                    value={sectionsObj?.difference_items?.[i]?.desc || t(diff.desc)}
                    onSave={createSaveHandler(`difference_items.${i}`, 'desc')}
                    isEditable={isEditable}
                    multiline={true}
                  />
                </p>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Newsletter CTA Section (Matched Design) */}
      <section className="relative py-24 bg-[#1a1f2c] text-white overflow-hidden border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              <EditableText
                value={sectionsObj?.newsletter?.title || t("Stay Connected With Us")}
                onSave={createSaveHandler('newsletter', 'title')}
                isEditable={isEditable}
              />
            </h2>
            <p className="text-[#8e98a8] text-[15px] md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
              <EditableText
                value={sectionsObj?.newsletter?.desc || t("Join our newsletter to get the latest updates on our natural peanut products, exclusive offers, and behind-the-scenes content.")}
                onSave={createSaveHandler('newsletter', 'desc')}
                isEditable={isEditable}
                multiline={true}
              />
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t("Enter your email")} 
                className="flex-1 bg-[#2d3342] border border-[#3f4656] rounded-full px-6 py-4 text-white placeholder:text-[#8e98a8] focus:outline-none focus:border-[#e3b584] transition-colors"
                required 
              />
              <button 
                type="submit" 
                className="bg-[#e3b584] text-[#1a1f2c] font-bold px-8 py-4 rounded-full hover:bg-[#d4a371] transition-colors whitespace-nowrap"
              >
                {t('Subscribe')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <FeaturesBar />
    </main>
  );
}
