import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let result = products;
    if (category) result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [products, search, category]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }));
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, padding: 8 }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ minWidth: 160, padding: 8 }}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 24,
        justifyContent: filtered.length < 3 ? 'flex-start' : 'center',
      }}>
        {filtered.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #eee', borderRadius: 8, padding: 16, width: 220, minWidth: 180,
            boxSizing: 'border-box', background: '#fff',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            {product.image && <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} />}
            <h3 style={{ fontSize: 18, margin: '8px 0' }}>{product.name}</h3>
            <p style={{ margin: 0 }}>KSH {product.price}</p>
            <p style={{ fontSize: 14, color: '#555', margin: '4px 0' }}>{product.category}</p>
            <button onClick={() => handleAddToCart(product)} style={{ width: '100%', marginTop: 8 }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && !loading && <div>No products found.</div>}
    </div>
  );
};

export default ProductListPage; 