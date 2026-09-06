

import React from "react";
import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";
import NoteDetails from "./NoteDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketNote() {
  const { ticketId } = useParams();

  const tabs = ticketTabs(ticketId);

  return (
    <TicketLeftPanel>
      <NoteDetails
        tabs={tabs}
        module="ticket"
        moduleId={ticketId}
      />
    </TicketLeftPanel>
  );
}