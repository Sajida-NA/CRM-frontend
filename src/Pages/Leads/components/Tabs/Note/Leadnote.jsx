import React from "react";
import { useParams } from "react-router-dom";

import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getLeadTabs } from "../LeadTabs";

export default function Leadnote() {
  const { leadId } = useParams();

  return (
    <div>
      <NoteDetails tabs={getLeadTabs(leadId)} module="lead" moduleId={leadId} />
    </div>
  );
}
