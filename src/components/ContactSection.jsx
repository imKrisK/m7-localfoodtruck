import React, { useRef } from 'react';
import LFTlogo from '../assets/LFTlogo.png';

export default function ContactSection() {
  const mapRef = useRef(null);

  function handleLocationClick(e) {
    e.preventDefault();
    if (!navigator.geolocation) {
      if (mapRef.current) mapRef.current.innerHTML = 'Geolocation is not supported by your browser.';
      return;
    }
    if (mapRef.current) mapRef.current.innerHTML = 'Locating…';
    navigator.geolocation.getCurrentPosition(
      () => {
        const truckLat = 36.1699;
        const truckLng = -115.1398;
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${truckLng-0.01},${truckLat-0.01},${truckLng+0.01},${truckLat+0.01}&layer=mapnik&marker=${truckLat},${truckLng}`;
        mapRef.current.innerHTML = `<iframe width='100%' height='250' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='${mapUrl}'></iframe><div style='font-size:0.95em;margin-top:8px;text-align:left;padding:0 8px;'><b>Truck Location:</b> ${truckLat}, ${truckLng}</div>`;
      },
      () => {
        if (mapRef.current) mapRef.current.innerHTML = '<div style=\'color:#d9534f;\'>Unable to retrieve your location.</div>';
      }
    );
  }

  return (
    <footer className="contact" id="contact" style={{ background: '#fff', padding: '3rem 0', marginTop: 32 }}>
      <div className="contact-sec" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px 0 16px' }}>
        <div className="contact-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
          <div className="contact-inner-col" style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={LFTlogo} alt="img" className="image" style={{ maxWidth: 120, marginBottom: 16 }} />
          </div>
          <div className="contact-inner-col" style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Contact US&nbsp;<i className="fas fa-paper-plane"></i></h1>
            <p>1000 Gobi Desert, Las Vegas, USA</p>
            <p>We Want To Hear From You, Write Us:</p>
            <form id="contact-form" action="https://formspree.io/f/meogbraw" method="POST" autoComplete="off" aria-label="Contact form" style={{ width: '100%', background: '#fff3e0', borderRadius: 8, padding: '24px 20px 16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
              <label htmlFor="contact-name" className="visually-hidden">Name</label>
              <input type="text" name="name" id="contact-name" placeholder="Please Enter Your Name" required aria-required="true" />
              <label htmlFor="contact-email" className="visually-hidden">Email</label>
              <input type="email" name="email" id="contact-email" placeholder="Please Enter Your @Email" required aria-required="true" />
              <label htmlFor="contact-message" className="visually-hidden">Message</label>
              <textarea name="message" id="contact-message" cols={10} rows={8} placeholder="Your message" required aria-required="true"></textarea>
              <input type="text" name="address" id="contact-address" placeholder="Your Location (optional)" style={{ marginTop: 8 }} />
              <button type="button" id="contact-location-btn" style={{ margin: '8px 0' }} onClick={handleLocationClick}>Use My Location</button>
              <div id="contact-map-preview" ref={mapRef} style={{ marginBottom: 8 }}></div>
              <button className="btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="map" style={{ margin: '24px 0' }}>
          <iframe src="https://www.google.com/maps?q=1000+Gobi+Desert,+Las+Vegas,+USA&output=embed" width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" title="Our Location"></iframe>
        </div>
        <div className="copyright" style={{ display: 'flex', marginTop: '5rem', padding: '3rem', textAlign: 'center', justifyContent: 'space-between', background: '#aaa' }}>
          <p>Design By&copy; imackris</p>
          <div className="social">
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com/yourpage" target="_blank" rel="noopener" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://pinterest.com/yourpage" target="_blank" rel="noopener" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
            <a href="https://plus.google.com/yourpage" target="_blank" rel="noopener" aria-label="Google Plus"><i className="fab fa-google-plus"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
