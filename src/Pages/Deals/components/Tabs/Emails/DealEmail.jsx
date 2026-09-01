// import React from "react";
// import DealLeftPanel from "../../DealLeftPanel";
// import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
// import { dealTabs } from "../DealTabs";

// export default function DealEmail() {
//   return (
//     <>
//       <DealLeftPanel> <EmailDetails tabs={dealTabs} /></DealLeftPanel>
     
//     </>
//   );
// }


import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { getDealTabs } from "../DealTabs";

export default function DealEmail() {
  const { dealId } = useParams();

  console.log("DealEmail dealId:", dealId);

  return (
    <DealLeftPanel>
      <EmailDetails
        tabs={getDealTabs(dealId)}
        relatedModule="deal"
        objectId={dealId}
      />
    </DealLeftPanel>
  );
}

