import React from "react";
import { useParams } from "react-router-dom";

import EmailDetails from "../../../../Leads/components/Tabs/Emails/EmailDetails";
import { getDealTabs } from "../DealTabs";

export default function DealEmail() {
  const { dealId } = useParams();

  console.log("DealEmail dealId:", dealId);

  return (
    <EmailDetails
      tabs={getDealTabs(dealId)}
      relatedModule="deal"
      objectId={dealId}
    />
  );
}
