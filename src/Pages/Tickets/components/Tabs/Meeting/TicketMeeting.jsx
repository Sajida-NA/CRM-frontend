import React from "react";
import TicketLeftPanel from "../../TicketLeftPanel";
import Details from "./MeetingDetails";
import MeetingDetails from "./MeetingDetails";

export default function TicketMeeting() {
  return (
    <div>
      <TicketLeftPanel><MeetingDetails /></TicketLeftPanel>
     </div>
  );
}
