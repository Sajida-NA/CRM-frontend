import React from "react";
import { useParams } from "react-router-dom";

import TicketActivityDetails from "./TicketActivityDetails";

export default function TicketActivities() {
  const { ticketId } = useParams();

  return <TicketActivityDetails ticketId={ticketId} />;
}
