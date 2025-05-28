import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amount || amount < 50) {
      setError('Invalid or missing order total.');
      return;
    }
    setLoading(true);
    setError(null);
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amount) }) // amount in cents
    }).then(res => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setLoading(false);
        if (onPaymentSuccess) onPaymentSuccess(true);
      } else {
        setError('Payment failed.');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop:16}}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} style={{marginTop:12}}>Pay</button>
      {error && <div style={{color:'#d9534f'}}>{error}</div>}
      {success && <div style={{color:'#28a745'}}>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;