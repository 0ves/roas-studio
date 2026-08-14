import { siteConfig } from "../../data/site";
import { cn } from "../../lib/cn";
type DesktopNavProps = {
  activeSection: string;
};
export default function DesktopNav({ activeSection }: DesktopNavProps) {
    
  return (
    <nav className="hidden items-center gap-10 lg:flex">
  {siteConfig.navigation.map((item) => (
    <a
      key={item.id}
      href={item.href}
      className={cn(
        "relative py-2 text-[15px] transition-colors duration-200",
        activeSection === item.id
          ? "text-neutral-950"
          : "text-neutral-500 hover:text-neutral-900"
      )}
    >
      {item.label}

      <span
        className={cn(
          "absolute bottom-0 left-0 h-px bg-current transition-all duration-200",
          activeSection === item.id ? "w-full" : "w-0"
        )}
      />
    </a>
  ))}
</nav>
  );
}
