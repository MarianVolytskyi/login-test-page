import { useState, useEffect } from 'react';

type Props = {
  count: number;
  fetchData: (url: string) => void;
  next: string;
  previous: string | null;
};

const PaginationComponent: React.FC<Props> = ({ count, fetchData, next, previous }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(count / itemsPerPage);

  useEffect(() => {
    handlePageChange(1);
  }, [itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    fetchData(
      `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${itemsPerPage}&offset=${(pageNumber - 1) * itemsPerPage}`
    );
    setCurrentPage(pageNumber);
  };

  const selectItemsPerPage = (value: number) => {
    setItemsPerPage(value);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`pagination-link is-rounded ${currentPage === i ? 'is-current' : ''}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination is-rounded" style={{ display: 'flex', justifyContent: 'center' }}>
      <button className="pagination-link" onClick={() => handlePageChange(currentPage - 1)} disabled={!previous}>
        Previous
      </button>
      {currentPage <= 2 ? pageNumbers.slice(0, 3) : (
        <>
          {pageNumbers[0]}
          <p>...</p>
          {pageNumbers.slice(currentPage - 2, currentPage + 1)}
          {currentPage > totalPages - 2 ? null : (
            <>
              <p>...</p>
              {pageNumbers[pageNumbers.length - 1]}
            </>
          )}
        </>
      )}

      <button className="pagination-link" onClick={() => handlePageChange(currentPage + 1)} disabled={!next}>
        Next
      </button>
      
      <div className="select ml-3">
        <select
          value={itemsPerPage}
          onChange={(e) => selectItemsPerPage(Number(e.target.value))}

        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>


    </div>
  );
};

export default PaginationComponent;
