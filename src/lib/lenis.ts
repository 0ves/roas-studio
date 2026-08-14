import Lenis from "lenis";

export function createLenis() {
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    smoothWheel: true,
  });

  return lenis;
}