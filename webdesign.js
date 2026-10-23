// Benchmates Web Hub interactions.
// IMPORTANT: replace this placeholder with your real email before launch.
const STUDIO_EMAIL = "your-email@example.com";

const menu = document.querySelector("#menu"), nav = document.querySelector("#nav");
const setMenu = open => {
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("open", open);
};
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

document.querySelector("#year").textContent = new Date().getFullYear();

// Device preview switcher
const frame = document.querySelector("#frame");
const devices = document.querySelectorAll(".devices button");
devices.forEach(btn => btn.addEventListener("click", () => {
  devices.forEach(b => b.classList.toggle("on", b === btn));
  frame.dataset.w = btn.dataset.w;
}));

// Project filter
const filters = document.querySelectorAll(".filters button");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.toggle("on", b === btn));
  document.querySelectorAll(".card").forEach(c => {
    c.hidden = btn.dataset.f !== "all" && c.dataset.type !== btn.dataset.f;
  });
}));

// Pre-select service from cards, services and packages
document.querySelectorAll("[data-kind]").forEach(el => el.addEventListener("click", () => {
  const select = document.querySelector("#s");
  const match = Array.from(select.options).find(o => o.textContent === el.dataset.kind);
  if (match) select.value = match.value;
}));

// Quote form (opens the visitor's email app)
const form = document.querySelector("#form"), status = document.querySelector("#status");
form.addEventListener("submit", e => {
  e.preventDefault();
  if (STUDIO_EMAIL === "your-email@example.com") {
    status.textContent = "Demo only: open webdesign.js and replace STUDIO_EMAIL with your real email address.";
    return;
  }
  const d = new FormData(form);
  const subject = encodeURIComponent(`Website quote request — ${d.get("service")}`);
  const body = encodeURIComponent(
    `Hello Benchmates Web Hub,\n\nName: ${d.get("name")}\nContact: ${d.get("contact")}\nService: ${d.get("service")}\nBudget: ${d.get("budget")}\n\nAbout the project:\n${d.get("details") || "I'd like a quote."}\n\nThank you.`
  );
  status.textContent = "Your email app should open with the request ready to send. This form doesn't send messages directly.";
  window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
});
