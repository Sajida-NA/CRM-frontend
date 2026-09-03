
import React, { useEffect, useState } from "react";

import { Drawer, Box, Grid } from "@mui/material";

import dayjs from "dayjs";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import CommonSelect from "../../../Components/common/CommonSelect";
import FormDatePicker from "../../../Components/common/FormDatePicker";

import api from "../../../services/api";

export default function CreateDealsDrawer({
  open,
  onClose,
  onDealSaved,
  deal,
}) {
  // EMPTY FORM

  const emptyForm = {
    dealName: "",
    dealStage: "",
    associatedLead: "",
    amount: "",
    dealOwner: "",
    closeDate: null,
    priority: "",
  };

  // STATES

  const [formData, setFormData] = useState(emptyForm);

  const [leads, setLeads] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // EDIT MODE

  const isEditMode = Boolean(deal);

  // FETCH LEADS

  const fetchLeads = async () => {
    try {
      const response = await api.get("/leads/leadslist/");

      console.log("LEADS RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setLeads(data);

      return data;
    } catch (error) {
      console.error(
        "LEADS ERROR:",
        error.response?.data || error
      );

      return [];
    }
  };

  // FETCH USERS

  const fetchUsers = async () => {
    try {
      const response = await api.get("/accounts/users/");

      console.log("USERS RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setUsers(data);

      return data;
    } catch (error) {
      console.error(
        "USERS ERROR:",
        error.response?.data || error
      );

      return [];
    }
  };

  // LOAD LEADS + USERS WHEN DRAWER OPENS

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadOptions = async () => {
      setError("");

      await Promise.all([
        fetchLeads(),
        fetchUsers(),
      ]);
    };

    loadOptions();
  }, [open]);

  // LOAD DEAL DATA WHEN EDITING

  useEffect(() => {
    if (!open) {
      return;
    }

    // CREATE MODE

    if (!deal) {
      setFormData(emptyForm);
      setError("");

      return;
    }

    // EDIT MODE

    console.log("DEAL FOR EDIT:", deal);

    setFormData({
      dealName: deal.deal_name || "",

      dealStage: deal.deal_stage || "",

      associatedLead:
        deal.associated_lead !== null &&
        deal.associated_lead !== undefined
          ? String(deal.associated_lead)
          : "",

      amount:
        deal.amount !== null &&
        deal.amount !== undefined
          ? String(deal.amount)
          : "",

      dealOwner:
        deal.deal_owner_id !== null &&
        deal.deal_owner_id !== undefined
          ? String(deal.deal_owner_id)
          : "",

      closeDate: deal.close_date
        ? dayjs(deal.close_date)
        : null,

      priority: deal.priority || "",
    });
  }, [deal, open]);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE / UPDATE DEAL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // VALIDATION

      if (!formData.dealName) {
        setError("Please enter deal name.");

        setLoading(false);

        return;
      }

      if (!formData.dealStage) {
        setError("Please select deal stage.");

        setLoading(false);

        return;
      }

      if (!formData.associatedLead) {
        setError(
          "Please select an associated lead."
        );

        setLoading(false);

        return;
      }

      if (!formData.dealOwner) {
        setError("Please select a deal owner.");

        setLoading(false);

        return;
      }

      // PAYLOAD

      const dealData = {
        deal_name: formData.dealName,

        deal_stage: formData.dealStage,

        associated_lead: Number(
          formData.associatedLead
        ),

        amount: formData.amount,

        deal_owner: Number(formData.dealOwner),

        close_date: formData.closeDate
          ? formData.closeDate.format("YYYY-MM-DD")
          : null,

        priority: formData.priority,
      };

      console.log("DEAL PAYLOAD:", dealData);

      // UPDATE DEAL

      if (isEditMode) {
        console.log("Updating deal:", deal.id);

        const response = await api.put(
          `/deals/${deal.id}/`,
          dealData
        );

        console.log(
          "DEAL UPDATED:",
          response.data
        );
      }

      // CREATE DEAL

      else {
        console.log("Creating deal");

        const response = await api.post(
          "/deals/",
          dealData
        );

        console.log(
          "DEAL CREATED:",
          response.data
        );
      }

      // REFRESH DEAL LIST

      if (onDealSaved) {
        await onDealSaved();
      }

      // CLEAR FORM

      setFormData(emptyForm);

      // CLOSE DRAWER

      onClose();
    } catch (error) {
      console.error(
        "SAVE DEAL ERROR:",
        error.response?.data || error
      );

      if (error.response?.data) {
        setError(
          JSON.stringify(error.response.data)
        );
      } else {
        setError(
          isEditMode
            ? "Failed to update deal."
            : "Failed to create deal."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // LEAD OPTIONS

  const leadOptions = leads.map((lead) => ({
    value: String(lead.id),

    label:
      `${lead.first_name || ""} ${
        lead.last_name || ""
      }`.trim() ||
      lead.name ||
      lead.email ||
      `Lead ${lead.id}`,
  }));

  // USER OPTIONS

  const userOptions = users.map((user) => ({
    value: String(user.id),

    label:
      `${user.first_name || ""} ${
        user.last_name || ""
      }`.trim() ||
      user.username ||
      user.email ||
      `User ${user.id}`,
  }));

  // UI

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 520,
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
          title={
            isEditMode
              ? "Edit Deal"
              : "Create Deal"
          }
          onClose={onClose}
        />

        {/* =================================================
            FORM
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
          {/* ERROR */}

          {error && (
            <Box
              sx={{
                color: "red",
                fontSize: "14px",
                wordBreak: "break-word",
              }}
            >
              {error}
            </Box>
          )}

          {/* DEAL NAME */}

          <CommonInput
            label="Deal Name"
            required
            name="dealName"
            value={formData.dealName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* DEAL STAGE */}

          <CommonSelect
            label="Deal Stage"
            required
            placeholder="Choose"
            options={[
              "Appointment Scheduled",
              "Contract Sent",
              "Closed Won",
              "Closed Lost",
              "Decision Maker Bought In",
              "Presentation Scheduled",
              "Qualified to Buy",
            ]}
            name="dealStage"
            value={formData.dealStage}
            onChange={handleChange}
          />

          {/* ASSOCIATED LEAD */}

          <CommonSelect
            label="Associated Lead"
            required
            placeholder={
              leads.length
                ? "Choose"
                : "No leads available"
            }
            options={leadOptions}
            name="associatedLead"
            value={formData.associatedLead}
            onChange={handleChange}
          />

          {/* AMOUNT */}

          <CommonInput
            label="Amount"
            required
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* DEAL OWNER */}

          <CommonSelect
            label="Deal Owner"
            required
            placeholder={
              users.length
                ? "Choose"
                : "No users available"
            }
            options={userOptions}
            name="dealOwner"
            value={formData.dealOwner}
            onChange={handleChange}
          />

          {/* CLOSE DATE + PRIORITY */}

          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <FormDatePicker
                label="Close Date"
                required
                value={formData.closeDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    closeDate: newValue,
                  }))
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CommonSelect
                label="Priority"
                required
                placeholder="Choose"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={[
                  "High",
                  "Medium",
                  "Low",
                ]}
              />
            </Grid>
          </Grid>
        </Box>

        {/* =================================================
            FOOTER
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            gap: 3,
            p: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          {/* CANCEL */}

          <CommonButton
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          {/* SAVE / UPDATE */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update"
                : "Save Deal"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}

