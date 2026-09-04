'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck, ClipboardCheck, PackageCheck, Truck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { translateStatic } from '@/lib/i18n/locale';

const steps = [
  { icon: ClipboardCheck, title: 'Share Company Details', text: 'Tell us about your store, distribution needs, and preferred product mix.' },
  { icon: BadgeCheck, title: 'Account Review', text: 'Our team reviews your request and confirms wholesale eligibility.' },
  { icon: PackageCheck, title: 'Select Products', text: 'Choose domestic packs, bulk quantities, or export-ready peanut options.' },
  { icon: Truck, title: 'Reliable Supply', text: 'Receive coordinated shipping support for repeat ordering and replenishment.' },
];

export default function WholesalePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);

  return (
    <main className="bg-[#faf7f2]">
      <section className="relative isolate overflow-hidden bg-[#1c1c1a] py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[url('/Image/product-banner-img.png')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,28,26,0.86),rgba(28,28,26,0.62),rgba(28,28,26,0.25))]" />
        <div className="mx-auto flex min-h-[300px] max-w-7xl items-center justify-center px-4 text-center sm:px-6 md:min-h-[340px] lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#FFD100]">{t('Wholesale Program')}</p>
            <h1 className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl">{t('Wholesale Without the Hassle')}</h1>
            <p className="mx-auto mt-4 text-sm font-medium leading-7 text-white/75 md:text-base">
              {t('Partner with KH Food for premium roasted peanuts, consistent fulfillment, and account support for retailers and distributors.')}
            </p>
            <Link href="#wholesale-form" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FFD100] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#eab900]">
              {t('Start Application')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#9a6b35]">{t('Quick And Easy Setup')}</p>
            <h2 className="text-2xl font-bold uppercase leading-tight text-black md:text-4xl">{t('Become a Wholesale Member')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              {t('Submit your business information and our account team will follow up with next steps, pricing guidance, and product availability.')}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-3xl border border-[#ead8c4] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3d5b0] text-black">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-3xl font-bold text-[#f3d5b0]">0{index + 1}</span>
                  </div>
                  <h3 className="text-base font-bold uppercase text-black">{t(step.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{t(step.text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="wholesale-form" className="pb-14 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[28px] bg-[#3b2f2d] p-7 text-white md:p-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FFD100]">{t('For Retailers')}</p>
            <h2 className="text-2xl font-bold uppercase leading-tight md:text-4xl">{t('Ready for bulk peanut supply?')}</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              {t('KH Food supports stores, distributors, restaurants, gifting programs, and specialty markets with premium peanut products.')}
            </p>
            <ul className="mt-7 space-y-3 text-sm font-semibold text-white/85">
              <li>{t('Premium roasted peanut packs and bags')}</li>
              <li>{t('Domestic and international product options')}</li>
              <li>{t('Responsive account and reorder support')}</li>
            </ul>
          </div>

          <form className="rounded-[28px] border border-[#ead8c4] bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {['Company Name', 'Contact Name', 'Email Address', 'Phone Number', 'Business Type', 'Estimated Monthly Quantity'].map((label) => (
                <label key={label} className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{t(label)}</span>
                  <input className="h-[52px] w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition focus:border-[#d9a866] focus:bg-white" />
                </label>
              ))}
              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{t('Message')}</span>
                <textarea rows={5} className="w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 py-4 text-sm outline-none transition focus:border-[#d9a866] focus:bg-white" placeholder={t('Tell us which products you are interested in.')} />
              </label>
            </div>
            <button type="button" className="mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#3b2f2d] px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#2b2220]">
              {t('Submit Wholesale Inquiry')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
