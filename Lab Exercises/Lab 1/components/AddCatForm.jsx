import React, { useState } from 'react';

const AddCatForm = ({ onAddCat }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !breed || !age || !description) {
      alert('Please fill out all fields.');
      return;
    }

    const newCat = {
      id: Date.now(), // Generate a unique ID
      name,
      breed,
      age: parseInt(age, 10),
      description,
    };

    onAddCat(newCat);

    // Clear the form fields
    setName('');
    setBreed('');
    setAge('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="componentBox">
      <h3>Add a New Big Cat</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Cat</button>
    </form>
  );
};

export default AddCatForm;