import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'var(--primary-accent)', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
      boxShadow: '0 2px 8px rgba(24,77,71,0.07)',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Muna Market</Link>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/products" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Shop</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Cart</Link>
        {user && <Link to="/orders" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>My Orders</Link>}
        <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
        {user && user.role === 'admin' && (
          <Link to="/admin/dashboard" style={{ color: 'var(--secondary-accent)', textDecoration: 'none', fontWeight: 700 }}>Admin</Link>
        )}
        {!user ? (
          <>
            <Link to="/login" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '0.4rem 1.1rem',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              transition: 'background 0.2s',
            }}>Login</Link>
            <Link to="/register" style={{
              color: 'var(--secondary-accent)',
              background: '#fff',
              border: '2px solid var(--secondary-accent)',
              fontWeight: 700,
              padding: '0.4rem 1.1rem',
              borderRadius: 5,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 500 }}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 