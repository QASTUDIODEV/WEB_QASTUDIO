type TGetPageNumbersProps = {
  totalPages: number;
  currentPage: number;
};

export const getPageNumbers = ({ totalPages, currentPage }: TGetPageNumbersProps) => {
  if (totalPages === 0) {
    return [0];
  }

  if (totalPages < 5 && totalPages > 0) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 5));
  const endPage = Math.min(totalPages - 1, startPage + 4);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};
