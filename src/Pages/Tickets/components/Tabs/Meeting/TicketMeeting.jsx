import React from "react";
import { useParams } from "react-router-dom";

import MeetingDetails from "./MeetingDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketMeeting() {
  const { ticketId } = useParams();

  const tabs = ticketTabs(ticketId);

  return <MeetingDetails tabs={tabs} module="ticket" moduleId={ticketId} />;
}
