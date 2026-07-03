import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: authService.login(form)
    console.log("Login:", form);
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
        <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 1 }}>
          Log in
        </Typography>

        <Typography sx={{ color: "#666", mb: 3 }}>
          Welcome back! Please enter your details.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            size="small"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 1 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link href="/forgot-password" underline="hover" sx={{ fontSize: 14 }}>
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              height: 45,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Log in
          </Button>
        </form>

        {/* Signup Link */}
        <Typography sx={{ textAlign: "center", mt: 3, fontSize: 14 }}>
          Don’t have an account?{" "}
          <Link href="/register" underline="hover" sx={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
