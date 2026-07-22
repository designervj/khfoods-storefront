'use client';

import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import PageHeroSection from '@/components/sections/PageHeroSection';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NutritionPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const fadeInUp: any = { 
    hidden: { opacity: 0, y: 40 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
  };
  
  const staggerContainer: any = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
  };

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
      {/* 1. Pure Ingredients & Sourcing */}
      <section className="relative py-24 bg-[#fafafa] overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#ecb984]/10 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[#c89255] rounded-[3rem] transform rotate-3 scale-105 opacity-20"></div>
              <img src="/Image/Peanut.jpg" alt="Pure Peanuts" className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl" />
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:w-1/2 space-y-8">
              <span className="text-[#c89255] uppercase tracking-widest text-sm font-bold">100% All Natural</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a202c] leading-tight">
                Sourced from the <span className="text-[#ecb984]">Finest Farms</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that great taste starts with great ingredients. That's why our peanuts are carefully selected from premium farms, ensuring every bite delivers nature's pure goodness without any artificial additives.
              </p>
              <ul className="space-y-4">
                {['No Preservatives', 'No Artificial Flavors', 'Non-GMO'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <svg className="w-6 h-6 text-[#c89255]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Dietary & Lifestyle Badges */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: "Vegan", icon: "🌱" },
              { title: "Gluten-Free", icon: "🌾" },
              { title: "Non-GMO", icon: "🧬" },
              { title: "Zero Cholesterol", icon: "❤️" },
            ].map((badge, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50 rounded-3xl hover:bg-[#fdf5ed] transition-colors duration-300 group text-center border border-gray-100 hover:border-[#ecb984]/30 cursor-default">
                <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{badge.icon}</span>
                <h3 className="font-bold text-gray-900">{badge.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Nutrition FAQ */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a202c]">Common Questions</h2>
              <p className="text-gray-500 mt-4 text-lg">Everything you need to know about our peanuts.</p>
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "Are your peanuts roasted in oil?", a: "No, we strictly avoid unhealthy oils. Our peanuts undergo a specialized roasting process that enhances their natural flavor without adding extra fat." },
              { q: "Is there any added sugar?", a: "Absolutely not. We believe in the natural sweetness and savory profile of high-quality peanuts. You won't find any hidden sugars here." },
              { q: "Are they safe for gluten allergies?", a: "Yes, our peanuts are naturally gluten-free and processed in a facility that maintains strict hygiene standards to prevent cross-contamination." },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-6 flex items-center justify-between font-bold text-gray-900 hover:bg-gray-50/50 transition-colors focus:outline-none"
                >
                  <span className="text-lg">{faq.q}</span>
                  <span className={`transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-[#c89255]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-[#ecb984]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-[#c89255]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-4xl font-extrabold text-white mb-6 leading-tight pb-4">Ready to Fuel Your Body?</h2>
            <p className="text-gray-300 text-lg md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the perfect balance of health and taste. Grab your pack of naturally processed peanuts today.
            </p>
            <Link href="/products" className="inline-block bg-gradient-to-r from-[#d9a269] to-[#ecb984] text-slate-900 font-bold text-md px-10 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-[#ecb984]/20 border border-white/20">
              Shop Healthy Options
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
