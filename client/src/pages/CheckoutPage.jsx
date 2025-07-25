import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const deliveryFees = {
  bike: 200,
  van: 500,
  pickup: 0,
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { user, token } = useSelector((state) => state.auth);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('bike');
  const [shippingFee, setShippingFee] = useState(deliveryFees.bike);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = cartTotal + shippingFee;

  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
    setShippingFee(deliveryFees[e.target.value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const order = {
        items: cartItems.map(item => ({ product: item.product, quantity: item.quantity })),
        shippingAddress: { address, city, location },
        deliveryMethod,
        shippingFee,
        total,
      };
      const API_URL = import.meta.env.VITE_API_URL || '';
      await axios.post(`${API_URL}/api/orders`, order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      dispatch(clearCart());
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Please log in to checkout.</div>;
  if (cartItems.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Address:</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>City:</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Location (e.g., Nairobi, Mombasa):</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Delivery Method:</label>
          <select value={deliveryMethod} onChange={handleDeliveryChange} style={{ width: '100%' }}>
            <option value="bike">Bike (KSH 200)</option>
            <option value="van">Van (KSH 500)</option>
            <option value="pickup">Pickup (Free)</option>
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Shipping Fee: KSH {shippingFee}</strong>
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Order Total: KSH {total}</strong>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>Order placed successfully!</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage; 
