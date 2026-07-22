'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import PageHeroSection from '@/components/sections/PageHeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProcessPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
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
    <main className="bg-[#fafafa]">
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
            <motion.span variants={fadeInUp} className="text-[#c89255] uppercase tracking-widest text-sm font-bold block mb-4">How It's Made</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-[#1a202c] tracking-tight">
              Our Journey to Perfection
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#e3b584] to-transparent -translate-x-1/2" />

            <div className="space-y-16 md:space-y-24">
              {timelineSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className={`md:w-1/2 flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-[2rem] bg-white shadow-xl shadow-[#ecb984]/20 border border-gray-100 flex items-center justify-center p-3 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover rounded-[1.5rem]" />
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#e3b584] items-center justify-center shadow-lg z-10">
                    <div className="w-2 h-2 rounded-full bg-[#1a202c]" />
                  </div>

                  <div className={`md:w-1/2 text-center ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-[#c89255] font-black text-xl mb-2 block">Step 0{idx + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a202c] mb-4">{step.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The KH Food Difference */}
      <section className="py-24 bg-[#0a0f16] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-[#ecb984]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              The <span className="text-[#e3b584]">KH Food</span> Difference
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              We do things the hard way because it's the right way. No shortcuts, just pure dedication to quality.
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
              { title: "No Preservatives", desc: "We rely on natural processes and packaging to keep our products fresh, never on artificial chemicals.", icon: "🚫" },
              { title: "Hand-Crafted Quality", desc: "Every batch is monitored by human experts who ensure the color, smell, and taste are absolutely perfect.", icon: "✋" },
              { title: "Generational Expertise", desc: "Over 30 years of family experience goes into perfecting our unique, oil-free roasting method.", icon: "👑" },
            ].map((diff, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/10 transition-colors duration-300">
                <div className="text-4xl mb-6">{diff.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#e3b584]">{diff.title}</h3>
                <p className="text-gray-400 leading-relaxed">{diff.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Factory Gallery Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-[#1a202c] mb-4 tracking-tight">
              Inside Our Facilities
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
              Take a look at where the magic happens. A blend of modern hygiene standards and traditional craftsmanship.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((item) => (
              <motion.div key={item} variants={fadeInUp} className="relative group overflow-hidden rounded-[2rem] h-64 md:h-80 shadow-md">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <img 
                  src="/Image/Peanut.jpg" 
                  alt="Factory view" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Global Certifications */}
      <section className="py-20 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#c89255] uppercase tracking-widest text-sm font-bold mb-2">Verified Excellence</h3>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a202c]">Certified by the Best</h2>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['ISO 9001', 'FSSAI', 'HACCP', 'GMP'].map((cert, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-gray-500 font-bold border-4 border-white shadow-sm">
                  {cert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Commitment to Sustainability */}
      <section className="py-24 relative overflow-hidden bg-[#e3b584]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-[3rem] p-10 md:p-16 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a202c] mb-6">Our Promise to the Planet</h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              We believe that producing the best peanuts shouldn't come at the cost of our environment. Our facilities operate with minimal waste, utilizing eco-friendly packaging and sustainable farming partnerships.
            </p>
            <div className="flex justify-center items-center gap-3 text-[#c89255] font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>100% Recyclable Packaging</span>
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Stay Connected With Us</h2>
            <p className="text-[#8e98a8] text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join our newsletter to get the latest updates on our natural peanut products, exclusive offers, and behind-the-scenes content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-[#2d3342] border border-[#3f4656] rounded-full px-6 py-4 text-white placeholder:text-[#8e98a8] focus:outline-none focus:border-[#e3b584] transition-colors"
                required 
              />
              <button 
                type="submit" 
                className="bg-[#e3b584] text-[#1a1f2c] font-bold px-8 py-4 rounded-full hover:bg-[#d4a371] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
