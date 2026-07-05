import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";

export default function CreateLeadsDrawer({ open, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    jobTitle: "",
    contactOwner: "",
    leadStatus: "",
    products: "",
    company: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
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
        <DrawerHeader title="Create Lead" onClose={onClose} />

        {/* FORM */}
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
          {/* Email */}
          <CommonInput
            label="Email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            placeholder="🖂 Enter"
          />

          {/* First Name */}
          <CommonInput
            label="First Name"
             required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* Last Name */}
          <CommonInput
            label="Last Name"
             required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* Phone */}
          <PhoneInputField
            label="Phone Number"
             required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter"
          />

          {/* Job Title */}
          <CommonInput
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* Contact Owner */}
          <CommonSelect
            label="Contact Owner"
            name="contactOwner"
            value={formData.contactOwner}
            onChange={handleChange}
            options={["Admin", "Sales Rep", "Manager"]}
          />

          {/* Lead Status */}
          <CommonSelect
            label="Lead Status"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            options={["New", "Open", "In Progress", "Closed"]}
          />

          {/* Products */}
          <CommonSelect
            label="Products"
            name="products"
            value={formData.products}
            onChange={handleChange}
             options={["CRM Software", "Marketing Tool", "Analytics Tool"]}
           
          />

          {/* Company TYPE (label added + dropdown type) */}
          <CommonSelect
            label="Company Type"
            name="company"
            value={formData.company}
            onChange={handleChange}
            options={["Startup", "Enterprise", "Private", "Public"]}
          />

          {/* City TYPE (label added + dropdown type) */}
          <CommonSelect
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            options={["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]}
          />

        </Box>

        {/* FOOTER */}
        <Box sx={{ display: "flex", gap: 2, p: 3, borderTop: "1px solid #E5E7EB" }}>
          <CommonButton variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </CommonButton>

          <CommonButton type="submit" fullWidth>
            Save Lead
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
