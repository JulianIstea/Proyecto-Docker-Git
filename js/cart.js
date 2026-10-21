const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartFooterEl = document.getElementById('cartFooter');
const cartBadge = document.getElementById('cartBadge');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartEmptyBtn = document.getElementById('cartEmptyBtn');
const toastEl = document.getElementById('toast');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(value) {
  return '$' + value.toFixed(2);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function renderCart() {
  cartItemsEl.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="quantity-controls">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.id}" aria-label="Eliminar producto">🗑</button>
    `;
    cartItemsEl.appendChild(div);
  });

  const count = getCartCount();
  cartBadge.textContent = count;
  cartBadge.classList.toggle('show', count > 0);
  cartTotalEl.textContent = formatPrice(getCartTotal());

  const isEmpty = cart.length === 0;
  cartEmptyEl.classList.toggle('show', isEmpty);
  cartFooterEl.classList.toggle('show', !isEmpty);
  cartItemsEl.style.display = isEmpty ? 'none' : 'block';
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(product.name + ' agregado al carrito');
}

function changeQuantity(id, action) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (action === 'increase') item.qty += 1;
  if (action === 'decrease') item.qty -= 1;
  if (action === 'remove' || item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    if (action === 'remove') showToast('Producto eliminado');
  }

  saveCart();
  renderCart();
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    addToCart({
      id: Number(btn.dataset.id),
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price),
      img: btn.dataset.img
    });
  });
});

cartItemsEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  changeQuantity(Number(btn.dataset.id), btn.dataset.action);
});

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartEmptyBtn.addEventListener('click', closeCart);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

checkoutBtn.addEventListener('click', () => {
  const total = formatPrice(getCartTotal());
  const count = getCartCount();
  const confirmed = confirm(`¿Confirmar compra?\n\n${count} producto(s) por un total de ${total}`);
  if (confirmed) {
    cart = [];
    saveCart();
    renderCart();
    closeCart();
    showToast('¡Gracias por tu compra!');
  }
});

renderCart();
