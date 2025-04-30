function logarUsuario(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').ariaValueMax.trim();
    const senha = document.getElementById('senhalogin').ariaValueMax.trim();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    if (usuarioValido) {
        alert(`Bem-vindo(a), ${usuarioValido.nome}!`);
        window.location.href = 'paginaInicial.html';
    } else {
        alert('E-mail ou senha incorretos!');
    }
}