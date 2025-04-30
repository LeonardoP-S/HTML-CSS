async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nomecadastro').value.trim();
    const sobrenome = document.getElementById('sobrenomecadastro').value.trim();
    const email = document.getElementById('emailcadastro').value.trim();
    const senha = document.getElementById('passawordcadastro').value.trim();
    const confirmacaoSenha = document.getElementById('senhacadastro').value.trim();
    const role = document.getElementById('rolecadastro').value.trim(); // se tiver campo "função"

    if (senha !== confirmacaoSenha) {
        alert('As senhas não conferem!');
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: nome,
                lastName: sobrenome,
                email,
                password: senha,
                role
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        } else {
            alert(`Erro: ${dados.error || "Não foi possível cadastrar."}`);
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao se conectar com o servidor.");
    }
}