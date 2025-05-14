import React from 'react';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#f1f1f1' }}>
      <p>&copy; {new Date().getFullYear()} Huski&Homie All rights reserved.</p>
    </footer>
  );
}

export default Footer;