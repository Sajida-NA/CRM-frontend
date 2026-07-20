import React from "react";
import TicketLeftPanel from "../../TicketLeftPanel";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { ticketTabs } from "../TicketTabs";

export default function TicketEmail() {
  return (
    <>
      <TicketLeftPanel/>
      <EmailDetails tabs={ticketTabs}/>
    </>
  );
}