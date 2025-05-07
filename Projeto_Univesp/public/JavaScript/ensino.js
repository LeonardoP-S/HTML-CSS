document.addEventListener("DOMContentLoaded", () => {
    inicializarProgresso();
    atualizarStatusDosModulos();
});

// Inicializa progresso se não existir
function inicializarProgresso() {
    const progressoPadrao = {
        modulos: {
            basico: { concluido: false, liberado: true },
            intermediario: { concluido: false, liberado: false },
            avancado: { concluido: false, liberado: false },
        }
    };

    if (!localStorage.getItem("aluno")) {
        localStorage.setItem("aluno", JSON.stringify(progressoPadrao));
    }
}

// Atualiza os botões com base no progresso
function atualizarStatusDosModulos() {
    const aluno = JSON.parse(localStorage.getItem("aluno"));

    document.getElementById("btn-intermediario").disabled = !aluno.modulos.intermediario.liberado;
    document.getElementById("btn-avancado").disabled = !aluno.modulos.avancado.liberado;
}

// Carrega conteúdo HTML do módulo na página
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

// Marca um módulo como concluído e libera o próximo
function concluirModulo(moduloAtual) {
    const aluno = JSON.parse(localStorage.getItem("aluno"));

    // Garante que só atualiza se o módulo já existir no progresso
    if (!aluno.modulos[moduloAtual]) {
        aluno.modulos[moduloAtual] = { concluido: false, liberado: true };
    }

    // Marcar como concluído só se já estiver com nota >=70% no quiz
    if (aluno.modulos[moduloAtual].pontuacao >= 70) {
        aluno.modulos[moduloAtual].concluido = true;

        // Libera o próximo módulo com base no atual
        if (moduloAtual === "basico") {
            aluno.modulos.intermediario = {
                ...(aluno.modulos.intermediario || {}),
                liberado: true
            };
        } else if (moduloAtual === "intermediario") {
            aluno.modulos.avancado = {
                ...(aluno.modulos.avancado || {}),
                liberado: true
            };
        }

        localStorage.setItem("aluno", JSON.stringify(aluno));
        alert(`Parabéns! Módulo "${moduloAtual}" concluído. Próximo liberado.`);
        location.reload();
    } else {
        alert("Você precisa atingir pelo menos 70% no quiz para concluir este módulo.");
    }
}