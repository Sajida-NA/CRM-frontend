import React, { useState } from "react";
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CommonButton from "../../../Components/common/CommonButton";
import CreateLogCall from "./Tabs/Calls/CreateLogCall";

export default function LeadsLeftPanel({ children }) {

  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);


  const leadDetails = [
    {
      label: "Email",
      value: "janecooper@gmail.com",
    },
    {
      label: "First Name",
      value: "Jane",
    },
    {
      label: "Last Name",
      value: "Cooper",
    },
    {
      label: "Phone Number",
      value: "078 5432 8505",
    },
    {
      label: "Lead Status",
      value: "New",
    },
    {
      label: "Job Title",
      value: "Salesperson",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
  ];


  const leftPanelData = {
    profile: {
      name: "Jane Cooper",
      subTitle: "Salesperson",
      email: "",
    },

     showProfileEdit: true, 

      showProfileImage: true,

    sectionTitle: "About this lead",

    leadDetails,

    summaryTitle: "AI Lead Summary",

    summaryText:
      "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.",
  };


  return (
    <>
      <CommonEntityHeader
        title="Leads"
        leftPanelData={leftPanelData}
        action={<CommonButton>Convert</CommonButton>}

        // Call button click from left panel
        onCallClick={() => setOpenCreateLogCall(true)}
      >
        {children}
      </CommonEntityHeader>


      {/* Log Call Drawer */}
      <CreateLogCall
        open={openCreateLogCall}
        onClose={() => setOpenCreateLogCall(false)}
      />

    </>
  );
}