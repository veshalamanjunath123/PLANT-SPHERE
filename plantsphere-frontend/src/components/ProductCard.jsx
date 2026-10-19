import React from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80';

export default function ProductCard({ product }) {
  const isOutOfStock = product.stockQuantity <= 0;

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="specimen-card">
      {/* Photography Frame */}
      <div className="specimen-img-container">
        <Link to={`/products/${product.id}`} tabIndex={-1}>
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
          />
        </Link>
        <span className="specimen-status-chip">
          {isOutOfStock ? (
            <span className="text-danger">Sold Out</span>
          ) : (
            <span>In Stock ({product.stockQuantity})</span>
          )}
        </span>
      </div>

      {/* Specimen Body */}
      <div className="specimen-body">
        <span className="eyebrow">{product.categoryName}</span>

        <Link
          to={`/products/${product.id}`}
          className="specimen-title text-truncate"
          title={product.name}
        >
          {product.name}
        </Link>

        <p className="specimen-desc mb-2">{product.description}</p>

        {/* Plant Care Meta */}
        {product.sunlightRequirement && (
          <div className="specimen-care-summary">
            <span className="specimen-care-tag" title="Sunlight Requirement">
              <i className="bi bi-brightness-high"></i> {product.sunlightRequirement}
            </span>
          </div>
        )}

        {/* Specimen Pricing & Actions */}
        <div className="specimen-footer">
          <div>
            <span className="specimen-price">
              ₹{Number(product.price).toFixed(2)}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link
              to={`/products/${product.id}`}
              className="btn-add-specimen"
              title="View Botanical Profile"
            >
              Inspect
            </Link>
            <button
              type="button"
              className="btn-add-specimen bg-ink text-white border-0"
              disabled={isOutOfStock}
              onClick={() => alert(`Added ${product.name} to shopping bag.`)}
              title={isOutOfStock ? 'Sold Out' : 'Add to Bag'}
            >
              <i className="bi bi-plus-lg"></i> Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}