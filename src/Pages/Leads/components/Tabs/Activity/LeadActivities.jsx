import React from "react";
import { useParams } from "react-router-dom";

import ActivityDetails from "./ActivityDetails";

export default function LeadActivities() {
  const { leadId } = useParams();

  return <ActivityDetails leadId={leadId} />;
}
