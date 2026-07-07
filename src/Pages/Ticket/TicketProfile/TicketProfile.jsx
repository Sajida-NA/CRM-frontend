import { Box } from "@mui/material";
import TicketInfo from "../../../Components/Ticket/TicketInfo";
import TicketActivityPanel from "../../../Components/Ticket/TicketActivityPanel";
import AITicketSummary from "../../../Components/Ticket/AITicketSummary";
import ticketActivities from "../../../data/ticketActivityData";
import ticketData from "../../../data/ticketData";
function TicketProfile() {
  return (
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
  );
}

export default TicketProfile;