import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";

type CTAButtonProps = {
  href: string;
  label: string;
};

export default function CTAButton({ href, label }: CTAButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-base font-medium",
        "transition-all duration-300",
      )}
    >
      <span>{label}</span>

      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
