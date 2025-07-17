document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1; // Inicia na primeira etapa do index.html

    const steps = document.querySelectorAll('.form-step');
    const mainContainer = document.getElementById('main-container');

    /**
     * Exibe uma etapa específica do formulário e ajusta o contêiner principal.
     * @param {number} stepNum - O número da etapa a ser exibida.
     */
    function showStep(stepNum) {
        steps.forEach((step, index) => {
            if (index + 1 === stepNum) {
                step.classList.add('active'); // Ativa a etapa
            } else {
                step.classList.remove('active'); // Desativa as outras etapas
            }
        });
        currentStep = stepNum;
        // Reinicia a largura máxima para as etapas de autenticação
        mainContainer.classList.add('max-w-lg');
        mainContainer.classList.remove('max-w-4xl');
    }

    /**
     * Alterna a visibilidade dos campos de cadastro da instituição com base no tipo.
     * @param {string} type - O tipo de instituição ('publica' ou 'privada').
     */
    function toggleInstitutionFields(type) {
        document.getElementById('public-institution-fields').classList.add('hidden');
        document.getElementById('private-institution-fields').classList.add('hidden');

        if (type === 'publica') {
            document.getElementById('public-institution-fields').classList.remove('hidden');
        } else if (type === 'privada') {
            document.getElementById('private-institution-fields').classList.remove('hidden');
        }
    }

    // --- Listeners para a Etapa 1 (Seleção de Perfil) ---
    document.getElementById('proceed-button').addEventListener('click', () => {
        const selectedRole = document.querySelector('input[name="role"]:checked').value;

        if (selectedRole === 'instituicao') {
            showStep(2); // Vai para o formulário de cadastro da instituição
        } else {
            // Para Aluno, Professor, Profissional da Saúde/Educação, vai direto para o login
            showStep(4);
        }
        // Armazena o perfil selecionado no localStorage para uso na próxima página
        localStorage.setItem('userRole', selectedRole);
    });

    // --- Listeners para a Etapa 2 (Formulário de Cadastro da Instituição) ---
    document.getElementById('back-to-role-selection').addEventListener('click', () => {
        showStep(1); // Volta para a Seleção de Perfil
    });

    document.getElementById('institution-type').addEventListener('change', (event) => {
        toggleInstitutionFields(event.target.value);
    });

    document.getElementById('continue-institution-registration').addEventListener('click', () => {
        // Validação básica dos campos da instituição
        const institutionName = document.getElementById('institution-name').value;
        const institutionType = document.getElementById('institution-type').value;
        const institutionEmail = document.getElementById('institution-email').value;
        const institutionPhone = document.getElementById('institution-phone').value;

        if (!institutionName || !institutionType || !institutionEmail || !institutionPhone) {
            alert('Por favor, preencha todos os campos obrigatórios da instituição.');
            return;
        }

        if (institutionType === 'publica') {
            const cnpjPublic = document.getElementById('institution-cnpj-public').value;
            const inepPublic = document.getElementById('institution-inep-public').value;
            if (!cnpjPublic || !inepPublic) {
                alert('Por favor, preencha o CNPJ e o Código INEP para instituições públicas.');
                return;
            }
        } else if (institutionType === 'privada') {
            const cnpjPrivate = document.getElementById('institution-cnpj-private').value;
            const contactPerson = document.getElementById('institution-contact-person').value;
            if (!cnpjPrivate || !contactPerson) {
                alert('Por favor, preencha o CNPJ e a Pessoa de Contato para instituições privadas.');
                return;
            }
        }

        showStep(3); // Avança para a Definição de Senha
    });

    document.getElementById('go-to-login-from-institution-register').addEventListener('click', (event) => {
        event.preventDefault();
        showStep(4); // Vai para o Formulário de Login
    });

    // --- Listeners para a Etapa 3 (Definição de Senha da Instituição) ---
    document.getElementById('back-to-institution-registration').addEventListener('click', () => {
        showStep(2); // Volta para o Formulário de Cadastro da Instituição
    });

    document.getElementById('finalize-institution-registration').addEventListener('click', () => {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem! Por favor, verifique.');
            return;
        }
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Simula o envio dos dados de cadastro da instituição para um backend
        alert(`Cadastro da Instituição finalizado com sucesso!`);

        localStorage.setItem('userRole', 'instituicao'); // Garante que o perfil seja 'instituicao'
        window.location.href = 'institution_dashboard.html'; // Redireciona para o painel da instituição
    });

    document.getElementById('go-to-login-from-password').addEventListener('click', (event) => {
        event.preventDefault();
        showStep(4); // Vai para o Formulário de Login
    });

    // --- Listeners para a Etapa 4 (Formulário de Login) ---
    document.getElementById('back-to-role-selection-from-login').addEventListener('click', () => {
        showStep(1); // Volta para a Seleção de Perfil
    });

    document.getElementById('handle-login').addEventListener('click', () => {
        const loginEmail = document.getElementById('login-email').value;
        const loginPassword = document.getElementById('login-password').value;
        const selectedRole = localStorage.getItem('userRole'); // Pega o perfil selecionado na Etapa 1

        // Em uma aplicação real, você enviaria essas credenciais para um backend para verificação.
        // Para esta demonstração, vamos simular um login bem-sucedido e redirecionar.

        if (!loginEmail || !loginPassword) {
            alert('Por favor, insira seu email e senha.');
            return;
        }

        alert(`Login para ${loginEmail} realizado com sucesso como ${selectedRole}!`);

        // Redireciona com base no perfil selecionado
        if (selectedRole === 'aluno') {
            window.location.href = 'student_anamnesis.html'; // Aluno vai para a anamnese (se for o primeiro login)
        } else if (selectedRole === 'professor') {
            window.location.href = 'teacher_dashboard.html';
        } else if (selectedRole === 'profissional_saude_educacao') {
            window.location.href = 'psychologist_dashboard.html'; // Usando o mesmo dashboard do psicólogo por enquanto
        } else if (selectedRole === 'instituicao') {
            window.location.href = 'institution_dashboard.html';
        } else {
            // Caso não haja role no localStorage (ex: acesso direto ao index.html e login)
            // Pode-se inferir a role pelo email ou redirecionar para uma página padrão
            alert('Perfil não identificado. Redirecionando para o painel padrão.');
            window.location.href = 'student_dashboard.html'; // Exemplo
        }
    });

    document.getElementById('go-to-institution-register-from-login').addEventListener('click', (event) => {
        event.preventDefault();
        // Redireciona para a Etapa 2 e pré-seleciona a Instituição para cadastro
        document.querySelector('input[name="role"][value="instituicao"]').checked = true;
        showStep(2);
        toggleInstitutionFields(document.getElementById('institution-type').value); // Mostra campos se já houver seleção
    });

    // Inicializa a primeira etapa ao carregar a página
    showStep(currentStep);
    // Garante que os campos corretos da instituição sejam exibidos se o tipo já estiver selecionado
    const initialInstitutionType = document.getElementById('institution-type');
    if (initialInstitutionType) {
        toggleInstitutionFields(initialInstitutionType.value);
    }
});
