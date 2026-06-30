import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Link,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 600,
            fontSize: "26px"
          }}
        >
          Log in
        </Typography>

        {/* Email */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 0.5 }}>
            Email
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: 2
              }
            }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 0.5 }}>
            Password
          </Typography>

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: 2
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Forgot Password */}
        <Box textAlign="right" mt={1} mb={3}>
          <Link underline="hover" sx={{ fontSize: 14, fontWeight: 500 }}>
            Forgot password?
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#6f42c1",
            height: 47,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 15,
            "&:hover": { backgroundColor: "#5a32a3" }
          }}
        >
          Log in
        </Button>

        {/* Signup */}
        <Typography textAlign="center" mt={4} sx={{ fontSize: 14 }}>
          Don’t have an account?{" "}
          <Link underline="hover" sx={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}
