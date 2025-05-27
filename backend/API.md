# Local Food Truck Backend API Documentation

## Base URL

```
http://localhost:5380/
```

---

## Endpoints

### Items
- `GET /items` — Get all items
- `GET /items/:id` — Get item by ID
- `POST /items` — Create new item
- `PUT /items/:id` — Update item by ID
- `DELETE /items/:id` — Delete item by ID

### Users
- `GET /users` — Get all users
- `GET /users/:id` — Get user by ID
- `GET /users/by-email?email=...` — Get user by email
- `POST /users` — Create new user
- `PUT /users/:id` — Update user by ID
- `DELETE /users/:id` — Delete user by ID

### Orders
- `GET /orders` — Get all orders
- `GET /orders/:id` — Get order by ID
- `POST /orders` — Create new order
- `PUT /orders/:id` — Update order by ID
- `DELETE /orders/:id` — Delete order by ID

### Favorites
- `GET /favorites` — Get all favorites
- `GET /favorites/:id` — Get favorite by ID
- `POST /favorites` — Add favorite
- `DELETE /favorites/:id` — Remove favorite

### Reviews
- `GET /reviews` — Get all reviews
- `GET /reviews/:id` — Get review by ID
- `POST /reviews` — Create review
- `PUT /reviews/:id` — Update review by ID
- `DELETE /reviews/:id` — Delete review by ID

---

## Request/Response Examples

### Create User
```
POST /users
Content-Type: application/json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

### Create Order
```
POST /orders
Content-Type: application/json
{
  "userEmail": "demo@example.com",
  "items": [
    { "name": "Waggu Burger", "price": 20, "quantity": 2 }
  ],
  "total": 40,
  "status": "pending"
}
```

---

## Notes
- All endpoints return JSON.
- For protected endpoints, implement authentication as needed.
- Validation errors return 400 with a message.
- Not found returns 404.
- Server errors return 500.
