export function initNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };

  onScroll();

  window.addEventListener("scroll", onScroll);
}