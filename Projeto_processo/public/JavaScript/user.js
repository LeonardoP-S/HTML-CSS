document.addEventListener("DOMContentLoaded", () => {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {
        nome: "Aluno",
        email: "email@email.com",
        senha: "123456", // senha ficticia
        progresso: 0 
    };

    document.getElementById("nome-aluno").textContent = aluno.nome;
    document.getElementById("email-aluno").textContent = aluno.email;
    document.getElementById("barra-progresso").value = aluno.progresso;
    document.getElementById("progresso-texto").textContent = aluno.progresso + "%";
});

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
function editarPerfil() {
    let novoNome = prompt("DIgite seu novo nome:");
    let novoEmail = prompt("Digite seu novo e-mail:");

    if (novoNome && novoEmail) {
        let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
        aluno.nome = novoNome;
        aluno.email = novoEmail;
        localStorage.setItem("aluno", JSON.stringify(aluno));

        document.getElementById("nome-aluno").textContent = novoNome;
        document.getElementById("email-aluno").textContent = novoEmail;
    }
}

// FUnção para alterar senha
function alterarSenha() {
    let novaSenha = prompt("digite sua nova senha:");

    if (novaSenha && novaSenha.length >= 6) {
        let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
        aluno.senha = novaSenha;
        localStorage.setItem("aluno", JSON.stringify(aluno));
        alert("senha alterada com sucesso!");
    }else {
        alert("A senha deve ter pelo menos 6 caracteres.");
    }
}