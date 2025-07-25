import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import AdminNav from '../components/AdminNav';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminProductsPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (formData) => {
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Product added!');
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
  };

  const handleUpdate = async (formData) => {
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.put(`${API_URL}/api/products/${editing._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Product updated!');
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Product deleted!');
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <AdminNav />
      <h2>Admin Product Management</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div style={{ marginBottom: 32 }}>
        <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
        <ProductForm
          initial={editing}
          onSubmit={editing ? handleUpdate : handleAdd}
          loading={formLoading}
        />
        {editing && <button onClick={() => setEditing(null)}>Cancel Edit</button>}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (KSH)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{product.image && <img src={product.image} alt={product.name} style={{ width: 60, height: 40, objectFit: 'cover' }} />}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(product)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage; 
