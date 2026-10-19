import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="atelier-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand Manifesto */}
          <div className="col-lg-4 col-md-6 pe-lg-4">
            <span className="footer-brand d-block mb-1">PLANT SPHERE</span>
            <span className="eyebrow text-sage mb-3">Botanical Nursery &amp; Atelier</span>
            <p className="small text-light opacity-75 mb-4" style={{ lineHeight: '1.7' }}>
              Bring Nature Home. We cultivate well-rooted specimens, architectural indoor plants, 
              handcrafted terracotta vessels, and organic horticultural mediums for discerning plant lovers.
            </p>
            <div className="d-flex align-items-center gap-2 small text-light opacity-75">
              <i className="bi bi-geo-alt text-sage"></i>
              <span>Independent Horticultural Nursery &bull; India</span>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Collections</h6>
            <Link to="/shop?category=1" className="footer-link">Indoor Foliage</Link>
            <Link to="/shop?category=2" className="footer-link">Outdoor Specimens</Link>
            <Link to="/shop?category=3" className="footer-link">Flowering Plants</Link>
            <Link to="/shop?category=4" className="footer-link">Succulents &amp; Cacti</Link>
            <Link to="/shop?category=6" className="footer-link">Artisan Planters</Link>
            <Link to="/shop?category=7" className="footer-link">Soil &amp; Organic Food</Link>
          </div>

          {/* Nursery Guidance */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Horticulture Standards</h6>
            <p className="small text-light opacity-75 mb-3" style={{ lineHeight: '1.6' }}>
              Every specimen in our care undergoes a minimum 14-day acclimatization period and root inspection before dispatch.
            </p>
            <ul className="list-unstyled small text-light opacity-75 d-flex flex-column gap-2 mb-0">
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-check2 text-sage"></i> Breathable, root-safe soil blends
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-check2 text-sage"></i> Sustainable zero-plastic packaging
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-check2 text-sage"></i> Detailed botanical care taxonomy
              </li>
            </ul>
          </div>

          {/* Project Architecture & Developer Credit */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Architecture &amp; Credits</h6>
            <p className="small text-light opacity-75 mb-3">
              An enterprise full-stack web application engineered with Spring Boot 3, Java 25, MySQL 8, and React.
            </p>
            <div className="p-3 rounded-2" style={{ backgroundColor: 'rgba(252, 251, 247, 0.06)', border: '1px solid rgba(252, 251, 247, 0.1)' }}>
              <span className="small text-sage d-block">Designed &amp; Developed by</span>
              <strong className="text-white fs-6">Manjunath</strong>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-light opacity-75">
          <div>
            &copy; {new Date().getFullYear()} PLANT SPHERE. Bring Nature Home &bull; All botanical rights reserved.
          </div>
          <div className="mt-2 mt-md-0">
            Portfolio Project by <span className="text-white fw-semibold">Manjunath</span>
          </div>
        </div>
      </div>
    </footer>
  );
}