import { cn } from "../../lib/cn";
import { siteConfig } from "../../data/site";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div
      id="mobile-navigation"
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-40 lg:hidden bg-white",
        "transition-opacity duration-300 ease-out",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col",
          "transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
          <span className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium uppercase tracking-[0.18em]"
          >
            Close
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 items-center px-6">
          <ul className="w-full space-y-10">
            {siteConfig.navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group grid grid-cols-[40px_1fr] items-center py-2",
                    "transition-all duration-300",
                  )}
                >
                  <span className="text-xs tabular-nums text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-3xl font-medium tracking-tight">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer CTA */}
        <footer className="flex justify-end border-t border-neutral-200 px-6 py-6">
          <a
            href={siteConfig.cta.href}
            onClick={onClose}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap",
              "text-base font-medium",
              "transition-all duration-300",
            )}
          >
            <span>{siteConfig.cta.label}</span>
            <span aria-hidden="true">{"\u2197"}</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
