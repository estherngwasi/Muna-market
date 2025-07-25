import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminNav from '../components/AdminNav';

const statusOptions = ['Pending', 'Shipped', 'Delivered'];

const AdminOrdersPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setSuccess(null);
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Order status updated!');
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <AdminNav />
      <h2>Admin Orders</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {orders.length === 0 && !loading ? (
        <div>No orders found.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total (KSH)</th>
                <th>Items</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>{order.total}</td>
                  <td>
                    <ul style={{ paddingLeft: 16 }}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.quantity} x {item.product.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
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

export default AdminOrdersPage; 