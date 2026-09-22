

// // import React, { useState, useEffect, useCallback } from "react";

// // import {
// //   Drawer,
// //   Box,
// //   Grid,
// // } from "@mui/material";

// // import DrawerHeader from "../../../Components/common/DrawerHeader";
// // import CommonInput from "../../../Components/common/CommonInput";
// // import CommonButton from "../../../Components/common/CommonButton";
// // import PhoneInputField from "../../../Components/common/PhoneInputField";
// // import CommonSelect from "../../../Components/common/CommonSelect";

// // import api from "../../../services/api";

// // export default function CreateCompanyDrawer({
// //   open,
// //   onClose,
// //   onCompanyCreated,
// //   company,
// // }) {
// //   // =====================================================
// //   // EMPTY FORM
// //   // =====================================================

// //   const emptyForm = {
// //     domainName: "",
// //     companyName: "",
// //     companyOwner: "",
// //     industry: "",
// //     type: "",
// //     city: "",
// //     country: "",
// //     noOfEmployees: "",
// //     annualRevenue: "",
// //     phoneNumber: "",
// //     email: "",
// //   };

// //   // =====================================================
// //   // STATES
// //   // =====================================================

// //   const [formData, setFormData] = useState(emptyForm);

// //   const [loading, setLoading] = useState(false);

// //   const [error, setError] = useState("");

// //   const [users, setUsers] = useState([]);

// //   // =====================================================
// //   // CREATE / EDIT MODE
// //   // =====================================================

// //   const isEditMode = Boolean(company);

// //   // =====================================================
// //   // FETCH USERS
// //   // =====================================================

// //   const fetchUsers = useCallback(async () => {
// //     try {
// //       const response = await api.get("/accounts/users/");

// //       console.log("========== USERS API RESPONSE ==========");
// //       console.log("Users response:", response.data);

// //       // =================================================
// //       // SAFE API RESPONSE
// //       // =================================================

// //       let userData = [];

// //       if (Array.isArray(response.data)) {
// //         userData = response.data;
// //       } else if (Array.isArray(response.data?.data)) {
// //         userData = response.data.data;
// //       } else {
// //         console.warn(
// //           "Unexpected users API response format:",
// //           response.data
// //         );
// //       }

// //       console.log("Users array:", userData);

// //       // =================================================
// //       // FILTER ACTIVE USERS + MAP OPTIONS
// //       // =================================================

// //       const userOptions = userData
// //         .filter((user) => user?.is_active !== false)
// //         .map((user) => {
// //           const fullName =
// //             `${user?.first_name || ""} ${
// //               user?.last_name || ""
// //             }`.trim();

// //           return {
// //             value: String(user.id),
// //             label: fullName || user.email || `User ${user.id}`,
// //           };
// //         });

// //       console.log(
// //         "========== COMPANY OWNER OPTIONS =========="
// //       );

// //       console.log(
// //         "Company owner options:",
// //         userOptions
// //       );

// //       // =================================================
// //       // CHECK ESHaan
// //       // =================================================

// //       const eshaan = userOptions.find(
// //         (user) => String(user.value) === "20"
// //       );

// //       console.log(
// //         "Eshaan Muhammed option:",
// //         eshaan
// //       );

// //       // =================================================
// //       // SAVE USERS
// //       // =================================================

// //       setUsers(userOptions);

// //       return userOptions;
// //     } catch (error) {
// //       console.error(
// //         "Error fetching users:",
// //         error
// //       );

// //       console.error(
// //         "Users API error response:",
// //         error?.response?.data
// //       );

// //       setUsers([]);

// //       setError(
// //         "Failed to load company owners."
// //       );

// //       return [];
// //     }
// //   }, []);

// //   // =====================================================
// //   // LOAD USERS WHEN DRAWER OPENS
// //   // =====================================================

// //   useEffect(() => {
// //     if (!open) {
// //       return;
// //     }

// //     fetchUsers();
// //   }, [open, fetchUsers]);

// //   // =====================================================
// //   // LOAD COMPANY DATA FOR EDIT
// //   // =====================================================

// //   useEffect(() => {
// //     if (!open) {
// //       return;
// //     }

// //     // ===================================================
// //     // CREATE MODE
// //     // ===================================================

// //     if (!company) {
// //       setFormData(emptyForm);
// //       setError("");
// //       return;
// //     }

// //     // ===================================================
// //     // EDIT MODE
// //     // ===================================================

// //     const loadCompanyData = () => {
// //       try {
// //         setError("");

// //         console.log(
// //           "========== EDIT COMPANY =========="
// //         );

// //         console.log(
// //           "Loading company into edit form:",
// //           company
// //         );

// //         // =================================================
// //         // COMPANY OWNER ID
// //         // =================================================

// //         let ownerId = "";

// //         if (
// //           company.company_owner !== undefined &&
// //           company.company_owner !== null
// //         ) {
// //           if (
// //             typeof company.company_owner === "object"
// //           ) {
// //             ownerId =
// //               company.company_owner?.id !== undefined &&
// //               company.company_owner?.id !== null
// //                 ? String(
// //                     company.company_owner.id
// //                   )
// //                 : "";
// //           } else {
// //             ownerId = String(
// //               company.company_owner
// //             );
// //           }
// //         }

// //         console.log(
// //           "Company Owner ID:",
// //           ownerId
// //         );

// //         console.log(
// //           "Company Owner Name:",
// //           company.company_owner_name
// //         );

// //         // =================================================
// //         // PHONE NUMBER
// //         // =================================================

