import { Box } from "@mui/material";
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
        p: 3,
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "330px 1fr 280px",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
       <TicketInfo ticket={ticketData} />

<TicketActivityPanel activities={ticketActivities} />

<AITicketSummary />
      </Box>
    </Box>
    </MainLayout>
  );
}

export default TicketProfile;