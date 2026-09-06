import React from "react";
import { useParams } from "react-router-dom";

import CompanyLeftPanel from "../../CompanyLeftPanel";
// import NoteDetails from "../../../../Leads/components/Tabs/Note/NoteDetails";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyNote() {
  const { companyId } = useParams();

  console.log("Company ID in CompanyNote:", companyId);

  return (
    <CompanyLeftPanel>
      <NoteDetails
        tabs={getCompanyTabs(companyId)}
        module="company"
        moduleId={companyId}
      />
    </CompanyLeftPanel>
  );
}