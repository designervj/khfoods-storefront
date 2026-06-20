'use client';

import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import { Phone, Mail, MapPin } from 'lucide-react';

const infoIcons: Record<string, React.ReactNode> = {
  phone: <Phone className="h-7 w-7 text-black" />,
  address: <MapPin className="h-7 w-7 text-black" />,
  email: <Mail className="h-7 w-7 text-black" />,
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();

  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'contact') dispatch(setCurrentPageBySlug('contact'));
  }, [dispatch, currentPages]);

  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => { await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale); };
  }, [dispatch, currentPages, locale]);

  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!currentPages || !currentPages.sections) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">Loading...</div></div>;
  }

  const hero = currentPages.sections.find(s => s.adminTitle === 'Contact Hero');
  const info = currentPages.sections.find(s => s.adminTitle === 'Contact Info');
  const form = currentPages.sections.find(s => s.adminTitle === 'Contact Form');

  const contactFields = [
    { key: 'address', label: info?.props?.address, icon: 'address' },
    { key: 'phone', label: info?.props?.phone, icon: 'phone' },
    { key: 'email', label: info?.props?.email, icon: 'email' },
  ];

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

      {info && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8">
              {info.props?.address && (
                <div className="text-center flex-1 min-w-[200px] max-w-[300px]">
                  <div className="w-20 h-20 rounded-full bg-[#eaba88] flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/10">
                    <MapPin className="h-7 w-7 text-black" />
                  </div>
                  <EditableText value={getLocalizedString(info.props?.address, locale)} onSave={createSaveHandler(info.id, 'props.address')} isEditable={isEditable} tag="p" className="text-sm text-gray-600" placeholder="Address..." />
                </div>
              )}
              {info.props?.phone && (
                <div className="text-center flex-1 min-w-[200px] max-w-[300px]">
                  <div className="w-20 h-20 rounded-full bg-[#eaba88] flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/10">
                    <Phone className="h-7 w-7 text-black" />
                  </div>
                  <EditableText value={getLocalizedString(info.props?.phone, locale)} onSave={createSaveHandler(info.id, 'props.phone')} isEditable={isEditable} tag="p" className="text-sm text-gray-600" placeholder="Phone..." />
                  {info.props?.fax && (
                    <EditableText value={getLocalizedString(info.props?.fax, locale)} onSave={createSaveHandler(info.id, 'props.fax')} isEditable={isEditable} tag="p" className="text-sm text-gray-500 mt-1" placeholder="Fax..." />
                  )}
                </div>
              )}
              {info.props?.email && (
                <div className="text-center flex-1 min-w-[200px] max-w-[300px]">
                  <div className="w-20 h-20 rounded-full bg-[#eaba88] flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/10">
                    <Mail className="h-7 w-7 text-black" />
                  </div>
                  <EditableText value={getLocalizedString(info.props?.email, locale)} onSave={createSaveHandler(info.id, 'props.email')} isEditable={isEditable} tag="p" className="text-sm text-gray-600" placeholder="Email..." />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {form && (
        <section className="bg-[#f5f5f7] py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <EditableText value={getLocalizedString(form.props?.heading, locale)} onSave={createSaveHandler(form.id, 'props.heading')} isEditable={isEditable} tag="h2" className="text-2xl md:text-3xl font-bold" placeholder="Form heading..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.content?.map((field, idx) => {
                const fieldType = getLocalizedString(field.props?.type, locale);
                const isTextarea = fieldType === 'textarea';
                const Tag = isTextarea ? 'textarea' : 'input';
                return (
                  <div key={field.id} className={isTextarea ? 'md:col-span-2' : ''}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      {getLocalizedString(field.props?.label, locale)}
                    </label>
                    <Tag
                      type={isTextarea ? undefined : fieldType}
                      placeholder={getLocalizedString(field.props?.placeholder, locale)}
                      value={formData[field.id] || ''}
                      onChange={(e: any) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      className={`w-full bg-white border-0 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#eaba88] ${isTextarea ? 'min-h-[120px] py-3 rounded-none' : 'h-12 rounded-none'}`}
                      {...(isTextarea ? { rows: 4 } : {})}
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-6 w-full h-12 bg-[#eaba88] font-semibold tracking-[0.25em] text-black hover:bg-[#eaba88]/90 transition-colors uppercase"
              onClick={() => { alert('Form submitted (demo)'); setFormData({}); }}
            >
              SUBMIT
            </button>
            {form.props?.smsDisclosure && (
              <p className="text-xs text-gray-400 mt-4 text-center">
                {getLocalizedString(form.props?.smsDisclosure, locale)}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="h-[300px] bg-gray-200">
        <iframe title="KH Food Location" src={`https://maps.google.com/maps?q=585+Yorbita+Rd+La+Puente+CA+91744&output=embed`} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </main>
  );
}
