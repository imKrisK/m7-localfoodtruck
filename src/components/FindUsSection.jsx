import React, { useRef } from 'react';

export default function FindUsSection() {
  const mapRef = useRef(null);

  function handleShowLocation() {
    if (!navigator.geolocation) {
      if (mapRef.current) mapRef.current.innerHTML = 'Geolocation is not supported by your browser.';
      return;
    }
    if (mapRef.current) mapRef.current.innerHTML = 'Locating…';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        // Example: Las Vegas truck location
        const truckLat = 36.1699;
        const truckLng = -115.1398;
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${truckLng-0.01},${truckLat-0.01},${truckLng+0.01},${truckLat+0.01}&layer=mapnik&marker=${truckLat},${truckLng}`;
        mapRef.current.innerHTML = `<iframe width='100%' height='350' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='${mapUrl}'></iframe><div style='font-size:0.95em;margin-top:8px;text-align:left;padding:0 8px;'><b>Your Location:</b> ${userLat.toFixed(5)}, ${userLng.toFixed(5)}<br/><b>Truck Location:</b> ${truckLat}, ${truckLng}</div>`;
      },
      () => {
        if (mapRef.current) mapRef.current.innerHTML = '<div style="color:#d9534f;">Unable to retrieve your location.</div>';
      }
    );
  }

  return (
    <section id="find-us" className="find-us-section" style={{ margin: '40px auto', maxWidth: 900, padding: '24px 0' }}>
      <h4 style={{ textAlign: 'center', marginBottom: 12 }}>Find Our Food Truck</h4>
      <div style={{ textAlign: 'center' }}>
        <button className="btn" style={{ marginBottom: 16 }} onClick={handleShowLocation}>Show My Location & Truck</button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: 350, marginTop: 8, borderRadius: 8, overflow: 'hidden', background: '#f7f7f7', textAlign: 'center', lineHeight: '350px', color: '#888', fontSize: '1.1em' }}>Map will appear here</div>
    </section>
  );
}
