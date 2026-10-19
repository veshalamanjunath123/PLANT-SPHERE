import React from 'react';

export default function LoadingIndicator({ message = 'Gathering botanical specimens from nursery...' }) {
  return (
    <div className="text-center py-5 my-4">
      <div 
        className="spinner-border text-success mb-3" 
        style={{ width: '2.4rem', height: '2.4rem', color: 'var(--leaf)', borderWidth: '2px' }} 
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="font-serif fs-5 text-dark mb-1">Cultivating Collection</p>
      <small className="text-muted">{message}</small>
    </div>
  );
}