import { useState, useEffect } from 'react';
import { Pagination, Stack, Select, MenuItem } from '@mui/material';
type Props = {
  count: number;
  fetchData: (url: string) => void;
  next: string;
  previous: string | null;
};

const PaginationComponent: React.FC<Props> = ({ count, fetchData }) => {
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
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: '20px' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => handlePageChange(value)}
        shape="rounded"
      />

      <Select
        value={itemsPerPage}
        onChange={(e) => selectItemsPerPage(Number(e.target.value))}
        variant="outlined"
      >
        <MenuItem value={10}>10 / page</MenuItem>
        <MenuItem value={20}>20 / page</MenuItem>
        <MenuItem value={50}>50 / page</MenuItem>
      </Select>
    </Stack>
  );
};

export default PaginationComponent;
