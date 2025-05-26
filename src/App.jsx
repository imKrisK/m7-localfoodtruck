import { useState, createContext } from 'react';
import './App.css';
import NavBar from '/src/components/NavBar';
import Footer from '/src/components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '/src/routes/AppRoutes';
import { UserProvider } from '/src/context/UserContext';

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
          <NavBar />
          <AppRoutes />
          <Footer />
        </Router>
      </MyThemeProvider>
    </UserProvider>
  );
};

export default App;
