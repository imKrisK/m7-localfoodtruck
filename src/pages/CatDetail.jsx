import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItems } from '../services/api';

const CatDetail = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems()
      .then((items) => {
        const found = items.find((c) => String(c.id) === String(id));
        setCat(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!cat) return <div>Cat not found.</div>;

  return (
    <div className="componentBox">
      <h2>{cat.name}</h2>
      <p><strong>Breed:</strong> {cat.breed}</p>
      <p><strong>Age:</strong> {cat.age}</p>
      <p><strong>Description:</strong> {cat.description}</p>
    </div>
  );
};

export default CatDetail;
