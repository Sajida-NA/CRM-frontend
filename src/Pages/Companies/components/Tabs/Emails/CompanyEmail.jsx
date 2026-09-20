import React from "react";
import { useParams } from "react-router-dom";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyEmail() {
  const { companyId } = useParams();

  console.log("Company ID in CompanyEmail:", companyId);

  return (
    <EmailDetails
      tabs={getCompanyTabs(companyId)}
      relatedModule="company"
      companyId={companyId}
    />
  );
}
