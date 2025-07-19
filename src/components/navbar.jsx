import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar redesigned-navbar" aria-label="Main Navigation">
    <ul className="redesigned-nav-list">
      <li><Link to="/" className="nav-link">Home</Link></li>
      <li><Link to="/menu" className="nav-link">Menu</Link></li>
      <li><Link to="/about" className="nav-link">About Us</Link></li>
      <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
      <li><Link to="/profile" className="nav-link">Profile</Link></li>
    </ul>
  </nav>
);

export default NavBar;

