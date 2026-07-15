import React from "react";
import TicketLeftPanel from "../../TicketLeftPanel";
import EmailDetails from "../../../../Leads/components/Tabs/Email/EmailDetails";

export default function TicketEmail() {
  return (
    <>
      <TicketLeftPanel />
      <EmailDetails />
    </>
  );
}