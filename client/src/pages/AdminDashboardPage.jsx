import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminNav from '../components/AdminNav';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await axios.get(`${API_URL}/api/admin/dashboard-summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard summary');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [token]);

  // Debug: log summary object and nested fields
  if (summary) {
    console.log('SUMMARY:', summary);
    console.log('salesTrends:', summary.salesTrends);
    console.log('bestSellers:', summary.bestSellers);
    console.log('lowStock:', summary.lowStock);
    console.log('today:', summary.today);
    console.log('recentOrders:', summary.recentOrders);
    if (summary.recentOrders && summary.recentOrders.length > 0) {
      console.log('First recentOrder:', summary.recentOrders[0]);
    }
  }

  // Prepare chart data
  const salesTrendsData = summary && {
    labels: summary.salesTrends.map(d => String(d._id)),
    datasets: [
      {
        label: 'Sales (KSH)',
        data: summary.salesTrends.map(d => Number(d.total)),
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const bestSellersData = summary && {
    labels: summary.bestSellers.map(d => String(d.product?.name || 'Unknown')),
    datasets: [
      {
        label: 'Units Sold',
        data: summary.bestSellers.map(d => Number(d.totalSold)),
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
      },
    ],
  };

  // Debug: log chart data
  if (salesTrendsData) {
    console.log('salesTrendsData.labels:', salesTrendsData.labels);
    console.log('salesTrendsData.datasets:', salesTrendsData.datasets);
  }
  if (bestSellersData) {
    console.log('bestSellersData.labels:', bestSellersData.labels);
    console.log('bestSellersData.datasets:', bestSellersData.datasets);
  }

  return (
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 1rem' }}>
      <AdminNav />
      <h2>Admin Dashboard</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {summary && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            <div><strong>Total Users:</strong> {summary.totalUsers}</div>
            <div><strong>Total Products:</strong> {summary.totalProducts}</div>
            <div><strong>Total Orders:</strong> {summary.totalOrders}</div>
            <div><strong>Total Sales (KSH):</strong> {summary.totalSales}</div>
            <div><strong>Total Cost (KSH):</strong> {summary.totalCost}</div>
            <div><strong>Total Profit (KSH):</strong> {summary.totalProfit}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <h3>Sales Trends (Last 14 Days)</h3>
              <div>No sales data.</div>
            </div>
            <div style={{ flex: 1, minWidth: 320 }}>
              <h3>Best Selling Products</h3>
              <div>No best sellers yet.</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <h3>Low Stock Alerts</h3>
              {summary.lowStock.length > 0 ? (
                <ul>
                  {summary.lowStock.map(product => (
                    <li key={product._id} style={{ color: 'red' }}>
                      {product.name} (Stock: {product.stock})
                    </li>
                  ))}
                </ul>
              ) : (
                <div>All products sufficiently stocked.</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 320 }}>
              <h3>Today's Summary</h3>
              <div>Sales: <strong>KSH {summary.today.sales}</strong></div>
              <div>Orders: <strong>{summary.today.orders}</strong></div>
              <div>Profit: <strong>KSH {summary.today.profit}</strong></div>
            </div>
          </div>
          <div>
            <h3>Recent Orders</h3>
            {summary.recentOrders.length === 0 ? (
              <div>No recent orders.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total (KSH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentOrders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                        <td>{String(order._id)}</td>
                        <td>{String(order.user?.name || 'N/A')}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{String(order.status)}</td>
                        <td>{String(order.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage; 
