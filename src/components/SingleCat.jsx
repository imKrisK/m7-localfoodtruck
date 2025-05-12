import React from 'react';

const SingleCat = ({ cat }) => {
  return (
    <div className="componentBox">
      <h3 className="NamePart">{cat.name}</h3>
      <p>Breed: {cat.breed}</p>
      <p>Age: {cat.age} years</p>
      <p>Description: {cat.description}</p>
    </div>
  );
};

export default SingleCat;