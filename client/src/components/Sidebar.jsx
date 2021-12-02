import React from "react";
import { useHistory } from "react-router-dom";

import ZendeskIcon from "./ZendeskIcon";
import TicketIcon from "./TicketIcon";
const Sidebar = () => {
  const history = useHistory();
  return (
    <nav className="green-bg">
      <ZendeskIcon className="zendesk-icon" />
      <TicketIcon
        className="ticket-icon"
        onClick={() => {
          history.push("/");
        }}
      />
    </nav>
  );
};

export default Sidebar;
