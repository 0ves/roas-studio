type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <a
      href="/"
      className={`text-[16px] font-semibold tracking-[-0.02em] ${className}`}
    >
      ROAS STUDIO
    </a>
  );
}