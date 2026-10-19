import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Header */}
          <div className="text-center mb-5 pb-3">
            <span className="eyebrow">Horticultural Chronicle</span>
            <h1 className="serif-heading display-4 mb-3">About PLANT SPHERE</h1>
            <p className="editorial-lead mx-auto" style={{ maxWidth: '640px' }}>
              <strong>Bring Nature Home.</strong> An independent botanical nursery and gardening marketplace 
              connecting plant enthusiasts with acclimatized specimens, handcrafted terracotta, 
              and living green sanctuaries.
            </p>
          </div>

          {/* Studio Image */}
          <div className="hero-visual-frame mb-5 bg-white">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85"
              alt="Sunlit botanical nursery studio"
              style={{ height: '420px' }}
            />
          </div>

          {/* Narrative Body */}
          <div className="bg-white p-4 p-md-5 rounded-2 border mb-5" style={{ borderColor: 'var(--border-delicate)' }}>
            <h2 className="serif-heading fs-2 mb-3">Our Nursery Philosophy</h2>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              Most modern plant retailers treat living plants like manufactured commodities. Specimens are forced into 
              rapid growth with synthetic fertilizers, packed into non-breathable plastic sleeves, and shipped without 
              regard for root readiness. The result is plant shock, yellowing foliage, and disappointment.
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              At <strong>PLANT SPHERE</strong>, we believe every plant is a long-term living companion. 
              We propagate and nurture our plants in well-draining, organic mediums tailored to their native biology. 
              Before any specimen leaves our care, it undergoes a mandatory 14-day acclimatization period, ensuring 
              strong root structures and resilience in home environments.
            </p>

            {/* Core Botanical Standards */}
            <h3 className="serif-heading fs-3 mt-5 mb-3">The Four Horticultural Pillars</h3>
            <div className="row g-3 mb-5">
              <div className="col-md-6">
                <div className="p-3 bg-paper rounded-2 h-100 border" style={{ borderColor: 'var(--border-delicate)' }}>
                  <h6 className="font-serif fw-bold text-dark mb-1">1. Root-First Acclimatization</h6>
                  <p className="small text-muted mb-0">Foliage only flourishes when root crowns are vigorous and well-aerated.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-paper rounded-2 h-100 border" style={{ borderColor: 'var(--border-delicate)' }}>
                  <h6 className="font-serif fw-bold text-dark mb-1">2. Organic Living Soil</h6>
                  <p className="small text-muted mb-0">We blend compost, perlite, and worm castings instead of inert fillers.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-paper rounded-2 h-100 border" style={{ borderColor: 'var(--border-delicate)' }}>
                  <h6 className="font-serif fw-bold text-dark mb-1">3. Breathable Vessels</h6>
                  <p className="small text-muted mb-0">Partnering with regional potters to supply genuine porous terracotta.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-paper rounded-2 h-100 border" style={{ borderColor: 'var(--border-delicate)' }}>
                  <h6 className="font-serif fw-bold text-dark mb-1">4. Zero-Plastic Transit</h6>
                  <p className="small text-muted mb-0">Insulated moisture-retaining corrugate cushions plants securely without plastic.</p>
                </div>
              </div>
            </div>

            {/* Technical Engineering Section */}
            <div className="p-4 rounded-2" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-medium)' }}>
              <span className="eyebrow text-leaf mb-1">Software Architecture Showcase</span>
              <h4 className="serif-heading fs-4 mb-2">Engineered with Modern Enterprise Tech</h4>
              <p className="small text-muted mb-4">
                This full-stack application was architected from the ground up to showcase production-grade Java and React development:
              </p>
              
              <div className="row g-3">
                <div className="col-sm-6">
                  <strong className="d-block small text-dark mb-1"><i className="bi bi-cpu text-leaf me-1"></i> Backend Architecture</strong>
                  <ul className="small text-muted ps-3 mb-0">
                    <li>Java 25 (LTS) &bull; Spring Boot 3.4.2</li>
                    <li>Spring Data JPA &bull; Hibernate 6 ORM</li>
                    <li>MySQL 8 database with UTF-8 encoding</li>
                    <li>BigDecimal precision for financial accuracy</li>
                    <li>Bean Validation &amp; Global Exception Handlers</li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <strong className="d-block small text-dark mb-1"><i className="bi bi-window text-leaf me-1"></i> Frontend Architecture</strong>
                  <ul className="small text-muted ps-3 mb-0">
                    <li>React 19 &bull; Vite build tooling</li>
                    <li>Axios HTTP client with request interceptors</li>
                    <li>React Router DOM for seamless SPA flow</li>
                    <li>Custom Botanical design system &bull; CSS variables</li>
                    <li>Responsive editorial art direction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="mt-5 pt-4 border-top text-center">
              <span className="eyebrow text-muted">Architected, Designed &amp; Developed by</span>
              <h3 className="serif-heading fs-3 text-dark mb-3">Manjunath</h3>
              <p className="small text-muted mb-4 mx-auto" style={{ maxWidth: '450px' }}>
                Full-Stack Developer passionate about clean architecture, robust domain modeling, and intentional user experiences.
              </p>
              <Link to="/shop" className="btn-clay">
                Explore The Nursery Collection <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}