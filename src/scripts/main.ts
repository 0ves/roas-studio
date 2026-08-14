import { createLenis } from "../lib/lenis";
import { initNavbar } from "./navbar";
import { initHero } from "./hero";

function init() {
  createLenis();
  initNavbar();
  initHero();
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("astro:page-load", init);