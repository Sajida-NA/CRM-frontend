import React from "react";
import TicketLeftPanel from "../../TicketLeftPanel";
import Details from "./MeetingDetails";
import MeetingDetails from "./MeetingDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketMeeting() {
  return (
    <div>
      <TicketLeftPanel/>
      <MeetingDetails tabs={ticketTabs} />
    </div>
  );
}