// //         const phoneNumber =
// //           company.phone_number
// //             ? String(
// //                 company.phone_number
// //               ).trim()
// //             : "";

// //         // =================================================
// //         // SET FORM DATA
// //         // =================================================

// //         setFormData({
// //           domainName:
// //             company.domain_name || "",

// //           companyName:
// //             company.company_name || "",

// //           companyOwner:
// //             ownerId,

// //           industry:
// //             company.industry || "",

// //           type:
// //             company.type || "",

// //           city:
// //             company.city || "",

// //           country:
// //             company.country_region || "",

// //           noOfEmployees:
// //             company.no_of_employees ?? "",

// //           annualRevenue:
// //             company.annual_revenue ?? "",

// //           phoneNumber:
// //             phoneNumber,

// //           email:
// //             company.email || "",
// //         });
// //       } catch (error) {
// //         console.error(
// //           "Error loading company:",
// //           error
// //         );

// //         setError(
// //           "Failed to load company information."
// //         );
// //       }
// //     };

// //     loadCompanyData();
// //   }, [company, open]);

// //   // =====================================================
// //   // PHONE NUMBER VALIDATION
// //   // =====================================================

// //   const validatePhoneNumber = (phone) => {
// //     if (!phone) {
// //       return "Phone number is required.";
// //     }

// //     const phoneString = String(phone).trim();

// //     // ===================================================
// //     // UAE
// //     // +971 + 9 digits
// //     // ===================================================

// //     if (phoneString.startsWith("+971")) {
// //       const localNumber = phoneString
// //         .substring(4)
// //         .replace(/\D/g, "");

// //       if (localNumber.length !== 9) {
// //         return "UAE phone number must contain exactly 9 digits.";
// //       }

// //       return "";
// //     }

// //     // ===================================================
// //     // INDIA
// //     // +91 + 10 digits
// //     // ===================================================

// //     if (phoneString.startsWith("+91")) {
// //       const localNumber = phoneString
// //         .substring(3)
// //         .replace(/\D/g, "");

// //       if (localNumber.length !== 10) {
// //         return "India phone number must contain exactly 10 digits.";
// //       }

// //       return "";
// //     }

// //     // ===================================================
// //     // USA
// //     // +1 + 10 digits
// //     // ===================================================

// //     if (phoneString.startsWith("+1")) {
// //       const localNumber = phoneString
// //         .substring(2)
// //         .replace(/\D/g, "");

// //       if (localNumber.length !== 10) {
// //         return "US phone number must contain exactly 10 digits.";
// //       }

// //       return "";
// //     }

// //     // ===================================================
// //     // UK
// //     // +44 + 10 digits
// //     // ===================================================

// //     if (phoneString.startsWith("+44")) {
// //       const localNumber = phoneString
// //         .substring(3)
// //         .replace(/\D/g, "");

// //       if (localNumber.length !== 10) {
// //         return "UK phone number must contain exactly 10 digits.";
// //       }

// //       return "";
// //     }

// //     // ===================================================
// //     // UNKNOWN COUNTRY CODE
// //     // ===================================================

// //     const digitsOnly =
// //       phoneString.replace(/\D/g, "");

// //     if (digitsOnly.length < 9) {
// //       return "Please enter a valid phone number.";
// //     }

// //     return "";
// //   };

// //   // =====================================================
// //   // HANDLE INPUT CHANGE
// //   // =====================================================

// //   const handleChange = (e) => {
// //     const {
// //       name,
// //       value,
// //     } = e.target;

// //     // ===================================================
// //     // PHONE NUMBER
// //     // ===================================================

// //     if (name === "phoneNumber") {
// //       const phoneString =
// //         String(value || "");

// //       const cleanValue =
// //         phoneString.replace(
// //           /[^\d+]/g,
// //           ""
// //         );

// //       setFormData((prev) => ({
// //         ...prev,
// //         phoneNumber: cleanValue,
// //       }));

// //       setError("");

// //       return;
// //     }

// //     // ===================================================
// //     // COMPANY OWNER
// //     // ===================================================

// //     if (name === "companyOwner") {
// //       const ownerValue =
// //         value === null ||
// //         value === undefined
// //           ? ""
// //           : String(value);

// //       console.log(
// //         "Selected Company Owner:",
// //         ownerValue
// //       );

// //       const selectedOwner =
// //         users.find(
// //           (user) =>
// //             String(user.value) ===
// //             ownerValue
// //         );

// //       console.log(
// //         "Selected Owner Details:",
// //         selectedOwner
// //       );

// //       setFormData((prev) => ({
// //         ...prev,
// //         companyOwner: ownerValue,
// //       }));

// //       setError("");

// //       return;
// //     }

// //     // ===================================================
// //     // UPDATE FORM
// //     // ===================================================

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));

// //     setError("");
// //   };

// //   // =====================================================
// //   // CREATE / UPDATE COMPANY
// //   // =====================================================

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // ===================================================
// //     // PHONE VALIDATION
// //     // ===================================================

// //     const phoneError =
// //       validatePhoneNumber(
// //         formData.phoneNumber
// //       );

// //     if (phoneError) {
// //       setError(phoneError);
// //       return;
// //     }

// //     // ===================================================
// //     // OWNER VALIDATION
// //     // ===================================================

// //     if (!formData.companyOwner) {
// //       setError(
// //         "Please select a company owner."
// //       );
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");

// //       // =================================================
// //       // CLEAN PHONE NUMBER
// //       // =================================================

