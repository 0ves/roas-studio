import gsap from "gsap";

export function initHero() {
  const hero = document.querySelector(".hero-title");

  if (!hero) return;

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
  });

  tl.from(".hero-badge", {
    opacity: 0,
    y: 20,
  })
    .from(
      ".hero-title",
      {
        opacity: 0,
        y: 30,
      },
      "-=0.45"
    )
    .from(
      ".hero-text",
      {
        opacity: 0,
        y: 24,
      },
      "-=0.55"
    )
    .from(
      ".hero-buttons",
      {
        opacity: 0,
        y: 20,
      },
      "-=0.55"
    )
    .from(
      ".hero-image",
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
      },
      "-=0.45"
    )
    .from(
      ".hero-card",
      {
        opacity: 0,
        y: 24,
      },
      "-=0.45"
    );
}