import { useEffect, useState } from "react";
import { siteConfig } from "../../data/site";

export function useActiveSection(isMenuOpen: boolean) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = siteConfig.navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update the active section while the menu is open
        if (isMenuOpen) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMenuOpen]);

  return activeSection;
}