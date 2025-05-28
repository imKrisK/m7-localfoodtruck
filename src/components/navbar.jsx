import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        {!isAuthenticated && (
          <li style={styles.navItem}>
            <button onClick={() => loginWithRedirect()} style={styles.navLink}>Log In</button>
          </li>
        )}
        {isAuthenticated && (
          <>
            <li style={styles.navItem}>
              <span style={styles.navLink}>Welcome, {user && user.name}</span>
            </li>
            <li style={styles.navItem}>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                style={styles.navLink}
              >
                Log Out
              </button>
            </li>
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

