


import React, { useState, useEffect } from "react";
import { Drawer, Box } from "@mui/material";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";
import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";

import api from "../../../services/api";


import {
  createLead,
  updateLead,
  getLeadById,
} from "../../../services/leads";

export default function CreateLeadsDrawer({
  open,
  onClose,
  onSuccess,
   selectedLead,
}) {
  // =====================================================
  // EMPTY FORM
  // =====================================================

  const emptyForm = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    jobTitle: "",
    contactOwner: "",
    leadStatus: "",
    products: [],
    company: "",
    city: "",
  };

  // =====================================================
  // STATES
  // =====================================================

  const [formData, setFormData] = useState(emptyForm);

  // All products from backend
  const [products, setProducts] = useState([]);

  // Users for Contact Owner
  const [users, setUsers] = useState([]);

  // Lead statuses
  const [leadStatuses, setLeadStatuses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [companies, setCompanies] = useState([]);

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {
  try {
    const response = await api.get("/accounts/users/");

    console.log("Users:", response.data);

    const userOptions = response.data.map((user) => {
      const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim();

      return {
        value: String(user.id),
        label: fullName || user.email,
        company: user.company_name || "",
      };
    });

    setUsers(userOptions);
  } catch (error) {
    console.error("Error fetching users:", error);
    setError("Failed to load contact owners.");
  }
};
  // =====================================================
  // FETCH LEAD STATUSES
  // =====================================================

  const fetchLeadStatuses = async () => {
    try {
      const response = await api.get("/leads/lead-statuses/");

      console.log("Lead Statuses:", response.data);

      /*
        If backend returns:

        [
          { id: 1, name: "New" },
          { id: 2, name: "Open" }
        ]

        convert to:

        [
          { value: "New", label: "New" },
          { value: "Open", label: "Open" }
        ]
      */

      const statusOptions = response.data.map((status) => {
        if (typeof status === "string") {
          return {
            value: status,
            label: status,
          };
        }

        return {
          value: status.value || status.name || status.id,
          label: status.label || status.name || status.value,
        };
      });

      setLeadStatuses(statusOptions);
    } catch (error) {
      console.error("Error fetching lead statuses:", error);

      setError("Failed to load lead statuses.");
    }
  };

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

const fetchProducts = async () => {
  try {
    const response = await api.get("/leads/products/");

    console.log("Products from backend:", response.data);

    // Backend already returns { value, label }
    setProducts(response.data);

    console.log("Product options:", response.data);
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );

    console.error("Status:", error.response?.status);

    setError("Failed to load products.");
  }
};

