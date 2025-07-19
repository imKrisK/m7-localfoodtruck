import React, { useEffect, useRef, useState } from 'react';
import burgerImg from '../assets/burger.png';
import bbqPorkchopImg from '../assets/bbq-porkchop.png';
import burrito1Img from '../assets/burrito1.png';

const specials = [
  {
    img: burgerImg,
    title: 'Spicy Wagyu Burger',
    desc: 'Limited time! Served with fries and a drink.',
    price: '$15.00'
  },
  {
    img: bbqPorkchopImg,
    title: 'BBQ Porkchop Plate',
    desc: 'Char-grilled porkchop with house BBQ sauce.',
    price: '$14.00'
  },
  {
    img: burrito1Img,
    title: "Wally's Special Burrito",
    desc: 'Loaded with beef, beans, and cheese. Only today!',
    price: '$12.00'
  }
];

export default function SpecialsSection() {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % specials.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const special = specials[idx];

  return (
    <section className="specials" id="specials" style={{ maxWidth: 900, margin: '40px auto 0 auto', padding: '24px 0' }}>
      <div className="specials-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="special-card" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '24px 32px', maxWidth: 340, width: '100%' }}>
          <div className="special-card-inner" style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={special.img} alt="Special" style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
            <h4 style={{ background: 'var(--clr1)', padding: '4px 18px 2px 18px', borderRadius: 16, fontSize: '1.08em', margin: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', letterSpacing: '0.5px', fontWeight: 600, color: '#111', display: 'inline-block', marginTop: 12 }}>Today's Special</h4>
            <h3 style={{ marginTop: 18 }}>{special.title}</h3>
            <p style={{ color: '#111' }}>{special.desc}</p>
            <span className="special-price" style={{ marginBottom: 8 }}>{special.price}</span>
            {/* Add to cart button could be wired up here if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}
