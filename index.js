<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mustache Pods — Premium Shop</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg: #09090b;
      --bg-card: #141417;
      --border: #27272a;
      --text: #f4f4f5;
      --text-dim: #a1a1aa;
      --accent: #00d4aa;
      --accent-hover: #00b38f;
      --radius-lg: 16px;
      --radius-md: 12px;
      --radius-sm: 8px;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }

    /* Header & Navigation */
    header {
      position: sticky; top: 0; z-index: 99;
      background: rgba(9, 9, 11, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }
    .nav {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px;
    }
    .logo { font-size: 22px; font-weight: 700; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 32px; }
    .nav-links a { color: var(--text-dim); text-decoration: none; font-size: 15px; font-weight: 500; transition: color .2s; }
    .nav-links a:hover { color: var(--text); }
    
    .cart-trigger {
      position: relative; background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text); padding: 10px 16px; border-radius: var(--radius-sm);
      cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: all .2s;
    }
    .cart-trigger:hover { border-color: var(--accent); }
    .cart-count { background: var(--accent); color: var(--bg); font-size: 12px; padding: 2px 6px; border-radius: 20px; font-weight: 700; }

    /* Hero Banner */
    .hero {
      max-width: 1200px; margin: 40px auto; padding: 60px 20px;
      background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
      border: 1px solid var(--border); border-radius: var(--radius-lg);
      text-align: center; position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(0, 212, 170, 0.15), transparent 60%);
      pointer-events: none;
    }
    .hero h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
    .hero p { color: var(--text-dim); font-size: 18px; max-width: 600px; margin: 0 auto 32px; }
    
    /* Main Content Layout */
    main { max-width: 1200px; margin: 0 auto; padding: 0 20px 8px; }
    
    .section-title { font-size: 28px; font-weight: 700; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
    .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

    /* Products Grid & Cards */
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 60px; }
    
    .card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 16px; display: flex; flex-direction: column;
      position: relative; transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-4px); border-color: var(--accent); }
    
    .badge {
      position: absolute; top: 16px; left: 16px; background: rgba(0, 212, 170, 0.1);
      color: var(--accent); border: 1px solid rgba(0, 212, 170, 0.2);
      padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; z-index: 2;
    }

    .img-container {
      width: 100%; height: 220px; background: #18181b; border-radius: var(--radius-md);
      margin-bottom: 16px; display: flex; align-items: center; justify-content: center;
      color: var(--text-dim); font-size: 14px; border: 1px solid var(--border); overflow: hidden;
    }
    .img-container img { width: 100%; height: 100%; object-fit: cover; }

    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    
    .flavor-select {
      width: 100%; background: var(--bg); border: 1px solid var(--border);
      color: var(--text); padding: 10px; border-radius: var(--radius-sm);
      font-size: 14px; margin-bottom: 16px; cursor: pointer; outline: none;
    }
    .flavor-select:focus { border-color: var(--accent); }

    .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
    .price { font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 700; color: var(--accent); }
    
    .btn-add {
      background: var(--text); color: var(--bg); border: none; padding: 10px 16px;
      border-radius: var(--radius-sm); font-weight: 600; font-size: 14px; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-add:hover { background: var(--accent); }

    /* Sidebar Carrinho */
    .cart-sidebar {
      position: fixed; top: 0; right: -450px; width: 100%; max-width: 440px; height: 100vh;
      background: var(--bg-card); border-left: 1px solid var(--border); z-index: 100;
      padding: 30px; display: flex; flex-direction: column; transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    }
    .cart-sidebar.open { right: 0; }
    
    .cart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .cart-header h2 { font-size: 22px; font-weight: 700; }
    .cart-close { background: transparent; border: none; color: var(--text-dim); font-size: 24px; cursor: pointer; }
    .cart-close:hover { color: var(--text); }

    .cart-items { flex: 1; overflow-y: auto; margin-bottom: 24px; display: flex; flex-direction: column; gap: 16px; }
    .cart-item {
      display: flex; align-items: center; justify-content: space-between;
      padding-bottom: 16px; border-bottom: 1px solid var(--border);
    }
    .item-info h4 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
    .item-info p { color: var(--text-dim); font-size: 13px; }
    .item-controls { display: flex; align-items: center; gap: 12px; }
    .item-qty { font-family: 'JetBrains Mono', monospace; font-size: 14px; }
    .btn-qty { background: var(--border); border: none; color: var(--text); width: 24px; height: 24px; border-radius: 4px; cursor: pointer; }
    .btn-qty:hover { background: var(--text-dim); color: var(--bg); }

    .cart-footer-box { border-top: 1px solid var(--border); padding-top: 20px; }
    .total-row { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; margin-bottom: 20px; }
    .total-price { color: var(--accent); font-family: 'JetBrains Mono', monospace; }
    
    .btn-checkout {
      width: 100%; background: var(--accent); color: var(--bg); border: none; padding: 14px;
      border-radius: var(--radius-sm); font-weight: 700; font-size: 16px; cursor: pointer; transition: background 0.2s;
    }
    .btn-checkout:hover { background: var(--accent-hover); }

    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 98;
      display: none; opacity: 0; transition: opacity 0.3s;
    }
    .overlay.open { display: block; opacity: 1; }

    footer { border-top: 1px solid var(--border); padding: 40px 20px; text-align: center; color: var(--text-dim); font-size: 14px; }

    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero { margin: 20px 10px; padding: 40px 16px; }
      .cart-sidebar { max-width: 100%; }
    }
  </style>
