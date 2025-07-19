# Local Food Truck App

This is a fullstack web application for a local food truck, built with React (Vite) for the frontend and Node.js/Express for the backend.

---

## Features

- Browse menu items with images and prices
- Add items to cart and checkout
- User registration and login
- Mark favorites and view order history
- Responsive/mobile-friendly design

---

## Running Locally (No Docker)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB running locally (default: `mongodb://localhost:27017`)

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file in `backend/` with your secrets (see below for example).
4. `node server.js` (or `npm start` if you have a start script)

#### Example backend/.env
```
STRIPE_SECRET_KEY=sk_test_...
MONGO_URL=mongodb://localhost:27017
DB_NAME=localfoodtruck
FRONTEND_URL=http://localhost:5173
```

### Frontend
1. In the project root: `npm install`
2. Ensure `.env` exists in the root (see below for example).
3. `npm run dev`

#### Example .env (project root)
```
VITE_API_URL=http://localhost:5380/items
VITE_ORDERS_URL=http://localhost:5380/orders
VITE_FAVORITES_URL=http://localhost:5380/favorites
VITE_REVIEWS_URL=http://localhost:5380/reviews
```

---

## MongoDB
You must have MongoDB running locally (default: `mongodb://localhost:27017`).

---

## Docker
Docker and Docker Compose have been removed from this project. To run locally, follow the instructions above.
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
