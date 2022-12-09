import React from "react";
import { Container, Pagination } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination";

const CustomPagination = (props: any) => {
  const {
    onPageChange,
    totalCount = 100,
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
    <Container>
      <Pagination>
        <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1} />
        {paginationRange.map(
          (
            pageNumber:
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.Key
              | null
              | undefined
          ) => {
            if (pageNumber === "DOTS") {
              return <Pagination.Item>&#8230;</Pagination.Item>;
            }

            return (
              <Pagination.Item
                active={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          }
        )}

        <Pagination.Next onClick={onNext} disabled={currentPage === lastPage} />
      </Pagination>
    </Container>
  );
};

export default CustomPagination;
