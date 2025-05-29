import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function OrderSummary({ onTotalChange }) {
  const { cart, removeFromCart, clearCart } = useCart();

  // Remove item from cart
  const handleRemove = (item) => {
    removeFromCart(item.id);
  };

  let subtotal = 0;
  cart.forEach(item => {
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
    subtotal += priceNum * item.quantity;
  });
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  useEffect(() => {
    if (onTotalChange) onTotalChange(total);
  }, [cart, onTotalChange, subtotal, tax, total]);

  if (cart.length === 0) {
    return <div className="empty">Your cart is empty.</div>;
  }

  return (
    <div>
      <ul className="order-list">
        {cart.map((item, idx) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ flex: 2, textAlign: 'left' }}>{item.item} x{item.quantity}</span>
            <span style={{ flex: 1, textAlign: 'right', color: '#f95b11', fontWeight: 600 }}>{item.price} ea</span>
            <span style={{ flex: 1, textAlign: 'right', marginLeft: 8 }}>= ${(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
            <button onClick={() => handleRemove(item)} style={{ marginLeft: 12, color: '#f95b11', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.1em' }} aria-label="Remove item">✕</button>
          </li>
        ))}
      </ul>
      <div className="order-total" style={{ textAlign: 'right', marginTop: 12, fontSize: '1.08em' }}>
        <div style={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}><span style={{ flex: 1, textAlign: 'right' }}>Subtotal:</span> <span style={{ minWidth: 80, display: 'inline-block', textAlign: 'right' }}>${subtotal.toFixed(2)}</span></div>
        <div style={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}><span style={{ flex: 1, textAlign: 'right' }}>Tax (8.25%):</span> <span style={{ minWidth: 80, display: 'inline-block', textAlign: 'right' }}>${tax.toFixed(2)}</span></div>
        <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}><span style={{ flex: 1, textAlign: 'right' }}>Total:</span> <span style={{ minWidth: 80, display: 'inline-block', textAlign: 'right' }}>${total.toFixed(2)}</span></div>
      </div>
      <div style={{ textAlign: 'right', marginTop: 20 }}>
        <button className="btn" style={{ marginRight: 12, background: '#bbb', color: '#fff', padding: '10px 18px', borderRadius: 6, fontWeight: 600 }} onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/checkout" className="btn" style={{ background: '#f95b11', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>
          Go to Checkout
        </Link>
      </div>
    </div>
  );
}
