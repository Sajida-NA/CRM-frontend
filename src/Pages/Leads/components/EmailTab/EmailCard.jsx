import { Paper, Box, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function EmailCard({ email }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        overflow: "hidden",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 2,
          borderColor: "#1976d2",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box display="flex" gap={1.5}>
          <EmailOutlinedIcon
            color="primary"
            fontSize="small"
            sx={{ mt: 0.3 }}
          />

          <Box>
            <Typography
              fontWeight={700}
              fontSize={15}
            >
              {email.subject}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.3 }}
            >
              {email.body ? "To Jane Cooper" : `by ${email.sender}`}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {email.date}
        </Typography>
      </Box>

      {/* Email Body */}
      {email.body && (
        <Box
          sx={{
            px: 3,
            pt: 1,
            pb: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-line",
              color: "#6B7280",
              lineHeight: 1.9,
              fontSize: 14,
            }}
          >
            {email.body}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default EmailCard;