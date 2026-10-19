import React from 'react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div 
      className="p-4 my-4 rounded-2 text-center" 
      style={{ backgroundColor: 'var(--chalk)', border: '1px solid var(--border-medium)' }} 
      role="alert"
    >
      <i className="bi bi-info-circle fs-3 text-warning d-block mb-2" style={{ color: 'var(--clay)' }}></i>
      <h6 className="font-serif fs-5 text-dark mb-2">Unable to Load Specimens</h6>
      <p className="text-muted small mb-3 mx-auto" style={{ maxWidth: '500px' }}>
        {message || 'The connection to our nursery database was interrupted. Please ensure the backend is running.'}
      </p>
      {onRetry && (
        <button type="button" className="btn-ink btn-sm" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i> Reconnect
        </button>
      )}
    </div>
  );
}