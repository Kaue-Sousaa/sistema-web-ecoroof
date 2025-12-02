document.addEventListener("DOMContentLoaded", function () {
  // 1. Funcionalidade de Carrossel de Imagens

  // Seleciona todos os carrosséis da página
  const carousels = document.querySelectorAll("[id^='carousel-']");

  carousels.forEach((carousel) => {
    if (carousel) {
      const images = carousel.querySelectorAll(".carousel-img");
      const prevBtn = carousel.querySelector(".prev-btn");
      const nextBtn = carousel.querySelector(".next-btn");
      let currentIndex = 0;

      // Função para mostrar a imagem
      function showImage(index) {
        images.forEach((img, i) => {
          img.classList.remove("active-img");
          if (i === index) {
            img.classList.add("active-img");
          }
        });
      }

      // Navegação para a imagem anterior
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          currentIndex =
            currentIndex > 0 ? currentIndex - 1 : images.length - 1;
          showImage(currentIndex);
        });
      }

      // Navegação para a próxima imagem
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentIndex =
            currentIndex < images.length - 1 ? currentIndex + 1 : 0;
          showImage(currentIndex);
        });
      }

      // Inicia o carrossel na primeira imagem
      showImage(currentIndex);

      // Auto-play (Efeito especial opcional)
      setInterval(() => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        showImage(currentIndex);
      }, 5000); // Muda a cada 5 segundos
    }
  });

  // 2. Outros efeitos especiais (ex: Animação de barras de progresso, se houver)
});
