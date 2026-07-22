import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Radio,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import SelectField from "../../../../../Components/common/SelectField";
import CommonSelect from "../../../../../Components/common/CommonSelect";

export default function TaskCard({ task }) {
  const [open, setOpen] = useState(task.expanded);

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        mt: 1,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 650,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <IconButton size="small" onClick={() => setOpen(!open)} sx={{ p: 0 }}>
            {open ? (
              <KeyboardArrowRightIcon color="primary" fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon color="primary" fontSize="small" />
            )}
          </IconButton>

          <Typography>
            <strong>Task </strong>assigned to {task.name}
          </Typography>
        </Box>

        {/* Right */}

        <Box
          sx={{
            width: 250,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <CalendarTodayOutlinedIcon sx={{ color: "#ff4d4f", fontSize: 18 }} />

          <Typography sx={{ fontSize: 13, color: "#ff4d4f" }}>
            Overdue :
          </Typography>

          <Typography color="text.secondary">
            {task.date} at {task.time}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start",mx:1 }}>
        <Radio />

        {/* <Box  sx={{backgroundColor:"pink"}}> */}

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.8 }}>
          {task.description}
        </Typography>
        {/* </Box> */}
      </Box>

      {/* Info Box */}
      <Collapse in={open}>
        <Box
          sx={{
            bgcolor: "#eef3f8",
            borderRadius: 1,
            p: 2,
            mt: 2,
          }}
        >
          <Grid container spacing={13}>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Due Date & Time
              </Typography>

              <Typography fontWeight={500}>June 24, 2025 at 5:30PM</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Priority
              </Typography>

              <Typography fontWeight={500}>High</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Type
              </Typography>

              <Typography fontWeight={500}>To-Do</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Description */}

        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
            mt: 2,
          }}
        >
          He's interested in our new product line and wants our very best price.
          Please include a detailed breakdown of costs.
        </Typography>
      </Collapse>
    </Paper>
  );
}
