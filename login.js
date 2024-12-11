async function login() {
    const username = document.querySelector("input[name='usuario']").value;
    const password = document.querySelector("input[name='senha']").value;
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // login.js
    if (response.ok) {
    localStorage.setItem('user', JSON.stringify({ username }));  // Armazenando o usuário no localStorage
    window.location.href = "home.html";  // Redireciona para a página home
     }
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.href = "home.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Usuário inválido");
      console.error(error);
    }
  }
  