import { useEffect, useState } from "react";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import CTAButton from "./CTAButton";
import MenuButton from "./MenuButton";
import MobileNav from "./MobileNav";

import { siteConfig } from "../../data/site";
import { cn } from "../../lib/cn";
import { useScroll } from "../hooks/useScroll";
import { useActiveSection } from "../hooks/useActiveSection";

// ⚠️ We'll implement this next
// import { lenis } from "../../lib/lenis";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isScrolled } = useScroll();
  const activeSection = useActiveSection(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Temporary scroll lock.
    // We'll replace this with lenis.stop() in the next step.
    document.documentElement.style.overflow = isMenuOpen ? "hidden" : "";
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
  className={cn(
    "fixed inset-x-0 top-0 z-50 transition-all duration-10 ease-out",

    isMenuOpen
      ? "bg-white border-b border-neutral-200 shadow-sm"
      : isScrolled
      ? "bg-white/80 border-b border-neutral-200/80 shadow-sm backdrop-blur-xl"
      : "bg-transparent"
  )}
>
      <nav className="mx-auto grid h-20 max-w-[1320px] grid-cols-[1fr_auto_auto] items-center gap-10 px-6 lg:px-10">
        <Logo />

        <DesktopNav activeSection={activeSection} />

        <div className="flex items-center gap-5">
          <div className="hidden lg:block">
            <CTAButton
              href={siteConfig.cta.href}
              label={siteConfig.cta.label}
            />
          </div>

          <div className="ml-1 lg:ml-0">
            <MenuButton isOpen={isMenuOpen} onToggle={toggleMenu} />
          </div>
        </div>
      </nav>

      <MobileNav isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
