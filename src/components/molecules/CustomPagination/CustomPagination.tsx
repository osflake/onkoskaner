// import { useEffect, useState, useMemo } from "react";
// import Pagination from "react-bootstrap/Pagination";

// interface RadioInputProps {
//   total: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: any;
// }

// const CustomPagination = ({
//   total = 0,
//   itemsPerPage = 10,
//   currentPage = 1,
//   onPageChange,
// }: RadioInputProps) => {
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     if (total > 0 && itemsPerPage > 0)
//       setTotalPages(Math.ceil(total / itemsPerPage));
//   }, [total, itemsPerPage]);

//   const paginationItems = useMemo(() => {
//     const pages = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
// <Pagination.Item
//   key={i}
//   active={i === currentPage}
//   onClick={() => onPageChange(i)}
// >
//   {i}
// </Pagination.Item>
//       );
//     }

//     return pages;
//   }, [totalPages, currentPage, onPageChange]);

//   if (totalPages === 0) return null;

//   return (
//     <div className="w-100 d-flex justify-content-center align-items-center">
//       <Pagination>
// <Pagination.Prev
//   onClick={() => onPageChange(currentPage - 1)}
//   disabled={currentPage === 1}
// />
//         {paginationItems}
// <Pagination.Next
//   onClick={() => onPageChange(currentPage + 1)}
//   disabled={currentPage === totalPages}
// />
//       </Pagination>
//     </div>
//   );
// };

// export default CustomPagination;

/* eslint-disable no-shadow */
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
