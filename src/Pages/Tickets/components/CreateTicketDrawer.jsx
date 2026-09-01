import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";

import api from "../../../services/api";

export default function CreateTicketDrawer({ open, onClose }) {
  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    ticketName: "",
    description: "",
    ticketStatus: "",
    source: "",
    priority: "",
    ticketOwner: "",
    associatedDeal: "",
  });

  // =====================================================
  // OPTIONS
  // =====================================================

  const [users, setUsers] = useState([]);
  const [deals, setDeals] = useState([]);

  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD USERS + DEALS
  // =====================================================

  useEffect(() => {
    if (!open) return;

    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        setError("");

        const [usersResponse, dealsResponse] = await Promise.all([
          api.get("/accounts/users/"),
          api.get("/deals/"),
        ]);

        console.log("USERS RESPONSE:", usersResponse.data);
        console.log("DEALS RESPONSE:", dealsResponse.data);

        /*
         * In case API returns:
         *
         * [
         *   {...}
         * ]
         *
         * or:
         *
         * {
         *   results: [...]
         * }
         */

        const usersData = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : usersResponse.data.results || [];

        const dealsData = Array.isArray(dealsResponse.data)
          ? dealsResponse.data
          : dealsResponse.data.results || [];

        setUsers(usersData);
        setDeals(dealsData);

      } catch (err) {
        console.error(
          "Error loading ticket options:",
          err.response?.data || err
        );

        setError(
          "Failed to load Ticket Owners or Deals."
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [open]);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      ticketName: "",
      description: "",
      ticketStatus: "",
      source: "",
      priority: "",
      ticketOwner: "",
      associatedDeal: "",
    });

    setError("");
  };

  // =====================================================
  // CREATE TICKET
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("========== SAVE CLICKED ==========");

    setError("");

    // -----------------------------------------------------
    // FRONTEND VALIDATION
    // -----------------------------------------------------

    if (
      !formData.ticketName ||
      !formData.description ||
      !formData.ticketStatus ||
      !formData.source ||
      !formData.priority ||
      !formData.ticketOwner ||
      !formData.associatedDeal
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // ---------------------------------------------------
      // PAYLOAD
      // ---------------------------------------------------

      const payload = {
        ticket_name: formData.ticketName,
        description: formData.description,
        ticket_status: formData.ticketStatus,
        source: formData.source,
        priority: formData.priority,

        // Convert dropdown IDs to numbers
        ticket_owner: Number(formData.ticketOwner),
        associated_deal: Number(formData.associatedDeal),
      };

      console.log("========== CREATE TICKET PAYLOAD ==========");
      console.log(payload);

      // ---------------------------------------------------
      // POST REQUEST
      // ---------------------------------------------------

      const response = await api.post(
        "/tickets/",
        payload
      );

      console.log("========== TICKET CREATED ==========");
      console.log(response.data);

      // ---------------------------------------------------
      // RESET
      // ---------------------------------------------------

      resetForm();

      // ---------------------------------------------------
      // CLOSE DRAWER
      // ---------------------------------------------------

      onClose();

    } catch (err) {
      console.error(
        "========== CREATE TICKET ERROR =========="
      );

      console.error(
        "STATUS:",
        err.response?.status
      );

      console.error(
        "DATA:",
        err.response?.data
      );

      console.error(
        "MESSAGE:",
        err.message
      );

      // ---------------------------------------------------
      // SHOW BACKEND ERROR
      // ---------------------------------------------------

      let errorMessage = "Failed to create ticket.";

      if (err.response?.data) {
        const backendError = err.response.data;

        if (typeof backendError === "string") {
          errorMessage = backendError;
        } else if (backendError.detail) {
          errorMessage = backendError.detail;
        } else {
          errorMessage = Object.entries(backendError)
            .map(([field, messages]) => {
              const message = Array.isArray(messages)
                ? messages.join(", ")
                : messages;

              return `${field}: ${message}`;
            })
            .join("\n");
        }
      }

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLOSE DRAWER
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: {
            xs: "100vw",
            sm: 500,
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <DrawerHeader
          title="Create Ticket"
          onClose={handleClose}
        />

        {/* =================================================
            FORM CONTENT
        ================================================= */}

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

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: "8px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
              }}
            >
              <Typography
                sx={{
                  color: "#DC2626",
                  fontSize: "13px",
                  whiteSpace: "pre-line",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* =================================================
              TICKET NAME
          ================================================= */}

          <CommonInput
            label="Ticket Name"
            name="ticketName"
            value={formData.ticketName}
            onChange={handleChange}
            placeholder="Enter ticket name"
            fullWidth
            required
          />

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              Description
              <span style={{ color: "red" }}> *</span>
            </Typography>

            <TextField
              name="description"
              placeholder="Enter description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          {/* =================================================
              STATUS + SOURCE
          ================================================= */}

          <Grid container spacing={2}>

            {/* STATUS */}

            <Grid size={6}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                }}
              >
                Ticket Status
                <span style={{ color: "red" }}> *</span>
              </Typography>

              <FormControl
                fullWidth
                size="small"
                required
              >
                <InputLabel id="ticket-status-label">
                  Choose
                </InputLabel>

                <Select
                  labelId="ticket-status-label"
                  name="ticketStatus"
                  value={formData.ticketStatus}
                  label="Choose"
                  onChange={handleChange}
                >
                  <MenuItem value="NEW">
                    New
                  </MenuItem>

                  <MenuItem value="OPEN">
                    Open
                  </MenuItem>

                  <MenuItem value="IN_PROGRESS">
                    In Progress
                  </MenuItem>

                  <MenuItem value="WAITING_ON_CONTACT">
                    Waiting on Contact
                  </MenuItem>

                  <MenuItem value="WAITING_ON_US">
                    Waiting on Us
                  </MenuItem>

                  <MenuItem value="CLOSED">
                    Closed
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* SOURCE */}

            <Grid size={6}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                }}
              >
                Source
                <span style={{ color: "red" }}> *</span>
              </Typography>

              <FormControl
                fullWidth
                size="small"
                required
              >
                <InputLabel id="source-label">
                  Choose
                </InputLabel>

                <Select
                  labelId="source-label"
                  name="source"
                  value={formData.source}
                  label="Choose"
                  onChange={handleChange}
                >
                  <MenuItem value="CHAT">
                    Chat
                  </MenuItem>

                  <MenuItem value="EMAIL">
                    Email
                  </MenuItem>

                  <MenuItem value="PHONE">
                    Phone
                  </MenuItem>

                  <MenuItem value="WEB">
                    Web
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          {/* =================================================
              PRIORITY
          ================================================= */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              Priority
              <span style={{ color: "red" }}> *</span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel id="priority-label">
                Choose
              </InputLabel>

              <Select
                labelId="priority-label"
                name="priority"
                value={formData.priority}
                label="Choose"
                onChange={handleChange}
              >
                <MenuItem value="HIGH">
                  High
                </MenuItem>

                <MenuItem value="MEDIUM">
                  Medium
                </MenuItem>

                <MenuItem value="LOW">
                  Low
                </MenuItem>

                <MenuItem value="CRITICAL">
                  Critical
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* =================================================
              TICKET OWNER
          ================================================= */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              Ticket Owner
              <span style={{ color: "red" }}> *</span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel id="ticket-owner-label">
                Choose
              </InputLabel>

              <Select
                labelId="ticket-owner-label"
                name="ticketOwner"
                value={formData.ticketOwner}
                label="Choose"
                onChange={handleChange}
                disabled={loadingOptions}
              >

                {loadingOptions ? (
                  <MenuItem disabled>
                    Loading users...
                  </MenuItem>
                ) : users.length === 0 ? (
                  <MenuItem disabled>
                    No users available
                  </MenuItem>
                ) : (
                  users.map((user) => (
                    <MenuItem
                      key={user.id}
                      value={user.id}
                    >
                      {`${user.first_name || ""} ${
                        user.last_name || ""
                      }`.trim() || user.email}
                    </MenuItem>
                  ))
                )}

              </Select>
            </FormControl>
          </Box>

          {/* =================================================
              ASSOCIATED DEAL
          ================================================= */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              Associated Deal
              <span style={{ color: "red" }}> *</span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel id="associated-deal-label">
                Choose
              </InputLabel>

              <Select
                labelId="associated-deal-label"
                name="associatedDeal"
                value={formData.associatedDeal}
                label="Choose"
                onChange={handleChange}
                disabled={loadingOptions}
              >

                {loadingOptions ? (
                  <MenuItem disabled>
                    Loading deals...
                  </MenuItem>
                ) : deals.length === 0 ? (
                  <MenuItem disabled>
                    No deals available
                  </MenuItem>
                ) : (
                  deals.map((deal) => (
                    <MenuItem
                      key={deal.id}
                      value={deal.id}
                    >
                      {deal.deal_name}
                    </MenuItem>
                  ))
                )}

              </Select>
            </FormControl>
          </Box>

        </Box>

        {/* =================================================
            FOOTER
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#fff",
          }}
        >

          {/* CANCEL */}

          <CommonButton
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          {/* SAVE */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={loading || loadingOptions}
          >
            {loading ? "Saving..." : "Save"}
          </CommonButton>

        </Box>

      </Box>
    </Drawer>
  );
}