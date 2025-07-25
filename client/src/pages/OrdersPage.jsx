import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrdersPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>My Orders</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {orders.length === 0 && !loading ? (
        <div>You have no orders yet.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total (KSH)</th>
                <th>Items</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td style={{
                    color: order.status === 'Delivered' ? 'green'
                      : order.status === 'Shipped' ? 'orange'
                      : order.status === 'Pending' ? 'blue'
                      : 'gray',
                    fontWeight: 600
                  }}>{order.status}</td>
                  <td>{order.total}</td>
                  <td>
                    <ul style={{ paddingLeft: 16 }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.quantity} x {item.product.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <a href={`/orders/${order._id}`} style={{
                      background: '#2563eb', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: 4, textDecoration: 'none', fontWeight: 500
                    }}>View Details</a>
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

export default OrdersPage; 