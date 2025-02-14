type TGetPageNumbersProps = {
  totalPages: number;
  currentPage: number;
};

export const getPageNumbers = ({ totalPages, currentPage }: TGetPageNumbersProps) => {
  console.log(totalPages, currentPage);
  if (totalPages === 0) {
    return [0];
  }
  if (currentPage === 0 && totalPages > 10) {
    return Array.from({ length: 10 }, (_, index) => index);
  } else if (currentPage === 0) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const page = Math.floor(currentPage / 10);
  const startPage = page * 10;
  const endPage = Math.min(startPage + 9, totalPages - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};
