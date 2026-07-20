import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CommonEntityHeader from "../../../../../Components/common/CommonEntityHeader";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import CreateLogCall from "./CreateLogCall";
import CallCard from "./CallCard";
import calls from "./callData";
import LeadsLeftPanel from "../../LeadsLeftPanel";
import { leadTabs } from "../LeadTabs";



export default function Leadcalls() {
   const [activeTab, setActiveTab] = useState();
  // const [activeTab, setActiveTab] = useState("Calls");
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  return (
    <div>
      <LeadsLeftPanel>

      <Box
        sx={{
          p: 3,
          mx:-2
        }}
      >
        {/* ACTIVITY TABS */}

        <Box
          sx={{
            mt: 10,
            mx: -2,
          }}
        >
          {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

            <CommonActivityTabs
    tabs={leadTabs}
    activeTab="Calls"
/>
        </Box>

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography variant="h6">Calls</Typography>

          <CommonButton
            variant="contained"
            onClick={() => setOpenCreateLogCall(true)}
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* Drawer */}

        <CreateLogCall
          open={openCreateLogCall}
          onClose={() => setOpenCreateLogCall(false)}
        />

        <Typography variant="h6">June 2025</Typography>

        {calls.map((call) => (
          <CallCard key={call.id} call={call} />
        ))}
      </Box>
      </LeadsLeftPanel>
    </div>
  );
}
