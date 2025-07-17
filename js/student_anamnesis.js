let currentAnamnesisStep = 1; // Começa na primeira etapa da anamnese
const totalAnamnesisSteps = 6; // Total de etapas da anamnese

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário é um aluno antes de exibir a anamnese
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'aluno') { // CORREÇÃO: Alterado de 'estudante' para 'aluno'
        // Se não for aluno, redireciona para a página inicial ou para o dashboard apropriado
        alert('Esta seção é exclusiva para alunos. Você será redirecionado(a).');
        window.location.href = 'index.html'; // Redireciona para a landing page
        return;
    }

    showAnamnesisStep(currentAnamnesisStep); // Exibe a primeira etapa
    setupAnamnesisListeners(); // Configura os listeners para os campos condicionais
});

/**
 * Exibe uma etapa específica da anamnese e atualiza a barra de progresso.
 * @param {number} stepNum - O número da etapa da anamnese a ser exibida.
 */
function showAnamnesisStep(stepNum) {
    const steps = document.querySelectorAll('.anamnesis-step');
    steps.forEach((step, index) => {
        if (index + 1 === stepNum) {
            step.classList.add('active'); // Ativa a etapa
        } else {
            step.classList.remove('active'); // Desativa as outras etapas
        }
    });
    currentAnamnesisStep = stepNum;
    updateProgressBar(); // Atualiza a barra de progresso visualmente
}

/**
 * Avança para a próxima etapa da anamnese.
 * Inclui validação básica (pode ser expandida).
 * @param {number} stepNum - O número da próxima etapa.
 */
function nextAnamnesisStep(stepNum) {
    // Exemplo de validação: verificar se um campo obrigatório foi preenchido
    // Para uma anamnese real, você teria validações mais robustas para cada etapa.
    const currentActiveStepId = `anamnesis-step-${currentAnamnesisStep}`;
    const currentActiveStepElement = document.getElementById(currentActiveStepId);

    // Exemplo de validação simples para a primeira etapa
    if (currentAnamnesisStep === 1) {
        const motivationText = document.getElementById('motivation-description').value;
        if (motivationText.trim() === '') {
            alert('Por favor, descreva a motivação para o apoio antes de prosseguir.');
            return;
        }
    }
    // Adicione validações para outras etapas conforme necessário

    if (stepNum > totalAnamnesisSteps) {
        submitAnamnesis(); // Se for a última etapa, finaliza a anamnese
        return;
    }
    showAnamnesisStep(stepNum); // Exibe a próxima etapa
}

/**
 * Volta para a etapa anterior da anamnese.
 * @param {number} stepNum - O número da etapa anterior.
 */
function prevAnamnesisStep(stepNum) {
    showAnamnesisStep(stepNum);
}

/**
 * Atualiza a largura da barra de progresso e o texto da etapa.
 */
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-bar-container p');
    const percentage = (currentAnamnesisStep / totalAnamnesisSteps) * 100;
    progressBar.style.width = `${percentage}%`; // Define a largura da barra
    progressText.textContent = `Etapa ${currentAnamnesisStep} de ${totalAnamnesisSteps}`; // Atualiza o texto
}

/**
 * Configura os event listeners para os campos que aparecem/desaparecem
 * com base nas seleções do usuário.
 */
function setupAnamnesisListeners() {
    // Visibilidade dos campos de laudo médico
    document.querySelectorAll('input[name="medical_report"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const medicalReportDetails = document.getElementById('medical-report-details');
            if (event.target.value === 'sim' || event.target.value === 'em_processo') {
                medicalReportDetails.classList.remove('hidden');
            } else {
                medicalReportDetails.classList.add('hidden');
            }
        });
    });

    // Visibilidade do campo "Outro" para profissionais
    const otherProfessionalCheckbox = document.querySelector('input[name="professional"][value="outro"]');
    if (otherProfessionalCheckbox) {
        otherProfessionalCheckbox.addEventListener('change', (event) => {
            const otherProfessionalInput = document.getElementById('other-professional');
            if (event.target.checked) {
                otherProfessionalInput.classList.remove('hidden');
            } else {
                otherProfessionalInput.classList.add('hidden');
                otherProfessionalInput.value = ''; // Limpa o input se desmarcado
            }
        });
    }

    // Visibilidade dos campos de acompanhamento atual
    document.querySelectorAll('input[name="current_accompaniment"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const accompanimentDetailsInput = document.getElementById('accompaniment-details');
            if (event.target.value === 'sim') {
                accompanimentDetailsInput.classList.remove('hidden');
            } else {
                accompanimentDetailsInput.classList.add('hidden');
            }
        });
    });

    // Visibilidade dos campos de ano repetido
    document.querySelectorAll('input[name="repeated_year"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const repeatedYearDetailsInput = document.getElementById('repeated-year-details');
            if (event.target.value === 'sim') {
                repeatedYearDetailsInput.classList.remove('hidden');
            } else {
                repeatedYearDetailsInput.classList.add('hidden');
            }
        });
    });

    // Visibilidade dos campos de troca de escola frequente
    document.querySelectorAll('input[name="frequent_school_changes"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const schoolChangeDetailsInput = document.getElementById('school-change-details');
            if (event.target.value === 'sim') {
                schoolChangeDetailsInput.classList.remove('hidden');
            } else {
                schoolChangeDetailsInput.classList.add('hidden');
            }
        });
    });

    // Visibilidade dos campos de medicação contínua
    document.querySelectorAll('input[name="continuous_medication"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const medicationDetailsInput = document.getElementById('medication-details');
            if (event.target.value === 'sim') {
                medicationDetailsInput.classList.remove('hidden');
            } else {
                medicationDetailsInput.classList.add('hidden');
            }
        });
    });

    // NOVA LÓGICA: Visibilidade dos campos de atendimento especializado
    document.querySelectorAll('input[name="specialized_assistance"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const assistanceDetails = document.getElementById('assistance_details');
            if (event.target.value === 'sim') {
                assistanceDetails.classList.remove('hidden');
            } else {
                assistanceDetails.classList.add('hidden');
            }
        });
    });

    // NOVA LÓGICA: Visibilidade dos campos de suporte físico
    document.querySelectorAll('input[name="physical_support"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            const physicalSupportDetails = document.getElementById('physical_support_details');
            if (event.target.value === 'sim') {
                physicalSupportDetails.classList.remove('hidden');
            } else {
                physicalSupportDetails.classList.add('hidden');
            }
        });
    });
}

/**
 * Função para finalizar a anamnese.
 * Coleta todos os dados e os enviaria para um backend em uma aplicação real.
 */
function submitAnamnesis() {
    // Coletaria todos os dados da anamnese de todas as etapas aqui
    // e os enviaria para um servidor para armazenamento.
    alert('Anamnese finalizada com sucesso! Redirecionando para o Painel do Aluno.');
    // Redireciona para o painel principal do estudante
    window.location.href = 'student_dashboard.html';
}
