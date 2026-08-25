import {
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";

import api from "../../../services/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/accounts/login/", {
        email: form.email,
        password: form.password,
      });

      console.log("Login successful:", response.data);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error(
        "Login failed:",
        JSON.stringify(error.response?.data, null, 2),
      );
    }
  };

  return (
    <AuthLayout
      title="Log in"
      footer={
        <>
          Don't have an account?{" "}
          <Link href="/register" underline="none">
            Sign up
          </Link>
        </>
      }
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography fontWeight={500} mb={1}>
          Email
        </Typography>

        <InputField
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            Password
          </Typography>

          <Link
            href="/forgot-password"
            underline="none"
            color="primary"
            variant="body1"
          >
            Forgot password?
          </Link>
        </Box>

        <InputField
          name="password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <CommonButton
          type="submit"
          fullWidth
          sx={{
            mt: 4,
          }}
        >
          Log in
        </CommonButton>
      </Box>
    </AuthLayout>
  );
}
