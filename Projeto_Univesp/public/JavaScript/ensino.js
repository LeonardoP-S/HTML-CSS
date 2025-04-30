// Verifica o progresso do usuário no localStorage (pode ser substituido por banco de dados depois)
document.addEventListener("DOMContentLoaded", () => {
    const progresso = JSON.parse(localStorage.getItem("progresso")) || { basico: false, intermdediario: false, avancado: false };

    if (progresso.basico) {
        document.getElementById("btn-intermediario").disabled = false;
    }
    if (progresso.intermdediario) {
        document.getElementById("btn-avancado").disabled = false;
    }
});

// Função para carregar os módulos
function carregarModulo(modulo) {
    fetch(`/paginas/modulos/${modulo}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("modulo-container").innerHTML = html;
        })
        .catch(error => {
            console.error("Erro ao carregar módulo:", error);
            document.getElementById("modulo-container").innerHTML = "<p>Erro ao carregar o módulo. Tente novamente.</p>";
        });
}

// Função para marcar um módulo como concluído
function concluirModulo(modulo) {
    let progresso = JSON.parse(localStorage.getItem("progresso")) || { basico: false, intermdediario: false, avancado: false };

    progresso[modulo] = true;
    localStorage.setItem("progresso", JSON.stringify(progresso));
    
    alert(`parabéns! Você concluiu o módulo ${modulo}. O próximo foi desbloqueado.`);
    location.reload(); // Recarrega a página para ativar o desbloqueio
}

// No futuro: verificar progresso e liberar módulos
document.addEventListener("DOMContentLoaded", () => {
    const aluno = JSON.parse(localStorage.getItem("aluno")) || {
        modulos: {
            basico: { concluido: false, liberado: true },
            intermediario: { concluido: false, liberado: false },
            avancado: { concluido: false, liberado: false },
        }
    };

    document.getElementById("btn-intermediario").disabled = !aluno.modulos.intermediario.liberado;
    document.getElementById("btn-avancado").disabled = !aluno.modulos.avancado.liberado;
});