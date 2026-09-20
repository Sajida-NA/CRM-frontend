import React from "react";
import { useParams } from "react-router-dom";

import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketEmail() {
  const { ticketId } = useParams();

  const tabs = ticketTabs(ticketId);

  return (
    <EmailDetails tabs={tabs} relatedModule="ticket" objectId={ticketId} />
  );
}
