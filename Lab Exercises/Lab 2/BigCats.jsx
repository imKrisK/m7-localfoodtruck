import React from 'react';
import SingleCat from './SingleCat';

const BigCats = ({ cats }) => {
  return (
    <div>
      {cats.map((cat, index) => (
        <SingleCat key={cat.id || index} cat={cat} />
      ))}
    </div>
  );
};

export default BigCats;