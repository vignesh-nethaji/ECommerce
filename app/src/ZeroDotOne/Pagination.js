import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 0,
        currentPage,
        pageSize,
        className,
        key
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });



    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', { [className]: className })}
        >
            <li
                className={currentPage === 1 ? 'pagination-item-noshow' : "pagination-item"}
                onClick={onPrevious}
            >
                <div > <BsChevronDoubleLeft /> </div>
            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li key={pageNumber} className="pagination-item dots"></li>;
                }

                return (
                    <li
                        className={pageNumber === currentPage ? 'pagination-item-action' : "pagination-item"}
                        onClick={() => onPageChange(pageNumber)}
                        key={key}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={currentPage === lastPage ? "pagination-item-noshow" : "pagination-item"}
                onClick={onNext}
            >
                <div><BsChevronDoubleRight /></div>
            </li>
        </ul >
    );
};

export default Pagination;
