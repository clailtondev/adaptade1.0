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
 * Salva as instruções de curadoria da IA para um paciente específico.
 * Em uma aplicação real, isso enviaria os dados para um backend.
 */
function saveAICuration() {
    const patient = document.getElementById('select-patient-curation').value;
    const prompt = document.getElementById('ia-curation-prompt').value;

    // Validação básica
    if (!patient) {
        alert('Por favor, selecione um paciente.');
        return;
    }
    if (prompt.trim() === '') {
        alert('Por favor, forneça as instruções de curadoria para a IA.');
        return;
    }

    alert(`Curadoria da IA salva para ${patient}:\n"${prompt}"\n\nIsso ajudará a IA a adaptar as atividades de forma mais eficaz para este paciente.`);
    // Em uma aplicação real, você enviaria esses dados para o seu backend
    // para atualizar o perfil/preferências de adaptação da IA para o paciente específico.
}

/**
 * Simula a adição de um novo paciente à lista.
 * Em uma aplicação real, isso envolveria um formulário e envio para o backend.
 */
function addPatient() {
    const patientName = prompt("Digite o nome do novo paciente:"); // Exemplo simples com prompt
    if (patientName && patientName.trim() !== "") {
        const patientList = document.getElementById('patient-list');
        const newPatientItem = document.createElement('li');
        newPatientItem.classList.add('flex', 'justify-between', 'items-center', 'bg-[#1a2a4f]', 'p-3', 'rounded-lg');
        newPatientItem.innerHTML = `
            <span>${patientName}</span>
            <a href="#" class="text-yellow-400 hover:text-yellow-300 text-sm font-semibold" onclick="viewPatientProgress('${patientName}')">Ver Progresso</a>
            <button class="text-red-400 hover:text-red-300 ml-2" title="Remover Paciente" onclick="removePatient(this)">X</button>
        `;
        patientList.appendChild(newPatientItem);
        alert(`Paciente "${patientName}" adicionado com sucesso!`);
    } else if (patientName !== null) { // Se o usuário clicou em OK mas deixou em branco
        alert("O nome do paciente não pode ser vazio.");
    }
}

/**
 * Simula a remoção de um paciente da lista.
 * @param {HTMLElement} buttonElement - O botão "X" clicado.
 */
function removePatient(buttonElement) {
    const listItem = buttonElement.closest('li');
    if (listItem) {
        const patientName = listItem.querySelector('span').textContent;
        if (confirm(`Tem certeza que deseja remover o paciente "${patientName}"?`)) { // Usando confirm para simular
            listItem.remove();
            alert(`Paciente "${patientName}" removido.`);
        }
    }
}

/**
 * Simula a visualização do progresso de um paciente.
 * @param {string} patientName - O nome do paciente.
 */
function viewPatientProgress(patientName) {
    alert(`Visualizando o progresso detalhado de: ${patientName}. (Funcionalidade de relatórios detalhados será implementada no backend!)`);
    // Em um projeto real, isso carregaria uma nova seção ou página com gráficos e dados do paciente.
}

/**
 * Simula o início de um chat com um pedagogo.
 */
function startChatWithPedagogue() {
    alert('Iniciando chat em tempo real com o pedagogo. (Funcionalidade de chat será implementada no backend!)');
    // Aqui você integraria uma solução de chat.
}

/**
 * Simula a troca de relatórios com um pedagogo.
 */
function exchangeReportsWithPedagogue() {
    alert('Abrindo interface para troca de relatórios com o pedagogo. (Funcionalidade de upload/download de relatórios será implementada no backend!)');
    // Aqui você abriria um modal ou redirecionaria para uma interface de gerenciamento de documentos.
}
