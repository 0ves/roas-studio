import gsap from "gsap";
import SplitType from "split-type";

export function initHero() {
  const hero = document.querySelector("#hero") as HTMLElement;

  if (!hero) return;

  const bg = hero.querySelector(".hero-bg") as HTMLElement;
  const panel = hero.querySelector(".hero-panel") as HTMLElement;
  const cards = hero.querySelectorAll(".hero-card");
  const title = hero.querySelector(".hero-title") as HTMLElement;
  const description = hero.querySelector(".hero-description") as HTMLElement;
  const badge = hero.querySelector(".hero-badge") as HTMLElement;
  const buttons = hero.querySelectorAll(".button");

  // Split heading
  const split = new SplitType(title, {
    types: "lines, words",
  });

  gsap.set(bg, {
    scale: 1.15,
  });

  gsap.set(panel, {
    opacity: 0,
    y: 40,
  });

  gsap.set(cards, {
    opacity: 0,
    y: 40,
  });

  gsap.set(description, {
    opacity: 0,
    y: 20,
  });

  gsap.set(buttons, {
    opacity: 0,
    y: 20,
  });

  gsap.set(badge, {
    opacity: 0,
    y: 10,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  tl.to(bg, {
    scale: 1,
    duration: 2,
  })

    .to(
      panel,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      "-=1.5"
    )

    .to(
      badge,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      "-=0.5"
    )

    .from(
      split.words,
      {
        yPercent: 120,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
      },
      "-=0.2"
    )

    .to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.3"
    )

    .to(
      buttons,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
      },
      "-=0.2"
    )

    .to(
      cards,
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
      },
      "-=0.4"
    );

  // Floating cards

  cards.forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 ? -10 : 10,
      repeat: -1,
      yoyo: true,
      duration: 3 + index,
      ease: "sine.inOut",
    });
  });

  // Background breathing

  gsap.to(bg, {
    scale: 1.03,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Mouse Parallax

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(bg, {
      x: x * -25,
      y: y * -25,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(panel, {
      x: x * 12,
      y: y * 12,
      duration: 0.8,
      ease: "power3.out",
    });

    cards.forEach((card, i) => {
      const amount = i % 2 ? 18 : -18;

      gsap.to(card, {
        x: x * amount,
        y: y * amount,
        duration: 1,
        ease: "power3.out",
      });
    });
  });

  hero.addEventListener("mouseleave", () => {
    gsap.to([bg, panel, ...cards], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  });
}