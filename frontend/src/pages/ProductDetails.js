import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../services/api';
import './ProductDetails.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9014';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = !!localStorage.getItem('adminToken');

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      navigate('/catalog');
    } catch {
      alert('Failed to delete product.');
    }
  };

  if (loading) return <div className="loading-wrapper"><div className="spinner"></div><p>Loading…</p></div>;
  if (error) return <div className="error-wrapper"><p>{error}</p><Link to="/catalog" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Catalog</Link></div>;

  return (
    <div className="product-details-page">
      <div className="container">
        <Link to="/catalog" className="back-link">← Back to Catalog</Link>
        <div className="product-details-card">
          <div className="product-details-img">
            <img
              src={product.imageUrl ? `${BACKEND}${product.imageUrl}` : 'https://via.placeholder.com/500x500?text=No+Image'}
              alt={product.name}
            />
          </div>
          <div className="product-details-info">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-price">₹{product.price.toLocaleString()}</p>
            <div className="detail-divider"></div>
            <p className="detail-description">{product.description || 'No description provided.'}</p>
            <p className="detail-date">Added on: {new Date(product.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            {isAdmin && (
              <div className="admin-actions">
                <Link to={`/admin/edit-product/${product._id}`} className="btn btn-primary">Edit Product</Link>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
