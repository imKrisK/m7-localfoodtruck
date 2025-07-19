import React from 'react';
import menu6Img from '../assets/menu-6.jpg';
import m1Img from '../assets/m1.png';
import m2Img from '../assets/m2.png';
import m4Img from '../assets/m4.png';

export default function ServiceSection() {
  return (
    <section className="service" id="service" style={{ background: '#f9f9f9', padding: '4rem 0' }}>
      <h4>Services</h4>
      <div className="service-content" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="inner-box" style={{ minWidth: 220, background: '#fff' }}>
          <img src={menu6Img} alt="Food Service" style={{ width: 40, marginBottom: 8 }} />
          <h2>Food Service</h2>
          <p>We offer quality food and service, and experience from new places.</p>
        </div>
        <div className="inner-box" style={{ minWidth: 220, background: '#fff' }}>
          <img src={m1Img} alt="Payment 1" style={{ width: 32, margin: 2 }} />
          <img src={m2Img} alt="Payment 2" style={{ width: 32, margin: 2 }} />
          <img src={m4Img} alt="Payment 3" style={{ width: 32, margin: 2 }} />
          <h3>Online Payment</h3>
          <p>Secure Payment System or cash transaction.</p>
        </div>
        <div className="inner-box" style={{ minWidth: 220, background: '#fff' }}>
          <h3>Always Fresh Food</h3>
          <p>We provide catering services for events, parties, and gatherings.</p>
        </div>
      </div>
    </section>
  );
}
