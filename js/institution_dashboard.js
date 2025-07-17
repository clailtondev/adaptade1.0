document.addEventListener('DOMContentLoaded', () => {
    // Configura o botão de sair
    const logoutBtn = document.querySelector('button[onclick="logout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Configura os listeners para os itens de navegação da barra lateral
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const contentId = this.dataset.content; // Pega o ID do conteúdo a ser carregado
            loadContent(contentId);

            // Remove a classe 'active' de todos os itens e adiciona ao clicado
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Carrega o conteúdo da visão geral por padrão ao carregar a página
    loadContent('dashboard-overview');

    // Listener para o botão de submissão do formulário dinâmico
    // É importante que este listener seja adicionado APÓS o formulário ser carregado dinamicamente
    // Uma abordagem melhor seria usar delegação de eventos ou re-anexar o listener após cada loadContent
    // Por simplicidade na demo, vamos re-anexar no showRegistrationForm e no loadContent
    const submitDynamicRegistrationBtn = document.getElementById('submit-dynamic-registration');
    if (submitDynamicRegistrationBtn) {
        submitDynamicRegistrationBtn.addEventListener('click', handleSubmitDynamicRegistration);
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
 * Carrega o conteúdo dinâmico na área principal do painel.
 * @param {string} contentId - O ID do conteúdo a ser carregado (ex: 'dashboard-overview', 'manage-teachers').
 */
function loadContent(contentId) {
    const dynamicContentArea = document.getElementById('dynamic-content-area');
    let contentHtml = '';

    // Esconde todos os painéis de conteúdo primeiro
    document.querySelectorAll('.content-panel').forEach(panel => panel.classList.add('hidden'));

    // Define o HTML para cada seção
    if (contentId === 'dashboard-overview') {
        contentHtml = `
            <div id="dashboard-overview-content" class="content-panel active">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Visão Geral da Instituição</h2>
                <p class="text-blue-200 text-lg mb-8">Acompanhe as principais métricas e o desempenho geral da sua instituição.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card animate-pop-in">
                        <h3 class="text-xl font-semibold mb-2 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 00-5.356-1.857M12 18v2m-4.5-4.5H5.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c.328 0 .5-.201.5-.447v-.336c0-.408-.305-.805-.7-.805zm6 0h-.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c-.328 0 .5-.201.5-.447v-.336c0-.408-.305-.805-.7-.805z"></path></svg> Total de Alunos</h3>
                        <p class="text-yellow-400 text-4xl font-bold">520</p>
                        <p class="text-blue-300 text-sm">Alunos ativos na plataforma</p>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card animate-pop-in">
                        <h3 class="text-xl font-semibold mb-2 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15M15 12h-3m0 0H9m9 0h-3m0 0H9"></path></svg> Professores Ativos</h3>
                        <p class="text-green-400 text-4xl font-bold">35</p>
                        <p class="text-blue-300 text-sm">Professores utilizando a plataforma</p>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card animate-pop-in">
                        <h3 class="text-xl font-semibold mb-2 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15M15 12h-3m0 0H9m9 0h-3m0 0H9"></path></svg> Psicólogos Credenciados</h3>
                        <p class="text-orange-400 text-4xl font-bold">7</p>
                        <p class="text-blue-300 text-sm">Profissionais de apoio parceiros</p>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card animate-pop-in">
                        <h3 class="text-xl font-semibold mb-2 flex items-center"><svg class="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Atividades Geradas (Mês)</h3>
                        <p class="text-blue-400 text-4xl font-bold">250+</p>
                        <p class="text-blue-300 text-sm">Atividades adaptadas criadas este mês</p>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card animate-pop-in">
                        <h3 class="text-xl font-semibold mb-2 flex items-center"><svg class="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg> Engajamento Médio</h3>
                        <p class="text-green-400 text-4xl font-bold">85%</p>
                        <p class="text-blue-300 text-sm">Média de engajamento dos alunos</p>
                    </div>
                </div>

                <h3 class="text-2xl font-bold mb-4 mt-8 text-yellow-400">Ações Rápidas</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onclick="showRegistrationForm('teacher')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                        Cadastrar Professor
                    </button>
                    <button onclick="showRegistrationForm('profissional_saude_educacao')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                        Cadastrar Profissional
                    </button>
                    <button onclick="showRegistrationForm('aluno')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                        Cadastrar Aluno
                    </button>
                    <button onclick="generateInstitutionReport()" class="bg-yellow-600 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        Gerar Relatório Completo
                    </button>
                </div>
            </div>
        `;
    } else if (contentId === 'manage-users') {
        contentHtml = `
            <div id="manage-users-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Gestão de Usuários</h2>
                <p class="text-blue-200 text-lg mb-8">Gerencie todos os tipos de usuários da sua instituição na plataforma.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Cartão: Cadastrar Profissionais (da Educação e da Saúde) -->
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card" onclick="showRegistrationForm('profissional_saude_educacao')">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-8 h-8 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15M15 12h-3m0 0H9m9 0h-3m0 0H9"></path></svg> Cadastrar Profissional</h3>
                        <p class="text-blue-300">Adicione pedagogos, psicopedagogos, terapeutas e outros especialistas.</p>
                    </div>
                    <!-- Cartão: Cadastrar Professores -->
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card" onclick="showRegistrationForm('teacher')">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-8 h-8 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19.5L12 22.5L9 19.5"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 22.5V3"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 3L15 6L9 6"></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9L22.5 12L19.5 15"></path><path stroke-linecap="round" stroke-linejoin="round" d="M22.5 12H1.5"></path><path stroke-linecap="round" stroke-linejoin="round" d="M1.5 12L4.5 9L4.5 15"></path><path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5H15V19.5H9V4.5Z" fill="white" stroke="currentColor" stroke-width="1.5"></path></svg> Cadastrar Professor</h3>
                        <p class="text-blue-300">Registre novos professores e atribua suas turmas.</p>
                    </div>
                    <!-- Cartão: Cadastrar Alunos -->
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card" onclick="showRegistrationForm('aluno')">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-8 h-8 mr-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 00-5.356-1.857M12 18v2m-4.5-4.5H5.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c.328 0 .5-.201.5-.447v-.336c0-.408-.305-.805-.7-.805zm6 0h-.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c-.328 0 .5-.201.5-.447v-.336c0-.408-.305-.805-.7-.805z"></path></svg> Cadastrar Aluno</h3>
                        <p class="text-blue-300">Adicione novos alunos e seus responsáveis.</p>
                    </div>
                    <!-- Cartão: Cadastrar Responsáveis -->
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card" onclick="showRegistrationForm('responsavel')">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-8 h-8 mr-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0M12 15a2.25 2.25 0 01-2.25-2.25V7.5a2.25 2.25 0 014.5 0v5.25A2.25 2.25 0 0112 15zm-3.75-3.75a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0"/></svg> Cadastrar Responsável</h3>
                        <p class="text-blue-300">Vincule responsáveis aos alunos para acompanhamento.</p>
                    </div>
                </div>

                <h3 class="text-2xl font-bold mb-4 mt-8 text-yellow-400">Listas de Usuários</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h4 class="text-xl font-semibold mb-3">Profissionais da Saúde/Educação</h4>
                        <ul id="professional-list" class="space-y-2 text-blue-200">
                            <li class="flex justify-between items-center"><span>Dra. Ana Psicóloga</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Dra. Ana Psicóloga', 'profissional')">Ver</button></li>
                            <li class="flex justify-between items-center"><span>Prof. Pedro Pedagogo</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Prof. Pedro Pedagogo', 'profissional')">Ver</button></li>
                        </ul>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h4 class="text-xl font-semibold mb-3">Professores</h4>
                        <ul id="teacher-list" class="space-y-2 text-blue-200">
                            <li class="flex justify-between items-center"><span>Prof. Carlos Matemática</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Prof. Carlos Matemática', 'professor')">Ver</button></li>
                            <li class="flex justify-between items-center"><span>Prof. Sofia Português</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Prof. Sofia Português', 'professor')">Ver</button></li>
                        </ul>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h4 class="text-xl font-semibold mb-3">Alunos</h4>
                        <ul id="student-list" class="space-y-2 text-blue-200">
                            <li class="flex justify-between items-center"><span>Maria Silva</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Maria Silva', 'aluno')">Ver</button></li>
                            <li class="flex justify-between items-center"><span>João Santos</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('João Santos', 'aluno')">Ver</button></li>
                        </ul>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h4 class="text-xl font-semibold mb-3">Responsáveis</h4>
                        <ul id="responsible-list" class="space-y-2 text-blue-200">
                            <li class="flex justify-between items-center"><span>Ana Responsável (Maria)</span> <button class="text-yellow-400 hover:text-yellow-300 text-sm" onclick="viewUserDetails('Ana Responsável', 'responsavel')">Ver</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'pedagogical-therapeutic-management') {
        contentHtml = `
            <div id="pedagogical-therapeutic-management-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Gestão Pedagógica e Terapêutica</h2>
                <p class="text-blue-200 text-lg mb-8">Ferramentas para organizar turmas, atendimentos e acompanhar o desenvolvimento individual.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 00-5.356-1.857M12 18v2m-4.5-4.5H5.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c.328 0 .5-.201-.5-.447v-.336c0-.408-.305-.805-.7-.805zm6 0h-.5c-.328 0-.5.201-.5.447v.336c0 .408.305.805.7.805h.6c-.328 0 .5-.201.5-.447v-.336c0-.408-.305-.805-.7-.805z"></path></svg> Cadastro de Turmas e Grupos</h3>
                        <p class="text-blue-300 mb-4">Crie e gerencie turmas, atribua professores e alunos.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Turmas</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Agendamento de Atendimentos</h3>
                        <p class="text-blue-300 mb-4">Organize a agenda de atendimentos individuais ou em grupo.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Ver Agenda</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Lançamento de Relatórios de Evolução</h3>
                        <p class="text-blue-300 mb-4">Registre o progresso educacional e terapêutico dos alunos.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Lançar Relatório</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> Planos Individuais de Desenvolvimento (PAI)</h3>
                        <p class="text-blue-300 mb-4">Crie e acompanhe os planos de desenvolvimento personalizados para cada aluno.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar PAIs</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'schedule-calendar') {
        contentHtml = `
            <div id="schedule-calendar-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Agenda & Calendário</h2>
                <p class="text-blue-200 text-lg mb-8">Visualize eventos, agendamentos e gerencie o calendário institucional.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Calendário Escolar e Institucional</h3>
                        <p class="text-blue-300 mb-4">Veja feriados, recessos, eventos e datas importantes da instituição.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Ver Calendário</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Agendamentos de Atendimentos</h3>
                        <p class="text-blue-300 mb-4">Gerencie os horários de atendimentos individuais e em grupo.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Agendamentos</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3-3m0 0l3 3m-3-3v6m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Alertas e Lembretes</h3>
                        <p class="text-blue-300 mb-4">Configure notificações automáticas para eventos e compromissos importantes.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Configurar Alertas</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'reports-documents') {
        contentHtml = `
            <div id="reports-documents-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Relatórios & Documentos</h2>
                <p class="text-blue-200 text-lg mb-8">Emita relatórios, fichas de alunos e gerencie documentos importantes.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> Relatórios de Acompanhamento</h3>
                        <p class="text-blue-300 mb-4">Gere relatórios educacionais, psicológicos e clínicos dos alunos.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerar Relatório</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15M15 12h-3m0 0H9m9 0h-3m0 0H9"></path></svg> Ficha do Aluno (PDF)</h3>
                        <p class="text-blue-300 mb-4">Acesse e exporte a ficha completa de cada aluno em PDF.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerar Ficha</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg> Avaliações e Laudos</h3>
                        <p class="text-blue-300 mb-4">Gerencie e acesse avaliações e laudos dos alunos.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Documentos</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Exportação de Dados</h3>
                        <p class="text-blue-300 mb-4">Exporte dados de alunos, professores e relatórios em diversos formatos.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Exportar Dados</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'communication') {
        contentHtml = `
            <div id="communication-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Comunicação</h2>
                <p class="text-blue-200 text-lg mb-8">Mantenha-se conectado com a equipe, alunos e responsáveis.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg> Mensagens Internas</h3>
                        <p class="text-blue-300 mb-4">Envie mensagens diretas para professores, profissionais e responsáveis.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Abrir Mensagens</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a2 2 0 100-4 2 2 0 000 4zM12 13V2.5l8-4.5M12 13V2.5l-8-4.5"></path></svg> Comunicados</h3>
                        <p class="text-blue-300 mb-4">Envie comunicados importantes para toda a comunidade escolar.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Criar Comunicado</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17l-3 3m0 0l-3-3m3 3V10m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Notificações Automáticas</h3>
                        <p class="text-blue-300 mb-4">Configure alertas sobre atendimentos, reuniões e outras pendências.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Configurar Notificações</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'educational-resources') {
        contentHtml = `
            <div id="educational-resources-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Recursos Educacionais</h2>
                <p class="text-blue-200 text-lg mb-8">Acesse e gerencie materiais pedagógicos e atividades interativas.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 21.75l4.5-4.5-4.5-4.5"></path></svg> Materiais Pedagógicos Inclusivos</h3>
                        <p class="text-blue-300 mb-4">Biblioteca de materiais e guias para educação adaptada.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Acessar Biblioteca</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H6.5a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 10H14zm0 0V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v4m7-4h-1"></path></svg> Atividades Interativas</h3>
                        <p class="text-blue-300 mb-4">Explore jogos e atividades digitais adaptadas para diferentes necessidades.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Ver Atividades</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Upload/Download de Arquivos</h3>
                        <p class="text-blue-300 mb-4">Compartilhe e acesse documentos e materiais com facilidade.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Arquivos</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Trilhas de Aprendizagem Personalizadas</h3>
                        <p class="text-blue-300 mb-4">Crie roteiros de estudo adaptados para cada aluno ou grupo.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Criar Trilha</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'anamnesis-evaluations') {
        contentHtml = `
            <div id="anamnesis-evaluations-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Anamnese & Avaliações</h2>
                <p class="text-blue-200 text-lg mb-8">Gerencie questionários, históricos e avaliações adaptadas dos alunos.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> Questionários e Formulários</h3>
                        <p class="text-blue-300 mb-4">Crie e aplique questionários personalizados para anamnese educacional e clínica.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Formulários</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> Histórico de Anamnese</h3>
                        <p class="text-blue-300 mb-4">Acesse o histórico completo de anamneses e avaliações de cada aluno.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Ver Histórico</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.072 1.914.386 3.76.944 5.593a12.007 12.007 0 008.088 3.04 12.007 12.007 0 008.088-3.04c.558-1.833.872-3.679.944-5.593a12.007 12.007 0 00-3.04-8.618z"></path></svg> Ferramenta de Avaliações Adaptadas</h3>
                        <p class="text-blue-300 mb-4">Aplique e registre avaliações personalizadas para diferentes necessidades.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Aplicar Avaliação</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'security-access') {
        contentHtml = `
            <div id="security-access-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Segurança & Acessos</h2>
                <p class="text-blue-200 text-lg mb-8">Gerencie permissões, monitore atividades e garanta a segurança dos dados.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Controle de Permissões</h3>
                        <p class="text-blue-300 mb-4">Defina quem pode acessar e editar cada parte da plataforma.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Permissões</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> Registro de Atividades (Logs)</h3>
                        <p class="text-blue-300 mb-4">Acompanhe o histórico de login/logout e alterações realizadas por usuários.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Ver Logs</button>
                    </div>
                    <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                        <h3 class="text-2xl font-bold mb-4 flex items-center"><svg class="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a2 2 0 00-2-2H9a2 2 0 00-2 2v3m6 0v3m0 0v3m0-3h3m-3 0h-3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> Controle de Sessões Ativas</h3>
                        <p class="text-blue-300 mb-4">Visualize e encerre sessões de usuários ativas na plataforma.</p>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Gerenciar Sessões</button>
                    </div>
                </div>
            </div>
        `;
    } else if (contentId === 'settings') {
        contentHtml = `
            <div id="settings-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400">Configurações Gerais da Instituição</h2>
                <p class="text-blue-200 text-lg mb-8">Gerencie as configurações gerais da sua conta e da plataforma.</p>

                <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                    <h3 class="text-2xl font-bold mb-4">Informações da Conta</h3>
                    <form class="space-y-4">
                        <div>
                            <label for="institution-name-setting" class="block mb-1 text-sm font-medium text-blue-200">Nome da Instituição</label>
                            <input type="text" id="institution-name-setting" value="Minha Instituição Educacional" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg">
                        </div>
                        <div>
                            <label for="institution-cnpj-setting" class="block mb-1 text-sm font-medium text-blue-200">CNPJ</label>
                            <input type="text" id="institution-cnpj-setting" value="XX.XXX.XXX/XXXX-XX" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg">
                        </div>
                        <div>
                            <label for="institution-inep-setting" class="block mb-1 text-sm font-medium text-blue-200">Código INEP</label>
                            <input type="text" id="institution-inep-setting" value="XXXXXXXXXX" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg">
                        </div>
                        <div>
                            <label for="institution-email-setting" class="block mb-1 text-sm font-medium text-blue-200">Email de Contato</label>
                            <input type="email" id="institution-email-setting" value="contato@minhainstituicao.com" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg">
                        </div>
                        <div>
                            <label for="institution-phone-setting" class="block mb-1 text-sm font-medium text-blue-200">Telefone de Contato</label>
                            <input type="tel" id="institution-phone-setting" value="(XX) XXXXX-XXXX" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg">
                        </div>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg">Salvar Alterações</button>
                    </form>
                </div>

                <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card mt-8">
                    <h3 class="text-2xl font-bold mb-4">Gerenciamento de Assinatura</h3>
                    <p class="text-blue-300 mb-4">Visualize e gerencie os detalhes da sua assinatura Adaptado.</p>
                    <ul class="space-y-2 text-blue-200 mb-4">
                        <li>Plano Atual: <span class="font-semibold text-yellow-400">Plano Premium Institucional</span></li>
                        <li>Próxima Renovação: <span class="font-semibold text-yellow-400">15/Julho/2026</span></li>
                        <li>Usuários Permitidos: <span class="font-semibold text-yellow-400">Ilimitado</span></li>
                    </ul>
                    <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg mr-2">Alterar Plano</button>
                    <button class="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg">Ver Histórico de Faturas</button>
                </div>

                <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card mt-8">
                    <h3 class="text-2xl font-bold mb-4">Configurações de Acessibilidade</h3>
                    <p class="text-blue-300 mb-4">Ajuste as opções de acessibilidade para toda a plataforma.</p>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-yellow-400">
                            <span class="ml-2 text-white">Modo de Alto Contraste</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-yellow-400">
                            <span class="ml-2 text-white">Fonte Ampliada</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-yellow-400">
                            <span class="ml-2 text-white">Ativar Leitor de Tela</span>
                        </label>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg mt-4">Salvar Configurações</button>
                </div>

                <div class="bg-[#0e1a3c] p-6 rounded-xl dashboard-card mt-8">
                    <h3 class="text-2xl font-bold mb-4">Customização Visual do Site</h3>
                    <p class="text-blue-300 mb-4">Personalize as cores e o layout da plataforma para a sua instituição.</p>
                    <div class="space-y-4">
                        <div>
                            <label for="primary-color" class="block mb-1 text-sm font-medium text-blue-200">Cor Primária</label>
                            <input type="color" id="primary-color" value="#3b82f6" class="w-full h-10 rounded-lg cursor-pointer">
                        </div>
                        <div>
                            <label for="secondary-color" class="block mb-1 text-sm font-medium text-blue-200">Cor Secundária</label>
                            <input type="color" id="secondary-color" value="#facc15" class="w-full h-10 rounded-lg cursor-pointer">
                        </div>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg mt-4">Aplicar Customização</button>
                </div>
            </div>
        `;
    } else if (contentId === 'registration-form') {
        contentHtml = `
            <div id="registration-form-content" class="content-panel">
                <h2 class="text-3xl font-bold mb-6 text-yellow-400" id="registration-form-title">Cadastrar Novo Usuário</h2>
                <p class="text-blue-200 text-lg mb-8">Preencha os dados para adicionar um novo membro à sua equipe ou um novo aluno.</p>

                <form id="dynamic-registration-form" class="space-y-4 bg-[#0e1a3c] p-6 rounded-xl dashboard-card">
                    <!-- Campos serão injetados aqui pelo JavaScript -->
                </form>
                <div class="flex flex-col md:flex-row gap-4 mt-8">
                    <button onclick="loadContent('manage-users')" class="w-full bg-gray-500 hover:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg">
                        Voltar
                    </button>
                    <button id="submit-dynamic-registration" class="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg">
                        Cadastrar
                    </button>
                </div>
            </div>
        `;
    }

    dynamicContentArea.innerHTML = contentHtml; // Insere o HTML na área de conteúdo
    // Ativa a visibilidade do painel recém-carregado
    const newActivePanel = dynamicContentArea.querySelector('.content-panel');
    if (newActivePanel) {
        newActivePanel.classList.remove('hidden');
    }

    // Re-anexa o listener para o botão de submissão do formulário dinâmico
    // Isso é crucial porque o HTML é recarregado dinamicamente
    const submitDynamicRegistrationBtn = document.getElementById('submit-dynamic-registration');
    if (submitDynamicRegistrationBtn) {
        submitDynamicRegistrationBtn.removeEventListener('click', handleSubmitDynamicRegistration); // Remove listener antigo se houver
        submitDynamicRegistrationBtn.addEventListener('click', handleSubmitDynamicRegistration); // Adiciona o novo
    }
}

/**
 * Exibe o formulário de cadastro dinâmico com campos específicos para o tipo de usuário.
 * @param {string} userType - O tipo de usuário a ser cadastrado ('teacher', 'profissional_saude_educacao', 'aluno', 'responsavel').
 */
function showRegistrationForm(userType) {
    loadContent('registration-form'); // Carrega o contêiner do formulário
    const formTitle = document.getElementById('registration-form-title');
    const dynamicForm = document.getElementById('dynamic-registration-form');
    dynamicForm.innerHTML = ''; // Limpa campos anteriores

    let fieldsHtml = `
        <div>
            <label for="reg-name" class="block mb-1 text-sm font-medium text-blue-200">Nome Completo</label>
            <input type="text" id="reg-name" placeholder="Nome completo" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
        </div>
        <div>
            <label for="reg-email" class="block mb-1 text-sm font-medium text-blue-200">Email</label>
            <input type="email" id="reg-email" placeholder="email@exemplo.com" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
        </div>
        <div>
            <label for="reg-password" class="block mb-1 text-sm font-medium text-blue-200">Senha</label>
            <input type="password" id="reg-password" placeholder="********" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
        </div>
    `;

    if (userType === 'profissional_saude_educacao') {
        formTitle.textContent = 'Cadastrar Novo Profissional';
        fieldsHtml += `
            <div>
                <label for="reg-area-atuacao" class="block mb-1 text-sm font-medium text-blue-200">Área de Atuação</label>
                <input type="text" id="reg-area-atuacao" placeholder="Ex: Pedagogo, Psicólogo, Terapeuta Ocupacional" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-especializacao" class="block mb-1 text-sm font-medium text-blue-200">Especialização</label>
                <input type="text" id="reg-especializacao" placeholder="Ex: TEA, TDAH, Dislexia" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-documentos" class="block mb-1 text-sm font-medium text-blue-200">Documentos (CRP, Diploma, Certificados)</label>
                <input type="text" id="reg-documentos" placeholder="Ex: CRP 01/12345" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-foto-perfil" class="block mb-1 text-sm font-medium text-blue-200">Foto de Perfil (URL)</label>
                <input type="text" id="reg-foto-perfil" placeholder="URL da foto" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-status" class="block mb-1 text-sm font-medium text-blue-200">Status</label>
                <select id="reg-status" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div>
                <label for="reg-atribuicao" class="block mb-1 text-sm font-medium text-blue-200">Atribuição (Turmas, Alunos, Setores)</label>
                <input type="text" id="reg-atribuicao" placeholder="Ex: Turma A, Setor Infantil" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
        `;
    } else if (userType === 'teacher') {
        formTitle.textContent = 'Cadastrar Novo Professor';
        fieldsHtml += `
            <div>
                <label for="reg-subject" class="block mb-1 text-sm font-medium text-blue-200">Matéria / Área</label>
                <input type="text" id="reg-subject" placeholder="Ex: Português, Matemática" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-horarios" class="block mb-1 text-sm font-medium text-blue-200">Horários de Aula</label>
                <input type="text" id="reg-horarios" placeholder="Ex: Seg/Qua 08:00-12:00" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-turmas-atribuidas" class="block mb-1 text-sm font-medium text-blue-200">Turmas Atribuídas</label>
                <input type="text" id="reg-turmas-atribuidas" placeholder="Ex: 3º Ano A, 5º Ano B" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-historico-atuacao" class="block mb-1 text-sm font-medium text-blue-200">Histórico de Atuação</label>
                <textarea id="reg-historico-atuacao" rows="3" placeholder="Experiências anteriores" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <div>
                <label for="reg-foto-perfil" class="block mb-1 text-sm font-medium text-blue-200">Foto de Perfil (URL)</label>
                <input type="text" id="reg-foto-perfil" placeholder="URL da foto" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
        `;
    } else if (userType === 'aluno') {
        formTitle.textContent = 'Cadastrar Novo Aluno';
        fieldsHtml += `
            <div>
                <label for="reg-data-nascimento" class="block mb-1 text-sm font-medium text-blue-200">Data de Nascimento</label>
                <input type="date" id="reg-data-nascimento" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-dados-responsaveis" class="block mb-1 text-sm font-medium text-blue-200">Dados dos Responsáveis</label>
                <textarea id="reg-dados-responsaveis" rows="2" placeholder="Nome, contato, grau de parentesco" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <div>
                <label for="reg-necessidades-especificas" class="block mb-1 text-sm font-medium text-blue-200">Necessidades Específicas</label>
                <input type="text" id="reg-necessidades-especificas" placeholder="Ex: TEA, TDAH, Dislexia" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-plano-acompanhamento" class="block mb-1 text-sm font-medium text-blue-200">Plano de Acompanhamento Individual (PAI)</label>
                <textarea id="reg-plano-acompanhamento" rows="3" placeholder="Detalhes do PAI" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <div>
                <label for="reg-historico-escolar-clinico" class="block mb-1 text-sm font-medium text-blue-200">Histórico Escolar e/ou Clínico</label>
                <textarea id="reg-historico-escolar-clinico" rows="3" placeholder="Resumo do histórico" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <div>
                <label for="reg-turma-grupo" class="block mb-1 text-sm font-medium text-blue-200">Turma/Grupo Atribuído</label>
                <input type="text" id="reg-turma-grupo" placeholder="Ex: 3º Ano C" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-arquivos-anexados" class="block mb-1 text-sm font-medium text-blue-200">Arquivos Anexados (Laudos, Relatórios)</label>
                <input type="file" id="reg-arquivos-anexados" multiple class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"/>
            </div>
        `;
    } else if (userType === 'responsavel') {
        formTitle.textContent = 'Cadastrar Novo Responsável';
        fieldsHtml += `
            <div>
                <label for="reg-grau-parentesco" class="block mb-1 text-sm font-medium text-blue-200">Grau de Parentesco</label>
                <input type="text" id="reg-grau-parentesco" placeholder="Ex: Mãe, Pai, Tutor" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label for="reg-aluno-vinculado" class="block mb-1 text-sm font-medium text-blue-200">Aluno(s) Vinculado(s)</label>
                <input type="text" id="reg-aluno-vinculado" placeholder="Nome do aluno ou ID" class="w-full p-3 bg-[#e0f2f7] text-[#1a2a4f] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label class="flex items-center mt-4">
                    <input type="checkbox" id="reg-autorizacao-acesso" class="form-checkbox h-5 w-5 text-yellow-400">
                    <span class="ml-2 text-white">Autorização de Acesso ao Painel do Aluno</span>
                </label>
            </div>
        `;
    }
    dynamicForm.innerHTML = fieldsHtml;
    dynamicForm.dataset.userType = userType; // Armazena o tipo de usuário no formulário
}

/**
 * Simula a submissão do formulário de cadastro dinâmico.
 */
function handleSubmitDynamicRegistration() {
    const userType = document.getElementById('dynamic-registration-form').dataset.userType;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos obrigatórios (Nome, Email, Senha).');
        return;
    }

    // Em uma aplicação real, você enviaria esses dados para o backend para registro
    alert(`Novo(a) ${userType} "${name}" cadastrado(a) com sucesso!`);
    loadContent('manage-users'); // Volta para a gestão de usuários após o cadastro
}

/**
 * Simula a visualização de detalhes de um usuário (professor, profissional, aluno, responsável).
 * @param {string} userName - O nome do usuário.
 * @param {string} userType - O tipo de usuário.
 */
function viewUserDetails(userName, userType) {
    alert(`Visualizando detalhes de ${userType}: ${userName}. (Funcionalidade de perfil detalhado será implementada!)`);
}

/**
 * Simula a remoção de um usuário (professor, profissional, aluno, responsável).
 * @param {HTMLElement} buttonElement - O botão "X" clicado.
 * @param {string} userType - O tipo de usuário.
 */
function removeUser(buttonElement, userType) {
    const listItem = buttonElement.closest('li');
    if (listItem) {
        const userName = listItem.querySelector('span').textContent;
        if (confirm(`Tem certeza que deseja remover ${userType} "${userName}"?`)) {
            listItem.remove();
            alert(`${userType} "${userName}" removido.`);
        }
    }
}

/**
 * Simula a geração de um relatório institucional completo.
 */
function generateInstitutionReport() {
    alert('Gerando relatório institucional completo! (Funcionalidade de backend para geração de relatórios será implementada!)');
}

// Funções de exemplo para as novas seções
function manageClassesGroups() { alert('Gerenciar Turmas e Grupos (funcionalidade a ser implementada!)'); }
function viewSchedule() { alert('Ver Agenda e Calendário (funcionalidade a ser implementada!)'); }
function launchReport() { alert('Lançar Relatório (funcionalidade a ser implementada!)'); }
function managePAIs() { alert('Gerenciar Planos de Acompanhamento Individual (funcionalidade a ser implementada!)'); }
function createComunicado() { alert('Criar Comunicado (funcionalidade a ser implementada!)'); }
function configureNotifications() { alert('Configurar Notificações (funcionalidade a ser implementada!)'); }
function accessLibrary() { alert('Acessar Biblioteca de Materiais (funcionalidade a ser implementada!)'); }
function viewInteractiveActivities() { alert('Ver Atividades Interativas (funcionalidade a ser implementada!)'); }
function manageFiles() { alert('Gerenciar Arquivos (funcionalidade a ser implementada!)'); }
function createLearningPath() { alert('Criar Trilha de Aprendizagem (funcionalidade a ser implementada!)'); }
function manageForms() { alert('Gerenciar Formulários de Anamnese (funcionalidade a ser implementada!)'); }
function viewAnamnesisHistory() { alert('Ver Histórico de Anamnese (funcionalidade a ser implementada!)'); }
function applyEvaluation() { alert('Aplicar Avaliação Adaptada (funcionalidade a ser implementada!)'); }
function managePermissions() { alert('Gerenciar Permissões (funcionalidade a ser implementada!)'); }
function viewLogs() { alert('Ver Logs de Atividades (funcionalidade a ser implementada!)'); }
function manageSessions() { alert('Gerenciar Sessões Ativas (funcionalidade a ser implementada!)'); }
function saveSettings() { alert('Salvar Configurações (funcionalidade a ser implementada!)'); }
function changePlan() { alert('Alterar Plano de Assinatura (funcionalidade a ser implementada!)'); }
function viewInvoiceHistory() { alert('Ver Histórico de Faturas (funcionalidade a ser implementada!)'); }
function applyCustomization() { alert('Aplicar Customização Visual (funcionalidade a ser implementada!)'); }
