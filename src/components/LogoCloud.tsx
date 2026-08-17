import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { 
  Gamepad2, 
  PenTool, 
  Zap, 
  Droplets, 
  Leaf, 
  Scissors, 
  ShoppingBag, 
  Wind,
  Hexagon,
  Cookie
} from 'lucide-react';

// Your updated brand list
const brands = [
  { name: 'Crocs', icon: Hexagon },
  { name: 'We Play Games', icon: Gamepad2 },
  { name: 'XPPen India', icon: PenTool },
  { name: 'Headshot Energy Drink', icon: Zap },
  { name: 'Snaaqs', icon: Cookie },
  { name: 'Dove Men', icon: Droplets },
  { name: 'Garnier', icon: Leaf },
  { name: 'The Pant Project', icon: Scissors },
  { name: 'Myntra FWD', icon: ShoppingBag },
  { name: 'Aprillia Tuono 457', icon: Wind },
];

export default function LogoCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Animate Heading with SplitType when scrolling into view
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
      className="py-24 sm:py-32 bg-white dark:bg-zinc-950 flex flex-col gap-12"
    >
      <h2 
        ref={headingRef}
        className="text-center text-lg/8 font-semibold text-zinc-900 dark:text-zinc-100 px-6"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} 
      >
        Trusted by the world’s most innovative teams
      </h2>
      
      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden bg-white dark:bg-zinc-950 py-4">
        
        {/* Gradient Masks for a smooth fade effect on the left and right edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-zinc-950 sm:w-40"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-zinc-950 sm:w-40"></div>

        {/* 
          Inline styles for the keyframes ensure it works immediately 
          without needing to touch your Tailwind config file.
        */}
        <style>{`
          @keyframes marquee-ltr {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-ltr {
            animation: marquee-ltr 40s linear infinite;
          }
        `}</style>

        {/* 
          The Track: Pauses when the user hovers over it.
          We render the list twice to create a seamless infinite loop.
        */}
        <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div
                key={`${brand.name}-${index}`}
                className="flex w-[250px] sm:w-[300px] shrink-0 items-center justify-center"
              >
                <div className="flex items-center gap-3 text-zinc-400 transition-all duration-300 hover:text-zinc-900 hover:scale-110 dark:text-zinc-500 dark:hover:text-white cursor-pointer">
                  <Icon className="h-8 w-8 stroke-[1.5] shrink-0" />
                  <span className="font-bold text-xl tracking-tight whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}