import React from "react";
import { useParams } from "react-router-dom";

import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { getDealTabs } from "../DealTabs";

export default function DealTask() {
  const { dealId } = useParams();

  return (
    <TaskDetails tabs={getDealTabs(dealId)} module="deal" moduleId={dealId} />
  );
}
