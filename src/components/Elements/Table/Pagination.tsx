import React from 'react';

type PaginationProps = {
  totalPages: number;
  totalResults: number;
  limit: number;
  currentPage: number;
  setPage: (type: number) => void;
};

const Pagination = (props: PaginationProps) => {
  return <div>Pagination</div>;
};

export default Pagination;
