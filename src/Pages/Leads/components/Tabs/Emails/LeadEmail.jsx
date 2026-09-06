import React from "react";
import { useParams } from "react-router-dom";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import EmailDetails from "./EmailDetails";
import { getLeadTabs } from "../LeadTabs";

export default function LeadEmail() {
  const { leadId } = useParams();

  return (
    <LeadsLeftPanel leadId={leadId}>
      <EmailDetails
        tabs={getLeadTabs(leadId)}
        relatedModule="lead"
        objectId={leadId}
      />
    </LeadsLeftPanel>
  );
}