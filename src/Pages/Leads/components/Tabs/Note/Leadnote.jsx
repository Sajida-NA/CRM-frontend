
import React from "react";
import { useParams } from "react-router-dom";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getLeadTabs } from "../LeadTabs";

export default function Leadnote() {
  const { leadId } = useParams();

  return (
    <div>
      <LeadsLeftPanel leadId={leadId}>
        <NoteDetails
          tabs={getLeadTabs(leadId)}
          module="lead"
          moduleId={leadId}
        />
      </LeadsLeftPanel>
    </div>
  );
}