
import {
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";
import CustomSnackbar from "../../../Components/common/CustomSnackbar";

import { publicApi } from "../../../services/api";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.newPassword.length < 8) {
      setSnackbar({
        open: true,
        message: "Password must be at least 8 characters long.",
        severity: "error",
      });
      return;
    }

    // Confirm password validation
    if (form.newPassword !== form.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await  publicApi.post("/accounts/reset-password/", {
        uid: uid,
        token: token,
        new_password: form.newPassword,
        confirm_password: form.confirmPassword,
      });

      console.log("Password reset successful:", response.data);

      setSnackbar({
        open: true,
        message: response.data.message || "Password reset successful!",
        severity: "success",
      });

      // Navigate to login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(
        "Password reset failed:",
        JSON.stringify(error.response?.data, null, 2),
      );

      const errorData = error.response?.data;

      setSnackbar({
        open: true,
        message:
          errorData?.detail ||
          errorData?.message ||
          errorData?.non_field_errors?.[0] ||
          "Password reset failed.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
      <AuthLayout
        title="Reset Password"
        footer={
          <>
            Remember your password?{" "}
            <Link href="/" underline="hover">
              Log in
            </Link>
          </>
        }
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* New Password */}
          <Typography variant="body2" fontWeight={500} mb={1}>
            New Password
          </Typography>

          <InputField
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={form.newPassword}
            sx={{ mb: 2 }}
            onChange={handleChange}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Confirm Password */}
          <Typography variant="body2" fontWeight={500} mb={1} mt={3}>
            Confirm Password
          </Typography>

          <InputField
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Reset Password Button */}
          <CommonButton type="submit" fullWidth sx={{ mt: 4 }}>
            Reset Password
          </CommonButton>
        </Box>
      </AuthLayout>
    </>
  );
}
