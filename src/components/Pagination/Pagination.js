import React from "react";
import "./Pagination.css"; // Import CSS file for styling

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items">
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={index + 1 === currentPage}
            className={`btn pagination-button ${
              index + 1 === currentPage ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>Total Number of Items: <span className="color-primary font-bold">{totalItems}</span></div>
    </div>
  );
};

export default Pagination;
