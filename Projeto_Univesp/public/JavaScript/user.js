document.addEventListener("DOMContentLoaded", () => {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {
        nome: "Aluno",
        email: "teste@email.com",
        senha: "123456", // senha fictícia
        progresso: 0
    };

    document.getElementById("nome-aluno").value = aluno.nome;
    document.getElementById("email-aluno").value = aluno.email;
    document.getElementById("senha-aluno").value = aluno.senha;
    document.getElementById("barra-progresso").value = aluno.progresso;
    document.getElementById("progresso-texto").textContent = aluno.progresso + "%";

    //simular aumento do progresso 
    document.getElementById("aumentarProgresso")?.addEventListener("click", () => {
        aluno.progresso = Math.min(aluno.progresso + 10, 100); // Máximo de 100%
        document.getElementById("barra-progresso").value = aluno.progresso;
        document.getElementById("progresso-texto").textContent = aluno.progresso + "%";
        localStorage.setItem("aluno", JSON.stringify(aluno));
    });

    verificarProgresso();
});

     // Mostrar e esconder senhar
     function alternarSenha() {
        const inputSenha = document.getElementById("senha-aluno");
        const btnOlho = inputSenha.nextElementSibling;
    
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            btnOlho.textContent = "🙈"; // senha visível
        } else {
            inputSenha.type = "password";
            btnOlho.textContent = "👁️"; // senha escondida
        }
    }

// Atualizar a barra de progresso dinamicamente
function atualizarProgreso(valor) {
    const barra = document.getElementById("barra-progresso");
    const texto = document.getElementById("progresso-texto");

    barra.value = valor;
    texto.textContent = valor + "%";

    let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    aluno.progresso = valor;
    localStorage.setItem("aluno", JSON.stringify(aluno));
}

//função para editar perfil
function habilitarEdicamc() {
    document.getElementById("nome-aluno").disabled = false;
    document.getElementById("email-aluno").disabled = false;
    document.getElementById("senha-aluno").disabled = false;
    document.getElementById("btnSalvar").style.display = "inline-block";
}

// Salvar as alterações
function SalvarEdição() {
    const nome = document.getElementById("nome-aluno").value.trim();
    const email = document.getElementById("email-aluno").value.trim();
    const senha = document.getElementById("senha-aluno").value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaForte = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!nome || !email || !senha) {
        alert("todos os campos são obrigatórios.");
        return;
    }

    if (!emailValido.test(email)) {
        alert("E-mail inválido!");
        return;
    }

    if (!senhaForte.test(senha)) {
        alert("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula e um número.");
        return;
    }

    const aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    aluno.nome = nome;
    aluno.email = email;
    aluno.senha = senha;

    localStorage.setItem("aluno", JSON.stringify(aluno));

    document.getElementById("nome-aluno").disabled = true;
    document.getElementById("email-aluno").disabled = true;
    document.getElementById("senha-aluno").disabled = true;
    document.getElementById("btnSalvar").style.display = "none";

    alert("dados atualizados com sucesso!");
}

//Atualizar progresso manualmente (se for usado fora do botão principal)
function atualizarProgreso(valor) {
    const barra = document.getElementById("barra-progresso");
    const texto = document.getElementById("progresso-texto");

    barra.value = valor;
    texto.textContent = valor + "%";

    let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    aluno.progresso = valor;
    localStorage.setItem("aluno", JSON.stringify(aluno));
}

//Verificar progresso do módulo e exibir notificação
function verificarProgresso() {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {};

    if (aluno.progresso === 100 && !aluno.quizIniciado) {
        const notificacoes = document.getElementById("notificacoes");
        const mensagem = document.getElementById("mensagemNotificacao");

        mensagem.innerText = "🎉 Você atingiu 100% de progresso no Módulo B! Já pode fazer o quiz.";
        notificacoes.style.display = "block";
    }
}

//Fechar notificação
document.getElementById("fecharNotificacao")?.addEventListener("click", () => {
    document.getElementById("notificacoes").style.display = "none";
});