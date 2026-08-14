import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initInfluencerStack() {
  const wrapper = document.querySelector("#stack-wrapper");
  const pin = document.querySelector("#stack-pin");

  if (!wrapper || !pin) return;

  const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

  if (!cards.length) return;

  // Remove old triggers (important during Astro HMR)
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Initial state
  cards.forEach((card, index) => {
    gsap.set(card, {
      y: index * 40,
      scale: 1 - index * 0.05,
      opacity: 1,
      zIndex: cards.length - index,
    });

    const img = card.querySelector(".creator-image");

    if (img) {
      gsap.set(img, {
        scale: 1.1,
      });
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  cards.forEach((card, index) => {
    if (index === cards.length - 1) return;

    const img = card.querySelector(".creator-image");

    tl.to(
      card,
      {
        scale: 0.9,
        y: -120,
        filter: "brightness(.75)",
        ease: "none",
      },
      index
    );

    if (img) {
      tl.to(
        img,
        {
          scale: 1,
          ease: "none",
        },
        index
      );
    }

    const nextCard = cards[index + 1];

    tl.fromTo(
      nextCard,
      {
        y: 120,
        scale: 0.95,
      },
      {
        y: (index + 1) * 40,
        scale: 1,
        ease: "none",
      },
      index
    );
  });

  ScrollTrigger.refresh();
}