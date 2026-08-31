// import React from 'react'
// import DealLeftPanel from '../../DealLeftPanel'
// import NoteDetails from '../../../../Tickets/components/Tabs/Note/NoteDetails'
// import { dealTabs } from '../DealTabs'

// export default function DealNote() {
//   return (
//     <div>
//         <DealLeftPanel> <NoteDetails  tabs={dealTabs}/></DealLeftPanel>
//     </div>
//   )
// }


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
      />
    </DealLeftPanel>
  );
}