'use client';

import { BriefcaseBusiness, LocateFixed, MapPin, Navigation, Phone, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { translateStatic } from '@/lib/i18n/locale';

const stores = [
  {
    name: '99 Ranch Market Rowland Heights',
    address: '1015 S. Nogales St. Rowland Heights, California, 91748',
    phone: '(626) 964-5888',
    fax: '(626) 965-3999',
    distance: '1.07 Miles',
  },
  {
    name: '99 Ranch Market Hacienda Heights',
    address: '1625 Azusa Ave. Hacienda Heights, California, 91745',
    phone: '(626) 839-2899',
    fax: '(626) 839-2699',
    distance: '1.89 Miles',
  },
  {
    name: '99 Ranch Market Hacienda Heights II',
    address: '17120 Colima Rd. Hacienda Heights, California, 91745',
    phone: '(800) 600-8292',
    fax: '(626) 964-8168',
    distance: '2.07 Miles',
  },
  {
    name: '99 Ranch Market Chino Hills',
    address: '2959 Chino Ave. Chino Hills, California, 91709',
    phone: '(909) 517-8899',
    fax: '(909) 517-8866',
    distance: '8.64 Miles',
  },
  {
    name: '99 Ranch Market Arcadia',
    address: '1300 S. Golden West Ave. Arcadia, California, 91007',
    phone: '(626) 445-7899',
    fax: '(626) 445-7799',
    distance: '10.22 Miles',
  },
];

export default function StoreLocatorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = (text: string) => translateStatic(text, locale);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#1c1c1a] pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10 bg-[url('/Image/bg-banner.png')] bg-cover bg-center opacity-90" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(28,28,26,0.86),rgba(28,28,26,0.58),rgba(28,28,26,0.18))]" />
        <div className="mx-auto flex min-h-[240px] max-w-7xl items-center justify-center px-4 pb-10 text-center sm:px-6 md:min-h-[320px] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-[#FFD100]">{t('KH Food Retail Partners')}</p>
            <h1 className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl">{t('Store Locator')}</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-white/75 md:text-base">
              {t('Find nearby stores carrying KH Food peanuts and check retail availability around your location.')}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              <span>{t('Home')}</span>
              <span>/</span>
              <span className="text-[#FFD100]">{t('Store Locator')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-black md:text-4xl">{t('Search Location')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              {t('Find nearby stores carrying KH Food peanuts. Search by location or choose a distance range to explore retail partners near you.')}
            </p>
          </div>

          <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
            <div className="grid gap-4 bg-[#eeeeee] p-3 md:grid-cols-[1fr_180px] md:items-center">
              <div className="flex overflow-hidden rounded border border-gray-300 bg-white">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    className="h-11 w-full border-0 pl-10 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    placeholder={t('Enter a Location')}
                  />
                </div>
                <button className="flex h-11 w-12 shrink-0 items-center justify-center bg-[#d73333] text-white transition hover:bg-[#bc2929]" aria-label="Locate">
                  <Navigation className="h-5 w-5" />
                </button>
              </div>

              <select className="h-11 rounded border border-gray-300 bg-white px-4 text-sm text-gray-500 outline-none">
                <option>100 Miles</option>
                <option>50 Miles</option>
                <option>25 Miles</option>
                <option>10 Miles</option>
              </select>
            </div>

            <div className="grid lg:grid-cols-[360px_1fr]">
              <aside className="border-r border-gray-200 bg-white">
                <div className="bg-[#d73333] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-white">
                  {t('Number Of Shops: 26')}
                </div>

                <div className="max-h-[420px] overflow-y-auto lg:max-h-[520px]">
                  {stores.map((store) => (
                    <article key={store.name} className="border-b border-gray-200 p-4 transition hover:bg-[#fff8f2]">
                      <div className="grid grid-cols-[1fr_84px] gap-3">
                        <div className="min-w-0">
                          <h2 className="mb-2 text-[15px] font-medium leading-snug text-[#d73333]">{store.name}</h2>
                          <div className="space-y-1 text-[12px] leading-4 text-gray-600">
                            <p className="flex gap-1.5"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-700" /> {store.address}</p>
                            <p className="flex gap-1.5"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-700" /> Phone: {store.phone}</p>
                            <p className="flex gap-1.5"><BriefcaseBusiness className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-700" /> Fax: {store.fax}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-md border-4 border-[#73bd51] text-center text-[20px] font-bold leading-[0.85] text-[#73bd51]">
                            <span>Shop<br />Good</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[12px] text-gray-600">
                        <button className="hover:text-[#d73333]">{t('Directions')}</button>
                        <span>{t('Distance')}: {store.distance}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </aside>

              <section className="relative min-h-[360px] overflow-hidden bg-[#1b1b1b] md:min-h-[460px] lg:min-h-[520px]">
                <iframe
                  title="KH Food Store Locator Map"
                  src="https://maps.google.com/maps?q=La+Puente+California&z=11&output=embed"
                  className="absolute inset-0 h-full w-full opacity-75 grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute left-[58%] top-[46%] hidden -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 text-center shadow-2xl md:block">
                  <p className="mb-3 text-left text-base text-gray-500">Google</p>
                  <p className="text-sm font-semibold text-gray-900">{t("This page can't load Google Maps correctly.")}</p>
                  <div className="mt-5 border border-gray-400 px-16 py-3 text-sm text-gray-600">OK</div>
                </div>

                <button className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded bg-white/90 text-gray-700 shadow-md">
                  <LocateFixed className="h-5 w-5" />
                </button>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
