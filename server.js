const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
}));

// Banco de dados simulado (em memória)
let users = [
  { username: "Gabriel Boeira", password: "123456", email: "gabriel@example.com", date: "1990-01-01" }
];

// Rota para registrar usuário
app.post("/register", (req, res) => {
  const { username, password, email, date } = req.body;
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe!" });
  }
  users.push({ username, password, email, date });
  res.status(201).json({ message: "Usuário registrado com sucesso!" });
});

// Rota para login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: "Login bem-sucedido!" });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos!" });
  }
});

// Rota para obter todos os usuários cadastrados
app.get("/users", (req, res) => {
  res.status(200).json(users); // Retorna todos os usuários
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
