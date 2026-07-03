import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // TODO: API call (authService.forgotPassword)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f9",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1 }}>
          Forgot password
        </Typography>

        <Typography sx={{ color: "#666", mb: 3 }}>
          Enter your email and we’ll send you a link to reset your password.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          {submitted && (
            <Typography sx={{ color: "success.main", fontSize: 14, mb: 2 }}>
              Check your email inbox for reset link.
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || submitted}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              mb: 2,
            }}
          >
            {submitted ? "Link Sent" : loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Link component={RouterLink} to="/login" underline="hover" sx={{ fontSize: 14 }}>
            Back to login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}