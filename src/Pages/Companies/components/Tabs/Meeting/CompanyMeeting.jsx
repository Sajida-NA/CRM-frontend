import React from "react";


import CompanyLeftPanel from "../../CompanyLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getCompanyTabs } from "../CompanyTabs";
import { useParams } from "react-router-dom";

export default function CompanyMeeting() {
   const {id} = useParams();
  return (
    <>
      <CompanyLeftPanel> <MeetingDetails  tabs={getCompanyTabs(id)} 
        companyId={id}/></CompanyLeftPanel>
    </>

 
  );
}

