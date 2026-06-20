'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import OurWorkSection from '@/components/sections/OurWorkSection';
import ProductSection from '@/components/sections/ProductSection';
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import BrandSliderSection from '@/components/sections/BrandSliderSection';

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'home') dispatch(setCurrentPageBySlug('home'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">Loading...</div></div>;
  }

  const sections = currentPages.sections;

  return (
    <main>
      <HeroSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <AboutSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <OurWorkSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <ProductSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <FeaturedProjectsSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <TestimonialsSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <BlogSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
      <BrandSliderSection sections={sections} locale={locale} isEditable={isEditable} createSaveHandler={createSaveHandler} />
    </main>
  );
}
