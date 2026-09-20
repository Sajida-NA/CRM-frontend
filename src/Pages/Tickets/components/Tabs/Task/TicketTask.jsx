import React from "react";
import { useParams } from "react-router-dom";

import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketTask() {
  const { ticketId } = useParams();

  return (
    <TaskDetails
      tabs={ticketTabs(ticketId)}
      module="ticket"
      moduleId={ticketId}
    />
  );
}
