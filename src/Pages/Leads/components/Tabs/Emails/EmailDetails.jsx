import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EmailCard from "./EmailCard";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import NewEmailDialog from "./NewEmailDialog";

export default function EmailDetails() {
  const [activeTab, setActiveTab] = useState("Emails");
  const [openCreateEmail, setOpenCreateEmail] = useState(false);

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx:-2
      }}
    >
      {/* Activity Tabs */}
      <Box >
        <CommonActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Leads"
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
        <Typography variant="h6">Emails</Typography>

        <CommonButton
          variant="contained"
          onClick={() => setOpenCreateEmail(true)}
        >
          Create Email
        </CommonButton>
      </Box>

      {/* Create Email Modal */}

      <NewEmailDialog
        open={openCreateEmail}
        onClose={() => setOpenCreateEmail(false)}
      />

      <Typography variant="h6">June 2025</Typography>

      <EmailCard />
  
    </Box>
  );
}
