import { useState } from 'react';

type Props = {
  count: number;
  fetchData: (url: string) => void;
  next: string;
  previous: string | null;
}

const PaginationComponent: React.FC<Props> = ({ count, fetchData, next, previous }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(count / 10);

  const handlePageChange = (pageNumber: number) => {

    fetchData(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${(pageNumber - 1) * 10}`);
    setCurrentPage(pageNumber);
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
      <button className='pagination-link' onClick={() => handlePageChange(currentPage - 1)} disabled={!previous}>
        Previous
      </button>
      {currentPage <= 2 ? pageNumbers.slice(0, 3) : (
        <>
          {pageNumbers[0]}
          <p>...</p>
          {pageNumbers.splice(currentPage - 2, 3)}
          {currentPage > totalPages - 2 ? null : <><p>...</p>{pageNumbers[pageNumbers.length - 1]}</>}
        </>
      )}

      <button className='pagination-link' onClick={() => handlePageChange(currentPage + 1)} disabled={!next}>
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
