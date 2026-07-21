import React from "react";
import DealLeftPanel from "../../DealLeftPanel";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { dealTabs } from "../DealTabs";

export default function DealEmail() {
  return (
    <>
      <DealLeftPanel> <EmailDetails tabs={dealTabs} /></DealLeftPanel>
     
    </>
  );
}