// //       const phoneNumber =
// //         String(
// //           formData.phoneNumber || ""
// //         ).trim();

// //       // =================================================
// //       // PAYLOAD
// //       // =================================================

// //       const payload = {
// //         domain_name:
// //           formData.domainName,

// //         company_name:
// //           formData.companyName,

// //         company_owner:
// //           Number(
// //             formData.companyOwner
// //           ),

// //         industry:
// //           formData.industry,

// //         type:
// //           formData.type,

// //         city:
// //           formData.city,

// //         country_region:
// //           formData.country,

// //         no_of_employees:
// //           formData.noOfEmployees
// //             ? Number(
// //                 formData.noOfEmployees
// //               )
// //             : null,

// //         annual_revenue:
// //           formData.annualRevenue || null,

// //         phone_number:
// //           phoneNumber,

// //         email:
// //           formData.email,
// //       };

// //       console.log(
// //         "========== COMPANY PAYLOAD =========="
// //       );

// //       console.log(
// //         "Company payload:",
// //         payload
// //       );

// //       // =================================================
// //       // UPDATE COMPANY
// //       // =================================================

// //       if (isEditMode) {
// //         console.log(
// //           "Updating company ID:",
// //           company.id
// //         );

// //         const response =
// //           await api.put(
// //             `/companies/${company.id}/`,
// //             payload
// //           );

// //         console.log(
// //           "Company updated:",
// //           response.data
// //         );
// //       }

// //       // =================================================
// //       // CREATE COMPANY
// //       // =================================================

// //       else {
// //         console.log(
// //           "Creating company"
// //         );

// //         const response =
// //           await api.post(
// //             "/companies/",
// //             payload
// //           );

// //         console.log(
// //           "Company created:",
// //           response.data
// //         );
// //       }

// //       // =================================================
// //       // REFRESH COMPANY LIST
// //       // =================================================

// //       if (onCompanyCreated) {
// //         await onCompanyCreated();
// //       }

// //       // =================================================
// //       // CLEAR FORM
// //       // =================================================

// //       setFormData(emptyForm);

// //       setError("");

// //       // =================================================
// //       // CLOSE DRAWER
// //       // =================================================

// //       onClose();
// //     } catch (error) {
// //       console.error(
// //         "Error saving company:",
// //         error
// //       );

// //       console.error(
// //         "Backend error:",
// //         error?.response?.data
// //       );

// //       if (error?.response?.data) {
// //         setError(
// //           JSON.stringify(
// //             error.response.data
// //           )
// //         );
// //       } else {
// //         setError(
// //           isEditMode
// //             ? "Failed to update company."
// //             : "Failed to create company."
// //         );
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // =====================================================
// //   // UI
// //   // =====================================================

// //   return (
// //     <Drawer
// //       anchor="right"
// //       open={open}
// //       onClose={onClose}
// //     >
// //       <Box
// //         component="form"
// //         onSubmit={handleSubmit}
// //         sx={{
// //           width: 500,
// //           height: "100%",
// //           display: "flex",
// //           flexDirection: "column",
// //           bgcolor: "#fff",
// //         }}
// //       >
// //         {/* =================================================
// //             HEADER
// //         ================================================= */}

// //         <DrawerHeader
// //           title={
// //             isEditMode
// //               ? "Edit Company"
// //               : "Create Company"
// //           }
// //           onClose={onClose}
// //         />

// //         {/* =================================================
// //             FORM
// //         ================================================= */}

// //         <Box
// //           sx={{
// //             flex: 1,
// //             p: 3,
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: 2,
// //             overflowY: "auto",
// //           }}
// //         >
// //           {/* =================================================
// //               ERROR
// //           ================================================= */}

// //           {error && (
// //             <Box
// //               sx={{
// //                 color: "red",
// //                 fontSize: "14px",
// //                 wordBreak:
// //                   "break-word",
// //               }}
// //             >
// //               {error}
// //             </Box>
// //           )}

// //           {/* =================================================
// //               DOMAIN NAME
// //           ================================================= */}

// //           <CommonInput
// //             label="Domain Name"
// //             name="domainName"
// //             value={
// //               formData.domainName
// //             }
// //             onChange={handleChange}
// //             placeholder="Enter"
// //             fullWidth
// //             required
// //           />

// //           {/* =================================================
// //               COMPANY NAME
// //           ================================================= */}

// //           <CommonInput
// //             label="Company Name"
// //             name="companyName"
// //             value={
// //               formData.companyName
// //             }
// //             onChange={handleChange}
// //             placeholder="Enter"
// //             fullWidth
// //             required
// //           />

// //           {/* =================================================
// //               COMPANY OWNER
// //           ================================================= */}

// //           <CommonSelect
// //             label="Company Owner"
// //             name="companyOwner"
// //             value={
// //               formData.companyOwner
// //             }
// //             onChange={handleChange}
// //             placeholder="Choose Owner"
// //             options={users}
// //             required
// //           />

// //           {/* =================================================
// //               INDUSTRY + TYPE
// //           ================================================= */}

// //           <Grid
// //             container
// //             spacing={2}
// //           >
// //             <Grid
// //               size={{
// //                 xs: 12,
// //                 md: 6,
// //               }}
// //             >
// //               <CommonSelect
// //                 label="Industry"
// //                 required
// //                 placeholder="Choose"
// //                 options={[
// //                   "Legal Services",
// //                   "Healthcare",
// //                   "Real Estate",
// //                   "Marketing",
// //                 ]}
// //                 name="industry"
// //                 value={
// //                   formData.industry
// //                 }
// //                 onChange={handleChange}
// //               />
// //             </Grid>

