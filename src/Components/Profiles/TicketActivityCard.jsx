import { Box, Typography } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

function TicketActivityCard({ activity }) {
  let icon = null;

  if (activity.type === "Ticket Activity") {
    icon = (
      <ConfirmationNumberOutlinedIcon
        fontSize="small"
        color="primary"
      />
    );
  } else if (activity.type === "Call") {
    icon = (
      <CallOutlinedIcon
        fontSize="small"
        color="success"
      />
    );
  } else if (activity.type === "Meeting") {
    icon = (
      <EventOutlinedIcon
        fontSize="small"
        color="warning"
      />
    );
  }

  return (
    <Box
      sx={{
        py: 1.5,
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={0.75}
        >
          {icon}

          <Typography
            variant="body2"
            fontWeight={600}
          >
            {activity.type}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 11 }}
        >
          {activity.time}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 0.75,
          ml: 4,
          lineHeight: 1.5,
        }}
      >
        {activity.description}
      </Typography>
    </Box>
  );
}

export default TicketActivityCard;