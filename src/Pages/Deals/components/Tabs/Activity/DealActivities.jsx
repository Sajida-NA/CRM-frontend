import React from "react";
import { useParams } from "react-router-dom";
import DealActivityDetails from "./DealActivityDetails";

export default function DealActivities() {
  const { dealId } = useParams();

  return <DealActivityDetails dealId={dealId} />;
}
