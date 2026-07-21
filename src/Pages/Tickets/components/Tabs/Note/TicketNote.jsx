import React from "react";
import TicketLeftPanel from "../../TicketLeftPanel";
import NoteDetails from "./NoteDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketNote() {
  return (
    <div>
        <TicketLeftPanel><NoteDetails tabs={ticketTabs}/></TicketLeftPanel>
     </div>
  )
}
