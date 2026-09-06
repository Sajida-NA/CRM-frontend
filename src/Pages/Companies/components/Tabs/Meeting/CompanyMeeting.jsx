

import React from "react";
import { useParams } from "react-router-dom";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyMeeting() {
  const { companyId } = useParams();

  console.log(
    "Company ID in CompanyMeeting:",
    companyId
  );

  return (
    <CompanyLeftPanel>
      <MeetingDetails
        tabs={getCompanyTabs(companyId)}
        module="company"
        moduleId={companyId}
      />
    </CompanyLeftPanel>
  );
}

