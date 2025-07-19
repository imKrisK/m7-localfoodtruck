import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MyThemeProvider } from './App.jsx';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </MyThemeProvider>
  </StrictMode>
);


