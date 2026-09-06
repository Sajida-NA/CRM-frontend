import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getDealTabs } from "../DealTabs";

export default function DealMeeting() {
  const { dealId } = useParams();

  console.log("DEAL ID:", dealId);

  return (
    <DealLeftPanel>
      <MeetingDetails
        tabs={getDealTabs(dealId)}
        module="deal"
        moduleId={dealId}
      />
    </DealLeftPanel>
  );
}

