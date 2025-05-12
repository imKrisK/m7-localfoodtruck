import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/register" style={styles.navLink}>Register</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/AboutPage.jsx" style={styles.navLink}>AboutPage</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/DashbardPage.jsx" style={styles.navLink}>Dashboard Page</Link>
        </li>
        
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Navbar;

