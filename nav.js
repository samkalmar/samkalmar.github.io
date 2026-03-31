/* ============================================================
   nav.js — Shared site navigation
   Include on every page: <script src="nav.js"></script>
   ============================================================ */

(function () {
  const links = [
    { label: "Home",       href: "index.html" },
    { label: "Projects",   href: "projects.html" },
    { label: "Experience", href: "experience.html" },
    { label: "Contact",    href: "contact.html" },
    { label: "JO App",     href: "app.html" },
  ];

  /* ── Build the header HTML ─────────────────────────────── */
  function buildHeader() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = links
      .map(({ label, href }) => {
        const isActive = href === currentPage;
        return `<a href="${href}"${isActive ? ' aria-current="page"' : ""}>${label}</a>`;
      })
      .join("\n      ");

    return `
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="logo" aria-label="SK — home" role="img">SK</div>

  <button
    class="nav-toggle"
    aria-label="Open navigation menu"
    aria-expanded="false"
    aria-controls="primary-nav"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <nav id="primary-nav" role="navigation" aria-label="Primary">
    ${navLinks}
  </nav>`;
  }

  /* ── Inject into <header> ──────────────────────────────── */
  function injectNav() {
    const header = document.querySelector("header");
    if (!header) return;
    header.innerHTML = buildHeader();
    attachToggle();
  }

  /* ── Hamburger toggle logic ────────────────────────────── */
  function attachToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav    = document.querySelector("#primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    /* Close drawer when a link is clicked (smooth on mobile) */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    /* Close drawer on Escape key */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.focus();
      }
    });

    /* Close drawer when clicking outside the header */
    document.addEventListener("click", function (e) {
      const header = document.querySelector("header");
      if (header && !header.contains(e.target) && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  /* ── Run after DOM is ready ────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav);
  } else {
    injectNav();
  }
})();
