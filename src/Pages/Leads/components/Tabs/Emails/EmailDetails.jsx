import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EmailCard from "./EmailCard";
import CommonButton from "../../../../../Components/common/CommonButton";
import EmailRecord from "./EmailCard";
import emailData from "./emailData";
// import { leadTabs } from "../LeadTabs";





export default function EmailDetails({tabs}) {
   const [activeTab, setActiveTab] = useState();
  // const [activeTab, setActiveTab] = useState("Emails");
  const [openEmail, setOpenEmail] = useState(false);

  const [openCards, setOpenCards] = useState({
    0: true,
  });

  const toggleCard = (index) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
       
      }}
    >
      {/* Activity Tabs */}
      <Box sx={{ mt: 10, mx: -2 }}>
        {/* <CommonActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Ticket"
        /> */}

         <CommonActivityTabs
    tabs={tabs}
    activeTab="Emails"
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