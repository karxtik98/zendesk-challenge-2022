import React from "react";
import "./TicketStatus.css";
const TicketStatus = ({ status }) => {
  return (
    <div className="status">
      <div>{status.charAt(0)}</div>
    </div>
  );
};

export default TicketStatus;
