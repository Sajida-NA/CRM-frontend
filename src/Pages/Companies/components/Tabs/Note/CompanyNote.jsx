import React from "react";
import { useParams } from "react-router-dom";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyNote() {
  const { companyId } = useParams();

  console.log("Company ID in CompanyNote:", companyId);

  return (
    <NoteDetails
      tabs={getCompanyTabs(companyId)}
      module="company"
      moduleId={companyId}
    />
  );
}

