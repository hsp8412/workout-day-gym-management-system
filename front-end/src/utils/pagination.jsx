import React from 'react';
import { Pagination } from "react-bootstrap";

const MyPagination = ({currentPage, onPageChange, itemsPerPage, totalItems}) => {
    let items = [];
    const pages = Math.ceil(totalItems / itemsPerPage);
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div>
            <Pagination>
                <Pagination.Item disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>&laquo;</Pagination.Item>
                {items}
                <Pagination.Item disabled={currentPage === pages} onClick={() => onPageChange(currentPage + 1)}>&raquo;</Pagination.Item>
            </Pagination>
        </div>
    );
};

export default MyPagination;