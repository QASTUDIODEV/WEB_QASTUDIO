type TGetPageNumbersProps = {
  totalPages: number;
  currentPage: number;
};

export const getPageNumbers = ({ totalPages, currentPage }: TGetPageNumbersProps) => {
  if (totalPages === 0) {
    return [0];
  }
  const page = Math.floor((currentPage + 1) / 10);
  const startPage = page * 10;
  const endPage = Math.min(page + 9, totalPages - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};
