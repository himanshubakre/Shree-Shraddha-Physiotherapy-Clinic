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

  // Appointment request form -> validate, then hand off to WhatsApp
  var appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    var nameField = document.getElementById("af-name");
    var phoneField = document.getElementById("af-phone");
    var dateField = document.getElementById("af-date");
    var timeField = document.getElementById("af-time");
    var concernField = document.getElementById("af-concern");
    var statusEl = document.getElementById("formStatus");

    function setError(fieldRow, show) {
      if (show) {
        fieldRow.classList.add("has-error");
      } else {
        fieldRow.classList.remove("has-error");
      }
    }

    function formatDate(value) {
      if (!value) return "Not specified";
      var parts = value.split("-");
      if (parts.length !== 3) return value;
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }

    function formatTime(value) {
      if (!value) return "Not specified";
      var parts = value.split(":");
      if (parts.length < 2) return value;
      var h = Number(parts[0]);
      var m = parts[1];
      var suffix = h >= 12 ? "PM" : "AM";
      var h12 = h % 12 === 0 ? 12 : h % 12;
      return h12 + ":" + m + " " + suffix;
    }

    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameRow = nameField.closest(".form-row");
      var phoneRow = phoneField.closest(".form-row");
      var nameValid = nameField.value.trim().length > 1;
      var phoneDigits = phoneField.value.replace(/\D/g, "");
      var phoneValid = phoneDigits.length >= 10;

      setError(nameRow, !nameValid);
      setError(phoneRow, !phoneValid);

      if (!nameValid || !phoneValid) {
        statusEl.textContent = "Please fill in the required fields above.";
        return;
      }

      statusEl.textContent = "Opening WhatsApp with your request...";

      var lines = [
        "Hello, I would like to request an appointment at Shree Shraddha Physiotherapy Clinic.",
        "",
        "Name: " + nameField.value.trim(),
        "Phone: " + phoneField.value.trim(),
        "Preferred Date: " + formatDate(dateField.value),
        "Preferred Time: " + formatTime(timeField.value),
        "Concern: " + (concernField.value.trim() || "Not specified")
      ];

      var message = encodeURIComponent(lines.join("\n"));
      var waUrl = "https://wa.me/918355947884?text=" + message;
      window.open(waUrl, "_blank", "noopener");
    });

    [nameField, phoneField].forEach(function (field) {
      field.addEventListener("input", function () {
        setError(field.closest(".form-row"), false);
        statusEl.textContent = "";
      });
    });
  }

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
