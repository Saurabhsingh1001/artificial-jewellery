import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import './Catalog.css';

const CATEGORIES = ['All', 'Necklace', 'Earrings', 'Bangles', 'Rings', 'Bracelets', 'Anklets', 'Other'];

const Catalog = () => {
  const cache = useRef({});
  const [searchParams,setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || 'All';
  // const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  // const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const key = `${activeCategory}-${search}-${page}`;

    if (cache.current[key]) {
      setProducts(cache.current[key]);
      setLoading(false);
      return;
    }
  const params = {
    page,
    search,
    category: activeCategory === "All" ? "" : activeCategory
  };

  getProducts(params)
    .then((res) => {
      setProducts(res.data.products);
      setPages(res.data.pages);
      cache.current[key] = res.data.products;
    })
    .catch(console.error)
    .finally(() => setLoading(false));
    
}, [activeCategory, search, page]);

  const handleCategory = (cat) => {
    if (cat === 'All') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Jewellery Catalog</h1>
        <p>Explore our full collection of beautiful artificial jewellery</p>
      </div>

      <div className="catalog-page container">
        {/* Search */}
        <div className="catalog-search">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="loading-wrapper"><div className="spinner"></div><p>Loading…</p></div>
        ) : filtered.length === 0 ? (
          <div className="empty-wrapper">
            <p style={{ fontSize: '2rem' }}>💍</p>
            <p>No products found.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="products-grid">
              {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </>
        )}
      </div>
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={page === x + 1 ? "active-page" : ""}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
