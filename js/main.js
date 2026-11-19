"use strict";

/* ============================================================
   FORM ENDPOINT — SET THIS BEFORE LAUNCH
   ------------------------------------------------------------
   1. Create a free form at https://formspree.io
   2. Copy your endpoint, e.g. "https://formspree.io/f/abcdwxyz"
   3. Paste it below, replacing the placeholder.
   While the placeholder is present the form will not send and
   will show a clear, honest message to visitors instead.
   ============================================================ */
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

/* ---------- Helpers ---------- */
const esc = (value) =>
  String(value == null ? "" : value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[char];
  });

const data = window.SITE_DATA || {};
const site = data.site || {};
const contact = data.contact || {};
const donation = data.donation || {};

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Content rendering ---------- */
function renderImpact() {
  const stats = document.getElementById("stats");
  const note = document.getElementById("impact-note");
  const impact = data.impact || {};

  if (!stats) return;

  if (impact.verified && Array.isArray(impact.stats) && impact.stats.length) {
    const icons = {
      volunteers:
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M16.5 18.5a5 5 0 0 0-9 0M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7 6.5a4.5 4.5 0 0 0-4-4.4M1.5 19a4.5 4.5 0 0 1 4-4.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      donations:
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M12 20c-4.4-2.4-8-5.5-8-9.1a4.3 4.3 0 0 1 8-1.8 4.3 4.3 0 0 1 8 1.8c0 3.6-3.6 6.7-8 9.1Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
      projects:
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="m12 3 9 5-9 5-9-5 9-5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M3 13.5 12 18.5l9-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
      missions:
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M6 4v16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M6 5h12l-2.5 4L18 13H6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    };

    stats.innerHTML = impact.stats
      .map(
        (item) => `
        <div class="stat reveal">
          <span class="stat__icon">${icons[item.icon] || icons.projects}</span>
          <span>
            <span class="stat__value">${esc(item.value)}</span>
            <span class="stat__label">${esc(item.label)}</span>
          </span>
        </div>`
      )
      .join("");
    if (note) note.style.display = "none";
    return;
  }

  stats.style.display = "none";
}

function renderEvents() {
  const list = document.getElementById("events-list");
  if (!list || !Array.isArray(data.events)) return;

  const pin =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
    "</svg>";

  list.innerHTML = data.events
    .map(
      (event) => `
      <article class="event-card reveal">
        <p class="tag">${esc(event.label || "Past event")}</p>
        <p class="event-card__date"><time datetime="${esc(event.date)}">${esc(event.displayDate)}</time></p>
        <h3>${esc(event.title)}</h3>
        <p class="event-card__place">${pin}<span>${esc(event.location)}</span></p>
      </article>`
    )
    .join("");
}

function renderNews() {
  const grid = document.getElementById("news-grid");
  if (!grid || !Array.isArray(data.news)) return;

  grid.innerHTML = data.news
    .map(
      (item) => `
      <article class="news-card reveal">
        <p class="tag tag--lavender">News</p>
        <h3>${esc(item.title)}</h3>
        <p class="news-card__meta">
          <time datetime="${esc(item.date)}">${esc(item.displayDate)}</time>
          <span aria-hidden="true">·</span>
          <span>By ${esc(item.author)}</span>
        </p>
        <p class="news-card__excerpt">${esc(item.excerpt || "[excerpt to be supplied]")}</p>
      </article>`
    )
    .join("");
}

function renderDonation() {
  const container = document.getElementById("donation-details");
  if (!container) return;

  const bank = donation.bank || {};
  const mmHref = donation.mobileMoneyHref || `tel:${String(donation.mobileMoney || "").replace(/\s+/g, "")}`;

  container.innerHTML = `
    <div class="detail">
      <p class="detail__label">Mobile money</p>
      <p class="detail__value">
        <a href="${esc(mmHref)}">${esc(donation.mobileMoney || "To be supplied")}</a>
      </p>
    </div>
    <div class="detail">
      <p class="detail__label">Bank transfer</p>
      <dl class="detail__list">
        <div><dt>Bank</dt><dd>${esc(bank.name || "To be supplied")}</dd></div>
        <div><dt>Account name</dt><dd>${esc(bank.accountName || "To be supplied")}</dd></div>
        <div><dt>Account no.</dt><dd>${esc(bank.accountNumber || "To be supplied")}</dd></div>
      </dl>
    </div>`;

  const note = document.getElementById("donation-note");
  if (note && donation.note) note.textContent = donation.note;
}

