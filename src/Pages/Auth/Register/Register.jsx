import React, { useState } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { flex } from "@mui/system";
import Grid from "@mui/system/Grid";
import { InputLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Register() {
  const [industry, setIndustry] = useState();

  const [role, setRole] = useState();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Box
          sx={{
            width: 700,
            border: "1px solid #ccc",
            boxShadow: 10,
            borderRadius: "16px",
            p: 3,
            marginBottom: 2,
          }}
        >
          <Typography
            sx={{
              color: "#212121",
              fontWeight: 600,
              fontSize: "19px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            Register
          </Typography>

          <Grid container rowSpacing={1} columnSpacing={2}>
            <Grid size={6}>
              <Typography>First Name</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your first name"
                size="small"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Last Name</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your last name"
                size="small"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Email</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                type="email"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Phone Number</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your number"
                size="small"
                type="number"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Password</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your password"
                size="small"
                type="password"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Confirm Password</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your confirm password"
                size="small"
                type="password"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Company Name</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your company name"
                size="small"
                type="text"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Industry Type</Typography>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  size="small"
                  sx={{ marginBottom: 1 }}
                >
                  <MenuItem value={10}></MenuItem>
                  <MenuItem value={20}></MenuItem>
                  <MenuItem value={30}></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <Typography>Country or Region</Typography>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter your country or Region"
                size="small"
                type="text"
                sx={{ marginBottom: 1 }}
              ></TextField>
            </Grid>

            <Grid size={6}>
              <Typography>Role</Typography>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  size="small"
                  sx={{ marginBottom: 1 }}
                >
                  <MenuItem value={10}></MenuItem>
                  <MenuItem value={20}></MenuItem>
                  <MenuItem value={30}></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#52289e",
                  borderRadius: 1,
                  marginBottom: 1,
                }}
              >
                Register
              </Button>
            </Grid>

            {/* ---------------- */}
          </Grid>
        </Box>
        <Typography sx={{ textAlign: "center", marginBottom: 1 }}>
          Already have an account?{" "}
          <a style={{ textDecoration: "none", color: "#52289e" }}>Login</a>
        </Typography>
      </Box>
    </div>
  );
}
