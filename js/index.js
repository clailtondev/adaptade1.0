document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const transitionDuration = 500; // Deve corresponder à duração da transição de opacidade no CSS (0.5s = 500ms)

    /**
     * Exibe um slide específico do carrossel com transição suave.
     * @param {number} index - O índice do slide a ser exibido.
     */
    function showSlide(index) {
        const currentActiveSlide = document.querySelector('.carousel-item.active');
        const newActiveSlide = slides[index];

        // Se houver um slide ativo atualmente e não for o mesmo que o novo slide
        if (currentActiveSlide && currentActiveSlide !== newActiveSlide) {
            // Passo 1: Inicia o fade-out do slide atual
            currentActiveSlide.classList.remove('active');
            currentActiveSlide.style.pointerEvents = 'none'; // Desabilita interações durante o fade-out

            // Passo 2: Adiciona um listener para quando a transição de opacidade terminar
            // Isso garante que o slide seja completamente escondido apenas APÓS o fade-out visual
            const transitionEndHandler = () => {
                currentActiveSlide.classList.add('hidden'); // Esconde completamente o slide (display: none)
                currentActiveSlide.removeEventListener('transitionend', transitionEndHandler); // Remove o listener
            };
            currentActiveSlide.addEventListener('transitionend', transitionEndHandler);
        }

        // Passo 3: Garante que o novo slide tenha 'display: flex' ANTES de iniciar a transição de opacidade.
        // Isso é crucial para que a transição de opacidade funcione corretamente do 'display: none'.
        newActiveSlide.classList.remove('hidden'); // Remove hidden para que o display seja flex
        newActiveSlide.style.pointerEvents = 'auto'; // Habilita interações para o novo slide

        // Passo 4: Pequeno atraso para garantir que o navegador processe 'display: flex'
        // antes de aplicar a classe 'active' que inicia a transição de opacidade para 1.
        setTimeout(() => {
            newActiveSlide.classList.add('active'); // Adiciona active para iniciar o fade-in
        }, 10);
    }

    /**
     * Avança para o próximo slide.
     */
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    /**
     * Volta para o slide anterior.
     */
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Configura os listeners para os botões de navegação do carrossel
    document.getElementById('carousel-next').addEventListener('click', nextSlide);
    document.getElementById('carousel-prev').addEventListener('click', prevSlide);

    // Opcional: Auto-play do carrossel
    // setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos

    showSlide(currentSlide); // Exibe o primeiro slide ao carregar
});
