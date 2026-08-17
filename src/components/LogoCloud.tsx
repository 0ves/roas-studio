import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const brands = [
  { name: 'Crocs', src: '/images/brands/crocs.svg' },
  { name: 'LOreal', src: '/images/brands/LOreal.svg' },
  { name: 'XPPen India', src: '/images/brands/xppen.jpeg' },
  { name: 'dominos', src: '/images/brands/dominos.svg' },
  { name: 'Dove Men', src: '/images/brands/dove.svg' },
  { name: 'Garnier', src: '/images/brands/garnier.svg' },
  { name: 'Maybelline', src: '/images/brands/Maybelline.svg' },
  { name: 'The Pant Project', src: '/images/brands/pant-project.jpeg' },
  { name: 'Myntra FWD', src: '/images/brands/myntra.svg' },
  { name: 'Aprillia Tuono 457', src: '/images/brands/aprilia.svg' },
];

// Helper to shuffle/offset the array so the rows don't look identical
const getOffsetBrands = (offset: number) => {
  return [...brands.slice(offset), ...brands.slice(0, offset)];
};

const lane1 = getOffsetBrands(0);
const lane2 = getOffsetBrands(4); // Offset by 4 items
const lane3 = getOffsetBrands(7); // Offset by 7 items

export default function LogoCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (headingRef.current) {
              const text = new SplitType(headingRef.current, { types: 'words,chars' });
              gsap.from(text.chars, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.02,
                ease: 'power3.out',
              });
            }
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 sm:py-32 bg-white dark:bg-zinc-950 flex flex-col gap-12 sm:gap-16 overflow-hidden"
    >
      <h2 
        ref={headingRef}
        className="text-center text-lg/8 font-semibold text-zinc-900 dark:text-zinc-100 px-6"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} 
      >
        Trusted by the world’s most innovative teams
      </h2>
      
      {/* Marquee Main Container */}
      <div className="relative flex flex-col gap-8 w-full bg-white dark:bg-zinc-950 py-4">
        
        {/* Gradient Masks (Covering all 3 lanes) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-zinc-950 sm:w-40"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-zinc-950 sm:w-40"></div>

        <style>{`
          /* Moves Right to Left */
          @keyframes marquee-rtl {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          /* Moves Left to Right */
          @keyframes marquee-ltr {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          
          /* 
            Prime number durations so they mathematically rarely sync.
            Negative delays so they start already shifted out of sync on page load! 
          */
          .animate-marquee-rtl-1 { 
            animation: marquee-rtl 43s linear infinite; 
            animation-delay: -17s; 
          }
          .animate-marquee-ltr-2 { 
            animation: marquee-ltr 53s linear infinite; 
            animation-delay: -37s; 
          }
          .animate-marquee-rtl-3 { 
            animation: marquee-rtl 47s linear infinite; 
            animation-delay: -9s; 
          }
        `}</style>

        {/* --- LANE 1: Right to Left --- */}
        <div className="flex w-max animate-marquee-rtl-1 hover:[animation-play-state:paused]">
          {[...lane1, ...lane1].map((brand, index) => (
            <LogoItem key={`lane1-${brand.name}-${index}`} brand={brand} />
          ))}
        </div>

        {/* --- LANE 2: Left to Right --- */}
        <div className="flex w-max animate-marquee-ltr-2 hover:[animation-play-state:paused]">
          {[...lane2, ...lane2].map((brand, index) => (
            <LogoItem key={`lane2-${brand.name}-${index}`} brand={brand} />
          ))}
        </div>

        {/* --- LANE 3: Right to Left --- */}
        <div className="flex w-max animate-marquee-rtl-3 hover:[animation-play-state:paused]">
          {[...lane3, ...lane3].map((brand, index) => (
            <LogoItem key={`lane3-${brand.name}-${index}`} brand={brand} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Render the natural colors with a hover scale effect
function LogoItem({ brand }: { brand: { name: string; src: string } }) {
  return (
    <div className="flex w-[200px] sm:w-[250px] shrink-0 items-center justify-center px-4">
      <img 
        src={brand.src} 
        alt={`${brand.name} logo`} 
        className="max-h-10 w-auto max-w-[140px] object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
}