import React, { useReducer } from 'react';

const initialState = {
  name: '',
  breed: '',
  age: '',
  description: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    case 'SET_ALL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const AddCatForm = ({ onAddCat, initialData = {}, editMode = false, onCancel }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...initialData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, breed, age, description } = state;
    if (!name || !breed || !age || !description) {
      alert('Please fill out all fields.');
      return;
    }
    const newCat = {
      id: editMode && initialData.id ? initialData.id : Date.now(),
      name,
      breed,
      age: parseInt(age, 10),
      description,
    };
    onAddCat(newCat);
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={handleSubmit} className="componentBox">
      <h3>{editMode ? 'Edit Big Cat' : 'Add a New Big Cat'}</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={state.breed}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={state.age}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">{editMode ? 'Update Cat' : 'Add Cat'}</button>
      {editMode && onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddCatForm;