import type { MenuButtonProps } from "./types";

export default function MenuButton({
  isOpen,
  onToggle,
}: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center lg:hidden pl-12"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      MENU
    </button>
  );
}