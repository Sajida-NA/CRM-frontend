import React from "react";
import { useParams } from "react-router-dom";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { companyTabs } from "../CompanyTabs";

export default function CompanyMeeting() {

  const { companyId } = useParams();

  console.log("COMPANY ID:", companyId);

  return (
    <CompanyLeftPanel>

      <MeetingDetails
        tabs={companyTabs(companyId)}
        module="company"
        moduleId={companyId}
      />

    </CompanyLeftPanel>
  );
}