</head>
<body>

  <div class="overlay" id="overlay" onclick="toggleCart()"></div>

  <header>
    <nav class="nav">
      <a href="#" class="logo">MUSTACHE<span>PODS</span></a>
      <div class="nav-links">
        <a href="#disposables">Descartáveis</a>
        <a href="#pods">Pods Sistemas</a>
        <a href="#refills">Refis</a>
      </div>
      <button class="cart-trigger" onclick="toggleCart()">
        Carrinho <span class="cart-count" id="cart-count">0</span>
      </button>
    </nav>
  </header>

  <section class="hero">
    <h1>Premium Vape Store</h1>
    <p>Os melhores modelos e os sabores mais procurados do mercado com entrega rápida e estoque 100% atualizado.</p>
  </section>

  <main>
    <!-- Categoria: Descartáveis -->
    <h2 class="section-title" id="disposables">Linha Descartáveis</h2>
    <div class="grid">
      
      <!-- Produto 1 -->
      <div class="card">
        <span class="badge">Mais Vendido</span>
        <div class="img-container">
          <!-- Coloque o link da imagem real dentro do src -->
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300" alt="Elfbar BC 5000">
        </div>
        <div class="card-title">Elfbar BC 5000 Puffs</div>
        <select class="flavor-select" id="flavor-elf5k">
          <option>Fuji Apple</option>
          <option>Rainbow Candy</option>
          <option>Sour Grape</option>
          <option>Nectarine Ice</option>
        </select>
        <div class="card-footer">
          <div class="price">R$ 25,00</div>
          <button class="btn-add" onclick="addToCart('Elfbar BC 5000', 25.00, 'flavor-elf5k')">Adicionar</button>
        </div>
      </div>

      <!-- Produto 2 -->
      <div class="card">
        <div class="img-container">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300" alt="Ignite Vnano">
        </div>
        <div class="card-title">Ignite Vnano Descartável</div>
        <select class="flavor-select" id="flavor-ignite">
          <option>Cola Ice</option>
          <option>Blueberry</option>
          <option>Cherry Lemonade</option>
          <option>Orange Burst</option>
        </select>
        <div class="card-footer">
          <div class="price">R$ 23,00</div>
          <button class="btn-add" onclick="addToCart('Ignite Vnano', 23.00, 'flavor-ignite')">Adicionar</button>
        </div>
      </div>

      <!-- Produto 3 -->
      <div class="card">
        <span class="badge">Alta Duração</span>
        <div class="img-container">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300" alt="Elfbar RC 10k">
        </div>
        <div class="card-title">Elfbar RC 10.000 Puffs</div>
        <select class="flavor-select" id="flavor-elf10k">
          <option>Blueberry Mint</option>
          <option>Miami Mint</option>
          <option>Cherry Lemon</option>
          <option>Blue Razz Ice</option>
        </select>
        <div class="card-footer">
          <div class="price">R$ 38,00</div>
          <button class="btn-add" onclick="addToCart('Elfbar RC 10k', 38.00, 'flavor-elf10k')">Adicionar</button>
        </div>
      </div>

    </div>

    <!-- Categoria: Refis -->
    <h2 class="section-title" id="refills">Refis & Líquidos</h2>
    <div class="grid">
      
      <!-- Produto 4 -->
      <div class="card">
        <div class="img-container">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300" alt="Refil Life">
        </div>
        <div class="card-title">Refil Life 8K Pod</div>
        <select class="flavor-select" id="flavor-life8k">
          <option>Triple Berry</option>
          <option>Lemon Grass</option>
          <option>Strawberry Mango</option>
          <option>Apple Melon</option>
        </select>
        <div class="card-footer">
          <div class="price">R$ 36,00</div>
          <button class="btn-add" onclick="addToCart('Refil Life 8K', 36.00, 'flavor-life8k')">Adicionar</button>
        </div>
      </div>

    </div>
  </main>

  <!-- Sidebar do Carrinho -->
  <div class="cart-sidebar" id="cart-sidebar">
    <div class="cart-header">
      <h2>Seu Carrinho</h2>
      <button class="cart-close" onclick="toggleCart()">×</button>
    </div>
    <div class="cart-items" id="cart-items-container">
      <!-- Itens adicionados entram aqui via JS -->
    </div>
    <div class="cart-footer-box">
      <div class="total-row">
        <span>Total:</span>
        <span class="total-price" id="cart-total-value">R$ 0,00</span>
      </div>
      <button class="btn-checkout" onclick="checkoutEvent()">Finalizar Pedido via WhatsApp</button>
    </div>
  </div>

  <footer>
    <p>Mustache Pods © 2026 — Todos os direitos reservados.</p>
  </footer>

  <script>
    let cart = [];

    function toggleCart() {
      const sidebar = document.getElementById('cart-sidebar');
      const overlay = document.getElementById('overlay');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    }

    function addToCart(name, price, selectId) {
      const selectEl = document.getElementById(selectId);
      const flavor = selectEl ? selectEl.value : 'Padrão';
      
      // Procura se já tem o mesmo produto E o mesmo sabor no carrinho
      const existingItem = cart.find(item => item.name === name && item.flavor === flavor);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, flavor, quantity: 1 });
      }

      updateCartUI();
      
      // Abre o carrinho para dar feedback visual para o usuário igual à Wolf Shop
      const sidebar = document.getElementById('cart-sidebar');
      if(!sidebar.classList.contains('open')) toggleCart();
    }

    function changeQuantity(index, delta) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      updateCartUI();
    }

    function updateCartUI() {
      const container = document.getElementById('cart-items-container');
      const countBadge = document.getElementById('cart-count');
      const totalEl = document.getElementById('cart-total-value');
      
      container.innerHTML = '';
      let total = 0;
      let totalItems = 0;

      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        container.innerHTML += `
          <div class="cart-item">
            <div class="item-info">
              <h4>${item.name}</h4>
              <p>Sabor: ${item.flavor}</p>
              <p style="color: var(--accent); font-family: 'JetBrains Mono'">R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="item-controls">
              <button class="btn-qty" onclick="changeQuantity(${index}, -1)">-</button>
              <span class="item-qty">${item.quantity}</span>
              <button class="btn-qty" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
          </div>
        `;
      });

      countBadge.innerText = totalItems;
      totalEl.innerText = `R$ ${total.toFixed(2)}`;
    }

    function checkoutEvent() {
      if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      // Altere para o seu número de WhatsApp com o DDD (ex: 5521999999999)
      const phoneNumber = "55XXXXXXXXXXX"; 
      
      let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
      let total = 0;

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.quantity}x ${item.name} (${item.flavor}) - R$ ${itemTotal.toFixed(2)}\n`;
      });

      message += `\n*Total do Pedido: R$ ${total.toFixed(2)}*`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
    }
  </script>
</body>
</html>
