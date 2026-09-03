import React from "react";
import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";
import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { getTicketTabs } from "../TicketTabs";

export default function TicketTask() {
  const { ticketId } = useParams();

  const tabs = getTicketTabs(ticketId);

  return (
    <TicketLeftPanel>
      <TaskDetails
        tabs={tabs}
        module="ticket"
        moduleId={ticketId}
      />
    </TicketLeftPanel>
  );
}