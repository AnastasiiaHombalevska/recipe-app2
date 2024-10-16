import React from "react";
import cn from 'classnames';

export default function Pagination({
  currentPageNumber,
  setCurrentPageNumber,
  currentPage,
  totalPages,
}) {
  
  const paginate = pageNumber => setCurrentPageNumber(pageNumber);

  const goPrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const goNextPage = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const arr = [];

  for (let i = 1; i <= totalPages; i++) {
    arr.push(i);
  }
  
  return (
    <div>
      <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPageNumber === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPageNumber === 1}
          onClick={goPrevPage}
        >
          «
        </a>
      </li>

      {arr.map(num => (
        <li
          className={cn('page-item', {
            active: currentPageNumber === num,
          })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => paginate(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPageNumber === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPageNumber === totalPages}
          onClick={goNextPage}
        >
          »
        </a>
      </li>
      </ul>
  </div>
);
}
