const express = require('express');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Permite que o servidor entenda dados enviados em formato JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal: Seu catálogo completo de Vapes Premium
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mustache Pods | O melhor preço do mercado!</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root {
--bg: #0a0a0f;
--bg-2: #12121a;
--card: #18181f;
--border: #2a2a3a;
--text: #f0f0f5;
--text-dim: #8888a0;
--accent: #00e5a0;
--accent-dim: #00b880;
--danger: #ff4757;
--radius: 16px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
font-family: 'Space Grotesk', sans-serif;
background: var(--bg);
color: var(--text);
line-height: 1.5;
overflow-x: hidden;
}
.mono { font-family: 'JetBrains Mono', monospace; }

/* Background */
.bg-pattern {
position: fixed; inset: 0; z-index: -1;
background:
radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,229,160,0.08), transparent),
radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255,71,87,0.06), transparent),
var(--bg);
}

/* Header */
header {
position: sticky; top: 0; z-index: 100;
background: rgba(10,10,15,0.9);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
}
.nav {
max-width: 1200px; margin: 0 auto;
display: flex; align-items: center; justify-content: space-between;
padding: 16px 24px;
}
.logo {
font-size: 22px; font-weight: 700;
display: flex; align-items: center; gap: 10px;
}
.logo-dot { color: var(--accent); }
.nav-links { display: flex; gap: 32px; }
.nav-links a { color: var(--text-dim); font-size: 14px; transition: color .2s; text-decoration: none; }
.nav-links a:hover { color: var(--text); }
.btn {
padding: 10px 24px;
border-radius: 100px;
font-weight: 600; font-size: 14px;
border: none; cursor: pointer;
transition: all .2s;
}
.btn-primary {
background: var(--accent);
color: var(--bg);
}
.btn-primary:hover { background: var(--accent-dim); transform: scale(1.02); }
.btn-ghost {
background: transparent;
border: 1px solid var(--border);
color: var(--text);
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

/* Hero */
.hero {
max-width: 1200px; margin: 0 auto;
padding: 100px 24px 60px;
text-align: center;
}
.hero-badge {
display: inline-flex; align-items: center; gap: 8px;
background: rgba(0,229,160,0.1);
border: 1px solid rgba(0,229,160,0.2);
padding: 6px 16px;
border-radius: 100px;
font-size: 12px;
color: var(--accent);
margin-bottom: 24px;
}
.hero h1 {
font-size: clamp(36px, 6vw, 64px);
font-weight: 700;
line-height: 1.1;
margin-bottom: 20px;
letter-spacing: -1px;
}
.hero h1 span { color: var(--accent); }
.hero p {
font-size: 18px;
color: var(--text-dim);
max-width: 600px;
margin: 0 auto 40px;
}
.hero-cta {
display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
}

/* Stats */
.stats {
display: flex; gap: 48px; justify-content: center;
margin-top: 60px; flex-wrap: wrap;
}
.stat-item { text-align: center; }
.stat-item strong {
display: block; font-size: 32px; font-weight: 700;
color: var(--accent); font-family: 'JetBrains Mono', monospace;
}
.stat-item span { font-size: 13px; color: var(--text-dim); }

/* Category Badge */
.cat-badge {
display: inline-block;
background: rgba(255,71,87,0.15);
border: 1px solid var(--danger);
color: var(--danger);
padding: 4px 12px;
border-radius: 6px;
font-size: 11px;
text-transform: uppercase;
letter-spacing: .1em;
margin-bottom: 16px;
}

/* Products Section */
section { padding: 80px 24px; }
.section-header {
max-width: 1200px; margin: 0 auto 40px;
display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;
}
.section-header h2 {
font-size: clamp(28px, 4vw, 40px);
font-weight: 700;
}
.section-header p { color: var(--text-dim); font-size: 14px; }

/* Product Cards */
.products-grid {
max-width: 1200px; margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 24px;
}
.product-card {
background: var(--card);
border: 1px solid var(--border);
border-radius: var(--radius);
padding: 24px;
transition: all .3s ease;
position: relative;
overflow: hidden;
}
.product-card::before {
content: '';
position: absolute; top: 0; left: 0; right: 0;
height: 3px;
background: linear-gradient(90deg, var(--accent), var(--danger));
opacity: 0;
transition: opacity .3s;
}
.product-card:hover {
transform: translateY(-4px);
border-color: rgba(0,229,160,0.3);
box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
.product-card:hover::before { opacity: 1; }

.product-header {
display: flex; justify-content: space-between; align-items: flex-start;
margin-bottom: 12px;
}
.product-name {
font-size: 16px; font-weight: 700;
color: var(--text);
}
.product-cost {
font-family: 'JetBrains Mono', monospace;
font-size: 12px; 
color: var(--text-dim); 
text-decoration: line-through;
}
.product-price {
font-family: 'JetBrains Mono', monospace;
font-size: 22px; font-weight: 700;
color: var(--accent);
white-space: nowrap;
}
.product-profit {
font-size: 11px;
color: var(--accent);
background: rgba(0,229,160,0.1);
padding: 2px 8px;
border-radius: 4px;
margin-top: 6px;
display: inline-block;
}
.product-sabores {
margin-top: 12px;
}
.product-sabores h4 {
font-size: 10px;
text-transform: uppercase;
letter-spacing:.1em;
color: var(--text-dim);
margin-bottom: 10px;
}
.sabores-list {
display: flex; flex-wrap: wrap; gap: 6px;
}
.sabor-tag {
background: var(--bg-2);
border: 1px solid var(--border);
padding: 5px 10px;
border-radius: 4px;
font-size: 11px;
color: var(--text-dim);
transition: all .2s;
}
.sabor-tag:hover {
border-color: var(--accent);
color: var(--text);
}

/* Formulário de Captura do Lead */
.box-lead {
  max-width: 500px;
  margin: 0 auto 40px;
  background: var(--card);
  border: 1px solid var(--border);
  padding: 30px;
  border-radius: var(--radius);
  text-align: center;
}
.box-lead input {
  padding: 12px 20px;
  width: 100%;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  margin-bottom: 15px;
  font-family: inherit;
}
.box-lead input:focus {
  outline: none;
  border-color: var(--accent);
}

/* Footer */
footer {
border-top: 1px solid var(--border);
padding: 48px 24px;
text-align: center;
}
footer p { color: var(--text-dim); font-size: 13px; }

/* Mobile */
@media (max-width: 600px) {
.nav-links { display: none; }
.hero { padding-top: 60px; }
.stats { gap: 24px; }
.stat-item strong { font-size: 24px; }
.products-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<div class="bg-pattern"></div>

<header>
<nav class="nav">
<div class="logo">
<span class="logo-dot">●</span>
BotMetaAds
</div>
<div class="nav-links">
<a href="#descartaveis">Descartáveis</a>
<a href="#pods">Pods & Kits</a>
<a href="#refis">Refis & Acessórios</a>
</div>
<a href="#acesso" class="btn btn-primary">Comprar Agora</a>
</nav>
</header>

<section class="hero">
<div class="hero-badge">🚀 Margem Alta · Entrega Express</div>
<h1>Vapes Premium <span>Alta Margem</span><br>Pra Sua Loja</h1>
<p>Preços calculados com margem de revenda agressiva (+100% a +150%). Pronto pra anunciar no Meta Ads.</p>
<div class="hero-cta">
<a href="#descartaveis" class="btn btn-primary">Ver Catálogo</a>
<a href="#acesso" class="btn btn-ghost">Fazer Pedido</a>
</div>
<div class="stats">
<div class="stat-item"><strong>350+</strong><span>Produtos</span></div>
<div class="stat-item"><strong>+120%</strong><span>Margem Média</span></div>
<div class="stat-item"><strong>40k+</strong><span>Entregues</span></div>
</div>
</section>

<!-- SEÇÃO DE ACESSO COM ENVIO DE E-MAIL (RESEND) -->
<section id="acesso">
  <div class="box-lead">
    <h2 style="margin-bottom: 10px; font-size: 24px;">Liberar Tabela Completa</h2>
    <p style="color: var(--text-dim); font-size: 14px; margin-bottom: 20px;">Digite seu e-mail para receber o token de acesso e fazer pedidos.</p>
    <form action="/enviar-codigo" method="POST">
      <input type="email" name="emailCliente" placeholder="seu-email@gmail.com" required /><br/>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Receber Código de Acesso</button>
    </form>
  </div>
</section>

<!-- CATEGORIA 1: DESCARTÁVEIS -->
<section id="descartaveis">
<div class="section-header">
<span class="cat-badge">Descartáveis</span>
<h2>Descartáveis Premium</h2>
<p>Margem de revenda: 100% - 130%</p>
</div>
<div class="products-grid">

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">IGNITE VNANO</div>
<div class="product-cost">Custo: R$ 11,50</div>
</div>
<div class="product-price">R$ 23,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">cola ice</span>
<span class="sabor-tag">blueberry</span>
<span class="sabor-tag">cherry</span>
<span class="sabor-tag">orange</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">IGNITE V35</div>
<div class="product-cost">Custo: R$ 12,50</div>
</div>
<div class="product-price">R$ 25,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">fruit splash</span>
<span class="sabor-tag">blue rasp</span>
<span class="sabor-tag">menthol</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">IGNITE V55</div>
<div class="product-cost">Custo: R$ 23,50</div>
</div>
<div class="product-price">R$ 47,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">minty melon</span>
<span class="sabor-tag">melon mix</span>
<span class="sabor-tag">Straw kiwi</span>
<span class="sabor-tag">miami mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V80 NEW</div>
<div class="product-cost">Custo: R$ 27,50</div>
</div>
<div class="product-price">R$ 55,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">icy mint</span>
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">açaí ice</span>
<span class="sabor-tag">blueberry</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V150 PRO</div>
<div class="product-cost">Custo: R$ 27,50</div>
</div>
<div class="product-price">R$ 55,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">green apple kiwi</span>
<span class="sabor-tag">cherry banana</span>
<span class="sabor-tag">berry blast</span>
<span class="sabor-tag">lemon ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">IGNITE V155</div>
<div class="product-cost">Custo: R$ 29,00</div>
</div>
<div class="product-price">R$ 58,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">watermelon mix</span>
<span class="sabor-tag">strawberry ban</span>
<span class="sabor-tag">green apple</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V250</div>
<div class="product-cost">Custo: R$ 33,50</div>
</div>
<div class="product-price">R$ 67,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry ban</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">green apple</span>
<span class="sabor-tag">grape ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V300 SLIM</div>
<div class="product-cost">Custo: R$ 37,50</div>
</div>
<div class="product-price">R$ 75,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">peach mango</span>
<span class="sabor-tag">green apple</span>
<span class="sabor-tag">strawberry kiwi</span>
<span class="sabor-tag">aloe grape</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V400 ICE</div>
<div class="product-cost">Custo: R$ 33,50</div>
</div>
<div class="product-price">R$ 67,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry ice</span>
<span class="sabor-tag">cola</span>
<span class="sabor-tag">blue razz</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V400 SWEET</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">cool menthol</span>
<span class="sabor-tag">blueberry ice</span>
<span class="sabor-tag">triple mango</span>
<span class="sabor-tag">peach berry</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">V400 MIX</div>
<div class="product-cost">Custo: R$ 38,50</div>
</div>
<div class="product-price">R$ 77,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape pop</span>
<span class="sabor-tag">mango ice</span>
<span class="sabor-tag">icy mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">WAKA 36K</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">aqua ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">WAKA 25K</div>
<div class="product-cost">Custo: R$ 24,00</div>
</div>
<div class="product-price">R$ 48,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">pistachio</span>
<span class="sabor-tag">aqua ice</span>
<span class="sabor-tag">melon ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">BLACK SHEEP 30K</div>
<div class="product-cost">Custo: R$ 36,00</div>
</div>
<div class="product-price">R$ 72,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape ice kiwi</span>
<span class="sabor-tag">watermelon gum</span>
<span class="sabor-tag">sour green apple</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">BLACK SHEEP 40K</div>
<div class="product-cost">Custo: R$ 40,00</div>
</div>
<div class="product-price">R$ 80,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">blueberry bubblegum</span>
<span class="sabor-tag">grape mango mint</span>
<span class="sabor-tag">açaí strawberry</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">NIK BAR 10K</div>
<div class="product-cost">Custo: R$ 20,00</div>
</div>
<div class="product-price">R$ 40,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">miami mint</span>
<span class="sabor-tag">banana ice</span>
<span class="sabor-tag">sakura grape</span>
<span class="sabor-tag">strawberry ban</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">NIKBAR 30K</div>
<div class="product-cost">Custo: R$ 23,00</div>
</div>
<div class="product-price">R$ 46,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">miami mint</span>
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">icy mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">LOST MARY 10K</div>
<div class="product-cost">Custo: R$ 15,00</div>
</div>
<div class="product-price">R$ 30,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">lush ice</span>
<span class="sabor-tag">kiwi passion</span>
<span class="sabor-tag">grape burst</span>
<span class="sabor-tag">peach mango</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">LOST MARY 30K</div>
<div class="product-cost">R$ 29,00</div>
</div>
<div class="product-price">R$ 58,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grapefruit tea</span>
<span class="sabor-tag">aloe sour apple</span>
<span class="sabor-tag">blueberry watermel</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">LOST MARY 35K DURA</div>
<div class="product-cost">Custo: R$ 27,50</div>
</div>
<div class="product-price">R$ 55,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">green apple ice</span>
<span class="sabor-tag">mango ice</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">strawberry kiwi</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">OXBAR 30K</div>
<div class="product-cost">Custo: R$ 29,00</div>
</div>
<div class="product-price">R$ 58,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">raspberry lemon</span>
<span class="sabor-tag">blackcurrant lemon</span>
<span class="sabor-tag">double apple</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">OXBAR 50K</div>
<div class="product-cost">Custo: R$ 39,00</div>
</div>
<div class="product-price">R$ 78,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry grape</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">menthol</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">HILO KOLO 10K</div>
<div class="product-cost">Custo: R$ 17,50</div>
</div>
<div class="product-price">R$ 35,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">honey peach</span>
<span class="sabor-tag">strawberry lychee</span>
<span class="sabor-tag">double apple</span>
<span class="sabor-tag">spearmint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">HQD 30K</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">icy mint</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">strawberry ban</span>
</div>
</div>
</div>

</div>
</section>

<!-- CATEGORIA 2: PODS & SISTEMAS FECHADOS -->
<section id="pods">
<div class="section-header">
<span class="cat-badge">Sistemas Fechados</span>
<h2>Pods & Dispositivos</h2>
<p>Margem de revenda: 80% - 120%</p>
</div>
<div class="products-grid">

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR BC 5K</div>
<div class="product-cost">Custo: R$ 12,50</div>
</div>
<div class="product-price">R$ 25,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">Fuji</span>
<span class="sabor-tag">Rinbo</span>
<span class="sabor-tag">sour grape</span>
<span class="sabor-tag">nectarine</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR Rc 10K</div>
<div class="product-cost">Custo: R$ 19,00</div>
</div>
<div class="product-price">R$ 38,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">blueberry mint</span>
<span class="sabor-tag">Miami mint</span>
<span class="sabor-tag">cherry lemon</span>
<span class="sabor-tag">blue razz</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR BC 15K</div>
<div class="product-cost">Custo: R$ 23,00</div>
</div>
<div class="product-price">R$ 46,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">kiwi guava</span>
<span class="sabor-tag">tropical lemon</span>
<span class="sabor-tag">americano ice</span>
<span class="sabor-tag">mango magic</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR EW 16K</div>
<div class="product-cost">Custo: R$ 26,00</div>
</div>
<div class="product-price">R$ 52,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry ice</span>
<span class="sabor-tag">dragon melon</span>
<span class="sabor-tag">blue razz</span>
<span class="sabor-tag">watermelon</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">GH 23K</div>
<div class="product-cost">Custo: R$ 31,50</div>
</div>
<div class="product-price">R$ 63,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">miami mint</span>
<span class="sabor-tag">strawberry ban</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">peach mango</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELF JOINONE 25K</div>
<div class="product-cost">Custo: R$ 37,50</div>
</div>
<div class="product-price">R$ 75,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">kiwi guava</span>
<span class="sabor-tag">mango peach</span>
<span class="sabor-tag">strawberry ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR EW 25K</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">kiwi guava</span>
<span class="sabor-tag">mango peach</span>
<span class="sabor-tag">cool mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR TE 30K</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry water</span>
<span class="sabor-tag">strawberry ice</span>
<span class="sabor-tag">pineapple mango</span>
<span class="sabor-tag">winter mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ICE KING 40K</div>
<div class="product-cost">Custo: R$ 34,00</div>
</div>
<div class="product-price">R$ 68,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">miami mint</span>
<span class="sabor-tag">mango magic</span>
<span class="sabor-tag">blue razz</span>
<span class="sabor-tag">double apple</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELF ICE KING</div>
<div class="product-cost">Custo: R$ 36,00</div>
</div>
<div class="product-price">R$ 72,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">green apple slush</span>
<span class="sabor-tag">black mint</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">IGNITE TADALA 20MG</div>
<div class="product-cost">Custo: R$ 42,50</div>
</div>
<div class="product-price">R$ 85,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">cherry ice</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">KIT P100 BATERIA</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry ice</span>
<span class="sabor-tag">watermelon ice</span>
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">menthol</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">VAPEGIN 20K</div>
<div class="product-cost">Custo: R$ 20,00</div>
</div>
<div class="product-price">R$ 40,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry cream</span>
<span class="sabor-tag">blue berry cherry</span>
</div>
</div>
</div>

</div>
</section>

<!-- CATEGORIA 3: REFIS & ACESSÓRIOS -->
<section id="refis">
<div class="section-header">
<span class="cat-badge">Refis & Acessórios</span>
<h2>Refis de Líquido</h2>
<p>Margem de revenda: 120% - 150%</p>
</div>
<div class="products-grid">

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">REFIL LIFE 8K</div>
<div class="product-cost">Custo: R$ 18,00</div>
</div>
<div class="product-price">R$ 36,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">tripel berry</span>
<span class="sabor-tag">lemon grass</span>
<span class="sabor-tag">strawberry mango</span>
<span class="sabor-tag">apple melon</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR BC 15K REFIL</div>
<div class="product-cost">R$ 25,00</div>
</div>
<div class="product-price">R$ 50,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">kiwi guava</span>
<span class="sabor-tag">tropical lemon</span>
<span class="sabor-tag">mango magic</span>
<span class="sabor-tag">bubbaloo grape</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR EW 16K REFIL</div>
<div class="product-cost">R$ 26,00</div>
</div>
<div class="product-price">R$ 52,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">strawberry ice</span>
<span class="sabor-tag">dragon melon</span>
<span class="sabor-tag">blue razz</span>
<span class="sabor-tag">mango twist</span>
</div>
</div>
</div>

<div class="product-card">
<div class="product-header">
<div>
<div class="product-name">ELFBAR EW 25K REFIL</div>
<div class="product-cost">Custo: R$ 32,50</div>
</div>
<div class="product-price">R$ 65,00</div>
</div>
<div class="product-profit">+100% LUCRO</div>
<div class="product-sabores">
<h4>Sabores</h4>
<div class="sabores-list">
<span class="sabor-tag">grape ice</span>
<span class="sabor-tag">kiwi guava</span>
<span class="sabor-tag">mango peach</span>
<span class="sabor-tag">sour strawberry</span>
</div>
</div>
</div>

</div>
</section>

<footer>
<p>BotMetaAds © 2026 | Vendas Exclusivas para Revenda</p>
</footer>
</body>
</html>
  `);
});

// Rota que processa o envio do e-mail com o token de 6 dígitos
app.post('/enviar-codigo', async (req, res) => {
  const { emailCliente } = req.body;
  const codigoToken = Math.floor(100000 + Math.random() * 900000);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: emailCliente,
      subject: '🔑 Seu token de acesso BotMetaAds',
      html: `<h1>Seu código é: <strong>${codigoToken}</strong></h1><p>Use este código para acessar a área VIP do site.</p>`,
    });

    res.send(`
      <body style="font-family: Arial, sans-serif; background: #0a0a0f; color: #f0f0f5; text-align: center; padding-top: 100px;">
        <h2 style="color: #00e5a0;">E-mail enviado com sucesso para ${emailCliente}!</h2>
        <p style="color: #8888a0;">Verifique sua caixa de entrada e use o código gerado.</p>
        <br>
        <a href="/" style="color: #00e5a0; text-decoration: none; border: 1px solid #2a2a3a; padding: 10px 20px; border-radius: 100px;">Voltar ao Catálogo</a>
      </body>
    `);
  } catch (error) {
    res.status(500).send('Erro ao enviar e-mail: ' + error.message);
  }
});

// Configuração dinâmica da Porta para rodar local ou no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}!`);
});
