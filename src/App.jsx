import { useState, createContext } from 'react';
import './App.css';
import NavBar from '/src/components/NavBar';
import Footer from '/src/components/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppRoutes from '/src/routes/AppRoutes';
import { UserProvider } from '/src/context/UserContext';
import ProfilePage from './pages/ProfilePage';

// Theme context setup
export const themes = {
  light: {
    foreground: '#333333',
    background: '#BAE2FF',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  blue: {
    foreground: '#ffffff',
    background: '#007bff',
  },
};

export const MyThemeContext = createContext(themes.light);

export function MyThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);
  const darkmode = theme.background === themes.dark.background;

  return (
    <MyThemeContext.Provider value={{ theme, setTheme, darkmode }}>
      {children}
    </MyThemeContext.Provider>
  );
}

const App = () => {
  return (
    <UserProvider>
      <MyThemeProvider>
        <Router>
          <header className="head redesigned-header">
            <div className="logo-title redesigned-logo-title">
              <img src="/src/assets/LFTlogo.png" alt="Food Truck Logo" className="logo-img redesigned-logo-img" />
              <h1 className="site-title">Local Food <span className="brand-highlight"><i className="fas fa-truck"></i></span> Truck</h1>
            </div>
            <nav className="navbar redesigned-navbar" aria-label="Main Navigation">
              <ul className="redesigned-nav-list">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/menu" className="nav-link">Menu</Link></li>
                <li><Link to="/about" className="nav-link">About Us</Link></li>
                <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                {/* Add more links as needed */}
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<AppRoutes />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Footer />
        </Router>
      </MyThemeProvider>
    </UserProvider>
  );
};

export default App;
