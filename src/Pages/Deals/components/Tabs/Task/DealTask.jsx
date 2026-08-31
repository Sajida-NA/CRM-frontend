// import React from 'react'
// import DealLeftPanel from '../../DealLeftPanel'
// import TaskDetails from '../../../../Leads/components/Tabs/Task/TaskDetails'
// import { dealTabs } from '../DealTabs'

// export default function DealTask() {
//   return (
//     <div>
//         <DealLeftPanel><TaskDetails tabs={dealTabs}/></DealLeftPanel>
//     </div>
//   )
// }


import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import TaskDetails from "../../../../Leads/components/Tabs/Task/TaskDetails";
import { getDealTabs } from "../DealTabs";

export default function DealTask() {
  const { dealId } = useParams();

  return (
    <DealLeftPanel>
      <TaskDetails
        tabs={getDealTabs(dealId)}
      />
    </DealLeftPanel>
  );
}