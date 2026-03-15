import React from 'react';
import './About.css';

const About = () => (
  <div>
    <div className="page-header">
      <h1>About Shringaar</h1>
      <p>Our story, our passion, our purpose</p>
    </div>

    <div className="about-page container">
      {/* Story */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <div className="divider" style={{ margin: '0.75rem 0 1rem' }}></div>
          <p>
            Shringaar was founded with a simple belief — every woman deserves to feel beautiful,
            regardless of her budget. Born in the heart of Lucknow, our brand is dedicated to bringing
            elegant, high-quality artificial jewellery that complements every style and every occasion.
          </p>
          <p>
            From bridal bangles to everyday earrings, each piece in our collection is thoughtfully
            crafted to reflect the rich heritage of Indian jewellery while keeping up with modern trends.
          </p>
        </div>
        <div className="about-visual">
          <div className="about-badge">
            <span className="badge-number">5+</span>
            <span>Years of Excellence</span>
          </div>
          <div className="about-badge">
            <span className="badge-number">500+</span>
            <span>Products</span>
          </div>
          <div className="about-badge">
            <span className="badge-number">10k+</span>
            <span>Happy Customers</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <h2 style={{ textAlign: 'center', color: 'var(--brown)', marginBottom: '0.5rem' }}>Our Values</h2>
        <div className="divider"></div>
        <div className="values-grid">
          {[
            { icon: '🌿', title: 'Authenticity', desc: 'We use carefully selected materials and honest craftsmanship in every piece.' },
            { icon: '✨', title: 'Elegance', desc: 'Timeless designs inspired by Indian tradition, adapted for modern tastes.' },
            { icon: '🤝', title: 'Trust', desc: 'Transparent pricing and genuine customer care, always.' },
            { icon: '♻️', title: 'Sustainability', desc: 'We strive to minimise our environmental impact in our production process.' },
          ].map((v) => (
            <div className="value-card" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default About;
