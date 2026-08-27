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

const getOffsetBrands = (offset: number) => {
  return [...brands.slice(offset), ...brands.slice(0, offset)];
};

const lane1 = getOffsetBrands(0);
const lane2 = getOffsetBrands(4);
const lane3 = getOffsetBrands(7);

export default function LogoCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (headingRef.current) {
              const text = new SplitType(headingRef.current, {
                types: 'words,chars',
              });

              gsap.from(text.chars, {
                opacity: 0,
                y: 12,
                duration: 0.5,
                stagger: 0.015,
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
      className="
        py-12 sm:py-16
        bg-white dark:bg-zinc-950
        flex flex-col
        gap-7 sm:gap-9
        overflow-hidden
      "
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="
          text-center
          text-sm sm:text-base
          font-semibold
          text-zinc-900 dark:text-zinc-100
          px-6
        "
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        Trusted by the world’s most innovative teams
      </h2>

      {/* Marquee */}
      <div
        className="
          relative
          flex flex-col
          gap-4 sm:gap-5
          w-full
          bg-white dark:bg-zinc-950
          py-2
        "
      >
        {/* Gradient Masks */}
        <div
          className="
            pointer-events-none
            absolute inset-y-0 left-0 z-10
            w-12 sm:w-24
            bg-gradient-to-r
            from-white to-transparent
            dark:from-zinc-950
          "
        />

        <div
          className="
            pointer-events-none
            absolute inset-y-0 right-0 z-10
            w-12 sm:w-24
            bg-gradient-to-l
            from-white to-transparent
            dark:from-zinc-950
          "
        />

        <style>{`
          @keyframes marquee-rtl {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes marquee-ltr {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0%);
            }
          }

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

        {/* Lane 1 */}
        <div className="flex w-max animate-marquee-rtl-1 hover:[animation-play-state:paused]">
          {[...lane1, ...lane1].map((brand, index) => (
            <LogoItem
              key={`lane1-${brand.name}-${index}`}
              brand={brand}
            />
          ))}
        </div>

        {/* Lane 2 */}
        <div className="flex w-max animate-marquee-ltr-2 hover:[animation-play-state:paused]">
          {[...lane2, ...lane2].map((brand, index) => (
            <LogoItem
              key={`lane2-${brand.name}-${index}`}
              brand={brand}
            />
          ))}
        </div>

        {/* Lane 3 */}
        <div className="flex w-max animate-marquee-rtl-3 hover:[animation-play-state:paused]">
          {[...lane3, ...lane3].map((brand, index) => (
            <LogoItem
              key={`lane3-${brand.name}-${index}`}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({
  brand,
}: {
  brand: { name: string; src: string };
}) {
  return (
    <div
      className="
        flex
        w-[140px] sm:w-[180px]
        shrink-0
        items-center
        justify-center
        px-3
      "
    >
      <img
        src={brand.src}
        alt={`${brand.name} logo`}
        className="
          max-h-7 sm:max-h-8
          w-auto
          max-w-[110px] sm:max-w-[125px]
          object-contain
          transition-transform
          duration-300
          hover:scale-110
        "
      />
    </div>
  );
}