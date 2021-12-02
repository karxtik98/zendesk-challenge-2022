import React from "react";
import { useTable, usePagination } from "react-table";
import "./TicketTable.css";

const TicketTable = ({
  columns,
  data,
  currentPage,
  handleRowClick,
  handlePageChange,
  hasMore,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        useControlledState: (state) => {
          return React.useMemo(
            () => ({
              ...state,
              pageIndex: currentPage,
            }),
            [state]
          );
        },
        initialState: {
          pageIndex: currentPage,
        },
        manualPagination: true,
      },
      usePagination
    );
  const headerDetails = headerGroups[0];
  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          <tr className="table-header" {...headerDetails.getHeaderGroupProps()}>
            {headerDetails.headers.slice(0, 1).map((column) => (
              <th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
            {headerDetails.headers.slice(1).map((column) => (
              <th key={column.id} {...column.getHeaderProps}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="rows-container"
                onClick={() => handleRowClick(row.id)}
              >
                {row.cells.map((cell) => (
                  <td key={cell.id} className="green" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(false)}
          disabled={currentPage === 1}
          data-testid="lt-button"
        >
          {"<"}
        </button>
        <div data-testid="current-page">{currentPage}</div>
        <button
          onClick={() => handlePageChange(true)}
          disabled={!hasMore}
          data-testid="gt-button"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TicketTable;
