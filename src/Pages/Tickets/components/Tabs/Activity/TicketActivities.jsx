
import React from "react";
import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";
import TicketActivityDetails from "./TicketActivityDetails";

export default function TicketActivities() {
  const { ticketId } = useParams();

  return (
    <TicketLeftPanel>
      <TicketActivityDetails ticketId={ticketId} />
    </TicketLeftPanel>
  );
}

