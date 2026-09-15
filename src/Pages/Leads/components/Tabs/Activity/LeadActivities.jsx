import React from "react";
import { useParams } from "react-router-dom";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import ActivityDetails from "./ActivityDetails";

export default function LeadActivities() {
  const { leadId } = useParams();

  return (
    <LeadsLeftPanel leadId={leadId}>
      <ActivityDetails leadId={leadId} />
    </LeadsLeftPanel>
  );
}

