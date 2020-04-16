document.addEventListener("DOMContentLoaded", function () {
  const navbarToggle = document.querySelector(".navbar__toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  navbarToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("mobile-menu--active");
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("mobile-menu--active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      navbarToggle.contains(event.target) || mobileMenu.contains(event.target);

    if (!isClickInsideNav) {
      mobileMenu.classList.remove("mobile-menu--active");
    }
  });

  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll(".faq__question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("faq__item--active");

      // Close all FAQ items
      document.querySelectorAll(".faq__item").forEach((item) => {
        item.classList.remove("faq__item--active");
        item.querySelector(".faq__question").setAttribute("aria-expanded", "false");
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        faqItem.classList.add("faq__item--active");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });
});
