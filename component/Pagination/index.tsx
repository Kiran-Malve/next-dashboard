'use client';

import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }

    return visiblePages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      {getVisiblePages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md border ${
              page === currentPage
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300'
            } hover:bg-gray-100 transition`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-2 text-gray-500 select-none">
            {page}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
