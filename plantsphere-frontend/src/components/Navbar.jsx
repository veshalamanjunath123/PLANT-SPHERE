import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="announcement-strip">
        <span>Curated nursery specimens &bull; Dispatched in sustainable botanical packaging &bull; Bring Nature Home</span>
      </div>

      {/* Main Atelier Navigation */}
      <nav className="atelier-navbar sticky-top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            {/* Brand Identity */}
            <Link to="/" className="text-decoration-none d-flex flex-column">
              <span className="brand-title">PLANT SPHERE</span>
              <span className="brand-subtitle">Botanical Atelier &bull; Est. 2026</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="d-none d-md-flex align-items-center gap-4">
              <NavLink to="/" className={({ isActive }) => `atelier-nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `atelier-nav-link ${isActive ? 'active' : ''}`}>
                Shop Nursery
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `atelier-nav-link ${isActive ? 'active' : ''}`}>
                About Atelier
              </NavLink>
            </div>

            {/* Action Tools */}
            <div className="d-flex align-items-center gap-3">
              {/* Search Toggle */}
              <button
                type="button"
                className="cart-icon-btn"
                title="Search specimens"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <i className={`bi ${searchOpen ? 'bi-x-lg' : 'bi-search'}`}></i>
              </button>

              {/* Cart Button */}
              <Link to="/shop" className="cart-icon-btn" title="Shopping Bag">
                <i className="bi bi-bag"></i>
                <span className="cart-badge-pill">0</span>
              </Link>

              {/* Login Button */}
              <Link to="/about" className="btn-ink d-none d-sm-inline-flex">
                <i className="bi bi-person"></i>
                <span>Account</span>
              </Link>
            </div>
          </div>

          {/* Expandable Search Drawer */}
          {searchOpen && (
            <div className="pt-3 pb-2 border-top mt-3 animate__animated animate__fadeIn">
              <form onSubmit={handleQuickSearch} className="d-flex gap-2">
                <input
                  type="text"
                  className="catalog-search-input flex-grow-1"
                  placeholder="Search plants by name, light requirement, or species (e.g. Monstera, Fiddle, Snake)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn-ink px-4">
                  Find Specimen
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}