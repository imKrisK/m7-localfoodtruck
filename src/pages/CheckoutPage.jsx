import React, { useState, useContext } from 'react';
import OrderSummary from '../components/OrderSummary';
import GuestInfoForm from '../components/GuestInfoForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe('pk_test_51RTmFGFTCPvYgdIudPQ8yUCFiLatXMZFVm5oByMTtZJB0EVtjsB4rmAbvuxb3jPFgxaCNq9ACFxU8Qlc6g6VZrqX00mOCpKIut');

function ReceiptModal({ order, onClose, onPrint, onEmail }) {
  if (!order) return null;
  const itemsHtml = order.items.map((item, idx) => (
    <li key={idx} style={{display:'flex',justifyContent:'space-between'}}>
      <span>{item.item} x{item.quantity}</span>
      <span>${(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
    </li>
  ));
  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.45)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',padding:32,borderRadius:10,maxWidth:420,width:'90vw',boxShadow:'0 4px 24px rgba(0,0,0,0.18)',position:'relative'}}>
        <span onClick={onClose} style={{position:'absolute',top:12,right:18,fontSize:'1.5em',cursor:'pointer'}}>&times;</span>
        <h3 style={{marginTop:0}}>Order Placed!</h3>
        <div style={{color:'#28a745',marginBottom:8}}>Thank you for your order!</div>
        <div><b>Order ID:</b> {order.orderId}</div>
        <ul style={{listStyle:'none',padding:0,margin:'10px 0'}}>{itemsHtml}</ul>
        <div style={{textAlign:'right',marginBottom:4}}>Subtotal: ${order.subtotal.toFixed(2)}</div>
        <div style={{textAlign:'right',marginBottom:4}}>Tax: ${order.tax.toFixed(2)}</div>
        <div style={{textAlign:'right',fontWeight:'bold'}}>Total: ${order.total.toFixed(2)}</div>
        <div style={{marginTop:10,fontSize:'0.95em',color:'#888'}}>A receipt is available below and can be emailed or printed.</div>
        <div style={{display:'flex',gap:8,marginTop:18}}>
          <button className="btn" style={{flex:1,background:'#f95b11',color:'#fff'}} onClick={onPrint}>Print</button>
          <button className="btn" style={{flex:1,background:'#28a745',color:'#fff'}} onClick={onEmail}>Email</button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const cartContext = useCart();
  const [guestInfo, setGuestInfo] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Place order logic (save to backend)
  const handlePlaceOrder = async (paymentSuccess) => {
    if (!paymentSuccess) return;
    setLoading(true);
    setOrderError('');
    // Use cart from context
    let cart = cartContext.cart;
    if (!cart.length) {
      setOrderError('Your cart is empty!');
      setLoading(false);
      return;
    }
    // Calculate subtotal/tax/total again for safety
    let subtotal = 0;
    cart.forEach(item => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
      subtotal += priceNum * item.quantity;
    });
    const taxRate = 0.0825;
    const tax = subtotal * taxRate;
    const totalVal = subtotal + tax;
    const orderId = 'ORD-' + Date.now();
    const orderData = {
      items: cart,
      orderId,
      guestInfo,
      subtotal,
      tax,
      total: totalVal,
      date: new Date().toISOString(),
      status: 'pending',
    };
    try {
      const res = await fetch('http://localhost:5380/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error('Order could not be saved to server.');
      setOrderPlaced(true);
      setShowReceipt(true);
      setLastOrder(orderData);
      localStorage.removeItem('checkoutCart');
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
    } catch (err) {
      setOrderError(err.message || 'Order could not be saved to server.');
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    if (!lastOrder) return;
    const email = lastOrder.guestInfo && lastOrder.guestInfo.email ? lastOrder.guestInfo.email : '';
    const subject = encodeURIComponent('Your Food Truck Order Receipt');
    let body = `Order ID: ${lastOrder.orderId}\n`;
    lastOrder.items.forEach(item => {
      body += `${item.item} x${item.quantity}: $${(parseFloat(item.price.replace(/[^\\d.]/g, '')) * item.quantity).toFixed(2)}\n`;
    });
    body += `Subtotal: $${lastOrder.subtotal.toFixed(2)}\nTax: $${lastOrder.tax.toFixed(2)}\nTotal: $${lastOrder.total.toFixed(2)}\n`;
    body += `\nThank you for your order!`;
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  if (orderPlaced && showReceipt && lastOrder) {
    return <ReceiptModal order={lastOrder} onClose={()=>setShowReceipt(false)} onPrint={handlePrint} onEmail={handleEmail} />;
  }

  if (orderPlaced) {
    return <div className="checkout-container"><h2>Order Placed!</h2><div style={{color:'#28a745'}}>Thank you for your order!</div></div>;
  }

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      <OrderSummary onTotalChange={setTotal} />
      {!guestInfo ? (
        <GuestInfoForm onSubmit={setGuestInfo} loading={loading} />
      ) : (
        <>
          <h3 style={{marginTop:32}}>Payment</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={total} onPaymentSuccess={handlePlaceOrder} />
          </Elements>
          <button className="btn" style={{marginTop:16}} onClick={()=>setGuestInfo(null)} disabled={loading}>Back to Info</button>
        </>
      )}
      {orderError && <div style={{color:'#d9534f',marginTop:12}}>{orderError}</div>}
    </div>
  );
}
