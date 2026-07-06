import { Box, Typography } from "@mui/material";

const ProfileAISidebar = ({ summary, attachments }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* AI SUMMARY CARD */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            mb: 1.5,
          }}
        >
          AI Lead Summary
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#6B7280",
            lineHeight: 1.6,
          }}
        >
          {summary}
        </Typography>
      </Box>

      {/* ATTACHMENTS CARD */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            mb: 1.5,
          }}
        >
          Attachments
        </Typography>

        {attachments.map((file, idx) => (
          <Box
            key={idx}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{file.name}</Typography>
            <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
              {file.date}
            </Typography>
          </Box>
        ))}

        {attachments.length === 0 && (
          <Typography sx={{ color: "gray" }}>No attachments found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfileAISidebar;


