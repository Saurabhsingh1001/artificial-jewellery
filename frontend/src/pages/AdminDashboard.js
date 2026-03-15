import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import './AdminDashboard.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9014';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Failed to delete product.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">✦ Admin Panel</div>
        <nav className="sidebar-nav">
          <span className="sidebar-nav-item active">📊 Dashboard</span>
          <Link to="/admin/add-product" className="sidebar-nav-item">➕ Add Product</Link>
          <span className="sidebar-nav-item logout" onClick={handleLogout}>🚪 Logout</span>
        </nav>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <Link to="/admin/add-product" className="btn btn-primary">+ Add Product</Link>
        </div>

        {/* Stats */}
        <div className="stat-cards">
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div>
              <div className="stat-num">{products.length}</div>
              <div className="stat-label">Total Products</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🏷️</span>
            <div>
              <div className="stat-num">{categories.length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div>
              <div className="stat-num">
                {products.length > 0
                  ? `₹${Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length).toLocaleString()}`
                  : '—'}
              </div>
              <div className="stat-label">Avg. Price</div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="dashboard-table-section">
          <h2>All Products</h2>
          {loading ? (
            <div className="loading-wrapper"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="empty-wrapper">
              <p>No products yet. <Link to="/admin/add-product" style={{ color: 'var(--gold-dark)' }}>Add one!</Link></p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <img
                          src={p.imageUrl ? `${BACKEND}${p.imageUrl}` : 'https://via.placeholder.com/60x60?text=No'}
                          alt={p.name}
                          className="table-img"
                        />
                      </td>
                      <td className="product-name-cell">{p.name}</td>
                      <td><span className="table-badge">{p.category}</span></td>
                      <td>₹{p.price.toLocaleString()}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/edit-product/${p._id}`} className="btn btn-outline btn-sm">Edit</Link>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id, p.name)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
