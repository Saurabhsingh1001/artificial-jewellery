import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import './Home.css';

const CATEGORIES = ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Bracelets', 'Anklets'];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getProducts({ page: 1 })
    .then((res) => setFeatured(res.data.products.slice(0, 6)))
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">✦ New Collection</span>
          <h1>Adorn Yourself with Elegance</h1>
          <p>Discover our stunning collection of artificial jewellery — beautifully crafted, beautifully priced.</p>
          <div className="hero-btns">
            <Link to="/catalog" className="btn btn-primary">Browse Catalog</Link>
            <Link to="/about" className="btn btn-outline">Our Story</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <div className="divider"></div>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat} to={`/catalog?category=${cat}`} className="category-card">
                <div className="category-icon">💍</div>
                <span>{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Handpicked pieces from our latest collection</p>
            <div className="divider"></div>
          </div>
          {loading ? (
            <div className="loading-wrapper"><div className="spinner"></div><p>Loading products…</p></div>
          ) : featured.length === 0 ? (
            <div className="empty-wrapper">
              <p>No products yet. Check back soon!</p>
            </div>
          ) : (
            <div className="products-grid">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
          {featured.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/catalog" className="btn btn-outline">View All Products</Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <div className="divider"></div>
          </div>
          <div className="why-grid">
            {[
              { icon: '💎', title: 'Premium Quality', desc: 'Every piece is crafted with care using high-quality materials.' },
              { icon: '💰', title: 'Affordable Prices', desc: 'Elegant designs at prices that suit every budget.' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Quick and safe delivery across India.' },
              { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free 7-day return policy.' },
            ].map((item) => (
              <div key={item.title} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
