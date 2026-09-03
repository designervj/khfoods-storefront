'use client';

import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString, translateStatic } from '@/lib/i18n/locale';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);
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
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[var(--text-muted)]">{t('Loading...')}</div></div>;
  }

  const hero = currentPages.sections.find(s => s.adminTitle === 'Contact Hero');
  const info = currentPages.sections.find(s => s.adminTitle === 'Contact Info');
  const form = currentPages.sections.find(s => s.adminTitle === 'Contact Form');

  return (
    <main>
      {hero && (
        <section className="relative isolate overflow-hidden bg-[#1c1c1a] pt-24 md:pt-28">
          <div className="absolute inset-0 -z-10 bg-[url('/Image/bg-banner.png')] bg-cover bg-center opacity-95" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,28,26,0.78)_0%,rgba(28,28,26,0.58)_42%,rgba(28,28,26,0.18)_68%,rgba(28,28,26,0)_100%)]" />
          {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-16 bg-gradient-to-t from-[#f7f4ef] to-transparent" /> */}
          <div className="mx-auto flex min-h-[250px] max-w-7xl items-center justify-center px-4 pb-10 text-center sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#FFD100]">{t('KH Food Support')}</p>
              <EditableText value={getLocalizedString(hero.props?.heading, locale)} onSave={createSaveHandler(hero.id, 'props.heading')} isEditable={isEditable} tag="h1" className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl" placeholder="Page title..." />
              <EditableText value={getLocalizedString(hero.props?.subheading, locale)} onSave={createSaveHandler(hero.id, 'props.subheading')} isEditable={isEditable} tag="p" className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-white/75 md:text-base" placeholder="Subheading..." multiline rows={2} />
            </div>
          </div>
        </section>
      )}

      {form && (
        <section className="bg-[#f7f4ef] py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            {info && (
              <aside className="relative overflow-hidden rounded-[28px] bg-[var(--primary)] p-7 text-[var(--secondary)] shadow-2xl shadow-black/10 md:p-9">
                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/35 blur-2xl" />
                <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--primary-dark)]/25 blur-3xl" />
                <div className="relative">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]/70">{t('Contact Details')}</p>
                  <EditableText value={getLocalizedString(info.props?.title, locale)} onSave={createSaveHandler(info.id, 'props.title')} isEditable={isEditable} tag="h2" className="text-2xl font-bold uppercase leading-tight text-[var(--secondary)] md:text-3xl" placeholder="Info title..." />
                  <EditableText value={getLocalizedString(info.props?.subtitle, locale)} onSave={createSaveHandler(info.id, 'props.subtitle')} isEditable={isEditable} tag="p" className="mt-3 text-sm font-medium leading-6 text-[var(--secondary)]/65" placeholder="Info subtitle..." multiline rows={2} />

                  <div className="mt-8 space-y-4">
                    {info.props?.address && (
                      <div className="flex gap-4 rounded-2xl border border-black/10 bg-white/35 p-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-black"><MapPin className="h-5 w-5" /></span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]/50">{t('Visit Us')}</p>
                          <EditableText value={getLocalizedString(info.props?.address, locale)} onSave={createSaveHandler(info.id, 'props.address')} isEditable={isEditable} tag="p" className="mt-1 text-sm leading-6 text-[var(--secondary)]/85" placeholder="Address..." />
                        </div>
                      </div>
                    )}
                    {info.props?.phone && (
                      <div className="flex gap-4 rounded-2xl border border-black/10 bg-white/35 p-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-black"><Phone className="h-5 w-5" /></span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]/50">{t('Call')}</p>
                          <EditableText value={getLocalizedString(info.props?.phone, locale)} onSave={createSaveHandler(info.id, 'props.phone')} isEditable={isEditable} tag="p" className="mt-1 text-sm leading-6 text-[var(--secondary)]/85" placeholder="Phone..." />
                          {info.props?.fax && (
                            <EditableText value={getLocalizedString(info.props?.fax, locale)} onSave={createSaveHandler(info.id, 'props.fax')} isEditable={isEditable} tag="p" className="text-sm leading-6 text-[var(--secondary)]/60" placeholder="Fax..." />
                          )}
                        </div>
                      </div>
                    )}
                    {info.props?.email && (
                      <div className="flex gap-4 rounded-2xl border border-black/10 bg-white/35 p-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFD100] text-black"><Mail className="h-5 w-5" /></span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]/50">{t('Email')}</p>
                          <EditableText value={getLocalizedString(info.props?.email, locale)} onSave={createSaveHandler(info.id, 'props.email')} isEditable={isEditable} tag="p" className="mt-1 text-sm leading-6 text-[var(--secondary)]/85" placeholder="Email..." />
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4 rounded-2xl border border-black/10 bg-[var(--secondary)] p-4 text-white">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black"><Clock className="h-5 w-5" /></span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{t('Business Hours')}</p>
                        <p className="mt-1 text-sm leading-6 text-white/85">{t('Monday - Friday, 8:00 AM - 5:00 PM')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 md:p-9">
              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary-dark)]">{t('Send Message')}</p>
                <EditableText value={getLocalizedString(form.props?.heading, locale)} onSave={createSaveHandler(form.id, 'props.heading')} isEditable={isEditable} tag="h2" className="max-w-xl text-2xl font-bold leading-tight text-[var(--secondary)] md:text-3xl" placeholder="Form heading..." />
                <p className="mt-3 text-sm leading-6 text-gray-500">{t('Share your question, wholesale inquiry, or product request. Our team will reply as soon as possible.')}</p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {form.content?.map((field) => {
                  const fieldType = getLocalizedString(field.props?.type, locale);
                  const isTextarea = fieldType === 'textarea';
                  const inputClass = "w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-[#FFD100] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FFD100]/20";

                  return (
                    <div key={field.id} className={isTextarea ? 'md:col-span-2' : ''}>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                        {getLocalizedString(field.props?.label, locale)}
                      </label>
                      {isTextarea ? (
                        <textarea
                          placeholder={getLocalizedString(field.props?.placeholder, locale)}
                          value={formData[field.id] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                          className={`${inputClass} min-h-[130px] py-4 resize-none`}
                          rows={4}
                        />
                      ) : (
                        <input
                          type={fieldType}
                          placeholder={getLocalizedString(field.props?.placeholder, locale)}
                          value={formData[field.id] || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                          className={`${inputClass} h-14`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="mt-6 h-14 w-full rounded-2xl bg-[#FFD100] px-8 font-black uppercase tracking-[0.22em] text-black shadow-lg shadow-[#FFD100]/20 transition-all hover:-translate-y-0.5 hover:bg-[#eab900] hover:shadow-xl hover:shadow-[#FFD100]/25"
                onClick={() => { alert('Form submitted (demo)'); setFormData({}); }}
              >
                {t('SUBMIT')}
              </button>
              {form.props?.smsDisclosure && (
                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  {getLocalizedString(form.props?.smsDisclosure, locale)}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="h-[260px] bg-gray-200 md:h-[500px]">
        <iframe title="KH Food Location" src={`https://maps.google.com/maps?q=585+Yorbita+Rd+La+Puente+CA+91744&output=embed`} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </main>
  );
}
