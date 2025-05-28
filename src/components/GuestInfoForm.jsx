import React, { useState } from 'react';

export default function GuestInfoForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Geolocation for autofill
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setError('Locating...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              setAddress(data.display_name);
              setError('');
            } else {
              setError('Unable to retrieve address from location.');
            }
          })
          .catch(() => setError('Unable to retrieve address from location.'));
      },
      (err) => {
        setError('Unable to retrieve your location.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      setError('Please provide your name and delivery address.');
      return;
    }
    setError('');
    onSubmit({ name, email, phone, address });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ marginBottom: 24 }}>
      <h3>Your Information (required for delivery)</h3>
      <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
      <textarea placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} required />
      <button type="button" onClick={handleGetLocation} disabled={loading} style={{ marginBottom: 8 }}>Use My Current Location</button>
      {error && <div style={{ color: '#d9534f', marginBottom: 8 }}>{error}</div>}
      <button type="submit" className="btn" disabled={loading}>Continue to Payment</button>
    </form>
  );
}
