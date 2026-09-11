
import { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";
import CustomSnackbar from "../../../Components/common/CustomSnackbar";

import api from "../../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/accounts/forgot-password/", {
        email: email,
      });
      console.log("Password reset request successful:", response.data);
      setSubmitted(true);
      setSnackbar({
        open: true,
        message: "Reset link has been sent to your email.",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Forgot password failed:",
        JSON.stringify(error.response?.data, null, 2),
      );
      setSnackbar({
        open: true,
        message:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Unable to send reset link. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <AuthLayout
      title="Forgot Password"
      footer={
        <>
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
          >
            Back to Login
          </Link>
        </>
      }
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Enter your email address and we'll send you a link to reset your password.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
          Email
        </Typography>

        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        {submitted && (
          <Typography
            color="success.main"
            variant="body2"
            sx={{ mt: 2 }}
          >
            Reset link has been sent to your email.
          </Typography>
        )}

        <CommonButton
          type="submit"
          fullWidth
          disabled={loading || submitted}
          sx={{
            mt: 4,
            height: 46,
          }}
        >
          {loading
            ? "Sending..."
            : submitted
            ? "Link Sent"
            : "Send Reset Link"}
        </CommonButton>
      </Box>
    </AuthLayout>
  );
}
