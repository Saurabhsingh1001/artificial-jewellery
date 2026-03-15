import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <span className="footer-brand-name">✦ Shringaar</span>
        <p>Elegant artificial jewellery for every occasion. Affordable beauty, timeless style.</p>
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Categories</h4>
        <ul>
          <li><Link to="/catalog?category=Necklace">Necklaces</Link></li>
          <li><Link to="/catalog?category=Earrings">Earrings</Link></li>
          <li><Link to="/catalog?category=Bangles">Bangles</Link></li>
          <li><Link to="/catalog?category=Rings">Rings</Link></li>
        </ul>
      </div>

      <div className="footer-contact">
        <h4>Contact</h4>
        <p>📞 +91 77540 40908</p>
        <p>✉️ info@shringaar.in</p>
        <p>📍 Lucknow, India</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Shringaar. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
