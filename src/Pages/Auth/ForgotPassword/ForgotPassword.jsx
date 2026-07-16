import { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      footer={
        <>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="primary"
            fontWeight={500}
          >
            Back to Login
          </Link>
        </>
      }
    >
      <Typography variant="body2" color="text.secondary" sx={{ m: 3 }}>
        Enter your email address and we'll send you a link to reset your
        password.
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
          <Typography color="success.main" variant="body2" sx={{ mt: 2 }}>
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
          {submitted ? "Link Sent" : loading ? "Sending..." : "Send Reset Link"}
        </CommonButton>
      </Box>
    </AuthLayout>
  );
}
