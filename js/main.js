/* Shirdi Sai Mandir — site interactions (vanilla, no dependencies) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---- Mobile menu toggle ---- */
    var menuBtn = document.getElementById("menu-btn");
    var mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", function () {
        var open = mobileMenu.hasAttribute("hidden") === false;
        if (open) {
          mobileMenu.setAttribute("hidden", "");
          menuBtn.setAttribute("aria-expanded", "false");
        } else {
          mobileMenu.removeAttribute("hidden");
          menuBtn.setAttribute("aria-expanded", "true");
        }
      });
      // close on link click
      mobileMenu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobileMenu.setAttribute("hidden", "");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ---- Sticky header shadow on scroll ---- */
    var header = document.getElementById("site-header");
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 20) {
          header.classList.add("shadow-soft", "bg-cream/95");
          header.classList.remove("bg-cream/80");
        } else {
          header.classList.remove("shadow-soft", "bg-cream/95");
          header.classList.add("bg-cream/80");
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---- Scroll reveal via IntersectionObserver ---- */
    var reveals = document.querySelectorAll(".reveal");
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }

    /* ---- Current year in footer ---- */
    var yr = document.getElementById("year");
    if (yr) { yr.textContent = new Date().getFullYear(); }

    /* ---- Contact / enquiry form (UI-only — submission is a TODO) ----
       NOTE: Backend submission is intentionally NOT wired yet. To connect to
       Kora's platform later, follow static_reference_packs/site_runtime/contract.md:
       POST <apiBaseUrl>/api/v1/public/forms/submit with reCAPTCHA. */
    document.querySelectorAll("form[data-kora-form]").forEach(function (form) {
      var status = form.querySelector("[data-form-status]");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (form.querySelector('[name="name"]') || {}).value || "";
        var email = (form.querySelector('[name="email"]') || {}).value || "";
        var message = (form.querySelector('[name="message"]') || {}).value || "";
        var errs = [];
        if (!name.trim()) errs.push("name");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.push("email");
        if (!message.trim()) errs.push("message");

        form.querySelectorAll("[data-error]").forEach(function (n) { n.textContent = ""; });
        if (errs.length) {
          errs.forEach(function (field) {
            var slot = form.querySelector('[data-error="' + field + '"]');
            if (slot) slot.textContent = "Please enter a valid " + field + ".";
          });
          if (status) { status.textContent = ""; }
          var firstBad = form.querySelector('[name="' + errs[0] + '"]');
          if (firstBad) firstBad.focus();
          return;
        }
        if (status) {
          status.className = "mt-4 rounded-lg bg-gold/15 border border-gold/40 px-4 py-3 text-sm text-maroon-dark";
          status.textContent = "Thank you, " + name.trim() + ". This form is not yet connected to email — please call (703) 661-4724 or email the temple directly. (Submission backend is a pending TODO.)";
        }
        form.reset();
      });
    });
  });
})();
