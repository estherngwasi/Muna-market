import React, { useState, useEffect } from 'react';

const ProductForm = ({ initial, onSubmit, loading }) => {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price || '');
  const [costPrice, setCostPrice] = useState(initial?.costPrice || '');
  const [category, setCategory] = useState(initial?.category || '');
  const [stock, setStock] = useState(initial?.stock || 0);
  const [image, setImage] = useState(null);

  // Update form fields when editing a product
  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setPrice(initial?.price || '');
    setCostPrice(initial?.costPrice || '');
    setCategory(initial?.category || '');
    setStock(initial?.stock || 0);
    setImage(null); // Don't pre-fill file input
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('costPrice', costPrice);
    formData.append('category', category);
    formData.append('stock', stock);
    if (image) formData.append('image', image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Price (KSH):</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Cost Price (KSH):</label>
        <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Category:</label>
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
};

export default ProductForm; 