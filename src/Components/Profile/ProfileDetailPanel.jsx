import { Box, Typography } from "@mui/material";

const ProfileDetailsPanel = ({ details }) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Lead Details
      </Typography>

      {Object.entries(details).map(([label, value], idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              mb: 0.5,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProfileDetailsPanel;