// //             <Grid
// //               size={{
// //                 xs: 12,
// //                 md: 6,
// //               }}
// //             >
// //               <CommonSelect
// //                 label="Type"
// //                 required
// //                 placeholder="Choose"
// //                 options={[
// //                   "Private",
// //                   "Public",
// //                   "Startup",
// //                   "Enterprise",
// //                 ]}
// //                 name="type"
// //                 value={
// //                   formData.type
// //                 }
// //                 onChange={handleChange}
// //               />
// //             </Grid>
// //           </Grid>

// //           {/* =================================================
// //               CITY + COUNTRY
// //           ================================================= */}

// //           <Box
// //             sx={{
// //               display: "flex",
// //               gap: 2,
// //             }}
// //           >
// //             <CommonInput
// //               label="City"
// //               placeholder="Enter"
// //               name="city"
// //               value={
// //                 formData.city
// //               }
// //               onChange={
// //                 handleChange
// //               }
// //             />

// //             <CommonInput
// //               label="Country/Region"
// //               placeholder="Enter"
// //               name="country"
// //               value={
// //                 formData.country
// //               }
// //               onChange={
// //                 handleChange
// //               }
// //             />
// //           </Box>

// //           {/* =================================================
// //               EMPLOYEES + REVENUE
// //           ================================================= */}

// //           <Box
// //             sx={{
// //               display: "flex",
// //               gap: 2,
// //             }}
// //           >
// //             <CommonInput
// //               label="No of Employees"
// //               placeholder="Enter"
// //               name="noOfEmployees"
// //               value={
// //                 formData.noOfEmployees
// //               }
// //               onChange={
// //                 handleChange
// //               }
// //             />

// //             <CommonInput
// //               label="Annual Revenue"
// //               placeholder="Enter"
// //               name="annualRevenue"
// //               value={
// //                 formData.annualRevenue
// //               }
// //               onChange={
// //                 handleChange
// //               }
// //             />
// //           </Box>

// //           {/* =================================================
// //               PHONE
// //           ================================================= */}

// //           <PhoneInputField
// //             label="Phone Number"
// //             required
// //             name="phoneNumber"
// //             value={
// //               formData.phoneNumber
// //             }
// //             onChange={
// //               handleChange
// //             }
// //           />

// //           {/* =================================================
// //               EMAIL
// //           ================================================= */}

// //           <CommonInput
// //             label="Email"
// //             required
// //             placeholder="Enter"
// //             name="email"
// //             value={
// //               formData.email
// //             }
// //             onChange={
// //               handleChange
// //             }
// //           />
// //         </Box>

// //         {/* =================================================
// //             FOOTER
// //         ================================================= */}

// //         <Box
// //           sx={{
// //             display: "flex",
// //             gap: 2,
// //             p: 3,
// //             borderTop:
// //               "1px solid #E5E7EB",
// //           }}
// //         >
// //           {/* =================================================
// //               CANCEL
// //           ================================================= */}

// //           <CommonButton
// //             variant="outlined"
// //             fullWidth
// //             onClick={onClose}
// //             disabled={loading}
// //           >
// //             Cancel
// //           </CommonButton>

// //           {/* =================================================
// //               SAVE / UPDATE
// //           ================================================= */}

// //           <CommonButton
// //             type="submit"
// //             fullWidth
// //             disabled={loading}
// //           >
// //             {loading
// //               ? "Saving..."
// //               : isEditMode
// //               ? "Update"
// //               : "Save"}
// //           </CommonButton>
// //         </Box>
// //       </Box>
// //     </Drawer>
// //   );
// // }


// ```jsx
// import React, { useState, useEffect, useCallback } from "react";

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
// import { useToast } from "../../../Components/common/Toast";

// import api from "../../../services/api";

// export default function CreateCompanyDrawer({
//   open,
//   onClose,
//   onCompanyCreated,
//   company,
// }) {
//   const { showToast } = useToast();

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
//   // STATES
//   // =====================================================

//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);

//   // =====================================================
//   // CREATE / EDIT MODE
//   // =====================================================

//   const isEditMode = Boolean(company);

//   // =====================================================
//   // FETCH USERS
//   // =====================================================

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       console.log("========== USERS API RESPONSE ==========");
//       console.log("Users response:", response.data);

//       // =================================================
//       // SAFE API RESPONSE
//       // =================================================

//       let userData = [];

//       if (Array.isArray(response.data)) {
//         userData = response.data;
//       } else if (Array.isArray(response.data?.data)) {
//         userData = response.data.data;
//       } else {
//         console.warn(
//           "Unexpected users API response format:",
//           response.data
//         );
//       }

//       console.log("Users array:", userData);

//       // =================================================
//       // FILTER ACTIVE USERS + MAP OPTIONS
//       // =================================================

//       const userOptions = userData
//         .filter((user) => user?.is_active !== false)
//         .map((user) => {
//           const fullName =
//             `${user?.first_name || ""} ${
//               user?.last_name || ""
//             }`.trim();

//           return {
//             value: String(user.id),
//             label:
//               fullName ||
//               user.email ||
//               `User ${user.id}`,
//           };
//         });

//       console.log(
//         "========== COMPANY OWNER OPTIONS =========="
//       );

//       console.log(
//         "Company owner options:",
//         userOptions
//       );

//       // =================================================
//       // CHECK ESHAAN
//       // =================================================

//       const eshaan = userOptions.find(
//         (user) => String(user.value) === "20"
//       );

