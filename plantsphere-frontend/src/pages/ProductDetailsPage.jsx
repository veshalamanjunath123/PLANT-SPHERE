import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosClient.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error('Failed to load botanical details', err);
      setError('Unable to locate this specimen. It may have been relocated or the ID is invalid.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingIndicator message="Reading botanical documentation from nursery..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
  if (!product) return null;

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="container py-4">
      {/* Editorial Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small mb-0">
          <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/shop" className="text-muted text-decoration-none">Nursery</Link></li>
          <li className="breadcrumb-item"><Link to={`/shop?category=${product.categoryId}`} className="text-muted text-decoration-none">{product.categoryName}</Link></li>
          <li className="breadcrumb-item active text-dark" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-5 align-items-start">
        {/* Visual Exhibition Column */}
        <div className="col-lg-6">
          <div className="hero-visual-frame bg-white">
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85'}
              alt={product.name}
              style={{ height: '520px' }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85'; }}
            />
          </div>
          
          {/* Packaging Note */}
          <div className="p-3 mt-3 bg-white rounded-2 border small text-muted d-flex align-items-center gap-3" style={{ borderColor: 'var(--border-delicate)' }}>
            <i className="bi bi-box-seam fs-4 text-leaf"></i>
            <div>
              <strong className="text-dark d-block">Hand-Packed with Aerated Root Buffer</strong>
              <span>Shipped in breathable recycled packaging with moisture-retention soil moss.</span>
            </div>
          </div>
        </div>

        {/* Specimen Documentation & Purchase Column */}
        <div className="col-lg-6 ps-lg-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="eyebrow mb-0">{product.categoryName}</span>
            <span className="specimen-status-chip position-static">
              {isOutOfStock ? (
                <span className="text-danger">Sold Out</span>
              ) : (
                <span className="text-leaf">Acclimatized &bull; {product.stockQuantity} Available</span>
              )}
            </span>
          </div>

          <h1 className="serif-heading display-5 mb-2">{product.name}</h1>
          
          <div className="specimen-price fs-2 mb-3">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="editorial-lead fs-6 mb-4">
            {product.description}
          </p>

          {/* Plant Care Specification Matrix */}
          <h6 className="eyebrow mt-4 mb-2">Horticultural Profile</h6>
          <table className="spec-matrix-table bg-white rounded-2 overflow-hidden border">
            <tbody>
              {product.sunlightRequirement && (
                <tr>
                  <td className="spec-matrix-label">
                    <i className="bi bi-brightness-high me-2 text-warning"></i> Sunlight
                  </td>
                  <td className="spec-matrix-val">{product.sunlightRequirement}</td>
                </tr>
              )}

              {product.wateringFrequency && (
                <tr>
                  <td className="spec-matrix-label">
                    <i className="bi bi-droplet-half me-2 text-primary"></i> Hydration
                  </td>
                  <td className="spec-matrix-val">{product.wateringFrequency}</td>
                </tr>
              )}

              {product.difficultyLevel && (
                <tr>
                  <td className="spec-matrix-label">
                    <i className="bi bi-award me-2 text-leaf"></i> Care Level
                  </td>
                  <td className="spec-matrix-val">{product.difficultyLevel}</td>
                </tr>
              )}

              {product.petFriendly !== null && (
                <tr>
                  <td className="spec-matrix-label">
                    <i className={`bi ${product.petFriendly ? 'bi-shield-check text-success' : 'bi-shield-exclamation text-danger'} me-2`}></i> Pet Safety
                  </td>
                  <td className="spec-matrix-val">
                    {product.petFriendly ? 'Non-toxic for pets' : 'Mild foliage toxicity (keep elevated)'}
                  </td>
                </tr>
              )}

              {product.suitableLocation && (
                <tr>
                  <td className="spec-matrix-label">
                    <i className="bi bi-geo-alt me-2 text-danger"></i> Placement
                  </td>
                  <td className="spec-matrix-val">{product.suitableLocation}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Acquisition Stepper & Button */}
          <div className="d-flex align-items-center gap-3 pt-3">
            <div className="qty-stepper">
              <button
                type="button"
                className="qty-stepper-btn"
                disabled={quantity <= 1 || isOutOfStock}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <input
                type="text"
                className="qty-stepper-input"
                readOnly
                value={quantity}
                aria-label="Selected quantity"
              />
              <button
                type="button"
                className="qty-stepper-btn"
                disabled={quantity >= product.stockQuantity || isOutOfStock}
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                &#43;
              </button>
            </div>

            <button
              type="button"
              className="btn-clay flex-grow-1 justify-content-center py-3"
              disabled={isOutOfStock}
              onClick={() => alert(`Reserved ${quantity} &times; ${product.name} in shopping bag.`)}
            >
              <i className="bi bi-bag-plus"></i>
              <span>{isOutOfStock ? 'Currently Unavailable' : 'Add to Shopping Bag'}</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-top text-muted small d-flex justify-content-between">
            <span><i className="bi bi-check2 text-leaf me-1"></i> 14-Day Vitality Guarantee</span>
            <span><i className="bi bi-truck text-leaf me-1"></i> Dispatched within 48 Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}