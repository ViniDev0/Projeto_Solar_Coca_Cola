document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário
  
    // Obtenha os valores dos campos
    const email = document.getElementById("emailField").value;
    const senha = document.getElementById("passwordField").value;
  
    // Validação simples do e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
  
    // Validação da senha
    if (senha === "") {
      alert("Por favor, insira sua senha.");
      return;
    }
  
    // E-mail e Senha corretos
    const emailCorreto = "marcio@gmail.com";
    const senhaCorreta = "12345";
  
    // Verifique se o e-mail e a senha estão corretos
    if (email === emailCorreto && senha === senhaCorreta) {
      window.location.href = "../PAGES/CRUDClientes.html"; // Altere para o link da página desejada
    } else {
      alert("E-mail ou senha incorretos.");
    }
  });
  