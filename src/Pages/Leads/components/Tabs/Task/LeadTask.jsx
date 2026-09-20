import React from "react";
import { useParams } from "react-router-dom";

import TaskDetails from "./TaskDetails";

import { getLeadTabs } from "../LeadTabs";

export default function LeadTask() {
  const { leadId } = useParams();

  console.log("LeadTask leadId:", leadId);

  return (
    <div>
      <TaskDetails tabs={getLeadTabs(leadId)} module="lead" moduleId={leadId} />
    </div>
  );
}
