import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';
import './ProductForm.css';

const CATEGORIES = ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Bracelets', 'Anklets', 'Other'];
const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9014';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Necklace' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        const p = res.data;
        setForm({ name: p.name, description: p.description || '', price: p.price, category: p.category });
        if (p.imageUrl) setPreview(`${BACKEND}${p.imageUrl}`);
      })
      .catch(() => setError('Failed to load product.'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await updateProduct(id, fd);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading-wrapper"><div className="spinner"></div></div>;

  return (
    <div className="product-form-page container">
      <div className="form-page-header">
        <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>Edit Product</h1>
      </div>

      <div className="product-form-card">
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-cols">
            <div className="form-left">
              <div className="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} min="0" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-area" onClick={() => document.getElementById('img-input-edit').click()}>
                  {preview
                    ? <img src={preview} alt="Preview" className="img-preview" />
                    : <div className="upload-placeholder"><span>📷</span><p>Click to change image</p></div>
                  }
                </div>
                <input id="img-input-edit" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                {preview && <p className="img-note">Click image to change it</p>}
              </div>
            </div>
          </div>

          <div className="form-footer">
            <Link to="/admin/dashboard" className="btn btn-outline">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating…' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
