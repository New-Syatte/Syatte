import React, { useState } from "react";

interface IPaginationProps {
  currentPage: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number;
}

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}: IPaginationProps) => {
  const pageNumbers = [];

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const listStyle =
    "text-lg border border-gray-300 min-w-12 h-12 p-1 flex justify-center items-center cursor-pointer mx-1";

  return (
    <ul className="list-none mt-4 pt-4 border-t-2 border-gray-300 flex justify-center items-center">
      <li
        onClick={paginatePrevPage}
        className={currentPage === pageNumbers[0] ? "hidden" : ""}
      >
        {"<"}
      </li>

      {pageNumbers.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={`${listStyle} ${
                currentPage === number
                  ? `border border-colorBlack text-colorBlack`
                  : ""
              }`}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNextPage}
        className={`${listStyle} ${
          currentPage === pageNumbers[pageNumbers.length - 1] ? "hidden" : ""
        }`}
      >
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
