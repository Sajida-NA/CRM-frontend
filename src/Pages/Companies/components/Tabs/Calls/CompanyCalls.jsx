import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import calls from "../../../../Leads/components/Tabs/Calls/callData";
import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

export default function CompanyCalls() {
  const [activeTab, setActiveTab] = useState("Calls");
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);
  return (
    <div>
      <CompanyLeftPanel>
      <Box
        sx={{
          p: 3,
          mx:-2
        }}
      >
        {/* ACTIVITY TABS */}

        <Box>
          <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} />
        </Box>

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
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
      </CompanyLeftPanel>
    </div>
  );
}
