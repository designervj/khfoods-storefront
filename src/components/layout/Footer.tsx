'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const currentYear = new Date().getFullYear();

  const href = (path: string) => {
    if (path === '/') return locale === 'en' ? '/' : `/${locale}`;
    return locale === 'en' ? path : `/${locale}${path}`;
  };

  /* Exact structure from the image */
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'FAQS', path: '/faq' },
    { label: 'Wholesale', path: '/contact' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Store Locator', path: '/contact' },
  ];

  const aboutUsLinks = [
    { label: 'History', path: '/about' },
    { label: 'Nutrition', path: '/nutrition' },
    { label: 'Process', path: '/process' },
  ];

  const productsLinks = [
    { label: 'Domestic', path: '/shop' },
    { label: 'International', path: '/shop' },
  ];

  const SocialIcon = ({ d }: { d: string }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#FFD100] hover:text-black transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );

  return (
    <footer className="bg-[#1c1c1a] text-white mt-auto border-t-[3px] border-[#FFD100]">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        
        {/* ROW 1: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-3xl">
            <Link href={href('/')} className="flex-shrink-0">
              <Image 
                src="/Image/khfood_logo.png" 
                alt="KH Food" 
                width={140} 
                height={40} 
                className="object-contain w-[140px] h-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              KH Food became a company in Orange County, California in 1991. They had the vision to become the highest quality peanut company in California.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <SocialIcon d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            {/* Twitter / X */}
            <SocialIcon d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            {/* Pinterest */}
            <SocialIcon d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.85 6.35 9.31-.09-.79-.17-2 .04-2.87.19-.8 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.85 1.51 1.85 1.81 0 3.2-1.91 3.2-4.66 0-2.45-1.76-4.16-4.28-4.16-2.9 0-4.61 2.18-4.61 4.42 0 .88.34 1.82.76 2.33.08.1.09.19.07.29l-.25 1.03c-.04.15-.13.18-.28.11-1.05-.49-1.71-2.03-1.71-3.26 0-2.65 1.93-5.08 5.55-5.08 2.92 0 5.18 2.08 5.18 4.88 0 2.9-1.83 5.23-4.37 5.23-1.27 0-2.46-.66-2.87-1.44l-.78 2.98c-.28 1.08-1.04 2.43-1.55 3.26 1.15.35 2.37.54 3.63.54 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            {/* TikTok */}
            <SocialIcon d="M21 8.5C19.7 8.2 18.5 7.6 17.6 6.7C16.8 5.8 16.2 4.7 16 3.5V3H12.5V15.5C12.5 16.3 12.2 17 11.6 17.6C11 18.2 10.3 18.5 9.5 18.5C8.7 18.5 8 18.2 7.4 17.6C6.8 17 6.5 16.3 6.5 15.5C6.5 14.7 6.8 14 7.4 13.4C8 12.8 8.7 12.5 9.5 12.5C9.8 12.5 10.1 12.6 10.4 12.7V9.1C10.1 9 9.8 9 9.5 9C7.8 9 6.2 9.7 5 10.9C3.8 12.1 3.1 13.7 3.1 15.5C3.1 17.3 3.8 18.9 5 20.1C6.2 21.3 7.8 22 9.5 22C11.2 22 12.8 21.3 14 20.1C15.2 18.9 15.9 17.3 15.9 15.5V9.4C17.4 10.8 19.3 11.7 21.4 12V8.5H21Z" />
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10 md:my-14" />

        {/* ROW 2: Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Col 1 */}
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide mb-6 pb-4">QUICK LINKS</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={href(link.path)} className="text-gray-300 hover:text-[#FFD100] transition-colors text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Col 2 */}
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide mb-6 pb-4">ABOUT US</h3>
            <ul className="flex flex-col gap-3">
              {aboutUsLinks.map((link, i) => (
                <li key={i}>
                  <Link href={href(link.path)} className="text-gray-300 hover:text-[#FFD100] transition-colors text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide mb-6 pb-4">PRODUCTS</h3>
            <ul className="flex flex-col gap-3">
              {productsLinks.map((link, i) => (
                <li key={i}>
                  <Link href={href(link.path)} className="text-gray-300 hover:text-[#FFD100] transition-colors text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide mb-6 pb-4">CONTACT US</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-300 text-[15px]">(714)639-1201</li>
              <li className="text-gray-300 text-[15px]">contact@khfood.com</li>
              <li className="text-gray-300 text-[15px] leading-relaxed max-w-[200px]">585 Yorbita Rd. La Puente, CA 91744</li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10 md:my-14" />

        {/* ROW 3: Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-xl">
            <h3 className="text-md md:text-xl font-bold uppercase tracking-wide mb-4">SIGN UP TO NEWSLETTER</h3>
            <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-wider">
              SUBSCRIBE TO THE KHFOOD MAILING LIST TO RECEIVE UPDATES ON NEW ARRIVALS, SPECIAL OFFERS AND OTHER DISCOUNT INFORMATION.
            </p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row shadow-sm">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-[#2a2a2a] text-white px-5 py-4 w-full sm:w-[320px] focus:outline-none placeholder:text-gray-500 rounded-t-sm sm:rounded-l-sm sm:rounded-tr-none"
            />
            <button className="bg-[#FFD100] hover:bg-[#eab900] text-black font-bold uppercase tracking-wider px-8 py-4 transition-colors whitespace-nowrap rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none text-[15px]">
              SUBSCRIBE
            </button>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="w-full bg-[#111111] py-4 text-center">
        <p className="text-gray-600 text-xs">
          © {currentYear} KHFood. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
