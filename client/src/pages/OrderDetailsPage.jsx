import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await axios.get(`${API_URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!order) return null;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Order Details</h2>
      <div><strong>Order ID:</strong> {order._id}</div>
      <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
      <div><strong>Status:</strong> {order.status}</div>
      <div><strong>Total (KSH):</strong> {order.total}</div>
      <div><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.location}</div>
      <div><strong>Delivery Method:</strong> {order.deliveryMethod}</div>
      <div><strong>Shipping Fee:</strong> {order.shippingFee}</div>
      <div style={{ marginTop: 16 }}>
        <strong>Items:</strong>
        <ul>
          {order.items.map((item, idx) => (
            <li key={idx}>{item.quantity} x {item.product.name} (KSH {item.product.price})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 