//       console.log(
//         "Eshaan Muhammed option:",
//         eshaan
//       );

//       // =================================================
//       // SAVE USERS
//       // =================================================

//       setUsers(userOptions);

//       return userOptions;
//     } catch (error) {
//       console.error(
//         "Error fetching users:",
//         error
//       );

//       console.error(
//         "Users API error response:",
//         error?.response?.data
//       );

//       setUsers([]);

//       setError(
//         "Failed to load company owners."
//       );

//       return [];
//     }
//   }, []);

//   // =====================================================
//   // LOAD USERS WHEN DRAWER OPENS
//   // =====================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     fetchUsers();
//   }, [open, fetchUsers]);

//   // =====================================================
//   // LOAD COMPANY DATA FOR EDIT
//   // =====================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     // ===================================================
//     // CREATE MODE
//     // ===================================================

//     if (!company) {
//       setFormData(emptyForm);
//       setError("");
//       return;
//     }

//     // ===================================================
//     // EDIT MODE
//     // ===================================================

//     const loadCompanyData = () => {
//       try {
//         setError("");

//         console.log(
//           "========== EDIT COMPANY =========="
//         );

//         console.log(
//           "Loading company into edit form:",
//           company
//         );

//         // =================================================
//         // COMPANY OWNER ID
//         // =================================================

//         let ownerId = "";

//         if (
//           company.company_owner !== undefined &&
//           company.company_owner !== null
//         ) {
//           if (
//             typeof company.company_owner === "object"
//           ) {
//             ownerId =
//               company.company_owner?.id !==
//                 undefined &&
//               company.company_owner?.id !== null
//                 ? String(
//                     company.company_owner.id
//                   )
//                 : "";
//           } else {
//             ownerId = String(
//               company.company_owner
//             );
//           }
//         }

//         console.log(
//           "Company Owner ID:",
//           ownerId
//         );

//         console.log(
//           "Company Owner Name:",
//           company.company_owner_name
//         );

//         // =================================================
//         // PHONE NUMBER
//         // =================================================

//         const phoneNumber =
//           company.phone_number
//             ? String(
//                 company.phone_number
//               ).trim()
//             : "";

//         // =================================================
//         // SET FORM DATA
//         // =================================================

//         setFormData({
//           domainName:
//             company.domain_name || "",

//           companyName:
//             company.company_name || "",

//           companyOwner:
//             ownerId,

//           industry:
//             company.industry || "",

//           type:
//             company.type || "",

//           city:
//             company.city || "",

//           country:
//             company.country_region || "",

//           noOfEmployees:
//             company.no_of_employees ?? "",

//           annualRevenue:
//             company.annual_revenue ?? "",

//           phoneNumber:
//             phoneNumber,

//           email:
//             company.email || "",
//         });
//       } catch (error) {
//         console.error(
//           "Error loading company:",
//           error
//         );

//         setError(
//           "Failed to load company information."
//         );
//       }
//     };

//     loadCompanyData();
//   }, [company, open]);

//   // =====================================================
//   // PHONE NUMBER VALIDATION
//   // =====================================================

//   const validatePhoneNumber = (phone) => {
//     if (!phone) {
//       return "Phone number is required.";
//     }

//     const phoneString = String(phone).trim();

//     // ===================================================
//     // UAE
//     // +971 + 9 digits
//     // ===================================================

//     if (phoneString.startsWith("+971")) {
//       const localNumber = phoneString
//         .substring(4)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 9) {
//         return "UAE phone number must contain exactly 9 digits.";
//       }

//       return "";
//     }

//     // ===================================================
//     // INDIA
//     // +91 + 10 digits
//     // ===================================================

//     if (phoneString.startsWith("+91")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "India phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ===================================================
//     // USA
//     // +1 + 10 digits
//     // ===================================================

//     if (phoneString.startsWith("+1")) {
//       const localNumber = phoneString
//         .substring(2)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "US phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ===================================================
//     // UK
//     // +44 + 10 digits
//     // ===================================================

//     if (phoneString.startsWith("+44")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "UK phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ===================================================
//     // UNKNOWN COUNTRY CODE
//     // ===================================================

//     const digitsOnly =
//       phoneString.replace(/\D/g, "");

//     if (digitsOnly.length < 9) {
//       return "Please enter a valid phone number.";
//     }

//     return "";
//   };

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ===================================================
//     // PHONE NUMBER
//     // ===================================================

//     if (name === "phoneNumber") {
//       const phoneString =
//         String(value || "");

//       const cleanValue =
//         phoneString.replace(
//           /[^\d+]/g,
//           ""
//         );

//       setFormData((prev) => ({
//         ...prev,
//         phoneNumber: cleanValue,
//       }));

//       setError("");

//       return;
//     }

//     // ===================================================
//     // COMPANY OWNER
//     // ===================================================

//     if (name === "companyOwner") {
//       const ownerValue =
//         value === null ||
//         value === undefined
//           ? ""
//           : String(value);

//       console.log(
//         "Selected Company Owner:",
//         ownerValue
//       );

//       const selectedOwner =
//         users.find(
//           (user) =>
//             String(user.value) ===
//             ownerValue
//         );

//       console.log(
//         "Selected Owner Details:",
//         selectedOwner
//       );

//       setFormData((prev) => ({
//         ...prev,
//         companyOwner: ownerValue,
//       }));

//       setError("");

//       return;
//     }

//     // ===================================================
//     // UPDATE FORM
//     // ===================================================

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setError("");
//   };

