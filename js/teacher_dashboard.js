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
 * Simula a geração de uma atividade adaptada por IA e exibe o resultado em um modal.
 */
function generateActivity() {
    const activityFile = document.getElementById('activity-file').value;
    const disabilityType = document.getElementById('disability-type').value;
    const assignStudent = document.getElementById('assign-student').value;

    // Validação básica dos campos
    if (!activityFile) {
        alert('Por favor, anexe um arquivo de atividade.');
        return;
    }
    if (!disabilityType) {
        alert('Por favor, selecione para qual dificuldade adaptar.');
        return;
    }
    if (!assignStudent) {
        alert('Por favor, selecione para qual aluno enviar.');
        return;
    }

    const modalOverlay = document.getElementById('ai-modal');
    const modalContainer = modalOverlay.querySelector('.modal-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const responseArea = document.getElementById('response-area');

    // Exibe o modal e a animação de carregamento
    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
        modalOverlay.classList.add('show');
        modalContainer.classList.add('show');
    }, 10);

    loadingSpinner.classList.remove('hidden');
    responseArea.classList.add('hidden');
    responseArea.innerHTML = ''; // Limpa conteúdo anterior

    // Simula a geração da IA com um atraso para demonstração
    setTimeout(() => {
        loadingSpinner.classList.add('hidden'); // Esconde o spinner
        responseArea.classList.remove('hidden'); // Mostra a área de resposta
        responseArea.innerHTML = `
            <h2 class="text-blue-900 text-3xl font-bold">Atividade Adaptada: Matemática - Problemas de Lógica</h2>
            <p class="text-gray-700"><strong>Para:</strong> ${assignStudent}</p>
            <p class="text-gray-700"><strong>Adaptado para:</strong> ${disabilityType}</p>
            <hr class="my-4 border-gray-300">
            <h3 class="text-blue-800 text-2xl font-semibold mb-3">Instruções para o Aluno:</h3>
            <p class="text-gray-800">Olá! Esta atividade vai desafiar sua mente com problemas divertidos. Leia cada problema com calma. Se precisar, use um papel para desenhar ou contar. Não tenha pressa, o importante é pensar!</p>
            <h3 class="text-blue-800 text-2xl font-semibold mb-3 mt-6">Problemas Adaptados:</h3>
            <ol class="list-decimal list-inside space-y-4 text-gray-800">
                <li>
                    <strong>Problema 1: O Jardim das Borboletas</strong><br>
                    No jardim da Maria, havia 5 borboletas azuis e 3 borboletas amarelas. De repente, mais 2 borboletas verdes chegaram.
                    <br>Quantas borboletas há no jardim agora?
                    <p class="text-sm text-gray-600 mt-1">Dica: Pense em cada grupo de borboletas e junte-os para descobrir o total. Você pode desenhar as borboletas!</p>
                </li>
                <li>
                    <strong>Problema 2: Os Brinquedos do João</strong><br>
                    João tinha 10 carrinhos. Ele deu 4 carrinhos para seu amigo Pedro.
                    <br>Quantos carrinhos João tem agora?
                    <p class="text-sm text-gray-600 mt-1">Dica: Comece com o número total de carrinhos e tire aqueles que foram dados. Imagine você tirando os carrinhos da sua caixa.</p>
                </li>
                <li>
                    <strong>Problema 3: As Frutas da Cesta</strong><br>
                    Na cesta, havia maçãs e bananas. Se tem 7 maçãs e o total de frutas é 12,
                    <br>quantas bananas há na cesta?
                    <p class="text-sm text-gray-600 mt-1">Dica: Se você sabe o total e uma parte, como você encontra a outra parte? Use os dedos para contar se precisar!</p>
                </li>
            </ol>
            <h3 class="text-blue-800 text-2xl font-semibold mb-3 mt-6">Observações do Professor:</h3>
            <p class="text-gray-800 text-sm italic">Esta atividade foi gerada com adaptações para ${disabilityType}, focando em linguagem clara, problemas curtos e o uso de dicas visuais/conceituais para apoiar o raciocínio lógico. Recomenda-se acompanhamento durante a primeira execução.</p>
        `;
    }, 3000); // Simula 3 segundos de carregamento
}

/**
 * Fecha o modal de atividade gerada.
 */
function closeModal() {
    const modalOverlay = document.getElementById('ai-modal');
    const modalContainer = modalOverlay.querySelector('.modal-container');
    modalOverlay.classList.remove('show');
    modalContainer.classList.remove('show');
    setTimeout(() => {
        modalOverlay.classList.add('hidden'); // Esconde o modal após a transição
    }, 300);
}

/**
 * Simula o início de um chat com um familiar ou psicopedagogo.
 * Em uma aplicação real, isso abriria uma interface de chat ou redirecionaria.
 * @param {string} type - Tipo de chat ('familiar' ou 'psicopedagogo').
 */
function startChat(type) {
    alert(`Iniciando chat com ${type === 'familiar' ? 'um familiar do aluno' : 'o psicopedagogo'}. (Funcionalidade de chat em tempo real será implementada no backend!)`);
    // Em um projeto real, aqui você integraria uma solução de chat (ex: WebSockets, Firebase Chat)
    // ou redirecionaria para uma página de chat específica.
}

// Funções de exemplo para gerenciamento de alunos (podem ser expandidas)
function addStudent() {
    alert('Funcionalidade de adicionar aluno será implementada aqui! (Ex: Abrir um formulário de cadastro de aluno)');
}

function viewStudentProgress(studentName) {
    alert(`Visualizando o progresso de: ${studentName}`);
}
