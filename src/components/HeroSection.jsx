
import React, { useState, useEffect, useRef } from 'react';
import slide1 from '../assets/slide-1.jpg';
import slide2 from '../assets/slider-2.jpg';
import slide3 from '../assets/slide-3.jpg';
import slide4 from '../assets/slider-4.jpg';

const slides = [
  { img: slide1, headline: 'Order Food Online', btn: 'Order Now' },
  { img: slide2, headline: 'Fresh Ingredients, Fast Delivery', btn: 'Order Now' },
  { img: slide3, headline: 'Delicious Meals, Great Prices', btn: 'Order Now' },
  { img: slide4, headline: 'Your Favorite Food Truck', btn: 'Order Now' },
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [idx]);

  const goTo = (i) => setIdx(i);

  return (
    <section className="home" id="home" style={{ position: 'relative', width: '100%', minHeight: 320, overflow: 'hidden', background: '#fff' }}>
      <div style={{ position: 'relative', width: '100%', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: 320,
              opacity: idx === i ? 1 : 0,
              transition: 'opacity 0.7s',
              zIndex: idx === i ? 2 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000',
            }}
            aria-hidden={idx !== i}
          >
            <img src={slide.img} alt={slide.headline} style={{ width: '100%', height: 320, objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 3 }}>
              <h1 style={{ fontSize: '2.2rem', marginBottom: 16, textShadow: '0 2px 8px #000' }}>{slide.headline}</h1>
              <a href="#menu" className="btn" style={{ fontSize: '1.2rem', padding: '0.8rem 2.2rem' }}>{slide.btn}</a>
            </div>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: 'none',
                background: idx === i ? '#f95b11' : '#fff',
                margin: 2,
                cursor: 'pointer',
                boxShadow: idx === i ? '0 0 0 2px #fff' : 'none',
                outline: 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
