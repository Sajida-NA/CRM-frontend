
import React from "react"; 
import { useParams } from "react-router-dom"; 
 
import TicketLeftPanel from "../../TicketLeftPanel"; 
import MeetingDetails from "./MeetingDetails"; 
import { ticketTabs } from "../TicketTabs"; 
 
export default function TicketMeeting() { 
  const { ticketId } = useParams(); 
 
  const tabs = ticketTabs(ticketId); 
 
  return ( 
    <TicketLeftPanel> 
      <MeetingDetails 
        tabs={tabs} 
        module="ticket" 
        moduleId={ticketId} 
      /> 
    </TicketLeftPanel> 
  ); 
} 