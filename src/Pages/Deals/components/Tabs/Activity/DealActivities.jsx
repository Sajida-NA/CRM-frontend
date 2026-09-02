// import React from 'react'
// import DealLeftPanel from "../../DealLeftPanel"
// import DealActivityDetails from './DealActivityDetails'

// export default function DealActivities() {
//   return (
//    <DealLeftPanel><DealActivityDetails/></DealLeftPanel>
//   )
// }
import React from "react";
import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";
import DealActivityDetails from "./DealActivityDetails";

export default function DealActivities() {
  const { dealId } = useParams();

  return (
    <DealLeftPanel>
      <DealActivityDetails dealId={dealId} />
    </DealLeftPanel>
  );
}