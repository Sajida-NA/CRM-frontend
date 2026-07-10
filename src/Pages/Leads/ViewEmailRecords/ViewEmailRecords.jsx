import { Box } from "@mui/material";

import lead from "../data/leadData";
import emails from "../data/emailData";

import LeadInfo from "../components/EmailTab/LeadInfo";
import EmailPanel from "../components/EmailTab/EmailPanel";
import AISummary from "../../Companies/components/AISummary";
import MainLayout from "../../../layout/MainLayout";

function ViewEmailRecords() {
  return (
    <MainLayout>
    <Box
      sx={{
        bgcolor: "#F5F7FB",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "320px 1fr",
            lg: "300px 1fr 320px",
          },
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Left Panel */}
        <LeadInfo lead={lead} />

        {/* Center Panel */}
        <EmailPanel emails={emails} />

        {/* Right Panel */}
        <AISummary />
      </Box>
    </Box>
    </MainLayout>
  );
}

export default ViewEmailRecords;