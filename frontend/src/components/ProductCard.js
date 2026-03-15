import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:9014';

const ProductCard = ({ product }) => {
  const imageSrc = product.imageUrl
    ? `${BACKEND}${product.imageUrl}`
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card-img">
        <img src={imageSrc} alt={product.name} loading="lazy" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
