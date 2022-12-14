import { Pagination } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination";
import "./CustomPagination.scss";

const CustomPagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize = 8,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <Pagination>
        <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1} />
        {paginationRange.map((pageNumber: number | string, idx: number) => {
          if (pageNumber === "DOTS") {
            return (
              <Pagination.Item key={`${pageNumber} ${idx}`}>
                &#8230;
              </Pagination.Item>
            );
          }

          return (
            <Pagination.Item
              key={`${pageNumber} ${idx}`}
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}

        <Pagination.Next onClick={onNext} disabled={currentPage === lastPage} />
      </Pagination>
    </>
  );
};

export default CustomPagination;
