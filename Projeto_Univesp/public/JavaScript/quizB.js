// Pega o nome do módulo com base no nome do arquivo (ex: quizB.html → B)
const modulo = window.location.pathname.split("/").pop().replace("quiz", "").replace(".html", ""); // pega 'quizB' de 'quizB_quiz.html'

function finalizarQuiz() {
    const totalPerguntas = 8;
    let pontuacao = 0;
    let respostasCorretas = {
        q1: "c",
        q2: "c",
        q3: "c",
        q4: "c",
        q5: "c",
        q6: "d",
        q7: "a",
        q8: "b"
    };

    const percentual = Math.round((pontuacao / totalPerguntas) * 100);

    // Exibe resultado
    alert(`Você acertou ${pontuacao} de ${totalPerguntas} perguntas. Pontuação: ${percentual}%`);

    // Salva no localStorage
    let aluno = JSON.parse(localStorage.getItem("aluno")) || {};
    if (!aluno.modulos) aluno.modulos = {};
    if (!aluno.modulos[modulo]) aluno.modulos[modulo] = {};

    aluno.modulos[modulo].quizConcluido = true;
    aluno.modulos[modulo].pontuacao = percentual;
    localStorage.setItem("aluno", JSON.stringify(aluno));
}

function sairDoQuiz() {
    const totalPerguntas = 8;
    let respondidas = 0;

    for (let i = 1; i <= totalPerguntas; i++) {
        const resposta = document.querySelector(`input[name="q${i}"]:checked`);
        if (resposta) respondidas++;
    }

    if (respondidas < totalPerguntas) {
        alert("Você não respondeu todas as perguntas. Finalize o quiz antes de sair.");
        return;
    }

    window.location.href = "/paginas/ensino.html";
}

// Impede fechar a aba sem responder tudo
window.onbeforeunload = function () {
    const totalPerguntas = 8;
    for (let i = 1; i <= totalPerguntas; i++) {
        const resposta = document.querySelector(`input[name="q${i}"]:checked`);
        if (!resposta) {
            return "Você ainda não respondeu todas as perguntas. Deseja realmente sair?";
        }
    }
};