import gsap from "gsap";

export function initHeroAnimation() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.from("#hero-eyebrow", {
    opacity: 0,
    y: 50,
    duration: 0.8,
  });

  tl.from(".hero-line", {
    opacity: 0,
    y: 120,
    stagger: 0.12,
    duration: 0.9,
  }, "-=0.3");

  tl.from("#hero-description", {
    opacity: 0,
    y: 30,
    duration: 0.6,
  }, "-=0.4");

  tl.from("#hero-buttons", {
    opacity: 0,
    y: 30,
    duration: 0.6,
  }, "-=0.4");

  tl.from("#hero-stats > div", {
    opacity: 0,
    y: 25,
    stagger: 0.12,
    duration: 0.5,
  }, "-=0.3");
}