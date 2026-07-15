import React, { useState } from "react";
import {
  Drawer,
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";
import Select from "@mui/material/Select";

export default function CreateTicketDrawer({ open, onClose }) {
  const [formData, setFormData] = useState({
    ticketName: "",
    description: "",
    companyOwner: "",
    ticketStatus: "",
    source: "",
    priority: "",
    ticketOwner: "",
    associatedDeal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Call Here

    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 500,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* Drawer Header */}
        <DrawerHeader title="Create Ticket" onClose={onClose} />

        {/* Form */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          <CommonInput
            label="Ticket Name"
            name="ticketName"
            value={formData.ticketName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,

                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                }}
              >
                Description<span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                placeholder="Enter description"
                fullWidth
                multiline
                rows={4}
                //   value={formData.description}
                //         onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Ticket Status <span style={{ color: "red" }}>*</span>
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="ticket-status-label">Choose</InputLabel>

                  <Select
                    labelId="ticket-status-label"
                    id="ticket-status"
                    name="ticketStatus"
                    value={formData.ticketStatus}
                    label="Choose"
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="Waiting on Contact">
                      Waiting on Contact
                    </MenuItem>
                    <MenuItem value="Waiting on Us">Waiting on Us</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Source <span style={{ color: "red" }}>*</span>
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="source">Choose</InputLabel>

                  <Select
                    labelId="source"
                    id="source"
                    name="source"
                    value={formData.source}
                    label="Choose"
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="Chat">Chat </MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="Phone">Phone</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container>
              <Grid size={12}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Priority <span style={{ color: "red" }}>*</span>
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="priority">Choose</InputLabel>

                  <Select
                    labelId="priority"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    label="Choose"
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container>
              <Grid size={12}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Ticket Owner <span style={{ color: "red" }}>*</span>
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="ticketOwner">Choose</InputLabel>

                  <Select
                    labelId="ticketOwner"
                    id="ticketOwner"
                    name="ticketOwner"
                    value={formData.ticketOwner}
                    label="Choose"
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="Jane Cooper">Jane Cooper</MenuItem>
                    <MenuItem value="Wade Warren">Wade Warren</MenuItem>
                    <MenuItem value="Brooklyn Simmons">
                      Brooklyn Simmons
                    </MenuItem>
                    <MenuItem value="Leslie Alexander">
                      Leslie Alexander
                    </MenuItem>
                    <MenuItem value="Jenny Wilson">Jenny Wilson</MenuItem>
                    <MenuItem value="Guy Hawkins">Guy Hawkins</MenuItem>
                    <MenuItem value="Robert Fox">Robert Fox</MenuItem>
                    <MenuItem value="Cameron Williamson">
                      Cameron Williamson
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container>
              <Grid size={12}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Associated Deal <span style={{ color: "red" }}>*</span>
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="associatedDeal">Choose</InputLabel>

                  <Select
                    labelId="associatedDeal"
                    id="associatedDeal"
                    name="associatedDeal"
                    value={formData.associatedDeal}
                    label="Choose"
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value="Payment Failure Issue">
                      Payment Failure Issue
                    </MenuItem>
                    <MenuItem value="Product Inquiry">Product Inquiry</MenuItem>
                    <MenuItem value="Subscription Upgrade">
                      Subscription Upgrade
                    </MenuItem>
                    <MenuItem value="Pricing Clarification">
                      Pricing Clarification
                    </MenuItem>
                    <MenuItem value="Login Not Working">
                      Login Not Working
                    </MenuItem>
                    <MenuItem value="Feature Request: Reports">
                      Feature Request: Reports
                    </MenuItem>
                    <MenuItem value="SLA Violation Complaint">
                      SLA Violation Complaint
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Drawer Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <CommonButton variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </CommonButton>

          <CommonButton type="submit" fullWidth>
            Save
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
