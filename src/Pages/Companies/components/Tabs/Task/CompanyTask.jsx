import React from "react";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { companyTabs } from "../CompanyTabs";

export default function CompanyTask() {
  return (
    <div>
      <CompanyLeftPanel>
        <TaskDetails tabs={companyTabs} />
      </CompanyLeftPanel>
    </div>
  );
}