//==================================================================
//FETCH COMPANY
//=================================================================
const fetchCompanies = async () => {
  try {
    const response = await api.get("/leads/companies/");

    console.log("Companies from backend:", response.data);

    setCompanies(response.data);

    console.log("Company options:", response.data);
  } catch (error) {
    console.error(
      "Error fetching companies:",
      error.response?.data || error.message
    );

    setError("Failed to load companies.");
  }
};

  // =====================================================
  // LOAD DATA WHEN DRAWER OPENS
  // =====================================================

  useEffect(() => {
    if (open) {
      fetchUsers();
      fetchLeadStatuses();
      fetchProducts();
      fetchCompanies();
    }
  }, [open]);


  useEffect(() => {
  const loadLead = async () => {
    if (!selectedLead) {
      setFormData(emptyForm);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getLeadById(selectedLead.id);

      const lead = response.data;

      setFormData({
        email: lead.email || "",
        firstName: lead.first_name || "",
        lastName: lead.last_name || "",
        phoneNumber: lead.phone_number || "",
        jobTitle: lead.job_title || "",
        contactOwner: lead.contact_owner
          ? String(lead.contact_owner)
          : "",
        leadStatus: lead.lead_status || "",
        products: lead.products
          ? lead.products.map((id) => String(id))
          : [],
        company: lead.company
          ? String(lead.company)
          : "",
        city: lead.city || "",
      });

    } catch (error) {
      console.error(
        "Error loading lead:",
        error.response?.data || error.message
      );

      setError("Failed to load lead details.");
    } finally {
      setLoading(false);
    }
  };

  if (open) {
    loadLead();
  }
}, [open, selectedLead]);

  // =====================================================
  // PHONE NUMBER VALIDATION
  // =====================================================

  const validatePhoneNumber = (phone) => {
    if (!phone) {
      return "Phone number is required.";
    }

    const digitsOnly = phone.replace(/\D/g, "");

    if (digitsOnly.length !== 10) {
      return "Phone number must contain exactly 10 digits.";
    }

    return "";
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
 // -----------------------------------------------------
    // contact owners correspomding company
    // -----------------------------------------------------


      if (name === "contactOwner") {
    const selectedUser = users.find(
      (user) => String(user.value) === String(value)
    );

    setFormData((prev) => ({
      ...prev,
      contactOwner: value,
      company: selectedUser?.company || "",
    }));

    return;
  }


    // -----------------------------------------------------
    // PHONE NUMBER
    // -----------------------------------------------------

    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");

      if (digitsOnly.length > 10) {
        return;
      }
    }

    // -----------------------------------------------------
    // PRODUCTS
    // -----------------------------------------------------

    if (name === "products") {
      console.log("Selected product IDs:", value);
    }

    // -----------------------------------------------------
    // UPDATE FORM
    // -----------------------------------------------------

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error
    if (error) {
      setError("");
    }
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------------------------------
    // PHONE VALIDATION
    // -----------------------------------------------------

    const phoneError = validatePhoneNumber(
      formData.phoneNumber
    );

    if (phoneError) {
      setError(phoneError);
      return;
    }

    // -----------------------------------------------------
    // CONTACT OWNER VALIDATION
    // -----------------------------------------------------

    if (!formData.contactOwner) {
      setError("Please select a contact owner.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // =================================================
      // PAYLOAD
      // =================================================

      const payload = {
  email: formData.email,
  first_name: formData.firstName,
  last_name: formData.lastName,
  phone_number: formData.phoneNumber,
  job_title: formData.jobTitle,
  contact_owner: formData.contactOwner
    ? Number(formData.contactOwner)
    : null,
  lead_status: formData.leadStatus || "New",
  products: formData.products.map((id) => Number(id)),
  company: formData.company
    ? Number(formData.company)
    : null,
  city: formData.city,
};
      console.log("Sending Lead:", payload);

      /*
        Example payload:

        {
          email: "john@gmail.com",
          first_name: "John",
          last_name: "Smith",
          phone_number: "9876543210",
          job_title: "Manager",
          contact_owner: 4,
          lead_status: "New",
          products: [1, 3],
          company: "ABC Technologies",
          city: "Dubai"
        }
      */

      // =================================================
      // CREATE LEAD
      // =================================================

    let response;

if (selectedLead) {
  response = await updateLead(
    selectedLead.id,
    payload
  );

  console.log("Lead updated:", response.data);
} else {
  response = await createLead(payload);

  console.log("Lead created:", response.data);
}

      

      // =================================================
      // REFRESH LEAD LIST
      // =================================================

      if (onSuccess) {
        await onSuccess();
      }

      // =================================================
      // RESET FORM
      // =================================================

      setFormData(emptyForm);

      // =================================================
      // CLOSE DRAWER
      // =================================================

      onClose();
    } catch (error) {
      console.error(
        "Error creating lead:",
        error.response?.data || error.message
      );

      if (error.response?.data) {
        setError(
          JSON.stringify(error.response.data)
        );
      } else {
        setError("Failed to create lead.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

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

        {/* <DrawerHeader
          title="Create Lead"
          onClose={onClose}
        /> */}

        <DrawerHeader
  title={selectedLead ? "Edit Lead" : "Create Lead"}
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
          {/* =================================================
              ERROR
          ================================================= */}

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

          {/* =================================================
              EMAIL
          ================================================= */}

          <CommonInput
            label="Email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            placeholder="🖂 Enter"
          />

          {/* =================================================
              FIRST NAME
          ================================================= */}

          <CommonInput
            label="First Name"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* =================================================
              LAST NAME
          ================================================= */}

          <CommonInput
            label="Last Name"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* =================================================
              PHONE
          ================================================= */}

          <PhoneInputField
            label="Phone Number"
            required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter"
          />

          {/* =================================================
              JOB TITLE
          ================================================= */}

          <CommonInput
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* =================================================
              CONTACT OWNER
          ================================================= */}

          <CommonSelect
            label="Contact Owner"
            name="contactOwner"
            value={formData.contactOwner}
            onChange={handleChange}
            placeholder="Choose Owner"
            options={users}
            required
          />

          {/* =================================================
              LEAD STATUS
          ================================================= */}

          <CommonSelect
            label="Lead Status"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            placeholder="Choose Lead Status"
            options={leadStatuses}
          />

          {/* =================================================
              PRODUCTS - MULTI SELECT
          ================================================= */}

          <CommonMultiSelect
            label="Products"
            name="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="Choose Products"
            options={products}
          />

          {/* =================================================
              COMPANY
          ================================================= */}

         <CommonSelect
  label="Company"
  name="company"
  value={formData.company}
  onChange={handleChange}
  placeholder="Select Contact Owner First"
  options={
    formData.company
      ? [
          {
            value: formData.company,
            label: formData.company,
          },
        ]
      : []
  }
  disabled
/>

          {/* =================================================
              CITY
          ================================================= */}

          <CommonInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />
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

          {/* SAVE */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading
  ? "Saving..."
  : selectedLead
  ? "Update Lead"
  : "Save Lead"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}


