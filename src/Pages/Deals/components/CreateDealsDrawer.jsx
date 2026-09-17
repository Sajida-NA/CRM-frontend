

import React, { useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Grid,
} from "@mui/material";

import dayjs from "dayjs";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import CommonSelect from "../../../Components/common/CommonSelect";
import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
import FormDatePicker from "../../../Components/common/FormDatePicker";

import api from "../../../services/api";

export default function CreateDealsDrawer({
  open,
  onClose,
  onDealSaved,
  deal,
  leadId,
}) {
  // =================================================
  // EMPTY FORM
  // =================================================

  const emptyForm = {
    dealName: "",
    dealStage: "",
    associatedLead: "",
    amount: "",
    dealOwner: [],
    closeDate: null,
    priority: "",
  };

  // =================================================
  // STATES
  // =================================================

  const [formData, setFormData] = useState(emptyForm);

  const [leads, setLeads] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =================================================
  // EDIT MODE
  // =================================================

  const isEditMode = Boolean(deal);

  // =================================================
  // FETCH LEADS
  // =================================================

  const fetchLeads = async () => {
    try {
      const response =
        await api.get("/leads/leadslist/");

      console.log(
        "LEADS RESPONSE:",
        response.data
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.results || [];

      setLeads(data);

      return data;
    } catch (error) {
      console.error(
        "LEADS ERROR:",
        error.response?.data || error
      );

      setLeads([]);

      return [];
    }
  };

  // =================================================
  // FETCH USERS
  // Kept for compatibility / fallback logic
  // =================================================

  const fetchUsers = async () => {
    try {
      const response =
        await api.get("/accounts/users/");

      console.log(
        "USERS RESPONSE:",
        response.data
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.results || [];

      setUsers(data);

      return data;
    } catch (error) {
      console.error(
        "USERS ERROR:",
        error.response?.data || error
      );

      setUsers([]);

      return [];
    }
  };

  // =================================================
  // LOAD LEADS + USERS
  // =================================================

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

  // =================================================
  // GET LEAD CONTACT OWNER IDS
  //
  // Supports:
  //
  // 1. contact_owner_ids: [16, 17]
  //
  // 2. contact_owners: [16, 17]
  //
  // 3. contact_owners:
  //    [{ id: 16 }, { id: 17 }]
  //
  // 4. old contact_owner
  // =================================================

  const getContactOwnerIds = (lead) => {
    if (!lead) {
      return [];
    }

    // -------------------------------------------------
    // contact_owner_ids
    // -------------------------------------------------

    if (
      Array.isArray(
        lead.contact_owner_ids
      )
    ) {
      return lead.contact_owner_ids
        .filter(
          (id) =>
            id !== null &&
            id !== undefined &&
            id !== ""
        )
        .map((id) =>
          String(id)
        );
    }

    // -------------------------------------------------
    // contact_owners
    // -------------------------------------------------

    if (
      Array.isArray(
        lead.contact_owners
      )
    ) {
      return lead.contact_owners
        .map((owner) => {
          if (
            owner &&
            typeof owner === "object"
          ) {
            return owner.id;
          }

          return owner;
        })
        .filter(
          (id) =>
            id !== null &&
            id !== undefined &&
            id !== ""
        )
        .map((id) =>
          String(id)
        );
    }

    // -------------------------------------------------
    // OLD SINGLE contact_owner OBJECT
    // -------------------------------------------------

    if (
      lead.contact_owner &&
      typeof lead.contact_owner ===
        "object"
    ) {
      return lead.contact_owner.id
        ? [
            String(
              lead.contact_owner.id
            ),
          ]
        : [];
    }

    // -------------------------------------------------
    // OLD SINGLE contact_owner ID
    // -------------------------------------------------

    if (
      lead.contact_owner !== null &&
      lead.contact_owner !== undefined &&
      lead.contact_owner !== ""
    ) {
      return [
        String(
          lead.contact_owner
        ),
      ];
    }

    // -------------------------------------------------
    // OLD contact_owner_id
    // -------------------------------------------------

    if (
      lead.contact_owner_id !== null &&
      lead.contact_owner_id !== undefined &&
      lead.contact_owner_id !== ""
    ) {
      return [
        String(
          lead.contact_owner_id
        ),
      ];
    }

    return [];
  };

  // =================================================
  // LOAD DEAL DATA
  //
  // IMPORTANT:
  // In EDIT MODE the Deal Owner is taken from
  // the Associated Lead's Contact Owners.
  //
  // This ensures:
  //
  // Lead
  //   ↓
  // Contact Owners [16, 17]
  //   ↓
  // Deal Owner [16, 17]
  // =================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    // =================================================
    // EDIT MODE
    // =================================================

    if (deal) {
      console.log(
        "DEAL FOR EDIT:",
        deal
      );

      const associatedLeadId =
        deal.associated_lead !== null &&
        deal.associated_lead !== undefined
          ? String(
              deal.associated_lead
            )
          : "";

      // -------------------------------------------------
      // FIND ASSOCIATED LEAD
      // -------------------------------------------------

      const selectedLead =
        leads.find(
          (lead) =>
            String(lead.id) ===
            associatedLeadId
        );

      // -------------------------------------------------
      // GET ALL CONTACT OWNERS
      // FROM ASSOCIATED LEAD
      // -------------------------------------------------

      const contactOwnerIds =
        getContactOwnerIds(
          selectedLead
        );

      console.log(
        "EDIT ASSOCIATED LEAD:",
        selectedLead
      );

      console.log(
        "EDIT LEAD CONTACT OWNER IDS:",
        contactOwnerIds
      );

      // -------------------------------------------------
      // SET FORM DATA
      // -------------------------------------------------

      setFormData({
        dealName:
          deal.deal_name || "",

        dealStage:
          deal.deal_stage || "",

        associatedLead:
          associatedLeadId,

        amount:
          deal.amount !== null &&
          deal.amount !== undefined
            ? String(deal.amount)
            : "",

        // =================================================
        // IMPORTANT
        //
        // First priority:
        // Associated Lead Contact Owners
        //
        // Fallback:
        // Existing Deal Owners
        // =================================================

        dealOwner:
          contactOwnerIds.length > 0
            ? contactOwnerIds
            : Array.isArray(
                deal.deal_owner_ids
              )
              ? deal.deal_owner_ids.map(
                  (id) =>
                    String(id)
                )
              : Array.isArray(
                  deal.deal_owners
                )
                ? deal.deal_owners.map(
                    (owner) =>
                      String(
                        typeof owner ===
                          "object"
                          ? owner.id
                          : owner
                      )
                  )
                : [],

        closeDate:
          deal.close_date
            ? dayjs(
                deal.close_date
              )
            : null,

        priority:
          deal.priority || "",
      });

      setError("");

      return;
    }

    // =================================================
    // CREATE MODE
    // =================================================

    setFormData({
      ...emptyForm,

      associatedLead:
        leadId !== null &&
        leadId !== undefined &&
        leadId !== ""
          ? String(leadId)
          : "",
    });

    setError("");
  }, [
    deal,
    open,
    leadId,
    leads,
  ]);

  // =================================================
  // AUTO SELECT DEAL OWNER
  //
  // CREATE / CONVERT LEAD
  //
  // leadId
  //   ↓
  // selected Lead
  //   ↓
  // contact_owner_ids
  //   ↓
  // ALL Contact Owners
  //   ↓
  // Deal Owner
  // =================================================

  useEffect(() => {
    if (
      !open ||
      deal ||
      !leadId ||
      !leads.length
    ) {
      return;
    }

    const selectedLead =
      leads.find(
        (lead) =>
          String(lead.id) ===
          String(leadId)
      );

    if (!selectedLead) {
      return;
    }

    const contactOwnerIds =
      getContactOwnerIds(
        selectedLead
      );

    console.log(
      "CONVERT LEAD:",
      selectedLead
    );

    console.log(
      "LEAD CONTACT OWNER IDS:",
      contactOwnerIds
    );

    setFormData((prev) => ({
      ...prev,

      associatedLead:
        String(
          selectedLead.id
        ),

      // Select ALL Contact Owners
      dealOwner:
        contactOwnerIds,
    }));
  }, [
    open,
    deal,
    leadId,
    leads,
  ]);

  // =================================================
  // HANDLE INPUT CHANGE
  // =================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    // =================================================
    // ASSOCIATED LEAD CHANGED
    // =================================================

    if (
      name ===
      "associatedLead"
    ) {
      const selectedLead =
        leads.find(
          (lead) =>
            String(lead.id) ===
            String(value)
        );

      const contactOwnerIds =
        getContactOwnerIds(
          selectedLead
        );

      console.log(
        "SELECTED LEAD:",
        selectedLead
      );

      console.log(
        "LEAD CONTACT OWNER IDS:",
        contactOwnerIds
      );

      setFormData((prev) => ({
        ...prev,

        associatedLead:
          value,

        // Automatically select ALL
        // Contact Owners
        dealOwner:
          contactOwnerIds,
      }));

      return;
    }

    // =================================================
    // NORMAL FIELD CHANGE
    // =================================================

    setFormData((prev) => ({
      ...prev,

      [name]:
        value,
    }));
  };

  // =================================================
  // LEAD OPTIONS
  // =================================================

  const leadOptions =
    leads.map((lead) => ({
      value: String(
        lead.id
      ),

      label:
        `${lead.first_name || ""} ${
          lead.last_name || ""
        }`.trim() ||
        lead.name ||
        lead.email ||
        `Lead ${lead.id}`,
    }));

  // =================================================
  // SELECTED LEAD
  // =================================================

  const selectedLead =
    leads.find(
      (lead) =>
        String(lead.id) ===
        String(
          formData.associatedLead
        )
    );

  // =================================================
  // SELECTED LEAD CONTACT OWNER IDS
  // =================================================

  const selectedLeadOwnerIds =
    getContactOwnerIds(
      selectedLead
    );

  // =================================================
  // DEAL OWNER OPTIONS
  //
  // IMPORTANT:
  // Build directly from the selected Lead.
  //
  // Example:
  //
  // contact_owner_ids:
  // [16, 17]
  //
  // contact_owner_names:
  // ["Riya Mehwish", "Ahmed Ali"]
  //
  // Both will appear.
  // =================================================

  const dealOwnerOptions =
    selectedLead
      ? selectedLeadOwnerIds.map(
          (id, index) => ({
            value: String(
              id
            ),

            label:
              selectedLead
                .contact_owner_names?.[
                index
              ] ||
              `User ${id}`,
          })
        )
      : [];

  // =================================================
  // FALLBACK FOR contact_owners OBJECT ARRAY
  // =================================================

  const finalDealOwnerOptions =
    dealOwnerOptions.length > 0
      ? dealOwnerOptions
      : selectedLead &&
          Array.isArray(
            selectedLead.contact_owners
          )
        ? selectedLead.contact_owners.map(
            (owner) => {
              // ---------------------------------------
              // OBJECT OWNER
              // ---------------------------------------

              if (
                owner &&
                typeof owner ===
                  "object"
              ) {
                return {
                  value: String(
                    owner.id
                  ),

                  label:
                    `${
                      owner.first_name ||
                      ""
                    } ${
                      owner.last_name ||
                      ""
                    }`.trim() ||
                    owner.name ||
                    owner.email ||
                    `User ${owner.id}`,
                };
              }

              // ---------------------------------------
              // OWNER ID
              // ---------------------------------------

              const user =
                users.find(
                  (item) =>
                    String(
                      item.id
                    ) ===
                    String(
                      owner
                    )
                );

              return {
                value: String(
                  owner
                ),

                label: user
                  ? `${
                      user.first_name ||
                      ""
                    } ${
                      user.last_name ||
                      ""
                    }`.trim() ||
                    user.username ||
                    user.email ||
                    `User ${owner}`
                  : `User ${owner}`,
              };
            }
          )
        : [];

  // =================================================
  // CREATE / UPDATE DEAL
  // =================================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      // =================================================
      // VALIDATION
      // =================================================

      if (!formData.dealName) {
        setError(
          "Please enter deal name."
        );

        setLoading(false);

        return;
      }

      if (!formData.dealStage) {
        setError(
          "Please select deal stage."
        );

        setLoading(false);

        return;
      }

      if (
        !formData.associatedLead
      ) {
        setError(
          "Please select an associated lead."
        );

        setLoading(false);

        return;
      }

      // =================================================
      // DEAL OWNER VALIDATION
      // =================================================

      if (
        !Array.isArray(
          formData.dealOwner
        ) ||
        formData.dealOwner
          .length === 0
      ) {
        setError(
          "The selected Lead does not have a Contact Owner."
        );

        setLoading(false);

        return;
      }

      // =================================================
      // PAYLOAD
      // =================================================

      const dealData = {
        deal_name:
          formData.dealName,

        deal_stage:
          formData.dealStage,

        associated_lead:
          Number(
            formData.associatedLead
          ),

        amount:
          formData.amount,

        // =================================================
        // ALL CONTACT OWNERS
        // =================================================

        deal_owners:
          formData.dealOwner.map(
            (id) =>
              Number(id)
          ),

        close_date:
          formData.closeDate
            ? formData.closeDate.format(
                "YYYY-MM-DD"
              )
            : null,

        priority:
          formData.priority,
      };

      console.log(
        "DEAL PAYLOAD:",
        dealData
      );

      // =================================================
      // UPDATE DEAL
      // =================================================

      if (isEditMode) {
        console.log(
          "Updating deal:",
          deal.id
        );

        const response =
          await api.put(
            `/deals/${deal.id}/`,
            dealData
          );

        console.log(
          "DEAL UPDATED:",
          response.data
        );
      }

      // =================================================
      // CREATE DEAL
      // =================================================

      else {
        console.log(
          "Creating deal"
        );

        const response =
          await api.post(
            "/deals/",
            dealData
          );

        console.log(
          "DEAL CREATED:",
          response.data
        );
      }

      // =================================================
      // REFRESH DEAL LIST
      // =================================================

      if (onDealSaved) {
        await onDealSaved();
      }

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({
        ...emptyForm,
      });

      // =================================================
      // CLOSE DRAWER
      // =================================================

      onClose();
    } catch (error) {
      console.error(
        "SAVE DEAL ERROR:",
        error.response?.data ||
          error
      );

      if (
        error.response?.data
      ) {
        setError(
          JSON.stringify(
            error.response.data
          )
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

  // =================================================
  // UI
  // =================================================

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
          flexDirection:
            "column",
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
            flexDirection:
              "column",
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
                wordBreak:
                  "break-word",
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
            value={
              formData.dealName
            }
            onChange={
              handleChange
            }
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
            value={
              formData.dealStage
            }
            onChange={
              handleChange
            }
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
            options={
              leadOptions
            }
            name="associatedLead"
            value={
              formData.associatedLead
            }
            onChange={
              handleChange
            }
          />

          {/* AMOUNT */}

          <CommonInput
            label="Amount"
            required
            name="amount"
            value={
              formData.amount
            }
            onChange={
              handleChange
            }
            fullWidth
            placeholder="Enter"
          />

          {/* =================================================
              DEAL OWNER
              ONLY SELECTED LEAD'S CONTACT OWNERS
          ================================================= */}

          <CommonMultiSelect
            label="Deal Owner"
            required
            placeholder={
              formData.dealOwner
                .length
                ? ""
                : "No Contact Owners"
            }
            options={
              finalDealOwnerOptions
            }
            name="dealOwner"
            value={
              formData.dealOwner
            }
            onChange={
              handleChange
            }
            disabled
          />

          {/* =================================================
              CLOSE DATE + PRIORITY
          ================================================= */}

          <Grid
            container
            spacing={2}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <FormDatePicker
                label="Close Date"
                required
                value={
                  formData.closeDate
                }
                onChange={(
                  newValue
                ) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      closeDate:
                        newValue,
                    })
                  )
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
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
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
            borderTop:
              "1px solid #E5E7EB",
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