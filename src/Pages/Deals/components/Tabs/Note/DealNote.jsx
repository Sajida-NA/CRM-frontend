import React from "react";
import { useParams } from "react-router-dom";

import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getDealTabs } from "../DealTabs";

export default function DealNote() {
  const { dealId } = useParams();

  return (
    <NoteDetails tabs={getDealTabs(dealId)} module="deal" moduleId={dealId} />
  );
}
