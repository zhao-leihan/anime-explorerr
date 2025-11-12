import React from 'react';

interface PaginationProps {
  currentPage: number;
  lastVisiblePage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastVisiblePage,
  onPageChange,
  loading,
}) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(lastVisiblePage, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (loading) {
    return null;
  }

  if (lastVisiblePage <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      {/* Page Info */}
      <div className="comics-text text-gray-600 text-sm">
        Page {currentPage} of {lastVisiblePage}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="comics-button px-4 py-2 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 comics-text text-sm"
        >
          First
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="comics-button px-4 py-2 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 comics-text text-sm"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {startPage > 1 && (
          <span className="px-2 text-gray-400 comics-text">...</span>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`comics-button px-4 py-2 comics-text text-sm transition-all duration-200 ${
              currentPage === page
                ? 'bg-comic-purple text-black border-comic-purple hover:bg-purple-600'
                : 'bg-white text-gray-800 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < lastVisiblePage && (
          <span className="px-2 text-gray-400 comics-text">...</span>
        )}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastVisiblePage}
          className="comics-button px-4 py-2 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 comics-text text-sm"
        >
          Next
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(lastVisiblePage)}
          disabled={currentPage === lastVisiblePage}
          className="comics-button px-4 py-2 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 comics-text text-sm"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;