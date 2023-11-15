// Pagination.tsx

import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  currentPage: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

const Pagination = ({ currentPage, totalPages, first, last }: Props) => {
  const router = useRouter();
  const current = currentPage + 1;

  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const goToPrevPage = () => {
    const prevPage = current > 1 ? current - 1 : 1;
    handlePageChange(prevPage);
  };

  const goToNextPage = () => {
    handlePageChange(current + 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={goToPrevPage}
        disabled={first}
        className={`mr-2 ${
          first ? "opacity-50 cursor-not-allowed" : "cursor-pointer "
        }`}
      >
        <FaChevronLeft />
      </button>
      <p className="text-sm">
        Page {current} of {totalPages}
      </p>
      <button
        onClick={goToNextPage}
        disabled={last}
        className={`ml-2  ${
          last ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
