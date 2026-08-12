const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); // Permite que seu HTML converse com o servidor

// Configurações do Banco de Dados e Chave de Segurança
const MONGO_URI = process.env.MONGO_URI || "sua_string_de_conexao_do_mongodb_aqui";
const JWT_SECRET = process.env.JWT_SECRET || "uma_chave_secreta_e_segura_aqui";

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("🔥 Conectado ao MongoDB com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// --- MODELO DE USUÁRIO (Como os dados salvam no banco) ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// --- FAZ O EXPRESS MOSTRAR O SEU SITE HTML ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- ROTA DE CADASTRO ---
app.post('/api/cadastro', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o e-mail já existe no banco
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "E-mail já cadastrado!" });

    // Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Salva o novo usuário
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// --- ROTA DE LOGIN ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "E-mail ou senha incorretos." });

    // Compara a senha informada com a criptografada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "E-mail ou senha incorretos." });

    // Gera o Token JWT de acesso (válido por 7 dias)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// Inicialização do Servidor na porta correta para o Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