//   // =====================================================
//   // CREATE / UPDATE COMPANY
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ===================================================
//     // PHONE VALIDATION
//     // ===================================================

//     const phoneError =
//       validatePhoneNumber(
//         formData.phoneNumber
//       );

//     if (phoneError) {
//       setError(phoneError);
//       showToast(phoneError, "error");
//       return;
//     }

//     // ===================================================
//     // OWNER VALIDATION
//     // ===================================================

//     if (!formData.companyOwner) {
//       const message =
//         "Please select a company owner.";

//       setError(message);
//       showToast(message, "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // CLEAN PHONE NUMBER
//       // =================================================

//       const phoneNumber =
//         String(
//           formData.phoneNumber || ""
//         ).trim();

//       // =================================================
//       // PAYLOAD
//       // =================================================

//       const payload = {
//         domain_name:
//           formData.domainName,

//         company_name:
//           formData.companyName,

//         // Database receives USER ID
//         company_owner:
//           Number(
//             formData.companyOwner
//           ),

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
//           phoneNumber,

//         email:
//           formData.email,
//       };

//       console.log(
//         "========== COMPANY PAYLOAD =========="
//       );

//       console.log(
//         "Company payload:",
//         payload
//       );

//       // =================================================
//       // UPDATE COMPANY
//       // =================================================

//       if (isEditMode) {
//         console.log(
//           "Updating company ID:",
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

//         showToast(
//           "Company updated successfully",
//           "success"
//         );
//       }

//       // =================================================
//       // CREATE COMPANY
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

//         showToast(
//           "Company created successfully",
//           "success"
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
//       setError("");

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================

//       onClose();
//     } catch (error) {
//       console.error(
//         "Error saving company:",
//         error
//       );

//       console.error(
//         "Backend error:",
//         error?.response?.data
//       );

//       const errorMessage = isEditMode
//         ? "Failed to update company."
//         : "Failed to create company.";

//       if (error?.response?.data) {
//         setError(
//           JSON.stringify(
//             error.response.data
//           )
//         );
//       } else {
//         setError(errorMessage);
//       }

//       showToast(
//         errorMessage,
//         "error"
//       );
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
//           {/* =================================================
//               ERROR
//           ================================================= */}

//           {error && (
//             <Box
//               sx={{
//                 color: "red",
//                 fontSize: "14px",
//                 wordBreak:
//                   "break-word",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* =================================================
//               DOMAIN NAME
//           ================================================= */}

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

//           {/* =================================================
//               COMPANY NAME
//           ================================================= */}

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

//           {/* =================================================
//               COMPANY OWNER
//           ================================================= */}

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

//           {/* =================================================
//               INDUSTRY + TYPE
//           ================================================= */}

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
//                 onChange={handleChange}
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
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           {/* =================================================
//               CITY + COUNTRY
//           ================================================= */}

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

//           {/* =================================================
//               EMPLOYEES + REVENUE
//           ================================================= */}

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

//           {/* =================================================
//               PHONE
//           ================================================= */}

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

//           {/* =================================================
//               EMAIL
//           ================================================= */}

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
//           {/* =================================================
//               CANCEL
//           ================================================= */}

//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           {/* =================================================
//               SAVE / UPDATE
//           ================================================= */}

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









// import React, { useState, useEffect, useCallback } from "react";

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
// import { useToast } from "../../../Components/common/Toast";


// const emptyForm = {
//   domainName: "",
//   companyName: "",
//   companyOwner: "",
//   industry: "",
//   type: "",
//   city: "",
//   country: "",
//   noOfEmployees: "",
//   annualRevenue: "",
//   phoneNumber: "",
//   email: "",
// };


// const CreateCompanyDrawer = ({
//   open,
//   onClose,
//   onCompanyCreated,
//   company,
// }) => {
//   const { showToast } = useToast();

//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);

//   const isEditMode = Boolean(company);


//   // =========================================================
//   // FETCH USERS
//   // =========================================================

//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       const userData = Array.isArray(response.data)
//         ? response.data
//         : Array.isArray(response.data?.data)
//         ? response.data.data
//         : [];

//       const activeUsers = userData
//         .filter((user) => user?.is_active !== false)
//         .map((user) => {
//           const fullName =
//             `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

//           return {
//             value: String(user.id),
//             label:
//               fullName ||
//               user?.email ||
//               `User ${user.id}`,
//           };
//         });

//       setUsers(activeUsers);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       setUsers([]);
//     }
//   }, []);


//   // =========================================================
//   // LOAD USERS WHEN DRAWER OPENS
//   // =========================================================

//   useEffect(() => {
//     if (open) {
//       fetchUsers();
//     }
//   }, [open, fetchUsers]);


//   // =========================================================
//   // LOAD / RESET FORM
//   // =========================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     setError("");

//     if (!isEditMode) {
//       setFormData(emptyForm);
//       return;
//     }

//     const ownerId =
//       typeof company?.company_owner === "object"
//         ? company?.company_owner?.id
//         : company?.company_owner;

//     setFormData({
//       domainName: company?.domain_name || "",
//       companyName: company?.company_name || "",
//       companyOwner:
//         ownerId !== undefined && ownerId !== null
//           ? String(ownerId)
//           : "",
//       industry: company?.industry || "",
//       type: company?.type || "",
//       city: company?.city || "",
//       country: company?.country_region || "",
//       noOfEmployees:
//         company?.no_of_employees !== null &&
//         company?.no_of_employees !== undefined
//           ? String(company.no_of_employees)
//           : "",
//       annualRevenue:
//         company?.annual_revenue !== null &&
//         company?.annual_revenue !== undefined
//           ? String(company.annual_revenue)
//           : "",
//       phoneNumber: company?.phone_number
//         ? String(company.phone_number).trim()
//         : "",
//       email: company?.email || "",
//     });
//   }, [open, company, isEditMode]);


