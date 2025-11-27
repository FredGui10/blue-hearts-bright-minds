window.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro-container");
  const logo = document.querySelector(".intro-logo");
  const title = document.querySelector(".intro-title");
  const subtitle = document.querySelector(".intro-subtitle");

  setTimeout(() => intro.classList.add("visible"), 200);
  setTimeout(() => logo.classList.add("visible"), 600);
  setTimeout(() => title.classList.add("visible"), 1200);
  setTimeout(() => subtitle.classList.add("visible"), 1800);
});
