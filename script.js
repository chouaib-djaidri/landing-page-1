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

  // Smooth scrolling and active navigation
  const navLinks = document.querySelectorAll(".navbar__link, .mobile-menu__link");
  const sections = document.querySelectorAll("section[id]");
  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  // Smooth scrolling when clicking navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - navbarHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbarHeight + 100;

    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Remove active class from all nav links
    navLinks.forEach((link) => {
      link.classList.remove("navbar__link--active", "mobile-menu__link--active");
    });

    // Add active class to current section's nav link
    if (currentSection) {
      const activeNavLink = document.querySelector(`.navbar__link[href="#${currentSection}"]`);
      const activeMobileLink = document.querySelector(`.mobile-menu__link[href="#${currentSection}"]`);

      if (activeNavLink) {
        activeNavLink.classList.add("navbar__link--active");
      }
      if (activeMobileLink) {
        activeMobileLink.classList.add("mobile-menu__link--active");
      }
    }
  }

  // Listen for scroll events
  window.addEventListener("scroll", updateActiveNavLink);

  // Call once on load to set initial active state
  updateActiveNavLink();
});
