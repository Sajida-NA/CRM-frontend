import { Paper, Box, Typography } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

function ActivityCard({ activity }) {
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
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 2,
        borderRadius: 2,
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 3,
          borderColor: "#1976d2",
        },
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
  gap={1}
>
  {icon}

  <Typography fontWeight="bold">
    {activity.type}
  </Typography>
</Box>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {activity.time}
        </Typography>
      </Box>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {activity.description}
      </Typography>
    </Paper>
  );
}

export default ActivityCard;