// src/services/api.js
// Updated API service for production deployment

const isProd = import.meta.env.PROD;
const API_BASE = isProd 
  ? window.location.origin 
  : 'http://localhost:5380';

const API_URL = import.meta.env.VITE_API_URL || `${API_BASE}/api/items`;
const ORDERS_URL = import.meta.env.VITE_ORDERS_URL || `${API_BASE}/api/orders`;
const FAVORITES_URL = import.meta.env.VITE_FAVORITES_URL || `${API_BASE}/api/favorites`;
const REVIEWS_URL = import.meta.env.VITE_REVIEWS_URL || `${API_BASE}/api/reviews`;

// Helper function for API calls with error handling
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw error;
  }
}

// ITEMS
export async function getItems() {
  return apiCall(API_URL);
}

export async function createItem(data) {
  return apiCall(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateItem(id, data) {
  return apiCall(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteItem(id) {
  return apiCall(`${API_URL}/${id}`, { method: 'DELETE' });
}

// ORDERS
export async function getOrders() {
  return apiCall(ORDERS_URL);
}

export async function createOrder(data) {
  return apiCall(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOrder(id, data) {
  return apiCall(`${ORDERS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id) {
  return apiCall(`${ORDERS_URL}/${id}`, { method: 'DELETE' });
}

// FAVORITES
export async function getFavorites() {
  return apiCall(FAVORITES_URL);
}

export async function createFavorite(data) {
  return apiCall(FAVORITES_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteFavorite(id) {
  return apiCall(`${FAVORITES_URL}/${id}`, { method: 'DELETE' });
}

// REVIEWS
export async function getReviews() {
  return apiCall(REVIEWS_URL);
}

export async function createReview(data) {
  return apiCall(REVIEWS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateReview(id, data) {
  return apiCall(`${REVIEWS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteReview(id) {
  return apiCall(`${REVIEWS_URL}/${id}`, { method: 'DELETE' });
}

// LOGIN
export async function loginUser(email, password) {
  return apiCall(`${API_BASE}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// PAYMENTS
export async function createPaymentIntent(amount) {
  return apiCall(`${API_BASE}/api/payments/create-payment-intent`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });
}
