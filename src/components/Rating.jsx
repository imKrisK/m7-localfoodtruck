import React, { useState, useEffect } from 'react';

// Star rating component with localStorage persistence
export default function Rating({ itemName, initial = 5, size = 20, onChange }) {
  const ratingKey = `menuRating_${itemName}`;
  const [rating, setRating] = useState(() => {
    const saved = parseInt(localStorage.getItem(ratingKey), 10);
    return saved || initial;
  });
  const [hover, setHover] = useState(null);

  useEffect(() => {
    localStorage.setItem(ratingKey, rating);
    if (onChange) onChange(rating);
    // eslint-disable-next-line
  }, [rating]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          tabIndex={0}
          role="button"
          aria-label={`Set rating to ${star} stars`}
          style={{
            color: (hover || rating) >= star ? '#FFD700' : '#ccc',
            fontSize: size,
            cursor: 'pointer',
            outline: 'none',
            transition: 'color 0.2s',
          }}
          onClick={() => setRating(star)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
