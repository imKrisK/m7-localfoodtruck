import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
  const { currentUser } = useUserContext();
  const isLoggedIn = !!currentUser && !!currentUser.email;

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink}>Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink}>Register</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li style={styles.navItem}>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            </li>
          </>
        )}
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
         <li style={styles.navItem}>
          <Link to="/Favorites" style={styles.navLink}>Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#f95b11',
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
    color: '#f42f1d;',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Navbar;

