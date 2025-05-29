import React, { useEffect, useState, useRef } from 'react';

const defaultAvatar = 'src/assets/LFTlogo.png';

function getProfile() {
  try {
    return JSON.parse(localStorage.getItem('memberProfile')) || {};
  } catch {
    return {};
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(getProfile());
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: profile.name || '',
    email: profile.email || '',
    password: '',
    avatar: profile.avatar || defaultAvatar,
  });
  const [favorites, setFavorites] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    // Fetch profile from backend if logged in
    async function fetchProfile() {
      const local = getProfile();
      if (local && local.email) {
        try {
          const res = await fetch(`http://localhost:5380/users/by-email?email=${encodeURIComponent(local.email)}`);
          if (res.ok) {
            const data = await res.json();
            setProfile(data);
            setForm(f => ({ ...f, name: data.name || '', email: data.email || '', avatar: data.avatar || defaultAvatar }));
            localStorage.setItem('memberProfile', JSON.stringify(data));
          }
        } catch {}
      }
    }
    fetchProfile();
    // Load favorites
    try {
      setFavorites(JSON.parse(localStorage.getItem('menuFavorites')) || []);
    } catch { setFavorites([]); }
    // Load last order
    try {
      setLastOrder(JSON.parse(localStorage.getItem('lastOrder')) || null);
    } catch { setLastOrder(null); }
    // Load order history
    async function fetchOrderHistory() {
      if (profile && profile.email) {
        try {
          const res = await fetch(`http://localhost:5380/orders?userEmail=${encodeURIComponent(profile.email)}`);
          if (res.ok) {
            setOrderHistory(await res.json());
          }
        } catch { setOrderHistory([]); }
      }
    }
    fetchOrderHistory();
  }, [profile.email]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setForm(f => ({ ...f, avatar: ev.target.result }));
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, avatar } = form;
    let updated = { name, email, avatar };
    if (password) updated.password = password;
    try {
      let res;
      if (profile && profile._id) {
        res = await fetch(`http://localhost:5380/users/${profile._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      } else {
        res = await fetch('http://localhost:5380/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      }
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setForm(f => ({ ...f, password: '' }));
        setEditMode(false);
        localStorage.setItem('memberProfile', JSON.stringify(data));
      } else {
        alert('Profile update failed.');
      }
    } catch {
      alert('Network error. Please try again.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  }

  // Render favorites
  function renderFavorites() {
    if (!favorites.length) return <p style={{ color: '#888' }}>No favorites yet. Go to the menu and click the heart to add some!</p>;
    // You can enhance this to show images, etc.
    return favorites.map((name, idx) => (
      <div key={idx} className="in-box" style={{ maxWidth: 180, display: 'inline-block', margin: 8 }}>
        <div className="in-content">
          <h2 style={{ fontSize: '1em', margin: '8px 0 4px 0' }}>{name}</h2>
        </div>
      </div>
    ));
  }

  // Render last receipt
  function renderReceipt() {
    if (!lastOrder || !lastOrder.items) return <li style={{ color: '#888' }}>No recent orders.</li>;
    return lastOrder.items.map((item, idx) => (
      <li key={idx}><span>{item.item} x{item.quantity}</span><span>{item.price}</span></li>
    ));
  }

  // Render order history
  function renderOrderHistory() {
    if (!orderHistory.length) return <p style={{ color: '#888' }}>No past orders yet.</p>;
    return orderHistory.slice().reverse().map((order, idx) => {
      let total = 0;
      order.items.forEach(item => {
        const priceNum = parseFloat(item.price ? String(item.price).replace(/[^\d.]/g, '') : 0);
        total += priceNum * item.quantity;
      });
      return (
        <div key={idx} style={{ border: '1px solid #eee', padding: 12, marginBottom: 16, borderRadius: 8, background: '#fafafa' }}>
          <div style={{ fontSize: '1.1em', marginBottom: 4 }}><b>Date:</b> {order.date ? new Date(order.date).toLocaleString() : ''}</div>
          <div style={{ fontSize: '1em', marginBottom: 4 }}><b>Order ID:</b> {order.orderId || order._id || ''}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px 0' }}>
            {order.items.map((item, i) => <li key={i} style={{ display: 'flex', justifyContent: 'space-between' }}><span>{item.item || item.name} x{item.quantity}</span><span>{item.price}</span></li>)}
          </ul>
          <div style={{ fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</div>
        </div>
      );
    });
  }

  return (
    <div className="profile-container">
      <h2 style={{ textAlign: 'center' }}>Member Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <img src={form.avatar || defaultAvatar} alt="avatar" className="profile-avatar" />
        <input type="file" ref={fileInputRef} accept="image/*" style={{ marginBottom: 12 }} onChange={handleAvatarChange} />
      </div>
      <form className="profile-form" style={{ marginBottom: 18, display: editMode ? '' : 'none' }} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleInputChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleInputChange} autoComplete="new-password" />
        <button type="submit" className="form-btn">Save</button>
      </form>
      <button id="edit-btn" className="form-btn edit-btn" style={{ display: editMode ? 'none' : '' }} onClick={() => setEditMode(true)}>Edit Profile</button>
      <button id="logout-btn" className="form-btn" style={{ background: '#d9534f', color: '#fff', marginTop: 12 }} onClick={handleLogout}>Logout</button>
      <div id="profile-view" style={{ display: editMode ? 'none' : '', textAlign: 'center', marginTop: 24 }}>
        <p><b>Name:</b> <span id="view-name">{profile.name || '-'}</span></p>
        <p><b>Email:</b> <span id="view-email">{profile.email || '-'}</span></p>
      </div>
      <div id="profile-favorites" style={{ marginTop: 32 }}>
        <h3>Your Favorites</h3>
        <div id="profile-favorites-list">{renderFavorites()}</div>
      </div>
      <div id="profile-receipt" style={{ marginTop: 32 }}>
        <h3>Last Receipt <a href="receipt.html" style={{ fontSize: '0.7em', float: 'right' }}>View Full</a></h3>
        <ul id="profile-receipt-list" className="order-list">{renderReceipt()}</ul>
        <div id="profile-receipt-total" className="order-total"></div>
        <div id="profile-order-id" style={{ color: '#888', margin: '8px 0 0 0' }}></div>
      </div>
      <div id="order-history-section" style={{ marginTop: 32 }}>
        <h3>Order History</h3>
        <div id="order-history-list">{renderOrderHistory()}</div>
      </div>
      {/* Push notification and map features can be added as separate React components if needed */}
    </div>
  );
}
