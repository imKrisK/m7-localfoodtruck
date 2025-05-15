// src/services/api.js
// Centralized CRUD operations for your NodeJS/Express API

const API_URL = 'http://localhost:5000/items'; // Change to your actual endpoint

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
