import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { limit } from "constants/index";

const CurrentPagination = ({ total, page, onChangePage }) => {
  const handleChangePage = (number) => {
    if (number !== page) onChangePage(number);
  };

  const totalPages = Math.ceil(total / limit);
  let result = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(
        <PaginationItem active={i === page}>
          <PaginationLink
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              handleChangePage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    if (page === 1 || page === 2) {
      // console.log("DUNG 1");
      for (let i = 1; i <= 5; i++) {
        result.push(
          <PaginationItem active={i === page}>
            <PaginationLink
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                handleChangePage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else if (page === totalPages || page === totalPages - 1) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        result.push(
          <PaginationItem active={i === page}>
            <PaginationLink
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                handleChangePage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      let arr = [page - 2, page - 1, page, page + 1, page + 2];
      result = arr.map((item) => (
        <PaginationItem active={item === page}>
          <PaginationLink
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              handleChangePage(item);
            }}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      ));
    }
  }

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            handleChangePage(page - 1);
          }}
        />
      </PaginationItem>
      {result.map((item) => item)}
      <PaginationItem disabled={page === totalPages}>
        <PaginationLink
          next
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            handleChangePage(page + 1);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default CurrentPagination;
