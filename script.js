(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var backdrop = document.getElementById("navBackdrop");

  function openNav() {
    mobileNav.classList.add("open");
    backdrop.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  document.querySelectorAll("#mobileNav a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // Close mobile nav on escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Sticky header shadow on scroll
  var header = document.getElementById("siteHeader");
  var lastScrolled = false;
  function onScroll() {
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastScrolled) {
      header.style.boxShadow = scrolled ? "0 6px 20px rgba(14,59,59,0.08)" : "none";
      lastScrolled = scrolled;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // One orchestrated reveal for hero content on load
  var heroCopy = document.querySelector(".hero-copy");
  var heroVisual = document.querySelector(".hero-visual");
  if (heroCopy && heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    [heroCopy, heroVisual].forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .7s ease, transform .7s ease";
    });
    requestAnimationFrame(function () {
      setTimeout(function () {
        heroCopy.style.opacity = "1";
        heroCopy.style.transform = "none";
      }, 60);
      setTimeout(function () {
        heroVisual.style.opacity = "1";
        heroVisual.style.transform = "none";
      }, 180);
    });
  }
})();
