# Local Food Truck App – Backend

This is the backend for the Local Food Truck web application. It is built with Node.js, Express.js, and MongoDB, providing RESTful APIs for menu items, orders, favorites, reviews, and user management.

## Features
- REST API for menu, orders, favorites, reviews, and users
- User authentication and registration
- Stripe integration for secure payments
- MongoDB for data storage
- Seed scripts for initial data

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation
```bash
cd backend
npm install
```

### Running the Server
```bash
npm start
```
The server will run on `http://localhost:5380` by default.

### Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_API_URL=http://localhost:5380/items
VITE_ORDERS_URL=http://localhost:5380/orders
VITE_FAVORITES_URL=http://localhost:5380/favorites
VITE_REVIEWS_URL=http://localhost:5380/reviews
```

## Project Structure
- `controllers/` – Route logic for each resource
- `models/` – Mongoose models
- `routes/` – Express route definitions
- `scripts/` – Seed scripts for populating the database
- `db.js` – MongoDB connection
- `server.js` – Main server entry point

## Useful Scripts
- `npm start` – Start the server
- `npm run seed` – Run all seed scripts (if configured)

## Usage Examples

### Get all menu items
```bash
curl http://localhost:5380/items
```

### Place an order (POST)
```bash
curl -X POST http://localhost:5380/orders \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "items": [{"itemId": "ITEM_ID", "quantity": 2}]}'
```

### Add a favorite (POST)
```bash
curl -X POST http://localhost:5380/favorites \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "itemId": "ITEM_ID"}'
```

### Submit a review (POST)
```bash
curl -X POST http://localhost:5380/reviews \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "itemId": "ITEM_ID", "rating": 5, "comment": "Great food!"}'
```

### User registration (POST)
```bash
curl -X POST http://localhost:5380/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "password123"}'
```

## Notes
- Ensure MongoDB is running before starting the server.
- Stripe secret key is required for payment processing.

## License
MIT
