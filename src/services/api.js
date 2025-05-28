// src/services/api.js
// Centralized CRUD operations for your NodeJS/Express API

const API_URL = import.meta.env.VITE_API_URL;
const ORDERS_URL = import.meta.env.VITE_ORDERS_URL;
const FAVORITES_URL = import.meta.env.VITE_FAVORITES_URL;
const REVIEWS_URL = import.meta.env.VITE_REVIEWS_URL;

// ITEMS
export async function getItems() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function createItem(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
}

// ORDERS
export async function getOrders() {
  const res = await fetch(ORDERS_URL);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}
export async function createOrder(data) {
  const res = await fetch(ORDERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}
export async function updateOrder(id, data) {
  const res = await fetch(`${ORDERS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
}
export async function deleteOrder(id) {
  const res = await fetch(`${ORDERS_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete order');
}

// FAVORITES
export async function getFavorites() {
  const res = await fetch(FAVORITES_URL);
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return res.json();
}
export async function createFavorite(data) {
  const res = await fetch(FAVORITES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create favorite');
  return res.json();
}
export async function deleteFavorite(id) {
  const res = await fetch(`${FAVORITES_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete favorite');
}

// REVIEWS
export async function getReviews() {
  const res = await fetch(REVIEWS_URL);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}
export async function createReview(data) {
  const res = await fetch(REVIEWS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create review');
  return res.json();
}
export async function updateReview(id, data) {
  const res = await fetch(`${REVIEWS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update review');
  return res.json();
}
export async function deleteReview(id) {
  const res = await fetch(`${REVIEWS_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete review');
}

// LOGIN
export async function loginUser(email, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}
