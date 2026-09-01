
import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getDealTabs } from "../DealTabs";

export default function DealNote() {
  const { dealId } = useParams();

  return (
    <DealLeftPanel>
      <NoteDetails
        tabs={getDealTabs(dealId)}
        module="deal"
        moduleId={dealId}
      />
    </DealLeftPanel>
  );
}