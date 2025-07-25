import React from 'react';
import { Link } from 'react-router-dom';

const sectionStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 8px rgba(24,77,71,0.07)',
  padding: '2rem',
  marginBottom: 24,
};

const CustomerDashboardPage = () => (
  <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
    <h2 style={{ marginBottom: 32 }}>My Dashboard</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <div style={{ ...sectionStyle, flex: 1, minWidth: 260 }}>
        <h3>My Orders</h3>
        <p>View your order history, track current orders, and see order details.</p>
        <Link to="/orders">Go to My Orders</Link>
      </div>
      <div style={{ ...sectionStyle, flex: 1, minWidth: 260 }}>
        <h3>My Cart</h3>
        <p>See items in your cart and proceed to checkout.</p>
        <Link to="/cart">View Cart</Link>
      </div>
      <div style={{ ...sectionStyle, flex: 1, minWidth: 260 }}>
        <h3>My Profile</h3>
        <p>Update your personal information and password.</p>
        <Link to="/profile">Edit Profile</Link>
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24 }}>
      <div style={{ ...sectionStyle, flex: 1, minWidth: 260 }}>
        <h3>Shop Products</h3>
        <p>Browse and shop from our wide selection of products.</p>
        <Link to="/products">Shop Now</Link>
      </div>
      <div style={{ ...sectionStyle, flex: 1, minWidth: 260 }}>
        <h3>Contact Support</h3>
        <p>Need help? Reach out to our support team.</p>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  </div>
);

export default CustomerDashboardPage; 