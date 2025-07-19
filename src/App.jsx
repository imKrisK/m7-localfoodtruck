import { useState } from 'react';
import { FoodProvider } from './context/FoodContext.jsx';
import './App.css';
import NavBar from '/src/components/NavBar';
import Footer from '/src/components/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppRoutes from '/src/routes/AppRoutes';
import { UserProvider } from '/src/context/UserContext';
import ProfilePage from './pages/ProfilePage';
import { themes, MyThemeContext } from './context/MyThemeContext';

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
      <FoodProvider>
        <MyThemeProvider>
          <Router>
            <header className="head redesigned-header">
              <div className="logo-title redesigned-logo-title">
                <img src="/src/assets/LFTlogo.png" alt="Food Truck Logo" className="logo-img redesigned-logo-img" />
                <h1 className="site-title">Local Food <span className="brand-highlight"><i className="fas fa-truck"></i></span> Truck</h1>
              </div>
              <NavBar />
            </header>
            <Routes>
              <Route path="*" element={<AppRoutes />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
          </Router>
        </MyThemeProvider>
      </FoodProvider>
    </UserProvider>
  );
};

export default App;
