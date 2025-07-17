document.addEventListener('DOMContentLoaded', () => {
    // Configura o botão de sair
    const logoutBtn = document.querySelector('button[onclick="logout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

/**
 * Função para deslogar o usuário e redirecionar para a página inicial.
 */
function logout() {
    localStorage.removeItem('userRole'); // Limpa o perfil do usuário armazenado
    alert('Você foi desconectado(a) da plataforma Adaptado.');
    window.location.href = 'index.html'; // Redireciona para a página de login/seleção de perfil
}

/**
 * Carrega e exibe o conteúdo dinâmico no painel do estudante.
 * @param {string} contentId - O ID do div que contém o conteúdo a ser exibido.
 */
function loadStudentContent(contentId) {
    const dashboardMainOptions = document.getElementById('dashboard-main-options');
    const dashboardContentArea = document.getElementById('dashboard-content-area');
    const backButton = document.getElementById('back-to-main-dashboard');
    const greetingSection = document.getElementById('dashboard-greeting-section');

    // Esconde as opções principais do dashboard e a saudação inicial
    dashboardMainOptions.classList.add('hidden');
    greetingSection.classList.add('hidden');

    // Limpa a área de conteúdo dinâmico antes de adicionar o novo
    dashboardContentArea.innerHTML = '';

    // Adiciona o conteúdo HTML correspondente ao ID
    let contentHtml = '';
    if (contentId === 'activities-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-yellow-300 animate-fade-in">Minhas Atividades!</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Aqui estão suas atividades adaptadas. Pronto para um desafio?</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center activity-card animate-slide-in-bottom">
                    <h3 class="text-2xl font-bold mb-4">Matemática - Soma Simples</h3>
                    <p class="text-blue-300 mb-4">Uma atividade de soma com números grandes para discalculia, focando em visualização.</p>
                    <div class="flex space-x-4">
                        <button class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg">Ver Atividade Online</button>
                        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg">Imprimir</button>
                    </div>
                    <div class="completion-bar mt-4 w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 75%;"></div>
                    </div>
                    <p class="text-sm text-blue-300 mt-2">75% Completo</p>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center activity-card animate-slide-in-bottom">
                    <h3 class="text-2xl font-bold mb-4">Português - Leitura Adaptada: Contos de Fadas</h3>
                    <p class="text-blue-300 mb-4">Texto com fonte OpenDyslexic, espaçamento otimizado e ilustrações.</p>
                    <div class="flex space-x-4">
                        <button class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg">Ver Atividade Online</button>
                        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg">Imprimir</button>
                    </div>
                    <div class="completion-bar mt-4 w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 100%;"></div>
                    </div>
                    <p class="text-sm text-blue-300 mt-2">Concluído!</p>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center activity-card animate-slide-in-bottom">
                    <h3 class="text-2xl font-bold mb-4">Ciências - O Corpo Humano em 3D</h3>
                    <p class="text-blue-300 mb-4">Atividade interativa com elementos visuais 3D para TDAH, com pausas guiadas.</p>
                    <div class="flex space-x-4">
                        <button class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg">Ver Atividade Online</button>
                        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg">Imprimir</button>
                    </div>
                    <div class="completion-bar mt-4 w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 20%;"></div>
                    </div>
                    <p class="text-sm text-blue-300 mt-2">20% Completo</p>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center activity-card animate-slide-in-bottom">
                    <h3 class="text-2xl font-bold mb-4">História - Exploradores do Mundo</h3>
                    <p class="text-blue-300 mb-4">Narrativa simplificada com mapas interativos e linha do tempo visual.</p>
                    <div class="flex space-x-4">
                        <button class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg">Ver Atividade Online</button>
                        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg">Imprimir</button>
                    </div>
                    <div class="completion-bar mt-4 w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 0%;"></div>
                    </div>
                    <p class="text-sm text-blue-300 mt-2">Não Iniciado</p>
                </div>
            </div>
        `;
    } else if (contentId === 'progress-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-green-300 animate-fade-in">Suas Conquistas Incríveis!</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Cada passo é uma vitória. Continue assim!</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center medal-card animate-pop-in">
                    <img src="assets/images/medal_reading.png" alt="Medalha de Leitura" class="mb-4 w-24 h-24 animate-bounce-once">
                    <h3 class="text-2xl font-bold mb-2">Mestre da Leitura</h3>
                    <p class="text-blue-300">Concluiu 10 atividades de leitura adaptada. Sua concentração é impressionante!</p>
                    <span class="text-sm text-yellow-400 mt-2">Conquistado em: 01/Julho/2025</span>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center medal-card animate-pop-in">
                    <img src="assets/images/medal_math.png" alt="Medalha de Matemática" class="mb-4 w-24 h-24 animate-bounce-once">
                    <h3 class="text-2xl font-bold mb-2">Gênio da Matemática</h3>
                    <p class="text-blue-300">Acertou 90% das atividades de matemática. Você é um craque com números!</p>
                    <span class="text-sm text-yellow-400 mt-2">Conquistado em: 25/Junho/2025</span>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center medal-card animate-pop-in">
                    <img src="assets/images/medal_focus.png" alt="Medalha de Foco" class="mb-4 w-24 h-24 animate-bounce-once">
                    <h3 class="text-2xl font-bold mb-2">Foco Total</h3>
                    <p class="text-blue-300">Completou atividades longas com alta concentração. Nada te distrai!</p>
                    <span class="text-sm text-yellow-400 mt-2">Conquistado em: 18/Junho/2025</span>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center medal-card animate-pop-in">
                    <img src="assets/images/medal_perseverance.png" alt="Medalha de Perseverança" class="mb-4 w-24 h-24 animate-bounce-once">
                    <h3 class="text-2xl font-bold mb-2">Perseverança</h3>
                    <p class="text-blue-300">Persistiu e superou desafios complexos. Sua determinação é inspiradora!</p>
                    <span class="text-sm text-yellow-400 mt-2">Conquistado em: 10/Junho/2025</span>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex flex-col items-center text-center medal-card opacity-50 grayscale animate-pop-in">
                    <img src="https://placehold.co/100x100/0e1a3c/e0f2f7?text=Proxima+Medalha" alt="Próxima Medalha" class="mb-4 w-24 h-24">
                    <h3 class="text-2xl font-bold mb-2">Aventureiro da IA</h3>
                    <p class="text-blue-300">Desbloqueie esta medalha ao explorar 50 atividades com a IA Adaptada!</p>
                    <span class="text-sm text-blue-300 mt-2">Próxima Conquista!</span>
                </div>
            </div>
        `;
    } else if (contentId === 'schedule-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-purple-300 animate-fade-in">Sua Agenda Inteligente!</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Organize seus horários de estudo e futuras tarefas. Pequenos passos, grandes conquistas!</p>

            <div class="bg-[#0e1a3c] p-6 rounded-xl animate-slide-in-bottom">
                <h3 class="text-2xl font-bold mb-4">Próximas Atividades e Compromissos</h3>
                <ul class="space-y-3 mb-4">
                    <li class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a2a4f] p-3 rounded-lg">
                        <div>
                            <span class="font-semibold">Matemática - Frações</span>
                            <p class="text-blue-300 text-sm">Praticar exercícios da atividade "Frações Divertidas".</p>
                        </div>
                        <span class="text-yellow-400 mt-2 sm:mt-0 sm:ml-4">15 de Julho, 10:00 - 11:00</span>
                        <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-3 rounded-lg text-sm mt-2 sm:mt-0">Concluir</button>
                    </li>
                    <li class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a2a4f] p-3 rounded-lg">
                        <div>
                            <span class="font-semibold">Português - Escrita Criativa</span>
                            <p class="text-blue-300 text-sm">Escrever uma pequena história com ênfase na pontuação.</p>
                        </div>
                        <span class="text-yellow-400 mt-2 sm:mt-0 sm:ml-4">17 de Julho, 14:00 - 15:30</span>
                        <button class="bg-gray-500 text-white font-bold py-1 px-3 rounded-lg text-sm mt-2 sm:mt-0 cursor-not-allowed">Concluir</button>
                    </li>
                    <li class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1a2a4f] p-3 rounded-lg">
                        <div>
                            <span class="font-semibold">Sessão com Psicólogo</span>
                            <p class="text-blue-300 text-sm">Sessão semanal de acompanhamento.</p>
                        </div>
                        <span class="text-yellow-400 mt-2 sm:mt-0 sm:ml-4">18 de Julho, 16:00 - 17:00</span>
                        <button class="bg-gray-500 text-white font-bold py-1 px-3 rounded-lg text-sm mt-2 sm:mt-0 cursor-not-allowed">Concluir</button>
                    </li>
                </ul>
                <div class="flex flex-col md:flex-row gap-4 mt-4">
                    <button class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Adicionar Nova Tarefa</button>
                    <button class="w-full bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg">Sincronizar com Calendário</button>
                </div>
            </div>

            <div class="bg-[#0e1a3c] p-6 rounded-xl mt-6 animate-slide-in-bottom">
                <h3 class="text-2xl font-bold mb-4">Dicas de Estudo Personalizadas</h3>
                <ul class="space-y-3 text-blue-300">
                    <li><span class="font-semibold text-yellow-400">💡 Dica Visual:</span> Use cores e desenhos para organizar suas anotações de história.</li>
                    <li><span class="font-semibold text-yellow-400">🎧 Dica Auditiva:</span> Tente ouvir audiobooks das matérias que você tem mais dificuldade.</li>
                    <li><span class="font-semibold text-yellow-400">🏃 Dica Cinestésica:</span> Faça pequenas pausas com movimento a cada 20 minutos de estudo.</li>
                </ul>
            </div>
        `;
    } else if (contentId === 'faq-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-blue-300 animate-fade-in">Perguntas Frequentes (FAQ)</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Encontre respostas para suas dúvidas mais comuns aqui!</p>
            <div class="space-y-4">
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Como as atividades são adaptadas?</h3>
                    <p class="text-blue-300">Nossas atividades são adaptadas por uma Inteligência Artificial avançada, que considera suas necessidades específicas registradas na anamnese. Ela ajusta a fonte, o espaçamento, a complexidade do vocabulário e inclui elementos visuais para facilitar seu aprendizado.</p>
                </div>
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Posso imprimir as atividades?</h3>
                    <p class="text-blue-300">Sim! Você pode baixar e imprimir qualquer atividade adaptada para estudar offline ou ter um registro físico do seu progresso.</p>
                </div>
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Como vejo meu progresso?</h3>
                    <p class="text-blue-300">Na seção "Meu Progresso", você pode ver todas as medalhas e conquistas que desbloqueou, além de um resumo do seu desempenho nas atividades.</p>
                </div>
            </div>
        `;
    } else if (contentId === 'contact-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-blue-300 animate-fade-in">Fale Conosco!</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Estamos aqui para ajudar. Escolha a melhor forma de entrar em contato.</p>
            <div class="space-y-4">
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex items-center justify-center flex-col text-center animate-slide-in-bottom">
                    <svg class="w-12 h-12 text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 13H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v13a2 2 0 01-2 2z"></path></svg>
                    <h3 class="text-xl font-semibold mb-2">Email</h3>
                    <p class="text-blue-300">Envie suas dúvidas para: <a href="mailto:contato@adaptado.com" class="text-yellow-400 hover:underline">contato@adaptado.com</a></p>
                </div>
                <div class="bg-[#0e1a3c] p-6 rounded-xl flex items-center justify-center flex-col text-center animate-slide-in-bottom">
                    <svg class="w-12 h-12 text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <h3 class="text-xl font-semibold mb-2">Telefone</h3>
                    <p class="text-blue-300">Ligue para nós: <a href="tel:+5586991234567" class="text-yellow-400 hover:underline">+55 (86) 99123-4567</a></p>
                </div>
            </div>
        `;
    } else if (contentId === 'about-us-content') {
        contentHtml = `
            <h2 class="text-3xl font-bold mb-6 text-blue-300 animate-fade-in">Sobre Nós - Adaptado</h2>
            <p class="text-blue-200 text-lg mb-8 animate-fade-in-delay">Nossa missão é transformar o aprendizado para todos!</p>
            <div class="space-y-4">
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Quem Somos</h3>
                    <p class="text-blue-300">O Adaptade nasceu da paixão por educação inclusiva. Acreditamos que cada aluno é único e merece ferramentas que se adaptem às suas necessidades. Nossa plataforma utiliza a inteligência artificial para personalizar o conteúdo educacional, tornando o aprendizado mais acessível e divertido para crianças e jovens com transtornos de aprendizagem.</p>
                </div>
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Nossa Visão</h3>
                    <p class="text-blue-300">Ser a plataforma líder em educação adaptada, empoderando alunos, professores, psicólogos e instituições a criarem um futuro onde o aprendizado não tem barreiras.</p>
                </div>
                <div class="bg-[#0e1a3c] p-4 rounded-lg animate-slide-in-bottom">
                    <h3 class="text-xl font-semibold text-yellow-400 mb-2">Nossa Equipe</h3>
                    <p class="text-blue-300">Somos uma equipe multidisciplinar de educadores, psicopedagogos, desenvolvedores de IA e designers, todos comprometidos em fazer a diferença na vida de nossos usuários.</p>
                </div>
            </div>
        `;
    }


    dashboardContentArea.innerHTML = contentHtml; // Insere o HTML na área de conteúdo
    dashboardContentArea.classList.remove('hidden'); // Mostra a área de conteúdo
    backButton.classList.remove('hidden'); // Mostra o botão de voltar
}

/**
 * Exibe o conteúdo das atividades.
 */
function showActivities() {
    loadStudentContent('activities-content');
}

/**
 * Exibe o conteúdo do progresso.
 */
function showProgress() {
    loadStudentContent('progress-content');
}

/**
 * Exibe o conteúdo da agenda.
 */
function showSchedule() {
    loadStudentContent('schedule-content');
}

/**
 * Volta para as opções principais do painel do estudante.
 */
function showMainDashboardOptions() {
    const dashboardMainOptions = document.getElementById('dashboard-main-options');
    const dashboardContentArea = document.getElementById('dashboard-content-area');
    const backButton = document.getElementById('back-to-main-dashboard');
    const greetingSection = document.getElementById('dashboard-greeting-section');

    dashboardContentArea.innerHTML = ''; // Limpa o conteúdo dinâmico
    dashboardContentArea.classList.add('hidden'); // Esconde a área de conteúdo

    dashboardMainOptions.classList.remove('hidden'); // Mostra as opções principais
    greetingSection.classList.remove('hidden'); // Mostra a saudação inicial
    backButton.classList.add('hidden'); // Esconde o botão de voltar
}

/**
 * Simula o download da última atividade adaptada.
 */
function downloadLastActivity() {
    alert('Sua última atividade adaptada está sendo preparada para download! (Funcionalidade de backend necessária)');
    // Em uma aplicação real, aqui você faria uma chamada para um endpoint de backend
    // que geraria e forneceria o PDF para download.
}

/**
 * Função genérica para carregar conteúdo estático (FAQ, Contato, Sobre Nós).
 * @param {string} contentId - O ID do conteúdo estático a ser carregado.
 */
function loadStaticContent(contentId) {
    loadStudentContent(contentId);
}
