import React from "react";
import { useParams } from "react-router-dom";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getLeadTabs } from "../LeadTabs";

export default function LeadMeeting() {
  const { leadId } = useParams();

  return (
    <div>
      <LeadsLeftPanel leadId={leadId}>
        <MeetingDetails tabs={getLeadTabs(leadId)} />
      </LeadsLeftPanel>
    </div>
  );
}