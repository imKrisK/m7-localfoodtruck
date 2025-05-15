import React, { useState, useEffect } from 'react';
import SingleCat from './SingleCat';
import AddCatForm from './AddCatForm';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';

const BigCats = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getItems()
      .then(setCats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addCat = async (newCat) => {
    try {
      setLoading(true);
      const created = await createItem(newCat);
      setCats((prevCats) => [...prevCats, created]);
      setSuccess('Cat added successfully!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editCat = async (id, updatedCat) => {
    try {
      setLoading(true);
      const updated = await updateItem(id, updatedCat);
      setCats((prevCats) => prevCats.map(cat => cat.id === id ? updated : cat));
      setEditingCat(null);
      setSuccess('Cat updated successfully!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCat = async (id) => {
    try {
      setLoading(true);
      await deleteItem(id);
      setCats((prevCats) => prevCats.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {loading && <div>Loading...</div>}
      <AddCatForm onAddCat={addCat} />
      {editingCat && (
        <AddCatForm
          onAddCat={(cat) => editCat(editingCat.id, cat)}
          initialData={editingCat}
          editMode
          onCancel={() => setEditingCat(null)}
        />
      )}
      <div>
        <button onClick={() => handleFilter('Panthera')}>Filter Panthera</button>
        <button onClick={() => handleFilter('')}>Clear Filter</button>
        <button onClick={handleSort}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
      </div>
      <div>
        {sortedCats.map((cat) => (
          <SingleCat
            key={cat.id}
            cat={cat}
            onEdit={() => setEditingCat(cat)}
            onDelete={removeCat}
          />
        ))}
      </div>
    </div>
  );
};

export default BigCats;