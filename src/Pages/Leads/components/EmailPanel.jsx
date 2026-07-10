import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

import EmailCard from "./EmailCard";

function EmailPanel({ emails }) {
  const [value, setValue] = useState(2);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        minHeight: 650,
      }}
    >
      {/* Search + Convert */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search activities"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#FAFAFA",
              borderRadius: 2,
              height: 50,
            },
          }}
        />

       <Button
  variant="contained"
  sx={{
    minWidth: 130,
    height: 50,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 600,
  }}
>
          Convert
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs
      
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        sx={{
          mb: 3,

          "& .MuiTab-root": {
            textTransform: "none",
            minHeight: 45,
            fontWeight: 500,
          },

          "& .Mui-selected": {
            fontWeight: 700,
          },

          "& .MuiTabs-indicator": {
            height: 3,
          },
        }}
      >
        <Tab label="Activity" />
        <Tab label="Notes" />
        <Tab label="Emails" />
        <Tab label="Calls" />
        <Tab label="Tasks" />
        <Tab label="Meetings" />
      </Tabs>

      {/* Email Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Emails
        </Typography>

        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          Create Email
        </Button>
      </Box>

      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        June 2025
      </Typography>

      {emails.map((email) => (
        <EmailCard
          key={email.id}
          email={email}
        />
      ))}
    </Paper>
  );
}

export default EmailPanel;