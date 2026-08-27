

// import React, { useState, useEffect } from "react";
// import { Drawer, Box, Grid } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import PhoneInputField from "../../../Components/common/PhoneInputField";
// import CommonSelect from "../../../Components/common/CommonSelect";

// import api from "../../../services/api";

// export default function CreateCompanyDrawer({
//   open,
//   onClose,
//   onCompanyCreated,
//   company,
// }) {
//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     domainName: "",
//     companyName: "",
//     companyOwner: "",
//     industry: "",
//     type: "",
//     city: "",
//     country: "",
//     noOfEmployees: "",
//     annualRevenue: "",
//     phoneNumber: "",
//     email: "",
//   });

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);

//   // =====================================================
//   // FETCH USERS FOR COMPANY OWNER DROPDOWN
//   // =====================================================

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       const userOptions = response.data.map((user) => {
//         const fullName =
//           `${user.first_name || ""} ${user.last_name || ""}`.trim();

//         return {
//           value: user.id, // Stored internally
//           label: fullName || user.email, // Displayed to user
//         };
//       });

//       setUsers(userOptions);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError("Failed to load company owners.");
//     }
//   };

//   // Fetch users when drawer opens
//   useEffect(() => {
//     if (open) {
//       fetchUsers();
//     }
//   }, [open]);

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // CREATE COMPANY
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       // Convert frontend fields to Django fields
//       const payload = {
//         domain_name: formData.domainName,
//         company_name: formData.companyName,
//         company_owner: Number(formData.companyOwner),
//         industry: formData.industry,
//         type: formData.type,
//         city: formData.city,
//         country_region: formData.country,
//         no_of_employees: formData.noOfEmployees
//           ? Number(formData.noOfEmployees)
//           : null,
//         annual_revenue: formData.annualRevenue || null,
//         phone_number: formData.phoneNumber,
//         email: formData.email,
//       };

//       console.log("Company POST data:", payload);

//       // POST COMPANY API
//       const response = await api.post("/companies/", payload);

//       console.log("Company created:", response.data);

//       // Refresh company list
//       if (onCompanyCreated) {
//         await onCompanyCreated();
//       }

//       // Clear form
//       setFormData({
//         domainName: "",
//         companyName: "",
//         companyOwner: "",
//         industry: "",
//         type: "",
//         city: "",
//         country: "",
//         noOfEmployees: "",
//         annualRevenue: "",
//         phoneNumber: "",
//         email: "",
//       });

//       // Close drawer
//       onClose();
//     } catch (error) {
//       console.error("Error creating company:", error);

//       if (error.response?.data) {
//         console.log("Backend error:", error.response.data);
//         setError(JSON.stringify(error.response.data));
//       } else {
//         setError("Failed to create company.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* HEADER */}
//         <DrawerHeader title="Create Company" onClose={onClose} />

//         {/* FORM */}
//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             overflowY: "auto",
//           }}
//         >
//           {/* ERROR */}
//           {error && (
//             <Box
//               sx={{
//                 color: "red",
//                 fontSize: "14px",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* DOMAIN NAME */}
//           <CommonInput
//             label="Domain Name"
//             name="domainName"
//             value={formData.domainName}
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//           />

//           {/* COMPANY NAME */}
//           <CommonInput
//             label="Company Name"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//           />

//           {/* COMPANY OWNER */}
//           <CommonSelect
//             label="Company Owner"
//             name="companyOwner"
//             value={formData.companyOwner}
//             onChange={handleChange}
//             placeholder="Choose Owner"
//             options={users}
//             required
//           />

//           {/* INDUSTRY + TYPE */}
//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <CommonSelect
//                 label="Industry"
//                 required
//                 placeholder="Choose"
//                 options={[
//                   "Legal Services",
//                   "Healthcare",
//                   "Real Estate",
//                   "Marketing",
//                 ]}
//                 name="industry"
//                 value={formData.industry}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <CommonSelect
//                 label="Type"
//                 required
//                 placeholder="Choose"
//                 options={[
//                   "Private",
//                   "Public",
//                   "Startup",
//                   "Enterprise",
//                 ]}
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           {/* CITY + COUNTRY */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <CommonInput
//               label="City"
//               placeholder="Enter"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//             />

//             <CommonInput
//               label="Country/Region"
//               placeholder="Enter"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//             />
//           </Box>

//           {/* EMPLOYEES + REVENUE */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <CommonInput
//               label="No of Employees"
//               placeholder="Enter"
//               name="noOfEmployees"
//               value={formData.noOfEmployees}
//               onChange={handleChange}
//             />

//             <CommonInput
//               label="Annual Revenue"
//               placeholder="Enter"
//               name="annualRevenue"
//               value={formData.annualRevenue}
//               onChange={handleChange}
//             />
//           </Box>

//           {/* PHONE */}
//           <PhoneInputField
//             label="Phone Number"
//             required
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//           />

//           {/* EMAIL */}
//           <CommonInput
//             label="Email"
//             required
//             placeholder="Enter"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </Box>

//         {/* FOOTER */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop: "1px solid #E5E7EB",
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton type="submit" fullWidth disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }


// import React, {
//   useState,
//   useEffect,
// } from "react";

// import {
//   Drawer,
//   Box,
//   Grid,
// } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import PhoneInputField from "../../../Components/common/PhoneInputField";
// import CommonSelect from "../../../Components/common/CommonSelect";

// import api from "../../../services/api";

// export default function CreateCompanyDrawer({
//   open,
//   onClose,
//   onCompanyCreated,
//   company,
// }) {
//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     domainName: "",
//     companyName: "",
//     companyOwner: "",
//     industry: "",
//     type: "",
//     city: "",
//     country: "",
//     noOfEmployees: "",
//     annualRevenue: "",
//     phoneNumber: "",
//     email: "",
//   });

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);

//   // =====================================================
//   // CHECK CREATE / EDIT MODE
//   // =====================================================

//   const isEditMode = Boolean(company);

//   // =====================================================
//   // EMPTY FORM
//   // =====================================================

//   const emptyForm = {
//     domainName: "",
//     companyName: "",
//     companyOwner: "",
//     industry: "",
//     type: "",
//     city: "",
//     country: "",
//     noOfEmployees: "",
//     annualRevenue: "",
//     phoneNumber: "",
//     email: "",
//   };

//   // =====================================================
//   // FETCH USERS
//   // =====================================================

//   const fetchUsers = async () => {
//     try {
//       const response =
//         await api.get("/accounts/users/");

//       const userOptions = response.data.map(
//         (user) => {
//           const fullName =
//             `${user.first_name || ""} ${
//               user.last_name || ""
//             }`.trim();

//           return {
//             value: user.id,
//             label:
//               fullName || user.email,
//           };
//         }
//       );

//       setUsers(userOptions);
//     } catch (error) {
//       console.error(
//         "Error fetching users:",
//         error
//       );

//       setError(
//         "Failed to load company owners."
//       );
//     }
//   };

//   // =====================================================
//   // FETCH USERS WHEN DRAWER OPENS
//   // =====================================================

//   useEffect(() => {
//     if (open) {
//       fetchUsers();
//     }
//   }, [open]);

//   // =====================================================
//   // LOAD COMPANY DATA WHEN EDITING
//   // =====================================================

//   useEffect(() => {
//     if (company) {
//       console.log(
//         "Loading company into form:",
//         company
//       );

//       setFormData({
//         domainName:
//           company.domain_name || "",

//         companyName:
//           company.company_name || "",

//         companyOwner:
//           company.company_owner || "",

//         industry:
//           company.industry || "",

//         type:
//           company.type || "",

//         city:
//           company.city || "",

//         country:
//           company.country_region || "",

//         noOfEmployees:
//           company.no_of_employees ?? "",

//         annualRevenue:
//           company.annual_revenue ?? "",

//         phoneNumber:
//           company.phone_number || "",

//         email:
//           company.email || "",
//       });
//     } else {
//       // Create mode
//       setFormData(emptyForm);
//     }

//     // Clear previous errors
//     setError("");
//   }, [company, open]);

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // CREATE / UPDATE COMPANY
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // PAYLOAD
//       // =================================================

//       const payload = {
//         domain_name:
//           formData.domainName,

//         company_name:
//           formData.companyName,

//         company_owner:
//           Number(formData.companyOwner),

//         industry:
//           formData.industry,

//         type:
//           formData.type,

//         city:
//           formData.city,

//         country_region:
//           formData.country,

//         no_of_employees:
//           formData.noOfEmployees
//             ? Number(
//                 formData.noOfEmployees
//               )
//             : null,

//         annual_revenue:
//           formData.annualRevenue || null,

//         phone_number:
//           formData.phoneNumber,

//         email:
//           formData.email,
//       };

//       console.log(
//         "Company payload:",
//         payload
//       );

//       // =================================================
//       // EDIT
//       // =================================================

//       if (isEditMode) {
//         console.log(
//           "Updating company:",
//           company.id
//         );

//         const response =
//           await api.put(
//             `/companies/${company.id}/`,
//             payload
//           );

//         console.log(
//           "Company updated:",
//           response.data
//         );
//       }

//       // =================================================
//       // CREATE
//       // =================================================

//       else {
//         console.log(
//           "Creating company"
//         );

//         const response =
//           await api.post(
//             "/companies/",
//             payload
//           );

//         console.log(
//           "Company created:",
//           response.data
//         );
//       }

//       // =================================================
//       // REFRESH COMPANY LIST
//       // =================================================

//       if (onCompanyCreated) {
//         await onCompanyCreated();
//       }

//       // =================================================
//       // CLEAR FORM
//       // =================================================

//       setFormData(emptyForm);

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================

//       onClose();
//     } catch (error) {
//       console.error(
//         "Error saving company:",
//         error
//       );

//       console.log(
//         "Backend error:",
//         error.response?.data
//       );

//       if (error.response?.data) {
//         setError(
//           JSON.stringify(
//             error.response.data
//           )
//         );
//       } else {
//         setError(
//           isEditMode
//             ? "Failed to update company."
//             : "Failed to create company."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <DrawerHeader
//           title={
//             isEditMode
//               ? "Edit Company"
//               : "Create Company"
//           }
//           onClose={onClose}
//         />

//         {/* =================================================
//             FORM
//         ================================================= */}

//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             overflowY: "auto",
//           }}
//         >
//           {/* ERROR */}

//           {error && (
//             <Box
//               sx={{
//                 color: "red",
//                 fontSize: "14px",
//                 wordBreak: "break-word",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* DOMAIN NAME */}

//           <CommonInput
//             label="Domain Name"
//             name="domainName"
//             value={
//               formData.domainName
//             }
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//           />

//           {/* COMPANY NAME */}

//           <CommonInput
//             label="Company Name"
//             name="companyName"
//             value={
//               formData.companyName
//             }
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//           />

//           {/* COMPANY OWNER */}

//           <CommonSelect
//             label="Company Owner"
//             name="companyOwner"
//             value={
//               formData.companyOwner
//             }
//             onChange={handleChange}
//             placeholder="Choose Owner"
//             options={users}
//             required
//           />

//           {/* INDUSTRY + TYPE */}

//           <Grid
//             container
//             spacing={2}
//           >
//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <CommonSelect
//                 label="Industry"
//                 required
//                 placeholder="Choose"
//                 options={[
//                   "Legal Services",
//                   "Healthcare",
//                   "Real Estate",
//                   "Marketing",
//                 ]}
//                 name="industry"
//                 value={
//                   formData.industry
//                 }
//                 onChange={
//                   handleChange
//                 }
//               />
//             </Grid>

//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <CommonSelect
//                 label="Type"
//                 required
//                 placeholder="Choose"
//                 options={[
//                   "Private",
//                   "Public",
//                   "Startup",
//                   "Enterprise",
//                 ]}
//                 name="type"
//                 value={
//                   formData.type
//                 }
//                 onChange={
//                   handleChange
//                 }
//               />
//             </Grid>
//           </Grid>

//           {/* CITY + COUNTRY */}

//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <CommonInput
//               label="City"
//               placeholder="Enter"
//               name="city"
//               value={
//                 formData.city
//               }
//               onChange={
//                 handleChange
//               }
//             />

//             <CommonInput
//               label="Country/Region"
//               placeholder="Enter"
//               name="country"
//               value={
//                 formData.country
//               }
//               onChange={
//                 handleChange
//               }
//             />
//           </Box>

//           {/* EMPLOYEES + REVENUE */}

//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <CommonInput
//               label="No of Employees"
//               placeholder="Enter"
//               name="noOfEmployees"
//               value={
//                 formData.noOfEmployees
//               }
//               onChange={
//                 handleChange
//               }
//             />

//             <CommonInput
//               label="Annual Revenue"
//               placeholder="Enter"
//               name="annualRevenue"
//               value={
//                 formData.annualRevenue
//               }
//               onChange={
//                 handleChange
//               }
//             />
//           </Box>

//           {/* PHONE */}

//           <PhoneInputField
//             label="Phone Number"
//             required
//             name="phoneNumber"
//             value={
//               formData.phoneNumber
//             }
//             onChange={
//               handleChange
//             }
//           />

//           {/* EMAIL */}

//           <CommonInput
//             label="Email"
//             required
//             placeholder="Enter"
//             name="email"
//             value={
//               formData.email
//             }
//             onChange={
//               handleChange
//             }
//           />
//         </Box>

//         {/* =================================================
//             FOOTER
//         ================================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop:
//               "1px solid #E5E7EB",
//           }}
//         >
//           {/* CANCEL */}

//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           {/* SAVE / UPDATE */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={loading}
//           >
//             {loading
//               ? "Saving..."
//               : isEditMode
//               ? "Update"
//               : "Save"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }



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
    if (open) {
      fetchUsers();
    }
  }, [open]);

  // =====================================================
  // LOAD COMPANY DATA FOR EDIT
  // =====================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    // -----------------------------------------------------
    // CREATE MODE
    // -----------------------------------------------------

    if (!company) {
      setFormData(emptyForm);
      setError("");
      return;
    }

    // -----------------------------------------------------
    // EDIT MODE
    // -----------------------------------------------------

    const loadCompanyData = async () => {
      try {
        setError("");

        console.log("Loading company into form:", company);

        // =================================================
        // IMPORTANT
        // company.company_owner is currently the NAME
        // Example: "Aron Paul"
        //
        // CommonSelect needs the USER ID
        // Example: "13"
        // =================================================

        let ownerId = "";

        // -------------------------------------------------
        // If backend gives owner ID directly
        // -------------------------------------------------

        if (
          company.company_owner_id !== undefined &&
          company.company_owner_id !== null
        ) {
          ownerId = String(company.company_owner_id);
        }

        // -------------------------------------------------
        // Otherwise find ID using owner name
        // -------------------------------------------------

        else if (company.company_owner) {
          let userOptions = users;

          // If users are not loaded yet, fetch them
          if (userOptions.length === 0) {
            userOptions = await fetchUsers();
          }

          const ownerName = String(
            company.company_owner
          )
            .trim()
            .toLowerCase();

          const matchedUser = userOptions.find(
            (user) =>
              String(user.label)
                .trim()
                .toLowerCase() === ownerName
          );

          if (matchedUser) {
            ownerId = String(matchedUser.value);
          } else {
            console.warn(
              "Company owner not found in users:",
              company.company_owner
            );
          }
        }

        console.log("Owner ID for edit:", ownerId);

        // =================================================
        // SET FORM
        // =================================================

        setFormData({
          domainName: company.domain_name || "",

          companyName: company.company_name || "",

          companyOwner: ownerId,

          industry: company.industry || "",

          type: company.type || "",

          city: company.city || "",

          country: company.country_region || "",

          noOfEmployees:
            company.no_of_employees ?? "",

          annualRevenue:
            company.annual_revenue ?? "",

          phoneNumber:
            company.phone_number || "",

          email: company.email || "",
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

  // Remove spaces, -, (, ), etc.
  const digitsOnly = phone.replace(/\D/g, "");

  // Exactly 10 digits
  if (digitsOnly.length !== 10) {
    return "Phone number must contain exactly 10 digits.";
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

    if (name === "phoneNumber") {
    const digitsOnly = value.replace(/\D/g, "");

    // Don't allow more than 10 digits
    if (digitsOnly.length > 10) {
      return;
    }
  }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE / UPDATE COMPANY
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    // PHONE VALIDATION


  const phoneError = validatePhoneNumber(formData.phoneNumber);

  if (phoneError) {
    setError(phoneError);
    return;
  }

    try {
      setLoading(true);
      setError("");

      // =================================================
      // VALIDATE OWNER
      // =================================================

      if (!formData.companyOwner) {
        setError("Please select a company owner.");
        setLoading(false);
        return;
      }

      // =================================================
      // PAYLOAD
      // =================================================

      const payload = {
        domain_name: formData.domainName,

        company_name: formData.companyName,

        company_owner: Number(
          formData.companyOwner
        ),

        industry: formData.industry,

        type: formData.type,

        city: formData.city,

        country_region: formData.country,

        no_of_employees:
          formData.noOfEmployees
            ? Number(formData.noOfEmployees)
            : null,

        annual_revenue:
          formData.annualRevenue || null,

        phone_number:
          formData.phoneNumber,

        email:
          formData.email,
      };

      console.log("Company payload:", payload);

      // =================================================
      // UPDATE
      // =================================================

      if (isEditMode) {
        console.log(
          "Updating company:",
          company.id
        );

        // Your Django view supports PUT
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
      // CREATE
      // =================================================

      else {
        console.log("Creating company");

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

          {/* DOMAIN NAME */}

          <CommonInput
            label="Domain Name"
            name="domainName"
            value={formData.domainName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          {/* COMPANY NAME */}

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

          {/* INDUSTRY + TYPE */}

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

          {/* CITY + COUNTRY */}

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

          {/* EMPLOYEES + REVENUE */}

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

          {/* PHONE */}

          <PhoneInputField
            label="Phone Number"
            required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          {/* EMAIL */}

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
              : "Save"}
          </CommonButton>

        </Box>

      </Box>
    </Drawer>
  );
}