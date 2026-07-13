import { Box, Paper } from "@mui/material";

import TicketInfo from "../../../Components/Profiles/TicketInfo";
import TicketActivityPanel from "../../../Components/Profiles/TicketActivityPanel";
import AITicketSummary from "../../../Components/Profiles/AITicketSummary";

import ticketActivities from "./data/ticketActivityData";
import ticketData from "./data/ticketData";

import MainLayout from "../../../layout/MainLayout";

function TicketProfile() {
  return (
    <MainLayout>
      <Box
        sx={{
          p: 2,
          bgcolor: "#F5F7FB",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #E5E7EB",
            height: "calc(100vh - 48px)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "260px 1fr 260px",
              },
              gap: 0,
              alignItems: "stretch",
            }}
          >
            <TicketInfo ticket={ticketData} />

            <TicketActivityPanel
              activities={ticketActivities}
            />

            <AITicketSummary />
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default TicketProfile;