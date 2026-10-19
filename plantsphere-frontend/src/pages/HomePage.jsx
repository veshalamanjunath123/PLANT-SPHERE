import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axiosClient.get('/products?page=0&size=4&sortBy=price&direction=DESC'),
          axiosClient.get('/categories')
        ]);
        setFeaturedProducts(prodRes.data.content || []);
        setCategories(catRes.data || []);
      } catch (err) {
        setError('Could not load data. Ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const categoryVisuals = {
    'Indoor Plants': {
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Air‑purifying foliage'
    },
    'Outdoor Plants': {
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Hardy sun lovers'
    },
    'Flowering Plants': {
      image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Seasonal blossoms'
    },
    'Succulents and Cacti': {
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Drought‑tolerant gems'
    },
    'Pots and Planters': {
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Handcrafted clay & ceramic'
    },
    'Soil and Fertilizers': {
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      subtitle: 'Nutrient‑rich mediums'
    }
  };

  return (
    <div className="container py-4">
      {/* Hero */}
      <section className="hero-section mb-5">
        <div className="row g-0 align-items-stretch">
          <div className="col-lg-7">
            <img
              src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85"
              alt="Lush indoor foliage"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="col-lg-5 d-flex flex-column justify-content-center" style={{ backgroundColor: 'var(--paper)', padding: '2rem' }}>
            <span className="eyebrow text-leaf">Horticultural Boutique • India</span>
            <h1 className="serif-heading display-4 text-dark mb-3">Make room for something living.</h1>
            <p className="editorial-lead mb-4 text-dark">
              Thoughtfully chosen plants and gardening essentials for a greener everyday life.
            </p>
            <Link to="/shop" className="btn-clay">
              Shop the Collection <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-5">
        <h2 className="serif-heading fs-2 mb-4">Browse by Habitat</h2>
        <div className="row g-4">
          {categories.slice(0, 6).map((cat) => {
            const visual = categoryVisuals[cat.name] || {
              image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
              subtitle: 'Living botanical collection'
            };
            return (
              <div key={cat.id} className="col-sm-6 col-lg-4">
                <Link to={`/shop?category=${cat.id}`} className="text-decoration-none">
                  <div className="category-card position-relative overflow-hidden">
                    <img src={visual.image} alt={cat.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    <div className="position-absolute bottom-0 start-0 end-0 bg-white bg-opacity-75 p-3">
                      <h5 className="category-card-title mb-1">{cat.name}</h5>
                      <p className="category-card-meta mb-0">{visual.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-5">
        <h2 className="serif-heading fs-2 mb-4">Specimens of the Week</h2>
        {loading && <LoadingIndicator message="Loading featured plants…" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="specimens-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Feature */}
      <section className="botanical-journal-section">
        <div className="row align-items-center g-4">
          <div className="col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80"
              alt="Potting succulents"
              className="img-fluid w-100"
            />
          </div>
          <div className="col-lg-7">
            <span className="eyebrow text-leaf">The Art of Nursery Care</span>
            <h3 className="serif-heading fs-3 mb-3">
              We never ship plants fresh out of the greenhouse.
            </h3>
            <p className="editorial-lead mb-3">
              Most commercial nurseries pack freshly propagated plants straight into cardboard boxes. The shock of sudden darkness, temperature swings, and unfamiliar home environments causes severe leaf drop.
            </p>
            <Link to="/about" className="btn-ink me-2">
              Read Our Story
            </Link>
            <Link to="/shop" className="btn-outline-ink">
              Browse Acclimatized Plants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}