//   // =========================================================
//   // PHONE VALIDATION
//   // =========================================================

//   const validatePhoneNumber = (phone) => {
//     const value = String(phone || "").trim();

//     if (!value) {
//       return "Phone number is required.";
//     }

//     const digits = value.replace(/\D/g, "");

//     if (value.startsWith("+971")) {
//       const localDigits = value
//         .replace("+971", "")
//         .replace(/\D/g, "");

//       if (localDigits.length !== 9) {
//         return "UAE phone number must contain exactly 9 digits after +971.";
//       }

//       return "";
//     }

//     if (value.startsWith("+91")) {
//       const localDigits = value
//         .replace("+91", "")
//         .replace(/\D/g, "");

//       if (localDigits.length !== 10) {
//         return "India phone number must contain exactly 10 digits after +91.";
//       }

//       return "";
//     }

//     if (value.startsWith("+1")) {
//       const localDigits = value
//         .replace("+1", "")
//         .replace(/\D/g, "");

//       if (localDigits.length !== 10) {
//         return "US/Canada phone number must contain exactly 10 digits after +1.";
//       }

//       return "";
//     }

//     if (value.startsWith("+44")) {
//       const localDigits = value
//         .replace("+44", "")
//         .replace(/\D/g, "");

//       if (localDigits.length !== 10) {
//         return "UK phone number must contain exactly 10 digits after +44.";
//       }

//       return "";
//     }

//     if (digits.length < 9) {
//       return "Please enter a valid phone number.";
//     }

//     return "";
//   };


//   // =========================================================
//   // HANDLE CHANGE
//   // =========================================================

//   const handleChange = (field, value) => {
//     let updatedValue = value;

//     if (field === "phoneNumber") {
//       updatedValue = String(value || "").replace(/[^\d+]/g, "");
//     }

//     if (field === "companyOwner") {
//       updatedValue =
//         value !== undefined && value !== null
//           ? String(value)
//           : "";
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [field]: updatedValue,
//     }));

//     setError("");
//   };


//   // =========================================================
//   // SUBMIT
//   // =========================================================

//   const handleSubmit = async () => {
//     // -------------------------------------------------------
//     // PHONE VALIDATION
//     // -------------------------------------------------------

//     const phoneError = validatePhoneNumber(
//       formData.phoneNumber
//     );

//     if (phoneError) {
//       setError(phoneError);
//       showToast(phoneError, "error");
//       return;
//     }


//     // -------------------------------------------------------
//     // COMPANY OWNER VALIDATION
//     // -------------------------------------------------------

//     if (!formData.companyOwner) {
//       const message = "Please select a company owner.";

//       setError(message);
//       showToast(message, "error");

//       return;
//     }


//     setLoading(true);
//     setError("");


//     // -------------------------------------------------------
//     // PAYLOAD
//     // -------------------------------------------------------

//     const payload = {
//       domain_name: formData.domainName,
//       company_name: formData.companyName,
//       company_owner: Number(formData.companyOwner),
//       industry: formData.industry,
//       type: formData.type,
//       city: formData.city,
//       country_region: formData.country,
//       no_of_employees: formData.noOfEmployees
//         ? Number(formData.noOfEmployees)
//         : null,
//       annual_revenue: formData.annualRevenue || null,
//       phone_number: String(
//         formData.phoneNumber || ""
//       ).trim(),
//       email: formData.email,
//     };


//     try {
//       // =====================================================
//       // UPDATE COMPANY
//       // =====================================================

//       if (isEditMode) {
//         await api.put(
//           `/companies/${company.id}/`,
//           payload
//         );

//         showToast(
//           "Company updated successfully",
//           "success"
//         );
//       }

//       // =====================================================
//       // CREATE COMPANY
//       // =====================================================

//       else {
//         await api.post(
//           "/companies/",
//           payload
//         );

//         showToast(
//           "Company created successfully",
//           "success"
//         );
//       }


//       // -----------------------------------------------------
//       // CALLBACK
//       // -----------------------------------------------------

//       if (onCompanyCreated) {
//         await onCompanyCreated();
//       }


//       // -----------------------------------------------------
//       // RESET FORM
//       // -----------------------------------------------------

//       setFormData(emptyForm);
//       setError("");

//       onClose();

//     } catch (error) {
//       console.error(
//         "Company create/update error:",
//         error
//       );

//       const errorMessage = isEditMode
//         ? "Failed to update company."
//         : "Failed to create company.";


//       // -----------------------------------------------------
//       // BACKEND ERROR
//       // -----------------------------------------------------

//       if (error?.response?.data) {
//         setError(
//           JSON.stringify(error.response.data)
//         );
//       } else {
//         setError(errorMessage);
//       }


//       // -----------------------------------------------------
//       // ERROR TOAST
//       // -----------------------------------------------------

//       showToast(
//         errorMessage,
//         "error"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   // =========================================================
//   // CLOSE DRAWER
//   // =========================================================

//   const handleClose = () => {
//     if (loading) {
//       return;
//     }

//     setError("");
//     setFormData(emptyForm);

//     onClose();
//   };


//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={handleClose}
//       PaperProps={{
//         sx: {
//           width: 500,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
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
//           onClose={handleClose}
//         />


