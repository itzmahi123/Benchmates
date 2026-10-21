// Benchmates Photography Studio interactions.
// IMPORTANT: replace this placeholder with your real booking email before launch.
const STUDIO_EMAIL = "your-email@example.com";

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !open);
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-kind]").forEach(item => item.addEventListener("click", () => {
  const select = document.querySelector("#shootType");
  if (!select) return;
  const match = Array.from(select.options).find(option => option.textContent === item.dataset.kind);
  if (match) select.value = match.value;
}));

const form = document.querySelector("#bookingForm");
const status = document.querySelector("#formStatus");
if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  if (STUDIO_EMAIL === "your-email@example.com") {
    if (status) status.textContent = "Demo only: open photography.js and replace STUDIO_EMAIL with your real email address.";
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Photography enquiry — ${data.get("service")}`);
  const body = encodeURIComponent(
    `Hello Benchmates Photography Studio,\n\nName: ${data.get("name")}\nEmail or phone: ${data.get("contact")}\nShoot type: ${data.get("service")}\n\nDetails:\n${data.get("details") || "I'd like to discuss a shoot."}\n\nThank you.`
  );
  if (status) status.textContent = "Your email app should open with the enquiry prepared. This demo form does not send messages directly.";
  window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
});
