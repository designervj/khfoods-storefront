'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';

export default function ShopPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'shop') dispatch(setCurrentPageBySlug('shop'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">Loading...</div></div>;
  }

  const header = currentPages.sections.find(s => s.adminTitle === 'Shop Hero');
  const grid = currentPages.sections.find(s => s.adminTitle === 'Product Grid');
  const intl = currentPages.sections.find(s => s.adminTitle === 'International Products');

  return (
    <main>
      {header && (
        <section className="relative overflow-hidden pt-[120px] bg-[#f5f5f7]">
          <div className="mx-auto max-w-7xl min-h-[260px] md:min-h-[320px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <EditableText value={getLocalizedString(header.props?.heading, locale)} onSave={createSaveHandler(header.id, 'props.heading')} isEditable={isEditable} tag="h1" className="text-3xl md:text-5xl font-bold text-black uppercase" placeholder="Page title..." />
              <EditableText value={getLocalizedString(header.props?.subheading, locale)} onSave={createSaveHandler(header.id, 'props.subheading')} isEditable={isEditable} tag="p" className="text-gray-500 mt-3 max-w-xl mx-auto" placeholder="Subheading..." multiline rows={2} />
            </div>
          </div>
        </section>
      )}

      {grid && grid.content && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {grid.props?.description && (
              <EditableText value={getLocalizedString(grid.props?.description, locale)} onSave={createSaveHandler(grid.id, 'props.description')} isEditable={isEditable} tag="p" className="text-center text-gray-500 mb-10 max-w-2xl mx-auto" placeholder="Description..." multiline rows={2} />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {grid.content.map((product, idx) => (
                <Link key={product.id} href={locale === 'en' ? '/shop' : `/${locale}/shop`} className="group block">
                  <article className="relative h-[300px] rounded-2xl bg-[#f7f7f7] overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <img src={getLocalizedString(product.props?.image, locale)} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {product.props?.qty && (
                      <span className="absolute top-4 left-4 bg-[#FFD100] text-black text-xs font-bold px-3 py-1 rounded-full">
                        {getLocalizedString(product.props?.qty, locale)}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <EditableText value={getLocalizedString(product.props?.name, locale)} onSave={createSaveHandler(grid.id, `content.${idx}.props.name`)} isEditable={isEditable} tag="h3" className="font-semibold text-sm mb-1" placeholder="Product name..." />
                      {product.props?.price && (
                        <span className="text-sm font-medium text-white/90">{getLocalizedString(product.props?.price, locale)}</span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {intl && intl.content && intl.content.length > 0 && (
        <section className="py-16 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {intl.props?.heading && (
                <EditableText value={getLocalizedString(intl.props?.heading, locale)} onSave={createSaveHandler(intl.id, 'props.heading')} isEditable={isEditable} tag="h2" className="text-2xl md:text-3xl font-bold uppercase" placeholder="Section heading..." />
              )}
              {intl.props?.description && (
                <EditableText value={getLocalizedString(intl.props?.description, locale)} onSave={createSaveHandler(intl.id, 'props.description')} isEditable={isEditable} tag="p" className="text-gray-500 mt-3 max-w-2xl mx-auto" placeholder="Description..." multiline rows={3} />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {intl.content.map((product, idx) => (
                <Link key={product.id} href={locale === 'en' ? '/shop' : `/${locale}/shop`} className="group block">
                  <article className="relative h-[300px] rounded-2xl bg-[#f7f7f7] overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <img src={getLocalizedString(product.props?.image, locale)} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <EditableText value={getLocalizedString(product.props?.name, locale)} onSave={createSaveHandler(intl.id, `content.${idx}.props.name`)} isEditable={isEditable} tag="h3" className="font-semibold text-sm mb-1" placeholder="Product name..." />
                      {product.props?.price && (
                        <span className="text-sm font-medium text-white/90">{getLocalizedString(product.props?.price, locale)}</span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
