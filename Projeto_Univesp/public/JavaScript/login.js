async function logarUsuario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('Namelogin').Value.trim();
    const email = document.getElementById('loginEmail').Value.trim();
    const senha = document.getElementById('senhalogin').Value.trim();

    if (!email || !senha || !nome) {
        alert("Preencha todos os campos!")
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password: senha })
        });
         
        const  data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Armazena o JWT
            localStorage.setItem("usuario", JSON.stringify(data.usuario)); // opcional
            alert(`Bem-vindo(a), ${data.usuario.firstName}!`);
            window.location.href = "index.html";
        } else {
            alert(`Erro: ${data.error || "E-mail ou senha inválidos"}`);
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro ao conectar com o servidor.");
    }
}