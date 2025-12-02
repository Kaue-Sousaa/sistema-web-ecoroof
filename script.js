document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector(".nav-list");
  const header = document.querySelector(".header");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", function () {
      navList.classList.toggle("active");

      const isExpanded = navList.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
      menuToggle.textContent = isExpanded ? "✕" : "☰";
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentNode;
      const content = this.nextElementSibling;

      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem
            .querySelector(".accordion-content")
            .classList.remove("active");
        }
      });

      content.classList.toggle("active");
    });
  });

  function handleScrollHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScrollHeader);
  handleScrollHeader();

  const animatedElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  const contactForm = document.querySelector(".contact-form-new");
  const submitButton = document.querySelector(".btn-submit");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      emailjs.sendForm("service_w6gqgli", "template_yojp2me", this).then(
        function () {
          alert(
            "Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
          );
          contactForm.reset();
          submitButton.textContent = "Enviar mensagem";
          submitButton.disabled = false;
        },
        function (error) {
          console.log("FALHA NO ENVIO...", error);
          alert(
            "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde."
          );
          submitButton.textContent = "Tentar novamente";
          submitButton.disabled = false;
        }
      );
    });
  }
});
