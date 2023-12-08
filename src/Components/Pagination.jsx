// Pagination.jsx
import React from "react";
import "./Pagination.css";

const Pagination = ({ handlePagination, currentPage, filteredUsers }) => {
  return (
    <div className="pagination-container">
      {/* Pagination buttons */}
      <button
        className="pagination-button first-page"
        onClick={() => handlePagination(1)}
      >
        First Page
      </button>
      <button
        className="pagination-button previous-page"
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      {/* Render page numbers based on the number of filtered users */}
      {Array.from(
        { length: Math.ceil(filteredUsers.length / 10) },
        (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePagination(index + 1)}
            className={
              index + 1 === currentPage
                ? `pagination-button active page-${index + 1}`
                : `pagination-button page-${index + 1}`
            }
          >
            {index + 1}
          </button>
        )
      )}
      <button
        className="pagination-button next-page"
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === Math.ceil(filteredUsers.length / 10)}
      >
        Next Page
      </button>
      <button
        className="pagination-button last-page"
        onClick={() => handlePagination(Math.ceil(filteredUsers.length / 10))}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
