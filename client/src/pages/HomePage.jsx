import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
    <section style={{
      background: '#fff',
      color: 'var(--primary-accent)',
      borderRadius: 12,
      padding: '2.5rem 2rem',
      marginBottom: 32,
      textAlign: 'center',
      boxShadow: '0 2px 12px rgba(24,77,71,0.07)',
      border: '1px solid #eee',
    }}>
      <h1 style={{ fontSize: 38, marginBottom: 12, color: 'var(--primary-accent)' }}>Welcome to Muna Market</h1>
      <p style={{ fontSize: 20, marginBottom: 24, color: '#333' }}>
        Your trusted online marketplace for quality products, fast delivery, and unbeatable prices in Kenya.
      </p>
      <div style={{ marginBottom: 18 }}>
        <Link to="/products" style={{
          background: 'var(--primary-accent)', color: '#fff', padding: '0.8rem 2.2rem', borderRadius: 6, fontWeight: 'bold', fontSize: 18, textDecoration: 'none', marginRight: 12,
        }}>Shop Now</Link>
        <Link to="/register" style={{
          background: 'var(--secondary-accent)', color: '#fff', border: '2px solid var(--secondary-accent)', padding: '0.8rem 2.2rem', borderRadius: 6, fontWeight: 'bold', fontSize: 18, textDecoration: 'none',
        }}>Create Account</Link>
      </div>
      <div style={{ fontSize: 16, opacity: 0.9 }}>
        <span style={{ marginRight: 16 }}><strong>Location:</strong> Kitui Town, Kenya</span>
        <span style={{ marginRight: 16 }}><strong>Email:</strong> munamarket@gmail.com</span>
        <span><strong>Phone:</strong> 0746456437</span>
      </div>
    </section>
    <section style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 style={{ fontSize: 28, marginBottom: 10, color: 'var(--primary-accent)' }}>Why Shop With Us?</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 18 }}>
        <div style={{ background: '#f8f8f8', borderRadius: 8, padding: 24, minWidth: 220, flex: 1 }}>
          <h3 style={{ color: 'var(--secondary-accent)', marginBottom: 8 }}>Wide Selection</h3>
          <p>Discover a variety of products for every need and budget.</p>
        </div>
        <div style={{ background: '#f8f8f8', borderRadius: 8, padding: 24, minWidth: 220, flex: 1 }}>
          <h3 style={{ color: 'var(--secondary-accent)', marginBottom: 8 }}>Fast Delivery</h3>
          <p>Choose bike, van, or pickup for quick and reliable delivery across Kenya.</p>
        </div>
        <div style={{ background: '#f8f8f8', borderRadius: 8, padding: 24, minWidth: 220, flex: 1 }}>
          <h3 style={{ color: 'var(--secondary-accent)', marginBottom: 8 }}>Secure Shopping</h3>
          <p>Shop with confidence—your data and payments are always protected.</p>
        </div>
      </div>
    </section>
    <section style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 style={{ fontSize: 28, marginBottom: 10, color: 'var(--primary-accent)' }}>How It Works</h2>
      <ol style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto', fontSize: 17, color: '#333' }}>
        <li>Browse our <Link to="/products">product catalog</Link> and add your favorites to the cart.</li>
        <li>Register or log in to your account for a personalized experience.</li>
        <li>Proceed to checkout, enter your address, and select your preferred delivery method.</li>
        <li>Place your order and enjoy fast, reliable delivery to your doorstep!</li>
      </ol>
    </section>
    <section style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 style={{ fontSize: 28, marginBottom: 10, color: 'var(--primary-accent)' }}>Need Help?</h2>
      <p style={{ fontSize: 17 }}>Contact us at <a href="mailto:munamarket@gmail.com">munamarket@gmail.com</a> or <a href="tel:0746456437">0746456437</a> for support.</p>
    </section>
  </div>
);

export default HomePage; 