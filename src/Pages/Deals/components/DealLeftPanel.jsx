import React, { useState } from "react";
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";

export default function DealLeftPanel({ children }) {
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  const dealDetails = [
    {
      label: "Deal Owner",
      value: "Jane Cooper",
    },
    {
      label: "Priority",
      value: "High",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
    {
      label: "Lead Name",
      value: "Lead Name",
    },
  ];

  const leftPanelData = {
    profile: {
      name: "Website Revamp - Atlas Corp",
      subTitle: "Amount : $12,500",
      email: "Stage : Appointment Scheduled",
    },
    sectionTitle: "About this Deal",
    leadDetails: dealDetails,
    summaryTitle: "AI Deal Summary",
    summaryText:
      'The deal "Enterprise Software Deal" is currently in the Negotiation stage with an expected value of $25,000. No recent meeting, call, or note transcripts are available.',
  };

  return (
    <>
      <CommonEntityHeader
        title="Deals"
        leftPanelData={leftPanelData}
        onCallClick={() => setOpenCreateLogCall(true)}
      >
        {children}
      </CommonEntityHeader>

      <CreateLogCall
        open={openCreateLogCall}
        onClose={() => setOpenCreateLogCall(false)}
      />
    </>
  );
}
