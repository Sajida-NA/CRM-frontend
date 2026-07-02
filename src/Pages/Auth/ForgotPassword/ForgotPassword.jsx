import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your authService.forgotPassword(email)
    setSubmitted(true);
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
              If an account exists with this email, a reset link has been sent.
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2, textTransform: "none", mb: 2 }}
          >
            Send reset link
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Link href="/login" underline="hover" sx={{ fontSize: 14 }}>
            Back to login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
