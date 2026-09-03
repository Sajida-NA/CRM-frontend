import React from "react";
import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { getTicketTabs } from "../TicketTabs";

export default function TicketEmail() {
  const { ticketId } = useParams();

  const tabs = getTicketTabs(ticketId);

  return (
    <TicketLeftPanel>
      <EmailDetails
        tabs={tabs}
        relatedModule="ticket"
        objectId={ticketId}
      />
    </TicketLeftPanel>
  );
}