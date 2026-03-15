import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem('adminToken');

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">✦</span>
          <span>Shringaar</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Catalog</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Contact</NavLink>

          {isAdmin ? (
            <>
              <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>Dashboard</NavLink>
              <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/admin/login" className="nav-link admin-link" onClick={closeMenu}>Admin</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
