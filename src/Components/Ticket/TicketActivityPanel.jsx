import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";
import TicketActivityCard from "./TicketActivityCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function TicketActivityPanel({ activities = [] }) {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        minHeight: 600,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
      >
        Activity
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Search activities..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#FAFAFA",
          },
        }}
      />

      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
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

      <Box mt={3}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
        >
          Upcoming
        </Typography>

        {activities.map((activity) => (
          <TicketActivityCard
            key={activity.id}
            activity={activity}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default TicketActivityPanel;