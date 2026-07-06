import { Box, Typography } from "@mui/material";

const ActivityCard = ({ title, time, description }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid #E5E7EB",
        mb: 1.5,
        bgcolor: "white",
      }}
    >
      {/* Title */}
      <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
        {title}
      </Typography>

      {/* Time */}
      <Typography sx={{ fontSize: 13, color: "#6B7280", mt: 0.5 }}>
        {time}
      </Typography>

      {/* Description */}
      {description && (
        <Typography sx={{ mt: 1.2, fontSize: 14, lineHeight: 1.5 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ActivityCard;
