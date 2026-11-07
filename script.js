
const WHATSAPP_NUMBER = "6285713162087";
const products = [
  {
    id: 1, name: "Laptop Lenovo ThinkPad", category: "Laptop",
    description: "Core i5 • RAM 8GB • SSD 256GB • Kondisi baik",
    price: 3250000, condition: "Kondisi baik", visual: "laptop", badge: "Pilihan populer",
    image: "images/Laptop Lenovo ThinkPad.jpg"
  },
  {
    id: 2, name: "Samsung Galaxy A52", category: "Smartphone",
    description: "RAM 8GB • Memori 128GB • Fungsi normal",
    price: 1850000, condition: "Kondisi baik", visual: "phone", badge: "Harga menarik",
    image: "images/Samsung Galaxy A52.jpg"
  },
  {
    id: 3, name: "iPad Generasi 9", category: "Tablet",
    description: "Memori 64GB • Wi-Fi • Cocok untuk belajar",
    price: 2950000, condition: "Kondisi baik", visual: "tablet", badge: "Siap pakai",
    image: "images/iPad Generasi 9.jpg"
  },
  {
    id: 4, name: "Laptop ASUS VivoBook", category: "Laptop",
    description: "Core i3 • RAM 8GB • SSD 256GB",
    price: 2850000, condition: "Kondisi baik", visual: "laptop", badge: "Value deal",
    image: "images/Laptop ASUS VivoBook.jpg"
  },
  {
    id: 5, name: "Xiaomi Redmi Note 11", category: "Smartphone",
    description: "RAM 6GB • Memori 128GB • Layar AMOLED",
    price: 1450000, condition: "Kondisi baik", visual: "phone", badge: "Hemat",
    image: "images/Xiaomi Redmi Note 11.jpg"
  },
  {
    id: 6, name: "Samsung Galaxy Tab A8", category: "Tablet",
    description: "Memori 64GB • Layar 10.5 inci",
    price: 1750000, condition: "Kondisi baik", visual: "tablet", badge: "Pilihan harian",
    image: "images/Samsung Galaxy Tab A8.jpg"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cart = [];
let activeCategory = "Semua";

const rupiah = value => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(value);

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const categoryMatch = activeCategory === "Semua" || product.category === activeCategory;
    const keywordMatch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(keyword);
    return categoryMatch && keywordMatch;
  });

  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state">Produk tidak ditemukan. Coba kata kunci lain.</div>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
  <article class="product-card">
    <div class="product-art">
      <span class="product-badge">${product.badge || ""}</span>
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
      >
    </div>
      <div class="product-info">
        <span class="product-category">${product.category} · ${product.condition}</span>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <div class="price">${rupiah(product.price)}<small>Harga produk</small></div>
          <button class="buy-link add-cart-btn" type="button" data-id="${product.id}">+ Keranjang</button>
        </div>
      </div>
    </article>
  `).join("");
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderProducts();
updateCart();
});

searchInput.addEventListener("input", renderProducts);

// Keranjang belanja: item disimpan sementara selama halaman masih terbuka.
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = totalItems;
  cartTotal.textContent = rupiah(totalPrice);

  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty"><span>🛒</span><strong>Keranjang masih kosong</strong><p>Tambahkan produk yang kamu minati dari katalog.</p></div>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <article class="cart-item">
        <div class="cart-item-thumb">${item.visual === "laptop" ? "▱" : item.visual === "phone" ? "▯" : "▣"}</div>
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>${rupiah(item.price)}</span>
          <div class="quantity-controls">
            <button type="button" data-action="minus" data-id="${item.id}" aria-label="Kurangi jumlah">−</button>
            <b>${item.quantity}</b>
            <button type="button" data-action="plus" data-id="${item.id}" aria-label="Tambah jumlah">+</button>
            <button type="button" class="remove-item" data-action="remove" data-id="${item.id}">Hapus</button>
          </div>
        </div>
        <strong class="cart-line-total">${rupiah(item.price * item.quantity)}</strong>
      </article>
    `).join("");
  }
  document.getElementById("checkoutButton").disabled = cart.length === 0;
}

function openCart() {
  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");
  updateCart();
}
function closeCart() {
  cartOverlay.hidden = true;
  document.body.classList.remove("cart-open");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest(".add-cart-btn");
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.id));
  if (!product) return;
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  updateCart();
  button.textContent = "✓ Ditambahkan";
  window.setTimeout(() => { button.textContent = "+ Keranjang"; }, 1100);
});

document.getElementById("cartTrigger").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", event => {
  if (event.target === cartOverlay) closeCart();
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = cart.find(product => product.id === Number(button.dataset.id));
  if (!item) return;
  if (button.dataset.action === "plus") item.quantity += 1;
  if (button.dataset.action === "minus") item.quantity -= 1;
  if (button.dataset.action === "remove" || item.quantity <= 0) {
    const index = cart.findIndex(product => product.id === item.id);
    cart.splice(index, 1);
  }
  updateCart();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) return;
  const lines = cart.map(item => `- ${item.name} (${item.quantity} x ${rupiah(item.price)}) = ${rupiah(item.price * item.quantity)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Halo ReTech, saya ingin memesan produk berikut:\\n\\n${lines.join("\\n")}\\n\\nEstimasi total: ${rupiah(total)}\\n\\nMohon konfirmasi ketersediaan stok dan langkah selanjutnya.`;
  window.open(whatsappLink(message), "_blank", "noopener");
});

document.getElementById("mainWhatsapp").href = whatsappLink("Halo ReTech, saya ingin bertanya tentang produk elektronik bekas yang tersedia.");
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

renderProducts();
