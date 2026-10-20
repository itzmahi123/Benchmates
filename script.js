// BENCHMATES website interactions
// Before launch, replace CONTACT_EMAIL with the official Benchmates email address.
const CONTACT_EMAIL = "hello@benchmates.in";

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Fill the year automatically.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Venture cards can preselect the relevant contact interest.
document.querySelectorAll("[data-venture]").forEach((link) => {
  link.addEventListener("click", () => {
    const interest = document.querySelector("#interest");
    if (interest) interest.value = link.dataset.venture;
  });
});

// Prepare a message in the visitor's default email app.
// This does not send anything automatically.
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "General collaboration");
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Benchmates enquiry — ${interest}`);
    const body = encodeURIComponent(
      `Hi Benchmates,\n\nMy name is ${name}.\nMy email or phone: ${contact}\nI'm interested in: ${interest}\n\nMy idea:\n${message || "I'd like to know more."}\n\nThank you.`
    );

    if (CONTACT_EMAIL === "hello@benchmates.in") {
      if (formNote) {
        formNote.textContent = "Demo contact email is still set. Open script.js and replace hello@benchmates.in with your official email before launch.";
      }
    }
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
