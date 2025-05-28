// cart.js - Reusable Shopping Cart Logic
// This script should be included on all pages that need cart functionality.

(function() {
  // --- Improved Cart UI ---
  let cart = [];
  function getCart() {
    try { return JSON.parse(localStorage.getItem('checkoutCart')) || []; } catch { return []; }
  }
  function setCart(newCart) {
    localStorage.setItem('checkoutCart', JSON.stringify(newCart));
  }
  function updateCartUI() {
    let cartList = document.getElementById('cart-list');
    let cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cart = getCart();
    cartList.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, idx) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.marginBottom = '6px';
      // Item breakdown: name, quantity, unit price, total price
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const itemTotal = priceNum * item.quantity;
      li.innerHTML = `<span>${item.item} x${item.quantity}</span> <span style="color:#f95b11;font-weight:600;">${item.price} ea</span> <span style="margin-left:8px;">= $${itemTotal.toFixed(2)}</span>`;
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style.marginLeft = '8px';
      removeBtn.style.fontSize = '1em';
      removeBtn.style.background = 'none';
      removeBtn.style.border = 'none';
      removeBtn.style.color = '#f95b11';
      removeBtn.style.cursor = 'pointer';
      removeBtn.setAttribute('aria-label', 'Remove item');
      removeBtn.onclick = function() {
        cart.splice(idx, 1);
        setCart(cart);
        updateCartUI();
      };
      li.appendChild(removeBtn);
      cartList.appendChild(li);
      subtotal += itemTotal;
    });
    // Tax calculation (e.g., 8.25%)
    const taxRate = 0.0825;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    // Price breakdown
    cartTotal.innerHTML =
      `<div style='margin-bottom:2px;'>Subtotal: $${subtotal.toFixed(2)}</div>` +
      `<div style='margin-bottom:2px;'>Tax (8.25%): $${tax.toFixed(2)}</div>` +
      `<div style='font-weight:bold;'>Total: $${total.toFixed(2)}</div>`;
  }

  // Inject cart container if not present
  if (!document.getElementById('cart-container')) {
    const cartContainer = document.createElement('div');
    cartContainer.id = 'cart-container';
    cartContainer.setAttribute('role', 'region');
    cartContainer.setAttribute('aria-label', 'Shopping Cart');
    cartContainer.style.position = 'fixed';
    cartContainer.style.top = '80px';
    cartContainer.style.right = '16px';
    cartContainer.style.background = '#fff';
    cartContainer.style.border = '1.5px solid #f95b11';
    cartContainer.style.borderRadius = '8px';
    cartContainer.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
    cartContainer.style.padding = '16px 12px 12px 12px';
    cartContainer.style.zIndex = '1200';
    cartContainer.style.minWidth = '240px';
    cartContainer.style.maxWidth = '95vw';
    cartContainer.style.transition = 'right 0.3s';
    cartContainer.style.display = 'none';
    cartContainer.innerHTML = `
      <button id="close-cart-btn" aria-label="Close cart" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#f95b11;">&times;</button>
      <h4 style="margin:0 0 12px 0;font-size:1.3rem;color:#f95b11;">🛒 Cart</h4>
      <ul id="cart-list" style="list-style:none;padding:0;margin:0 0 8px 0;max-height:180px;overflow-y:auto;"></ul>
      <div id="cart-total" style="font-weight:bold;margin-bottom:8px;"></div>
      <button id="clear-cart-btn" style="margin-bottom:8px;display:block;width:100%;background:#eee;color:#f95b11;border:none;padding:8px 0;border-radius:4px;">Clear Cart</button>
      <button id="checkout-btn" style="margin-bottom:8px;display:block;width:100%;background:#f95b11;color:#fff;border:none;padding:8px 0;border-radius:4px;">Checkout</button>
      <a href="checkout.html" id="checkout-link" style="display:none"></a>
    `;
    document.body.appendChild(cartContainer);
  }

  // Inject cart toggle button if not present
  if (!document.getElementById('cart-toggle-btn')) {
    const cartToggleBtn = document.createElement('button');
    cartToggleBtn.id = 'cart-toggle-btn';
    cartToggleBtn.setAttribute('aria-label', 'Show cart');
    cartToggleBtn.innerHTML = '🛒';
    cartToggleBtn.style.position = 'fixed';
    cartToggleBtn.style.top = '90px';
    cartToggleBtn.style.right = '16px';
    cartToggleBtn.style.background = '#f95b11';
    cartToggleBtn.style.color = '#fff';
    cartToggleBtn.style.border = 'none';
    cartToggleBtn.style.borderRadius = '50%';
    cartToggleBtn.style.width = '48px';
    cartToggleBtn.style.height = '48px';
    cartToggleBtn.style.fontSize = '2rem';
    cartToggleBtn.style.zIndex = '1201';
    cartToggleBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.13)';
    document.body.appendChild(cartToggleBtn);
    cartToggleBtn.onclick = function() {
      const cartContainer = document.getElementById('cart-container');
      if (cartContainer) cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    };
  }

  // Cart close button
  document.getElementById('close-cart-btn').onclick = function() {
    document.getElementById('cart-container').style.display = 'none';
  };

  // Clear cart
  document.getElementById('clear-cart-btn').onclick = function() {
    cart = [];
    setCart(cart);
    updateCartUI();
  };

  // Checkout
  document.getElementById('checkout-btn').onclick = function() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCart(cart);
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    const order = { items: cart, orderId: orderId, date: new Date().toISOString() };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    let orderHistory = [];
    try { orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || []; } catch { orderHistory = []; }
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    document.getElementById('checkout-link').click();
  };

  // Expose addToCart for use on any page
  window.addToCart = function(itemName, price, quantity) {
    cart = getCart();
    quantity = parseInt(quantity, 10) || 1;
    const existingIndex = cart.findIndex(item => item.item === itemName && item.price === price);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ item: itemName, price, quantity });
    }
    setCart(cart);
    updateCartUI();
    document.getElementById('cart-container').style.display = 'block';
    alert(`Added to cart:\n${itemName}\nPrice: ${price}\nQuantity: ${quantity}`);
  };

  // Initial render
  updateCartUI();
  // Expose updateCartUI globally for compatibility
  window.updateCartUI = updateCartUI;
})();
