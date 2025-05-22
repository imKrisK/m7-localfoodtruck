# Huski & Homie React App

A modern, component-based React application for a food ordering and menu experience, featuring user authentication, favorites, and full CRUD operations with a NodeJS/Express backend.

---

## Features

- **Component Architecture:**
  - Modular, reusable components (Button, InputField, FormContainer, Navbar, Footer, etc.)
  - DRY (Don't Repeat Yourself) coding principles
- **State Management:**
  - Local state with `useState` and `useEffect`
  - Global state with React Context (User, Food/Favorites, Theme, Emoji)
  - Complex state with `useReducer` and custom hooks
  - Persistence with `localStorage` for favorites, cart, and ratings
- **Routing:**
  - React Router v6 for client-side navigation
  - Dynamic and fallback routes (404 handling)
- **Error Handling:**
  - Component-level error and loading states
  - Async error handling and user feedback
  - Form validation and conditional rendering
- **CRUD Operations:**
  - Create, Read, Update, Delete menu items (cats/foods) via API
  - UI fully wired to backend for data management
- **UI/UX:**
  - Responsive design with modern CSS
  - Favorites, cart, and ratings features
  - User authentication (login/register/profile)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
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

## Error Handling & Conditional Rendering
- All forms and async operations provide user feedback for loading, errors, and success.
- 404 and fallback routes are handled with a dedicated `PageNotFound` component.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE) (or specify your license here)

---

## Credits
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Node.js](https://nodejs.org/)
- Icons and images from project assets

---

## Author
Kris K. (and contributors)

---

## Notes
- For backend/API setup, see the NodeJS/Express project (not included here).
- For static HTML pages (e.g., `favorites.html`, `checkout.html`), see the root directory.
