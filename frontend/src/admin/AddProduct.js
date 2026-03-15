import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '../services/api';
import './ProductForm.css';

const CATEGORIES = ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Bracelets', 'Anklets', 'Other'];

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Necklace' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!form.name || !form.price) return setError('Name and price are required.');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await createProduct(fd);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-page container">
      <div className="form-page-header">
        <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>Add New Product</h1>
      </div>

      <div className="product-form-card">
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-cols">
            <div className="form-left">
              <div className="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gold Plated Necklace" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 1200" min="0" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description…" rows="4" />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-area" onClick={() => document.getElementById('img-input').click()}>
                  {preview
                    ? <img src={preview} alt="Preview" className="img-preview" />
                    : <div className="upload-placeholder"><span>📷</span><p>Click to upload image</p><small>JPG, PNG, WEBP — max 5MB</small></div>
                  }
                </div>
                <input id="img-input" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <Link to="/admin/dashboard" className="btn btn-outline">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
