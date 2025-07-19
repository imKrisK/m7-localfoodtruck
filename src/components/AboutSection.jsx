import React from 'react';
import menu5Img from '../assets/menu-5.jpg';

export default function AboutSection() {
  return (
    <section className="about" id="about" style={{ background: '#fff', padding: '4rem 0' }}>
      <h4>About</h4>
      <div className="about-sec" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <div className="img" style={{ flex: 1, textAlign: 'center' }}>
          <img src={menu5Img} alt="About Food Truck" style={{ width: 220, borderRadius: 12 }} />
        </div>
        <div className="about-content" style={{ flex: 2 }}>
          <h3>Food Zone</h3>
          <p>We are a food truck company dedicated to bringing you the best food on wheels. Our mission is to provide delicious, high-quality meals that are convenient and affordable.</p>
          <p>Our team of chefs is passionate about food and committed to using only the freshest ingredients. We believe that good food should be accessible to everyone, and we strive to make our menu diverse and inclusive.</p>
          <div className="about-inner" style={{ marginTop: 16 }}>
            <h5><i className="fas fa-arrow-alt-circle-right"></i>Quality Service</h5>
            <h5><i className="fas fa-arrow-alt-circle-right"></i>Fresh Vegetables</h5>
            <h5><i className="fas fa-arrow-alt-circle-right"></i>Serving New Places</h5>
            <h5><i className="fas fa-arrow-alt-circle-right"></i>Good food, good price</h5>
            <h5><i className="fas fa-arrow-alt-circle-right"></i>Quality Cooking</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