function renderContact() {
  const list = document.getElementById("footer-contact");
  const address = document.getElementById("footer-address");
  if (address && contact.address) address.textContent = contact.address;
  if (!list) return;

  const icons = {
    phone:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3.8h3l1.5 3.8-2 1.4a11 11 0 0 0 5.9 5.9l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A17.4 17.4 0 0 1 4.6 6a2 2 0 0 1 2-2.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5.2" width="18" height="13.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4.2 6.8 7.8 6 7.8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const rows = [];
  if (contact.phone) {
    rows.push(
      `<li><a href="${esc(contact.phoneHref || `tel:${contact.phone.replace(/\s+/g, "")}`)}">${icons.phone}<span>${esc(contact.phone)}</span></a></li>`
    );
  }
  if (contact.mobile) {
    rows.push(
      `<li><a href="${esc(contact.mobileHref || `tel:${contact.mobile.replace(/\s+/g, "")}`)}">${icons.phone}<span>${esc(contact.mobile)}</span></a></li>`
    );
  }
  if (contact.email) {
    rows.push(
      `<li><a href="mailto:${esc(contact.email)}">${icons.email}<span>${esc(contact.email)}</span></a></li>`
    );
  }
  list.innerHTML = rows.join("");
}

function renderYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------- Header & mobile menu ---------- */
function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setMenu(!isOpen()));

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) return;
    if (!event.target.closest(".site-header")) setMenu(false);
  });

  const desktop = window.matchMedia("(min-width: 900px)");
  const onChange = (event) => {
    if (event.matches) setMenu(false);
  };
  if (desktop.addEventListener) desktop.addEventListener("change", onChange);
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- Enquiry form ---------- */
function initForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  const labelEl = submitBtn ? submitBtn.querySelector(".btn__label") : null;
  const defaultLabel = labelEl ? labelEl.textContent : "Send enquiry";

  const rules = {
    name: (value) => value.trim().length >= 2 || "Please enter your name.",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) || "Please enter a valid email address.",
    phone: (value) =>
      !value.trim() || /^[+()\d][\d\s()+.-]{6,}$/.test(value.trim()) ||
      "Please enter a valid phone number, or leave it blank.",
    interest: (value) => value !== "" || "Please choose what you are interested in.",
    message: (value) => value.trim().length >= 10 || "Please write at least 10 characters.",
  };

  const fieldFor = (name) => form.elements[name];
  const wrapperFor = (el) => (el ? el.closest(".field") : null);

  const setError = (name, message) => {
    const el = fieldFor(name);
    if (!el) return;
    const wrapper = wrapperFor(el);
    const errorEl = document.getElementById(`${name}-error`);
    if (wrapper) wrapper.classList.toggle("is-invalid", Boolean(message));
    el.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message || "";
  };

  const validateField = (name) => {
    const el = fieldFor(name);
    if (!el) return true;
    const result = rules[name](el.value);
    const message = result === true ? "" : result;
    setError(name, message);
    return !message;
  };

  Object.keys(rules).forEach((name) => {
    const el = fieldFor(name);
    if (!el) return;

    el.addEventListener("blur", () => validateField(name));

    const inputEvent = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(inputEvent, () => {
      if (validateField(name) && statusEl && statusEl.classList.contains("is-error")) {
        statusEl.textContent = "";
        statusEl.className = "form-status";
      }
    });
  });

  const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = message ? `form-status is-${type}` : "form-status";
  };

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle("is-loading", loading);
    if (labelEl) labelEl.textContent = loading ? "Sending…" : defaultLabel;
  };

  const fallbackContact =
    "Alternatively, email info@thebrotherfoundation.org or call 024 418 85 41.";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* Honeypot: bots fill this hidden field. Exit quietly. */
    const honeypot = form.elements.company;
    if (honeypot && honeypot.value.trim() !== "") return;

    const names = Object.keys(rules);
    const results = names.map((name) => validateField(name));
    if (results.includes(false)) {
      const firstInvalid = names.find((name) => {
        const el = fieldFor(name);
        return el && el.getAttribute("aria-invalid") === "true";
      });
      if (firstInvalid) fieldFor(firstInvalid).focus();
      setStatus("Please check the highlighted fields and try again.", "error");
      return;
    }

    if (/REPLACE_ME/i.test(FORM_ENDPOINT)) {
      setStatus(
        `The enquiry form is not connected yet. ${fallbackContact}`,
        "error"
      );
      return;
    }

    setLoading(true);
    setStatus("", "");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);

      form.reset();
      names.forEach((name) => setError(name, ""));
      setStatus(
        "Thank you — your enquiry has been sent. We will get back to you soon.",
        "success"
      );
      submitBtn.focus({ preventScroll: true });
    } catch (error) {
      setStatus(
        `Sorry, your enquiry could not be sent just now. Please try again. ${fallbackContact}`,
        "error"
      );
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  });
}

/* ---------- Boot ---------- */
function init() {
  renderImpact();
  renderEvents();
  renderNews();
  renderDonation();
  renderContact();
  renderYear();
  initHeader();
  initMenu();
  initReveal();
  initForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
