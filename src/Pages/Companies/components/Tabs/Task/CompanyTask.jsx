import React from "react";
import { useParams } from "react-router-dom";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyTask() {
  const { companyId } = useParams();

  return (
   <CompanyLeftPanel>
      <TaskDetails
        tabs={getCompanyTabs(companyId)}
        relatedModule="company"
        module="company"
        moduleId={companyId}
        companyId={companyId}
      />
    </CompanyLeftPanel>
  );
}