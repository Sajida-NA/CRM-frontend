import React from "react";
import { useParams } from "react-router-dom";

import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getDealTabs } from "../DealTabs";

export default function DealMeeting() {
  const { dealId } = useParams();

  console.log("DEAL ID:", dealId);

  return (
    <MeetingDetails
      tabs={getDealTabs(dealId)}
      module="deal"
      moduleId={dealId}
    />
  );
}
