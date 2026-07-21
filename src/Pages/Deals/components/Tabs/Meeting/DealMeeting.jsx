import React from "react";
import DealLeftPanel from "../../DealLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { dealTabs } from "../DealTabs";

export default function DealMeeting() {
  return (
    <>
      <DealLeftPanel><MeetingDetails tabs={dealTabs} /></DealLeftPanel>
      
    </>
  );
}