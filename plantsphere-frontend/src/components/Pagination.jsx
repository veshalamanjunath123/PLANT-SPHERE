import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="d-flex justify-content-center align-items-center gap-2 my-5" aria-label="Catalog pagination">
      <button 
        className="btn-outline-ink btn-sm px-3"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ opacity: currentPage === 0 ? 0.35 : 1 }}
      >
        <i className="bi bi-arrow-left me-1"></i> Previous
      </button>

      <div className="d-flex align-items-center gap-1 mx-2">
        {pages.map((p) => (
          <button
            key={p}
            className={`btn btn-sm ${p === currentPage ? 'btn-ink' : 'btn-outline-ink'} px-3 py-1`}
            style={{ minWidth: '36px' }}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        ))}
      </div>

      <button 
        className="btn-outline-ink btn-sm px-3"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        style={{ opacity: currentPage === totalPages - 1 ? 0.35 : 1 }}
      >
        Next <i className="bi bi-arrow-right ms-1"></i>
      </button>
    </nav>
  );
}