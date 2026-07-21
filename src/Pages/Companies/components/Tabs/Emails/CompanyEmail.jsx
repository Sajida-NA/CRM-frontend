import React from "react";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import { companyTabs } from "../CompanyTabs";

export default function CompanyEmail() {
  return (
    <>
      <CompanyLeftPanel>
         <EmailDetails  tabs={companyTabs}/>
         </CompanyLeftPanel>
    </>
  );
}