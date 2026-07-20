import React from "react";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { companyTabs } from "../CompanyTabs";


export default function CompanyMeeting() {
  return (
    <>
      <CompanyLeftPanel />
      <MeetingDetails tabs={companyTabs}/>
    </>
  );
}