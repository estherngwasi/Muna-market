import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  background: 'var(--primary-accent)',
  color: '#fff',
  padding: '1rem',
  borderRadius: 8,
  marginBottom: '2rem',
  display: 'flex',
  gap: '1.5rem',
  fontWeight: 500,
};

const AdminNav = () => (
  <nav style={navStyle}>
    <Link to="/admin/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
    <Link to="/admin/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
    <Link to="/admin/orders" style={{ color: '#fff', textDecoration: 'none' }}>Orders</Link>
    {/* Uncomment the next line if you have a users management page */}
    {/* <Link to="/admin/users" style={{ color: '#fff', textDecoration: 'none' }}>Users</Link> */}
  </nav>
);

export default AdminNav; 