//         {/* =================================================
//             FORM
//         ================================================= */}

//         <Box
//           sx={{
//             flex: 1,
//             overflowY: "auto",
//             p: 3,
//           }}
//         >

//           {/* ERROR */}

//           {error && (
//             <Box
//               sx={{
//                 color: "error.main",
//                 mb: 2,
//                 fontSize: "14px",
//               }}
//             >
//               {error}
//             </Box>
//           )}


//           {/* DOMAIN NAME */}

//           <CommonInput
//             label="Domain Name"
//             value={formData.domainName}
//             onChange={(e) =>
//               handleChange(
//                 "domainName",
//                 e.target.value
//               )
//             }
//             required
//             fullWidth
//           />


//           {/* COMPANY NAME */}

//           <CommonInput
//             label="Company Name"
//             value={formData.companyName}
//             onChange={(e) =>
//               handleChange(
//                 "companyName",
//                 e.target.value
//               )
//             }
//             required
//             fullWidth
//           />


//           {/* COMPANY OWNER */}

//           <CommonSelect
//             label="Company Owner"
//             value={formData.companyOwner}
//             onChange={(e) =>
//               handleChange(
//                 "companyOwner",
//                 e.target.value
//               )
//             }
//             options={users}
//             required
//             fullWidth
//           />


//           {/* INDUSTRY + TYPE */}

//           <Grid
//             container
//             spacing={2}
//             sx={{ mt: 0 }}
//           >
//             <Grid item xs={6}>
//               <CommonInput
//                 label="Industry"
//                 value={formData.industry}
//                 onChange={(e) =>
//                   handleChange(
//                     "industry",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <CommonInput
//                 label="Type"
//                 value={formData.type}
//                 onChange={(e) =>
//                   handleChange(
//                     "type",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>
//           </Grid>


//           {/* CITY + COUNTRY */}

//           <Grid
//             container
//             spacing={2}
//             sx={{ mt: 0 }}
//           >
//             <Grid item xs={6}>
//               <CommonInput
//                 label="City"
//                 value={formData.city}
//                 onChange={(e) =>
//                   handleChange(
//                     "city",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <CommonInput
//                 label="Country/Region"
//                 value={formData.country}
//                 onChange={(e) =>
//                   handleChange(
//                     "country",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>
//           </Grid>


//           {/* EMPLOYEES + REVENUE */}

//           <Grid
//             container
//             spacing={2}
//             sx={{ mt: 0 }}
//           >
//             <Grid item xs={6}>
//               <CommonInput
//                 label="No of Employees"
//                 type="number"
//                 value={formData.noOfEmployees}
//                 onChange={(e) =>
//                   handleChange(
//                     "noOfEmployees",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <CommonInput
//                 label="Annual Revenue"
//                 value={formData.annualRevenue}
//                 onChange={(e) =>
//                   handleChange(
//                     "annualRevenue",
//                     e.target.value
//                   )
//                 }
//                 fullWidth
//               />
//             </Grid>
//           </Grid>


//           {/* PHONE */}

//           <PhoneInputField
//             label="Phone"
//             value={formData.phoneNumber}
//             onChange={(value) =>
//               handleChange(
//                 "phoneNumber",
//                 value
//               )
//             }
//             required
//             fullWidth
//           />


//           {/* EMAIL */}

//           <CommonInput
//             label="Email"
//             type="email"
//             value={formData.email}
//             onChange={(e) =>
//               handleChange(
//                 "email",
//                 e.target.value
//               )
//             }
//             required
//             fullWidth
//           />

//         </Box>


//         {/* =================================================
//             FOOTER
//         ================================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: 2,
//             p: 2,
//             borderTop: "1px solid #eee",
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             onClick={handleClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton
//             variant="contained"
//             onClick={handleSubmit}
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
// };

// export default CreateCompanyDrawer;


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

import { useToast } from "../../../Components/common/Toast";
import api from "../../../services/api";

export default function CreateCompanyDrawer({
  open,
  onClose,
  onCompanyCreated,
  company,
}) {
  const { showToast } = useToast();

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
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );

      setError("Failed to load company owners.");

      showToast(
        "Failed to load company owners.",
        "error"
      );

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

        const phoneNumber = company.phone_number
          ? String(company.phone_number).trim()
          : "";

        // =================================================
        // SET FORM DATA
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

          phoneNumber,

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

        showToast(
          "Failed to load company information.",
          "error"
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
    const { name, value } = e.target;

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
       * Keep + and digits only.
       */

      const cleanValue = phoneString.replace(
        /[^\d+]/g,
        ""
      );

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

      showToast(
        phoneError,
        "error"
      );

      return;
    }

    // ===================================================
    // OWNER VALIDATION
    // ===================================================

    if (!formData.companyOwner) {
      const ownerError =
        "Please select a company owner.";

      setError(ownerError);

      showToast(
        ownerError,
        "error"
      );

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
        domain_name: formData.domainName,

        company_name: formData.companyName,

        // Database receives USER ID
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

        phone_number: phoneNumber,

        email: formData.email,
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

        showToast(
          "Company updated successfully",
          "success"
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

        showToast(
          "Company created successfully",
          "success"
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
        error.response?.data || error.message
      );

      const errorMessage = isEditMode
        ? "Failed to update company."
        : "Failed to create company.";

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (error.response?.data) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(
                error.response.data
              )
        );
      } else {
        setError(errorMessage);
      }

      // =================================================
      // ERROR TOAST
      // =================================================

      showToast(
        errorMessage,
        "error"
      );

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