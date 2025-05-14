import React, { useState } from 'react';
import SingleCat from './SingleCat';
import AddCatForm from './AddCatForm';

const BigCats = () => {
  const [cats, setCats] = useState([
    { id: 1, name: 'Lion', breed: 'Panthera leo', age: 8, description: 'King of the jungle' },
    { id: 2, name: 'Tiger', breed: 'Panthera tigris', age: 5, description: 'Largest cat species' },
    { id: 3, name: 'Leopard', breed: 'Panthera pardus', age: 4, description: 'Known for its spots' },
    { id: 4, name: 'Cheetah', breed: 'Acinonyx jubatus', age: 3, description: 'Fastest land animal' },
  ]);

  const addCat = (newCat) => {
    setCats((prevCats) => [...prevCats, newCat]);
  };

  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilter = (breed) => {
    setFilter(breed);
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  const filteredCats = filter
    ? cats.filter((cat) => cat.breed.toLowerCase().includes(filter.toLowerCase()))
    : cats;

  const sortedCats = [...filteredCats].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="componentBox">
      <h2>Big Cats</h2>
      <AddCatForm onAddCat={addCat} />
      <div>
        <button onClick={() => handleFilter('Panthera')}>Filter Panthera</button>
        <button onClick={() => handleFilter('')}>Clear Filter</button>
        <button onClick={handleSort}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
      </div>
      <div>
        {sortedCats.map((cat) => (
          <SingleCat key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default BigCats;