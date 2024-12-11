async function register(event) {
    event.preventDefault(); // Para evitar o envio do formulário, caso o botão seja dentro de um <form>
    
    const username = document.querySelector("input[name='usuario']").value;
    const password = document.querySelector("input[name='senha']").value;
    const email = document.querySelector("input[name='email']").value;
    const date = document.querySelector("input[name='date']").value;
    
    // Verificar se algum campo está vazio
    if (!username || !password || !email || !date) {
        alert("Preencha todos os campos");
        return;  // Retorna e não envia a requisição
    }
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, date }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        alert("Erro");
      }
    } catch (error) {
      alert("Erro ao se conectar ao servidor!");
      console.error(error);
    }
}
