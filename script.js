const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".navbar");
const navLinksClass = document.querySelectorAll(".nav-links a[data-link]");
const section = document.querySelectorAll(".section");
const sel = document.body;
var scroll = new LocomotiveScroll({
  el: sel,
  smooth: true,
});

// ✅ Updated Scroll Listener
window.addEventListener("scroll", () => {
  // Navbar scroll class toggle
  if (window.scrollY > 50) {
    header.classList.add("navbar-scroll");
  } else {
    header.classList.remove("navbar-scroll");
  }
});

// ✅ Mobile menu toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ✅ Section fade-in animation observer
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  containers.forEach((container) => observer.observe(container));

  // ✅ HR animation observer
  const hrElements = document.querySelectorAll("hr");
  const hrObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-hr");
        }
      });
    },
    { threshold: 0.1 }
  );

  hrElements.forEach((hr) => hrObserver.observe(hr));
});
