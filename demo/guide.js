(function () {
  const body = document.body;
  const nav = document.querySelector("[data-nav]");
  const navLinks = Array.from(document.querySelectorAll(".side-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function closeNav() {
    nav?.classList.remove("is-open");
  }

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const navLink = event.target.closest(".side-nav a");

    if (navLink) {
      closeNav();
    }

    if (!actionButton) return;

    if (actionButton.dataset.action === "toggle-nav") {
      nav?.classList.toggle("is-open");
    }

    if (actionButton.dataset.action === "screen-mode") {
      const isActive = body.classList.toggle("screen-share");
      actionButton.setAttribute("aria-pressed", String(isActive));
      actionButton.textContent = isActive ? "Mostrar guia interno" : "Modo compartilhar tela";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", isActive);
        });
      },
      {
        rootMargin: "-20% 0px -62% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll("[data-checklist]").forEach((list) => {
    const key = `guide-checklist:${list.dataset.checklist}`;
    const inputs = Array.from(list.querySelectorAll("input[type='checkbox']"));
    let saved = [];

    try {
      saved = JSON.parse(window.localStorage.getItem(key) || "[]");
    } catch {
      saved = [];
    }

    inputs.forEach((input, index) => {
      input.checked = Boolean(saved[index]);
      input.addEventListener("change", () => {
        const values = inputs.map((item) => item.checked);
        window.localStorage.setItem(key, JSON.stringify(values));
      });
    });
  });
})();
