import TicketTable from "../TicketPage/TicketTable/TicketTable";
import { firstPageData } from "../../mockData";
import { fireEvent, render } from "@testing-library/react";

const columns = [
  {
    Header: "ID",
    accessor: "col1",
  },
  {
    Header: "",
    accessor: "col2",
  },
  {
    Header: "Subject",
    accessor: "col3",
  },
  {
    Header: "Requester",
    accessor: "col4",
  },
  {
    Header: "Requested",
    accessor: "col5",
  },
  {
    Header: "Type",
    accessor: "col6",
  },
];

const columnHeaders = columns.reduce((headers = [], cur) => {
  if (cur.Header) {
    headers.push(cur.Header);
  }
  return headers;
}, []);

const mockHandleRowClick = jest.fn();
const mockHandlePageChange = jest.fn();

describe("TicketTable", () => {
  it("renders without error (no data)", () => {
    const { getByTestId, getByText } = render(
      <TicketTable
        columns={columns}
        data={[]}
        currentPage={1}
        hasMore={false}
        handleRowClick={mockHandleRowClick}
        handlePageChange={jest.fn()}
      />
    );

    // ensure all headers are rendered
    columnHeaders.forEach((header) => {
      expect(getByText(header)).toBeTruthy();
    });

    // should not be able to go to previous or next page
    expect(getByTestId("lt-button")).toHaveAttribute("disabled", "");
    expect(getByTestId("gt-button")).toHaveAttribute("disabled", "");
    // should be on page 1
    expect(getByTestId("current-page")).toHaveTextContent(1);
    // ensure tbody has no children witih no daata
    expect(document.querySelector("tbody").childElementCount).toBe(0);
  });
  it("renders without error (1 page of data)", async () => {
    const { getByTestId } = render(
      <TicketTable
        columns={columns}
        data={firstPageData}
        currentPage={1}
        hasMore={false}
        handleRowClick={mockHandleRowClick}
        handlePageChange={mockHandlePageChange}
      />
    );
    // should be on page 1
    expect(getByTestId("current-page")).toHaveTextContent(1);
    // should not be able to go to previous or next page
    expect(getByTestId("lt-button")).toHaveAttribute("disabled", "");
    expect(getByTestId("gt-button")).toHaveAttribute("disabled", "");

    const tbody = document.querySelector("tbody");
    // check that the table body has 25 elements
    expect(tbody.childElementCount).toBe(firstPageData.length);
    // check that first header cell in table body has id of 1
    expect(tbody.firstChild.firstChild).toHaveTextContent(1);
    // check that the first header cell in table body has id of 25
    expect(tbody.lastChild.firstChild).toHaveTextContent(25);

    fireEvent.click(tbody.firstChild);
    // function called on click
    expect(mockHandleRowClick).toHaveBeenCalledTimes(1);
    // 0th row id
    expect(mockHandleRowClick).toHaveBeenCalledWith("0");
  });
  it("Check page buttons work", async () => {
    const { getByTestId } = render(
      <TicketTable
        columns={columns}
        data={[]}
        currentPage={2}
        hasMore={true}
        handleRowClick={mockHandleRowClick}
        handlePageChange={mockHandlePageChange}
      />
    );
    // should be on page 2
    expect(getByTestId("current-page")).toHaveTextContent(2);
    // should be able to go to next page or previous page
    expect(getByTestId("lt-button")).not.toHaveAttribute("disabled");
    expect(getByTestId("gt-button")).not.toHaveAttribute("disabled");

    // click previous page
    fireEvent.click(getByTestId("lt-button"));
    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePageChange).toHaveBeenCalledWith(false);

    // click next page
    fireEvent.click(getByTestId("gt-button"));
    expect(mockHandlePageChange).toHaveBeenCalledTimes(2);
    expect(mockHandlePageChange).toHaveBeenCalledWith(true);
  });
});
