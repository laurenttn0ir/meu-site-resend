const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend'); // Importa o Resend

const app = express();
app.use(express.json());
app.use(cors());

// Configurações do Banco de Dados, Chave de Segurança e Resend
const MONGO_URI = process.env.MONGO_URI || "sua_string_de_conexao_do_mongodb_aqui";
const JWT_SECRET = process.env.JWT_SECRET || "uma_chave_secreta_e_segura_aqui";
const resend = new Resend(process.env.RESEND_API_KEY); // Usa a chave configurada no Render

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("🔥 Conectado ao MongoDB com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// --- MODELO DE USUÁRIO (Com suporte a código de verificação) ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Se o e-mail foi verificado
  verificationCode: { type: String },          // Código temporário
  codeExpires: { type: Date }                  // Validade do código
});
const User = mongoose.model('User', UserSchema);

// --- FAZ O EXPRESS MOSTRAR O SEU SITE HTML ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 1. ROTA PARA ENVIAR O CÓDIGO DE VERIFICAÇÃO ---
app.post('/api/enviar-codigo', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // Gera um código aleatório de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000); // Expira em 10 minutos

    // Criptografa a senha antecipadamente
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Verifica se o usuário já existe
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ error: "Este e-mail já está cadastrado e verificado." });
      }
      // Atualiza os dados caso não estivesse verificado
      user.name = name;
      user.password = hashedPassword;
      user.verificationCode = code;
      user.codeExpires = codeExpires;
      await user.save();
    } else {
      // Cria um registro pendente de verificação
      user = new User({
        name,
        email,
        password: hashedPassword,
        verificationCode: code,
        codeExpires,
        isVerified: false
      });
      await user.save();
    }

    // Envia o e-mail utilizando o Resend
    // Nota: Se estiver usando o domínio padrão do Resend, o e-mail remetente precisa ser onboarding@resend.dev
    // e só pode ser enviado para a mesma conta que criou a chave ou emails verificados.
    const data = await resend.emails.send({
      from: 'Mustache Pods <onboarding@resend.dev>',
      to: [email],
      subject: 'Seu código de verificação - Mustache Pods',
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Olá, ${name}!</h2>
        <p>Seu código de verificação para acessar a Mustache Pods é:</p>
        <h1 style="color: #9333ea; letter-spacing: 2px;">${code}</h1>
        <p>Este código expira em 10 minutos.</p>
      </div>`
    });

    console.log("E-mail enviado com sucesso:", data);
    res.status(200).json({ message: "Código de verificação enviado para o seu e-mail!" });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar o código de verificação. Verifique a chave do Resend." });
  }
});

// --- 2. ROTA PARA CONFIRMAR O CÓDIGO E FINALIZAR CADASTRO ---
app.post('/api/verificar-codigo', async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado." });

    if (user.isVerified) {
      return res.status(400).json({ error: "Usuário já verificado." });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: "Código incorreto." });
    }

    if (user.codeExpires < new Date()) {
      return res.status(400).json({ error: "O código expirou. Solicite um novo." });
    }

    // Ativa o usuário
    user.isVerified = true;
    user.verificationCode = undefined;
    user.codeExpires = undefined;
    await user.save();

    // Gera o Token JWT para já logar o usuário automaticamente
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: "Conta verificada com sucesso!",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Erro na verificação:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// --- ROTA DE LOGIN ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "E-mail ou senha incorretos." });

    if (!user.isVerified) {
      return res.status(400).json({ error: "Por favor, verifique seu e-mail antes de fazer login." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "E-mail ou senha incorretos." });

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
