// import React from "react";
// import DealLeftPanel from "../../DealLeftPanel";
// import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
// import { dealTabs } from "../DealTabs";

// export default function DealMeeting() {
//   return (
//     <>
//       <DealLeftPanel><MeetingDetails tabs={dealTabs} /></DealLeftPanel>
      
//     </>
//   );
// }

import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import MeetingDetails from "../../../../Tickets/components/Tabs/Meeting/MeetingDetails";
import { getDealTabs } from "../DealTabs";

export default function DealMeeting() {
  const { dealId } = useParams();

  return (
    <DealLeftPanel>
      <MeetingDetails
        tabs={getDealTabs(dealId)}
      />
    </DealLeftPanel>
  );
}