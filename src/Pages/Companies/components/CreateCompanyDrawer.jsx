import React, { useState, useEffect } from "react";

import {
  Drawer,
  Box,
  Grid,
} from "@mui/material";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";

import api from "../../../services/api";

export default function CreateCompanyDrawer({
  open,
  onClose,
  onCompanyCreated,
  company,
}) {
  // =====================================================
  // EMPTY FORM
  // =====================================================

  const emptyForm = {
    domainName: "",
    companyName: "",
    companyOwner: "",
    industry: "",
    type: "",
    city: "",
    country: "",
    noOfEmployees: "",
    annualRevenue: "",
    phoneNumber: "",
    email: "",
  };

  // =====================================================
  // STATES
  // =====================================================

  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);

  // =====================================================
  // CREATE / EDIT MODE
  // =====================================================

  const isEditMode = Boolean(company);

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
        };
      });

      console.log("User options:", userOptions);

      setUsers(userOptions);

      return userOptions;
    } catch (error) {
      console.error("Error fetching users:", error);

      setError("Failed to load company owners.");

      return [];
    }
  };

  // =====================================================
  // LOAD USERS WHEN DRAWER OPENS
  // =====================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    fetchUsers();
  }, [open]);

  // =====================================================
  // LOAD COMPANY DATA FOR EDIT
  // =====================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    // ===================================================
    // CREATE MODE
    // ===================================================

    if (!company) {
      setFormData(emptyForm);
      setError("");
      return;
    }

    // ===================================================
    // EDIT MODE
    // ===================================================

    const loadCompanyData = () => {
      try {
        setError("");

        console.log(
          "Loading company into edit form:",
          company
        );

        // =================================================
        // COMPANY OWNER ID
        // =================================================

        const ownerId =
          company.company_owner !== undefined &&
          company.company_owner !== null
            ? String(
                typeof company.company_owner === "object"
                  ? company.company_owner.id
                  : company.company_owner
              )
            : "";

        console.log(
          "Company Owner ID:",
          ownerId
        );

        console.log(
          "Company Owner Name:",
          company.company_owner_name
        );

        // =================================================
        // PHONE NUMBER
        // =================================================

        const phoneNumber =
          company.phone_number
            ? String(company.phone_number).trim()
            : "";

        // =================================================
        // SET FORM DATA
        // =================================================

        setFormData({
          domainName:
            company.domain_name || "",

          companyName:
            company.company_name || "",

          companyOwner:
            ownerId,

          industry:
            company.industry || "",

          type:
            company.type || "",

          city:
            company.city || "",

          country:
            company.country_region || "",

          noOfEmployees:
            company.no_of_employees ?? "",

          annualRevenue:
            company.annual_revenue ?? "",

          phoneNumber:
            phoneNumber,

          email:
            company.email || "",
        });
      } catch (error) {
        console.error(
          "Error loading company:",
          error
        );

        setError(
          "Failed to load company information."
        );
      }
    };

    loadCompanyData();
  }, [company, open]);

  // =====================================================
  // PHONE NUMBER VALIDATION
  // =====================================================

  const validatePhoneNumber = (phone) => {
    if (!phone) {
      return "Phone number is required.";
    }

    const phoneString = String(phone).trim();

    // ===================================================
    // UAE
    // +971 + 9 digits
    // Example: +971553074374
    // ===================================================

    if (phoneString.startsWith("+971")) {
      const localNumber = phoneString
        .substring(4)
        .replace(/\D/g, "");

      if (localNumber.length !== 9) {
        return "UAE phone number must contain exactly 9 digits.";
      }

      return "";
    }

    // ===================================================
    // INDIA
    // +91 + 10 digits
    // Example: +919876543210
    // ===================================================

    if (phoneString.startsWith("+91")) {
      const localNumber = phoneString
        .substring(3)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "India phone number must contain exactly 10 digits.";
      }

      return "";
    }

    // ===================================================
    // USA
    // +1 + 10 digits
    // Example: +11234567890
    // ===================================================

    if (phoneString.startsWith("+1")) {
      const localNumber = phoneString
        .substring(2)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "US phone number must contain exactly 10 digits.";
      }

      return "";
    }

    // ===================================================
    // UK
    // +44 + 10 digits
    // Example: +441234567890
    // ===================================================

    if (phoneString.startsWith("+44")) {
      const localNumber = phoneString
        .substring(3)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "UK phone number must contain exactly 10 digits.";
      }

      return "";
    }

    // ===================================================
    // UNKNOWN COUNTRY CODE
    // ===================================================

    const digitsOnly = phoneString.replace(/\D/g, "");

    if (digitsOnly.length < 9) {
      return "Please enter a valid phone number.";
    }

    return "";
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    // ===================================================
    // PHONE NUMBER
    // ===================================================

    if (name === "phoneNumber") {
      const phoneString = String(value || "");

      /*
       * PhoneInputField already handles:
       * - country code
       * - local number length
       * - numeric input
       *
       * So we should NOT limit the complete value to
       * 10 digits here because +971 contains 3 digits
       * and UAE local number contains 9 digits.
       */

      const cleanValue = phoneString.replace(/[^\d+]/g, "");

      setFormData((prev) => ({
        ...prev,
        phoneNumber: cleanValue,
      }));

      setError("");

      return;
    }

    // ===================================================
    // UPDATE FORM
    // ===================================================

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // CREATE / UPDATE COMPANY
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===================================================
    // PHONE VALIDATION
    // ===================================================

    const phoneError = validatePhoneNumber(
      formData.phoneNumber
    );

    if (phoneError) {
      setError(phoneError);
      return;
    }

    // ===================================================
    // OWNER VALIDATION
    // ===================================================

    if (!formData.companyOwner) {
      setError("Please select a company owner.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // =================================================
      // CLEAN PHONE NUMBER
      // =================================================

      const phoneNumber = String(
        formData.phoneNumber || ""
      ).trim();

      // =================================================
      // PAYLOAD
      // =================================================

      const payload = {
        domain_name:
          formData.domainName,

        company_name:
          formData.companyName,

        // Database receives USER ID
        company_owner:
          Number(formData.companyOwner),

        industry:
          formData.industry,

        type:
          formData.type,

        city:
          formData.city,

        country_region:
          formData.country,

        no_of_employees:
          formData.noOfEmployees
            ? Number(formData.noOfEmployees)
            : null,

        annual_revenue:
          formData.annualRevenue || null,

        phone_number:
          phoneNumber,

        email:
          formData.email,
      };

      console.log(
        "Company payload:",
        payload
      );

      // =================================================
      // UPDATE COMPANY
      // =================================================

      if (isEditMode) {
        console.log(
          "Updating company ID:",
          company.id
        );

        const response = await api.put(
          `/companies/${company.id}/`,
          payload
        );

        console.log(
          "Company updated:",
          response.data
        );
      }

      // =================================================
      // CREATE COMPANY
      // =================================================

      else {
        console.log(
          "Creating company"
        );

        const response = await api.post(
          "/companies/",
          payload
        );

        console.log(
          "Company created:",
          response.data
        );
      }

      // =================================================
      // REFRESH COMPANY LIST
      // =================================================

      if (onCompanyCreated) {
        await onCompanyCreated();
      }

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData(emptyForm);

      setError("");

      // =================================================
      // CLOSE DRAWER
      // =================================================

      onClose();
    } catch (error) {
      console.error(
        "Error saving company:",
        error
      );

      console.log(
        "Backend error:",
        error.response?.data
      );

      if (error.response?.data) {
        setError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setError(
          isEditMode
            ? "Failed to update company."
            : "Failed to create company."
        );
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
          width: 500,
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
              ? "Edit Company"
              : "Create Company"
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
              DOMAIN NAME
          ================================================= */}

          <CommonInput
            label="Domain Name"
            name="domainName"
            value={formData.domainName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          {/* =================================================
              COMPANY NAME
          ================================================= */}

          <CommonInput
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          {/* =================================================
              COMPANY OWNER
          ================================================= */}

          <CommonSelect
            label="Company Owner"
            name="companyOwner"
            value={formData.companyOwner}
            onChange={handleChange}
            placeholder="Choose Owner"
            options={users}
            required
          />

          {/* =================================================
              INDUSTRY + TYPE
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
              <CommonSelect
                label="Industry"
                required
                placeholder="Choose"
                options={[
                  "Legal Services",
                  "Healthcare",
                  "Real Estate",
                  "Marketing",
                ]}
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CommonSelect
                label="Type"
                required
                placeholder="Choose"
                options={[
                  "Private",
                  "Public",
                  "Startup",
                  "Enterprise",
                ]}
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* =================================================
              CITY + COUNTRY
          ================================================= */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <CommonInput
              label="City"
              placeholder="Enter"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <CommonInput
              label="Country/Region"
              placeholder="Enter"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Box>

          {/* =================================================
              EMPLOYEES + REVENUE
          ================================================= */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <CommonInput
              label="No of Employees"
              placeholder="Enter"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleChange}
            />

            <CommonInput
              label="Annual Revenue"
              placeholder="Enter"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
            />
          </Box>

          {/* =================================================
              PHONE
          ================================================= */}

          <PhoneInputField
            label="Phone Number"
            required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          {/* =================================================
              EMAIL
          ================================================= */}

          <CommonInput
            label="Email"
            required
            placeholder="Enter"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          {/* =================================================
              CANCEL
          ================================================= */}

          <CommonButton
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          {/* =================================================
              SAVE / UPDATE
          ================================================= */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update"
              : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
