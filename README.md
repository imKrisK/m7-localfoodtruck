# Local Food Truck App – Frontend

This is the frontend for the Local Food Truck web application. It is built with React and Vite, providing a modern, responsive user interface for customers to browse the menu, place orders, and manage their profiles.

---

## Features

- Browse menu items with images and prices
- Add items to cart and checkout
- User registration and login
- Mark favorites and view order history
- Responsive/mobile-friendly design

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```zsh
   git clone <your-repo-url>
   cd m7
   ```
2. Install dependencies:
   ```zsh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```zsh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables
- API URLs are configured in the `.env` file (see backend for endpoints).

---

## Project Structure

```
/MP3/Miniproject3         # Project documentation and rubric
/src
  /components             # Reusable React components
  /context                # React Context providers
  /hooks                  # Custom React hooks
  /pages                  # Main app pages (Home, Login, Register, Profile, etc.)
  /routes                 # AppRoutes for React Router
  /services               # API service functions
  /assets                 # Images and static assets
public/                   # Static files
index.html, styles.css    # Main HTML and CSS
```

---

## Key Files
- `src/App.jsx` — Main app component
- `src/routes/AppRoutes.jsx` — All route definitions
- `src/context/` — Context providers for global state
- `src/components/` — Shared UI components
- `src/pages/` — Main pages (Home, Login, Register, etc.)
- `src/services/api.js` — API calls for CRUD operations

---

## Useful Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

---

## Notes
- Make sure the backend server is running for API requests to work.
- For payment, Stripe is integrated via the backend.

---

## License
MIT

---

## Credits
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Node.js](https://nodejs.org/)
- Icons and images from project assets

---

## Author
Kris K. (and contributors)

---
