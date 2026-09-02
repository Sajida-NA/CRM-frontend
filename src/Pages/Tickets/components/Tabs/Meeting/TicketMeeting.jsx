import React from "react";
import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";
import MeetingDetails from "./MeetingDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketMeeting() {
  const { ticketId } = useParams();

  return (
    <div>
      <TicketLeftPanel>
        <MeetingDetails
          tabs={ticketTabs(ticketId)}
          module="ticket"
          moduleId={ticketId}
        />
      </TicketLeftPanel>
    </div>
  );
}