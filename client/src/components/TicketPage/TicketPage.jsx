import React, { useEffect, useMemo, useState } from "react";
import TicketTable from "./TicketTable/TicketTable";
import { useTickets, useTicket } from "../../custom-hooks";
import "./TicketPage.css";
import TicketStatus from "./TicketTable/TicketStatus/TicketStatus";
import { useHistory } from "react-router";

const TicketPage = () => {
  const [page, setPage] = useState(1);
  const [queryData, setQueryData] = useState({
    cursor: "",
    next: true,
  });
  const history = useHistory();
  const [ticketId, setTicketId] = useState(undefined);
  const { data: ticketListData, isLoading } = useTickets({
    ...queryData,
  });
  const { data: ticket } = useTicket(ticketId);
  const handlePageChange = (nextPressed) => {
    if (nextPressed) {
      setPage((page) => page + 1);
      setQueryData({
        cursor: ticketListData.data.meta.after_cursor,
        next: true,
      });
    } else if (!nextPressed) {
      setPage((page) => page - 1);
      setQueryData({
        cursor: ticketListData.data.meta.before_cursor,
        next: false,
      });
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "col1",
      },
      {
        Header: "",
        accessor: "col2",
        Cell: ({ cell: { value } }) => <TicketStatus status={value} />,
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
        Cell: ({ cell: { value } }) =>
          new Intl.DateTimeFormat("en-GB").format(new Date(value)),
      },
      {
        Header: "Type",
        accessor: "col6",
        Cell: ({ cell: { value } }) => (value ? value : "-"),
      },
    ],
    []
  );
  const ticketList = ticketListData?.data?.tickets.map((ticket) => {
    return {
      col1: ticket.id,
      col2: ticket.status,
      col3: ticket.subject,
      col4: ticket.requester_id,
      col5: ticket.created_at,
      col6: ticket.type,
    };
  });
  const tableData = useMemo(() => ticketList, [ticketList]);

  const handleRowClick = (id) => {
    setTicketId(parseInt(id) + 1);
  };

  useEffect(() => {
    if (ticket) {
      const { description, created_at, status, subject, requester_id, id } =
        ticket.data.ticket;
      history.push(`/${id}`, {
        description,
        created_at,
        status,
        subject,
        requester_id,
      });
    }
  }, [ticket, history]);
  console.log(ticketListData);
  return (
    <div className="ticket-page">
      <div className="ticket-page-container">
        <div className="title-section">
          <div className="tickets-title green">Your tickets</div>
        </div>
        {isLoading ? (
          <div className="loading" />
        ) : ticketListData ? (
          <TicketTable
            columns={columns}
            data={tableData}
            handleRowClick={handleRowClick}
            currentPage={page}
            setCurrentPage={setPage}
            handlePageChange={handlePageChange}
            hasMore={ticketListData?.data?.meta?.has_more}
          />
        ) : (
          <div className="error">
            ⚠ There was an error loading your tickets!
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;
