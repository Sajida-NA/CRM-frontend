
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
  Checkbox,
  ListItemText,
} from "@mui/material";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";

import api from "../../../services/api";

export default function EditTicketDrawer({
  open,
  onClose,
  ticketId,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    ticketName: "",
    description: "",
    ticketStatus: "",
    source: "",
    priority: "",
    ticketOwners: [],
    associatedDeal: "",
  });

  const [users, setUsers] = useState([]);
  const [deals, setDeals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // =====================================================
  // LOAD TICKET + USERS + DEALS
  // =====================================================

  useEffect(() => {
    if (!open || !ticketId) return;

    const fetchData = async () => {
      try {
        setLoadingData(true);

        const [
          ticketResponse,
          usersResponse,
          dealsResponse,
        ] = await Promise.all([
          api.get(`/tickets/${ticketId}/`),
          api.get("/accounts/users/"),
          api.get("/deals/"),
        ]);

        const ticketDetail = ticketResponse.data;

        const usersData = Array.isArray(
          usersResponse.data
        )
          ? usersResponse.data
          : usersResponse.data?.results || [];

        const dealsData = Array.isArray(
          dealsResponse.data
        )
          ? dealsResponse.data
          : dealsResponse.data?.results || [];

        console.log(
          "EDIT TICKET:",
          ticketDetail
        );

        console.log(
          "EDIT USERS:",
          usersData
        );

        console.log(
          "EDIT DEALS:",
          dealsData
        );

        setUsers(usersData);
        setDeals(dealsData);

        // =================================================
        // FIND TICKET OWNER IDS
        // =================================================

        let ownerIds = [];

        // -------------------------------------------------
        // Preferred backend response:
        //
        // ticket_owner_ids: [16, 17]
        // -------------------------------------------------

        if (
          Array.isArray(
            ticketDetail.ticket_owner_ids
          )
        ) {
          ownerIds =
            ticketDetail.ticket_owner_ids.map(
              (id) => String(id)
            );
        }

        // -------------------------------------------------
        // Backend may return ticket_owners as IDs
        //
        // ticket_owners: [16, 17]
        // -------------------------------------------------

        if (
          ownerIds.length === 0 &&
          Array.isArray(
            ticketDetail.ticket_owners
          )
        ) {
          ownerIds =
            ticketDetail.ticket_owners
              .map((owner) => {
                // Owner is an ID
                if (
                  typeof owner === "number"
                ) {
                  return String(owner);
                }

                // Owner is numeric string
                if (
                  typeof owner === "string" &&
                  !isNaN(owner)
                ) {
                  return String(owner);
                }

                // Owner is object
                if (
                  owner &&
                  typeof owner === "object" &&
                  owner.id
                ) {
                  return String(owner.id);
                }

                // Owner is name/email
                if (
                  typeof owner === "string"
                ) {
                  const foundUser =
                    usersData.find(
                      (user) => {
                        const fullName =
                          `${user.first_name || ""} ${
                            user.last_name || ""
                          }`.trim();

                        return (
                          String(
                            user.email || ""
                          ).toLowerCase() ===
                            owner.toLowerCase() ||
                          fullName.toLowerCase() ===
                            owner.toLowerCase()
                        );
                      }
                    );

                  return foundUser
                    ? String(foundUser.id)
                    : null;
                }

                return null;
              })
              .filter(Boolean);
        }

        // -------------------------------------------------
        // Backward compatibility with old ticket_owner
        // -------------------------------------------------

        if (
          ownerIds.length === 0 &&
          ticketDetail.ticket_owner !==
            null &&
          ticketDetail.ticket_owner !==
            undefined
        ) {
          const oldOwner =
            ticketDetail.ticket_owner;

          // Numeric ID
          if (
            typeof oldOwner === "number"
          ) {
            ownerIds = [
              String(oldOwner),
            ];
          }

          // Numeric string
          else if (
            typeof oldOwner === "string" &&
            !isNaN(oldOwner)
          ) {
            ownerIds = [
              String(oldOwner),
            ];
          }

          // Name/email
          else if (
            typeof oldOwner === "string"
          ) {
            const foundUser =
              usersData.find((user) => {
                const fullName =
                  `${user.first_name || ""} ${
                    user.last_name || ""
                  }`.trim();

                return (
                  String(
                    user.email || ""
                  ).toLowerCase() ===
                    oldOwner.toLowerCase() ||
                  fullName.toLowerCase() ===
                    oldOwner.toLowerCase()
                );
              });

            if (foundUser) {
              ownerIds = [
                String(foundUser.id),
              ];
            }
          }

          // Object
          else if (
            oldOwner &&
            typeof oldOwner === "object" &&
            oldOwner.id
          ) {
            ownerIds = [
              String(oldOwner.id),
            ];
          }
        }

        console.log(
          "EDIT TICKET OWNER IDS:",
          ownerIds
        );

        // =================================================
        // FIND DEAL ID
        // =================================================

        let dealId = "";

        const associatedDeal =
          ticketDetail.associated_deal;

        // Deal ID
        if (
          typeof associatedDeal === "number"
        ) {
          dealId = String(
            associatedDeal
          );
        }

        // Deal ID as string
        if (
          !dealId &&
          typeof associatedDeal === "string" &&
          !isNaN(associatedDeal)
        ) {
          dealId = String(
            associatedDeal
          );
        }

        // Deal object
        if (
          !dealId &&
          associatedDeal &&
          typeof associatedDeal === "object"
        ) {
          if (associatedDeal.id) {
            dealId = String(
              associatedDeal.id
            );
          }
        }

        // Find deal by deal name
        if (!dealId) {
          const dealName =
            ticketDetail.deal_name ||
            ticketDetail.associated_deal_name;

          if (dealName) {
            const deal =
              dealsData.find(
                (item) =>
                  String(
                    item.deal_name || ""
                  ).toLowerCase() ===
                  String(
                    dealName
                  ).toLowerCase()
              );

            if (deal) {
              dealId = String(
                deal.id
              );
            }
          }
        }

        // =================================================
        // SET FORM DATA
        // =================================================

        setFormData({
          ticketName:
            ticketDetail.ticket_name ||
            "",

          description:
            ticketDetail.description ||
            "",

          ticketStatus:
            ticketDetail.ticket_status ||
            "",

          source:
            ticketDetail.source ||
            "",

          priority:
            ticketDetail.priority ||
            "",

          ticketOwners:
            ownerIds,

          associatedDeal:
            dealId,
        });
      } catch (error) {
        console.error(
          "Error loading ticket:",
          error.response?.data || error
        );
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [open, ticketId]);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE TICKET
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketId) return;

    // =================================================
    // VALIDATION
    // =================================================

    if (
      !formData.ticketOwners ||
      formData.ticketOwners.length === 0
    ) {
      alert(
        "Please select at least one Ticket Owner."
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ticket_name:
          formData.ticketName,

        description:
          formData.description,

        ticket_status:
          formData.ticketStatus,

        source:
          formData.source,

        priority:
          formData.priority,

        // IMPORTANT:
        // ManyToMany field
        ticket_owners:
          formData.ticketOwners.map(
            (id) => Number(id)
          ),

        associated_deal:
          Number(
            formData.associatedDeal
          ),
      };

      console.log(
        "UPDATE TICKET PAYLOAD:",
        payload
      );

      const response =
        await api.put(
          `/tickets/${ticketId}/`,
          payload
        );

      console.log(
        "Ticket updated:",
        response.data
      );

      if (onUpdated) {
        await onUpdated();
      }

      handleClose();
    } catch (error) {
      console.error(
        "Error updating ticket:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLOSE DRAWER
  // =====================================================

  const handleClose = () => {
    if (loading) return;

    setFormData({
      ticketName: "",
      description: "",
      ticketStatus: "",
      source: "",
      priority: "",
      ticketOwners: [],
      associatedDeal: "",
    });

    setUsers([]);
    setDeals([]);

    onClose();
  };

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
          width: 500,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <DrawerHeader
          title="Edit Ticket"
          onClose={handleClose}
        />

        {/* =====================================================
            FORM
        ===================================================== */}

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
          {/* TICKET NAME */}

          <CommonInput
            label="Ticket Name"
            name="ticketName"
            value={
              formData.ticketName
            }
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
            disabled={loadingData}
          />

          {/* DESCRIPTION */}

          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#344054",
                }}
              >
                Description
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>
              </Typography>

              <TextField
                name="description"
                placeholder="Enter description"
                fullWidth
                multiline
                rows={4}
                value={
                  formData.description
                }
                onChange={handleChange}
                required
                disabled={loadingData}
                sx={{
                  "& .MuiOutlinedInput-root":
                    {
                      borderRadius:
                        "10px",
                    },
                }}
              />
            </Grid>
          </Grid>

          {/* STATUS + SOURCE */}

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
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>
              </Typography>

              <FormControl
                fullWidth
                size="small"
                required
              >
                <InputLabel>
                  Choose
                </InputLabel>

                <Select
                  name="ticketStatus"
                  value={
                    formData.ticketStatus
                  }
                  label="Choose"
                  onChange={
                    handleChange
                  }
                  disabled={
                    loadingData
                  }
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
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>
              </Typography>

              <FormControl
                fullWidth
                size="small"
                required
              >
                <InputLabel>
                  Choose
                </InputLabel>

                <Select
                  name="source"
                  value={
                    formData.source
                  }
                  label="Choose"
                  onChange={
                    handleChange
                  }
                  disabled={
                    loadingData
                  }
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

          {/* PRIORITY */}

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
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel>
                Choose
              </InputLabel>

              <Select
                name="priority"
                value={
                  formData.priority
                }
                label="Choose"
                onChange={
                  handleChange
                }
                disabled={
                  loadingData
                }
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

          {/* TICKET OWNER */}

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
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel>
                Choose
              </InputLabel>

              <Select
                multiple
                name="ticketOwners"
                value={
                  formData.ticketOwners
                }
                label="Choose"
                onChange={
                  handleChange
                }
                disabled={
                  loadingData
                }
                renderValue={(
                  selected
                ) =>
                  selected
                    .map((id) => {
                      const user =
                        users.find(
                          (item) =>
                            String(
                              item.id
                            ) ===
                            String(id)
                        );

                      if (!user)
                        return "";

                      const fullName =
                        `${user.first_name || ""} ${
                          user.last_name || ""
                        }`.trim();

                      return (
                        fullName ||
                        user.email ||
                        ""
                      );
                    })
                    .filter(Boolean)
                    .join(", ")
                }
              >
                {users.map(
                  (user) => {
                    const userName =
                      `${user.first_name || ""} ${
                        user.last_name || ""
                      }`.trim() ||
                      user.email;

                    return (
                      <MenuItem
                        key={user.id}
                        value={String(
                          user.id
                        )}
                      >
                        <Checkbox
                          checked={formData.ticketOwners.includes(
                            String(
                              user.id
                            )
                          )}
                        />

                        <ListItemText
                          primary={
                            userName
                          }
                        />
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </Box>

          {/* ASSOCIATED DEAL */}

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
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </Typography>

            <FormControl
              fullWidth
              size="small"
              required
            >
              <InputLabel>
                Choose
              </InputLabel>

              <Select
                name="associatedDeal"
                value={
                  formData.associatedDeal
                }
                label="Choose"
                onChange={
                  handleChange
                }
                disabled={
                  loadingData
                }
              >
                {deals.map(
                  (deal) => (
                    <MenuItem
                      key={deal.id}
                      value={String(
                        deal.id
                      )}
                    >
                      {
                        deal.deal_name
                      }
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop:
              "1px solid #E5E7EB",
          }}
        >
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={
              loading ||
              loadingData ||
              !ticketId
            }
          >
            {loading
              ? "Saving..."
              : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}

