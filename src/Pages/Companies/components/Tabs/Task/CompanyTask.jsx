import React from "react";
import { useParams } from "react-router-dom";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { getCompanyTabs } from "../CompanyTabs";

export default function CompanyTask() {
  const { id } = useParams();

  return (
    <CompanyLeftPanel>
      <TaskDetails
        tabs={getCompanyTabs(id)}
        module="company"
        moduleId={id}
      />
    </CompanyLeftPanel>
  );
}