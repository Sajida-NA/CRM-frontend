
// import React, { useState, useEffect } from "react";
// import { Drawer, Box } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import PhoneInputField from "../../../Components/common/PhoneInputField";
// import CommonSelect from "../../../Components/common/CommonSelect";
// import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";

// import api from "../../../services/api";

// import {
//   createLead,
//   updateLead,
//   getLeadById,
// } from "../../../services/leads";

// export default function CreateLeadsDrawer({
//   open,
//   onClose,
//   onSuccess,
//   selectedLead,
// }) {
//   // =====================================================
//   // EMPTY FORM
//   // =====================================================

//   const emptyForm = {
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     jobTitle: "",
//     contactOwner: [],
//     leadStatus: "",
//     products: [],
//     company: "",
//     city: "",
//   };

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [formData, setFormData] = useState(emptyForm);

//   // All products from backend
//   const [products, setProducts] = useState([]);

//   // Users for Contact Owner
//   const [users, setUsers] = useState([]);

//   // Lead statuses
//   const [leadStatuses, setLeadStatuses] = useState([]);

//   // Companies
//   const [companies, setCompanies] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =====================================================
//   // FETCH USERS
//   // =====================================================

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       console.log("Users:", response.data);

//       const userOptions = response.data.map((user) => {
//         const fullName =
//           `${user.first_name || ""} ${user.last_name || ""}`.trim();

//         return {
//           value: String(user.id),
//           label: fullName || user.email,
//           company: user.company_name || "",
//         };
//       });

//       setUsers(userOptions);
//     } catch (error) {
//       console.error("Error fetching users:", error);

//       setError("Failed to load contact owners.");
//     }
//   };

//   // =====================================================
//   // FETCH LEAD STATUSES
//   // =====================================================

//   const fetchLeadStatuses = async () => {
//     try {
//       const response = await api.get("/leads/lead-statuses/");

//       console.log("Lead Statuses:", response.data);

//       const statusOptions = response.data.map((status) => {
//         if (typeof status === "string") {
//           return {
//             value: status,
//             label: status,
//           };
//         }

//         return {
//           value: status.value || status.name || status.id,
//           label: status.label || status.name || status.value,
//         };
//       });

//       setLeadStatuses(statusOptions);
//     } catch (error) {
//       console.error("Error fetching lead statuses:", error);

//       setError("Failed to load lead statuses.");
//     }
//   };

//   // =====================================================
//   // FETCH PRODUCTS
//   // =====================================================

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/leads/products/");

//       console.log("Products from backend:", response.data);

//       setProducts(response.data);

//       console.log("Product options:", response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching products:",
//         error.response?.data || error.message
//       );

//       console.error("Status:", error.response?.status);

//       setError("Failed to load products.");
//     }
//   };

//   // =====================================================
//   // FETCH COMPANIES
//   // =====================================================

//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get("/leads/companies/");

//       console.log("Companies from backend:", response.data);

//       setCompanies(response.data);

//       console.log("Company options:", response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching companies:",
//         error.response?.data || error.message
//       );

//       setError("Failed to load companies.");
//     }
//   };

//   // =====================================================
//   // LOAD DATA WHEN DRAWER OPENS
//   // =====================================================

//   useEffect(() => {
//     if (open) {
//       fetchUsers();
//       fetchLeadStatuses();
//       fetchProducts();
//       fetchCompanies();
//     }
//   }, [open]);

//   // =====================================================
//   // LOAD SELECTED LEAD FOR EDIT
//   // =====================================================

//   useEffect(() => {
//     const loadLead = async () => {
//       if (!selectedLead) {
//         setFormData(emptyForm);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");

//         const response = await getLeadById(selectedLead.id);

//         const lead = response.data;

//         console.log("Lead details:", lead);

//         // =================================================
//         // CONTACT OWNERS
//         // Supports the new contact_owners field.
//         // Also supports old contact_owner response
//         // temporarily for backward compatibility.
//         // =================================================

//         let selectedContactOwners = [];

//         if (Array.isArray(lead.contact_owners)) {
//           selectedContactOwners = lead.contact_owners.map((id) =>
//             String(id)
//           );
//         } else if (
//           lead.contact_owner !== null &&
//           lead.contact_owner !== undefined &&
//           lead.contact_owner !== ""
//         ) {
//           selectedContactOwners = [
//             String(lead.contact_owner),
//           ];
//         }

//         setFormData({
//           email: lead.email || "",

//           firstName: lead.first_name || "",

//           lastName: lead.last_name || "",

//           // Keep the complete phone number.
//           // PhoneInputField will separate the country code
//           // from the local number automatically.
//           phoneNumber: lead.phone_number || "",

//           jobTitle: lead.job_title || "",

//           contactOwner: selectedContactOwners,

//           leadStatus: lead.lead_status || "",

//           products: Array.isArray(lead.products)
//             ? lead.products.map((id) => String(id))
//             : [],

//           company:
//             lead.company !== null &&
//             lead.company !== undefined
//               ? String(lead.company)
//               : "",

//           city: lead.city || "",
//         });
//       } catch (error) {
//         console.error(
//           "Error loading lead:",
//           error.response?.data || error.message
//         );

//         setError("Failed to load lead details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (open) {
//       loadLead();
//     }
//   }, [open, selectedLead]);

//   // =====================================================
//   // PHONE NUMBER VALIDATION
//   // =====================================================

//   const validatePhoneNumber = (phone) => {
//     if (!phone) {
//       return "Phone number is required.";
//     }

//     const phoneString = String(phone).trim();

//     // ---------------------------------------------------
//     // UAE
//     // +971 + 9 local digits
//     // Example: +971553074371
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+971")) {
//       const localNumber = phoneString
//         .substring(4)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 9) {
//         return "UAE phone number must contain exactly 9 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // INDIA
//     // +91 + 10 local digits
//     // Example: +919876543210
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+91")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "India phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // USA
//     // +1 + 10 local digits
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+1")) {
//       const localNumber = phoneString
//         .substring(2)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "US phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // UK
//     // +44 + 10 local digits
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+44")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "UK phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     return "";
//   };

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ---------------------------------------------------
//     // CONTACT OWNER - MULTIPLE
//     // ---------------------------------------------------

//     if (name === "contactOwner") {
//       const selectedOwnerIds = Array.isArray(value)
//         ? value.map((id) => String(id))
//         : [];

//       console.log(
//         "Selected Contact Owner IDs:",
//         selectedOwnerIds
//       );

//       // Find all selected users
//       const selectedUsers = users.filter((user) =>
//         selectedOwnerIds.includes(String(user.value))
//       );

//       console.log(
//         "Selected Contact Owners:",
//         selectedUsers
//       );

//       // -------------------------------------------------
//       // COMPANY
//       //
//       // If multiple owners are selected, use the first
//       // available company.
//       // -------------------------------------------------

//       const selectedCompanies = [
//         ...new Set(
//           selectedUsers
//             .map((user) => user.company)
//             .filter(Boolean)
//         ),
//       ];

//       setFormData((prev) => ({
//         ...prev,

//         contactOwner: selectedOwnerIds,

//         company: selectedCompanies[0] || "",
//       }));

//       if (error) {
//         setError("");
//       }

//       return;
//     }

//     // ---------------------------------------------------
//     // PRODUCTS
//     // ---------------------------------------------------

//     if (name === "products") {
//       console.log("Selected product IDs:", value);
//     }

//     // ---------------------------------------------------
//     // UPDATE FORM
//     // ---------------------------------------------------

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // ---------------------------------------------------
//     // CLEAR ERROR
//     // ---------------------------------------------------

//     if (error) {
//       setError("");
//     }
//   };

//   // =====================================================
//   // HANDLE SUBMIT
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ---------------------------------------------------
//     // PHONE VALIDATION
//     // ---------------------------------------------------

//     const phoneError = validatePhoneNumber(
//       formData.phoneNumber
//     );

//     if (phoneError) {
//       setError(phoneError);
//       return;
//     }

//     // ---------------------------------------------------
//     // CONTACT OWNER VALIDATION
//     // ---------------------------------------------------

//     if (
//       !Array.isArray(formData.contactOwner) ||
//       formData.contactOwner.length === 0
//     ) {
//       setError("Please select at least one contact owner.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // PAYLOAD
//       // =================================================

//       const payload = {
//         email: formData.email,

//         first_name: formData.firstName,

//         last_name: formData.lastName,

//         // Complete number from PhoneInputField.
//         // Example:
//         // UAE   -> +971553074371
//         // India -> +919876543210
//         phone_number: formData.phoneNumber,

//         job_title: formData.jobTitle,

//         // =================================================
//         // MULTIPLE CONTACT OWNERS
//         // =================================================

//         contact_owners: formData.contactOwner.length
//           ? formData.contactOwner.map((id) => Number(id))
//           : [],

//         lead_status: formData.leadStatus || "New",

//         products: formData.products.map((id) =>
//           Number(id)
//         ),

//         company: formData.company
//           ? Number(formData.company)
//           : null,

//         city: formData.city,
//       };

//       console.log("Sending Lead:", payload);

//       // =================================================
//       // CREATE / UPDATE
//       // =================================================

//       let response;

//       if (selectedLead) {
//         response = await updateLead(
//           selectedLead.id,
//           payload
//         );

//         console.log("Lead updated:", response.data);
//       } else {
//         response = await createLead(payload);

//         console.log("Lead created:", response.data);
//       }

//       // =================================================
//       // REFRESH LEAD LIST
//       // =================================================

//       if (onSuccess) {
//         await onSuccess();
//       }

//       // =================================================
//       // RESET FORM
//       // =================================================

//       setFormData({
//         ...emptyForm,
//         contactOwner: [],
//         products: [],
//       });

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================

//       onClose();
//     } catch (error) {
//       console.error(
//         "Error creating/updating lead:",
//         error.response?.data || error.message
//       );

//       if (error.response?.data) {
//         setError(
//           JSON.stringify(error.response.data)
//         );
//       } else {
//         setError("Failed to save lead.");
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
//           width: 520,
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
//             selectedLead
//               ? "Edit Lead"
//               : "Create Lead"
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
//                 wordBreak: "break-word",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* =================================================
//               EMAIL
//           ================================================= */}

//           <CommonInput
//             label="Email"
//             required
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             placeholder="🖂 Enter"
//           />

//           {/* =================================================
//               FIRST NAME
//           ================================================= */}

//           <CommonInput
//             label="First Name"
//             required
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               LAST NAME
//           ================================================= */}

//           <CommonInput
//             label="Last Name"
//             required
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               PHONE
//           ================================================= */}

//           <PhoneInputField
//             label="Phone Number"
//             required
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             placeholder="Enter"
//           />

//           {/* =================================================
//               JOB TITLE
//           ================================================= */}

//           <CommonInput
//             label="Job Title"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               CONTACT OWNER - MULTI SELECT
//           ================================================= */}

//           <CommonMultiSelect
//             label="Contact Owner"
//             name="contactOwner"
//             value={formData.contactOwner}
//             onChange={handleChange}
//             placeholder="Choose Owner"
//             options={users}
//             required
//           />

//           {/* =================================================
//               LEAD STATUS
//           ================================================= */}

//           <CommonSelect
//             label="Lead Status"
//             name="leadStatus"
//             value={formData.leadStatus}
//             onChange={handleChange}
//             placeholder="Choose Lead Status"
//             options={leadStatuses}
//           />

//           {/* =================================================
//               PRODUCTS - MULTI SELECT
//           ================================================= */}

//           <CommonMultiSelect
//             label="Products"
//             name="products"
//             value={formData.products}
//             onChange={handleChange}
//             placeholder="Choose Products"
//             options={products}
//           />

//           {/* =================================================
//               COMPANY
//           ================================================= */}

//           <CommonSelect
//             label="Company"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             placeholder="Select Contact Owner First"
//             options={
//               formData.company
//                 ? [
//                     {
//                       value: formData.company,
//                       label: formData.company,
//                     },
//                   ]
//                 : []
//             }
//             disabled
//           />

//           {/* =================================================
//               CITY
//           ================================================= */}

//           <CommonInput
//             label="City"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
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
//             borderTop: "1px solid #E5E7EB",
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
//               SAVE
//           ================================================= */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={loading}
//           >
//             {loading
//               ? "Saving..."
//               : selectedLead
//               ? "Update Lead"
//               : "Save Lead"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }
































// import React, { useState, useEffect } from "react";
// import { Drawer, Box } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import PhoneInputField from "../../../Components/common/PhoneInputField";
// import CommonSelect from "../../../Components/common/CommonSelect";
// import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
// import { useToast } from "../../../Components/common/Toast";

// import api from "../../../services/api";

// import {
//   createLead,
//   updateLead,
//   getLeadById,
// } from "../../../services/leads";
// import { createLead, updateLead, getLeadById } from "../../../services/leads";

// export default function CreateLeadsDrawer({
//   open,
//   onClose,
//   onSuccess,
//   selectedLead,
// }) {
//   const { showToast } = useToast();
//   // =====================================================
//   // EMPTY FORM
//   // =====================================================

//   const emptyForm = {
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     jobTitle: "",
//     contactOwner: [],
//     leadStatus: "",
//     products: [],
//     company: "",
//     city: "",
//   };

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [formData, setFormData] = useState(emptyForm);

//   // All products from backend
//   const [products, setProducts] = useState([]);

//   // Users for Contact Owner
//   const [users, setUsers] = useState([]);

//   // Lead statuses
//   const [leadStatuses, setLeadStatuses] = useState([]);

//   // Companies
//   const [companies, setCompanies] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =====================================================
//   // FETCH USERS
//   // =====================================================

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       console.log("Users:", response.data);

//       const userOptions = response.data.map((user) => {
//         const fullName =
//           `${user.first_name || ""} ${user.last_name || ""}`.trim();

//         return {
//           value: String(user.id),
//           label: fullName || user.email,
//           company: user.company_name || "",
//         };
//       });

//       setUsers(userOptions);
//     } catch (error) {
//       console.error("Error fetching users:", error);

//       setError("Failed to load contact owners.");
//     }
//   };

//   // =====================================================
//   // FETCH LEAD STATUSES
//   // =====================================================

//   const fetchLeadStatuses = async () => {
//     try {
//       const response = await api.get("/leads/lead-statuses/");

//       console.log("Lead Statuses:", response.data);

//       const statusOptions = response.data.map((status) => {
//         if (typeof status === "string") {
//           return {
//             value: status,
//             label: status,
//           };
//         }

//         return {
//           value: status.value || status.name || status.id,
//           label: status.label || status.name || status.value,
//         };
//       });

//       setLeadStatuses(statusOptions);
//     } catch (error) {
//       console.error("Error fetching lead statuses:", error);

//       setError("Failed to load lead statuses.");
//     }
//   };

//   // =====================================================
//   // FETCH PRODUCTS
//   // =====================================================

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/leads/products/");

//       console.log("Products from backend:", response.data);

//       setProducts(response.data);

//       console.log("Product options:", response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching products:",
//         error.response?.data || error.message
//         error.response?.data || error.message,
//       );

//       console.error("Status:", error.response?.status);

//       setError("Failed to load products.");
//     }
//   };

//   // =====================================================
//   // FETCH COMPANIES
//   // =====================================================

//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get("/leads/companies/");

//       console.log("Companies from backend:", response.data);

//       setCompanies(response.data);

//       console.log("Company options:", response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching companies:",
//         error.response?.data || error.message
//         error.response?.data || error.message,
//       );

//       setError("Failed to load companies.");
//     }
//   };

//   // =====================================================
//   // LOAD DATA WHEN DRAWER OPENS
//   // =====================================================

//   useEffect(() => {
//     if (open) {
//       fetchUsers();
//       fetchLeadStatuses();
//       fetchProducts();
//       fetchCompanies();
//     }
//   }, [open]);

//   // =====================================================
//   // LOAD SELECTED LEAD FOR EDIT
//   // =====================================================

//   useEffect(() => {
//     const loadLead = async () => {
//       if (!selectedLead) {
//         setFormData(emptyForm);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");

//         const response = await getLeadById(selectedLead.id);

//         const lead = response.data;

//         console.log("Lead details:", lead);

//         // =================================================
//         // CONTACT OWNERS
//         // Supports the new contact_owners field.
//         // Also supports old contact_owner response
//         // temporarily for backward compatibility.
//         // =================================================

//         let selectedContactOwners = [];

//         if (Array.isArray(lead.contact_owners)) {
//           selectedContactOwners = lead.contact_owners.map((id) =>
//             String(id)
//           );
//           selectedContactOwners = lead.contact_owners.map((id) => String(id));
//         } else if (
//           lead.contact_owner !== null &&
//           lead.contact_owner !== undefined &&
//           lead.contact_owner !== ""
//         ) {
//           selectedContactOwners = [
//             String(lead.contact_owner),
//           ];
//           selectedContactOwners = [String(lead.contact_owner)];
//         }

//         setFormData({
//           email: lead.email || "",

//           firstName: lead.first_name || "",

//           lastName: lead.last_name || "",

//           // Keep the complete phone number.
//           // PhoneInputField will separate the country code
//           // from the local number automatically.
//           phoneNumber: lead.phone_number || "",

//           jobTitle: lead.job_title || "",

//           contactOwner: selectedContactOwners,

//           leadStatus: lead.lead_status || "",

//           products: Array.isArray(lead.products)
//             ? lead.products.map((id) => String(id))
//             : [],

//           company:
//             lead.company !== null &&
//             lead.company !== undefined
//             lead.company !== null && lead.company !== undefined
//               ? String(lead.company)
//               : "",

//           city: lead.city || "",
//         });
//       } catch (error) {
//         console.error(
//           "Error loading lead:",
//           error.response?.data || error.message
//           error.response?.data || error.message,
//         );

//         setError("Failed to load lead details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (open) {
//       loadLead();
//     }
//   }, [open, selectedLead]);

//   // =====================================================
//   // PHONE NUMBER VALIDATION
//   // =====================================================

//   const validatePhoneNumber = (phone) => {
//     if (!phone) {
//       return "Phone number is required.";
//     }

//     const phoneString = String(phone).trim();

//     // ---------------------------------------------------
//     // UAE
//     // +971 + 9 local digits
//     // Example: +971553074371
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+971")) {
//       const localNumber = phoneString
//         .substring(4)
//         .replace(/\D/g, "");
//       const localNumber = phoneString.substring(4).replace(/\D/g, "");

//       if (localNumber.length !== 9) {
//         return "UAE phone number must contain exactly 9 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // INDIA
//     // +91 + 10 local digits
//     // Example: +919876543210
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+91")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");
//       const localNumber = phoneString.substring(3).replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "India phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // USA
//     // +1 + 10 local digits
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+1")) {
//       const localNumber = phoneString
//         .substring(2)
//         .replace(/\D/g, "");
//       const localNumber = phoneString.substring(2).replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "US phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     // ---------------------------------------------------
//     // UK
//     // +44 + 10 local digits
//     // ---------------------------------------------------

//     if (phoneString.startsWith("+44")) {
//       const localNumber = phoneString
//         .substring(3)
//         .replace(/\D/g, "");
//       const localNumber = phoneString.substring(3).replace(/\D/g, "");

//       if (localNumber.length !== 10) {
//         return "UK phone number must contain exactly 10 digits.";
//       }

//       return "";
//     }

//     return "";
//   };

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ---------------------------------------------------
//     // CONTACT OWNER - MULTIPLE
//     // ---------------------------------------------------

//     if (name === "contactOwner") {
//       const selectedOwnerIds = Array.isArray(value)
//         ? value.map((id) => String(id))
//         : [];

//       console.log(
//         "Selected Contact Owner IDs:",
//         selectedOwnerIds
//       );
//       console.log("Selected Contact Owner IDs:", selectedOwnerIds);

//       // Find all selected users
//       const selectedUsers = users.filter((user) =>
//         selectedOwnerIds.includes(String(user.value))
//         selectedOwnerIds.includes(String(user.value)),
//       );

//       console.log(
//         "Selected Contact Owners:",
//         selectedUsers
//       );
//       console.log("Selected Contact Owners:", selectedUsers);

//       // -------------------------------------------------
//       // COMPANY
//       //
//       // If multiple owners are selected, use the first
//       // available company.
//       // -------------------------------------------------

//       const selectedCompanies = [
//         ...new Set(
//           selectedUsers
//             .map((user) => user.company)
//             .filter(Boolean)
//         ),
//         ...new Set(selectedUsers.map((user) => user.company).filter(Boolean)),
//       ];

//       setFormData((prev) => ({
//         ...prev,

//         contactOwner: selectedOwnerIds,

//         company: selectedCompanies[0] || "",
//       }));

//       if (error) {
//         setError("");
//       }

//       return;
//     }

//     // ---------------------------------------------------
//     // PRODUCTS
//     // ---------------------------------------------------

//     if (name === "products") {
//       console.log("Selected product IDs:", value);
//     }

//     // ---------------------------------------------------
//     // UPDATE FORM
//     // ---------------------------------------------------

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // ---------------------------------------------------
//     // CLEAR ERROR
//     // ---------------------------------------------------

//     if (error) {
//       setError("");
//     }
//   };

//   // =====================================================
//   // HANDLE SUBMIT
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ---------------------------------------------------
//     // PHONE VALIDATION
//     // ---------------------------------------------------

//     const phoneError = validatePhoneNumber(
//       formData.phoneNumber
//     );
//     const phoneError = validatePhoneNumber(formData.phoneNumber);

//     if (phoneError) {
//       setError(phoneError);
//       return;
//     }

//     // ---------------------------------------------------
//     // CONTACT OWNER VALIDATION
//     // ---------------------------------------------------

//     if (
//       !Array.isArray(formData.contactOwner) ||
//       formData.contactOwner.length === 0
//     ) {
//       setError("Please select at least one contact owner.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // PAYLOAD
//       // =================================================

//       const payload = {
//         email: formData.email,

//         first_name: formData.firstName,

//         last_name: formData.lastName,

//         // Complete number from PhoneInputField.
//         // Example:
//         // UAE   -> +971553074371
//         // India -> +919876543210
//         phone_number: formData.phoneNumber,

//         job_title: formData.jobTitle,

//         // =================================================
//         // MULTIPLE CONTACT OWNERS
//         // =================================================

//         contact_owners: formData.contactOwner.length
//           ? formData.contactOwner.map((id) => Number(id))
//           : [],

//         lead_status: formData.leadStatus || "New",

//         products: formData.products.map((id) =>
//           Number(id)
//         ),
//         products: formData.products.map((id) => Number(id)),

//         company: formData.company
//           ? Number(formData.company)
//           : null,
//         company: formData.company ? Number(formData.company) : null,

//         city: formData.city,
//       };

//       console.log("Sending Lead:", payload);

//       // =================================================
//       // CREATE / UPDATE
//       // =================================================

//       let response;

//       if (selectedLead) {
//         response = await updateLead(
//           selectedLead.id,
//           payload
//         );
//         // =================================================
//         // UPDATE LEAD
//         // =================================================

//         response = await updateLead(selectedLead.id, payload);

//         console.log("Lead updated:", response.data);

//         showToast("Lead updated successfully", "success");
//       } else {
//         // =================================================
//         // CREATE LEAD
//         // =================================================

//         response = await createLead(payload);

//         console.log("Lead created:", response.data);
//         showToast("Lead created successfully", "success");
//       }

//       // =================================================
//       // REFRESH LEAD LIST
//       // =================================================

//       if (onSuccess) {
//         await onSuccess();
//       }

//       // =================================================
//       // RESET FORM
//       // =================================================

//       setFormData({
//         ...emptyForm,
//         contactOwner: [],
//         products: [],
//       });

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================

//       onClose();
//     } catch (error) {
//       console.error(
//         "Error creating/updating lead:",
//         error.response?.data || error.message
//         error.response?.data || error.message,
//       );

//       // if (error.response?.data) {
//       //   setError(JSON.stringify(error.response.data));
//       // } else {
//       //   setError("Failed to save lead.");
//       // }
//       const errorMessage = selectedLead
//         ? "Failed to update lead."
//         : "Failed to create lead.";

//       if (error.response?.data) {
//         setError(
//           JSON.stringify(error.response.data)
//         );
//         setError(JSON.stringify(error.response.data));
//       } else {
//         setError("Failed to save lead.");
//         setError(errorMessage);
//       }

//       showToast(errorMessage, "error");
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
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: 520,
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
//             selectedLead
//               ? "Edit Lead"
//               : "Create Lead"
//           }
//           title={selectedLead ? "Edit Lead" : "Create Lead"}
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
//                 wordBreak: "break-word",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* =================================================
//               EMAIL
//           ================================================= */}

//           <CommonInput
//             label="Email"
//             required
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             placeholder="🖂 Enter"
//           />

//           {/* =================================================
//               FIRST NAME
//           ================================================= */}

//           <CommonInput
//             label="First Name"
//             required
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               LAST NAME
//           ================================================= */}

//           <CommonInput
//             label="Last Name"
//             required
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               PHONE
//           ================================================= */}

//           <PhoneInputField
//             label="Phone Number"
//             required
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             placeholder="Enter"
//           />

//           {/* =================================================
//               JOB TITLE
//           ================================================= */}

//           <CommonInput
//             label="Job Title"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* =================================================
//               CONTACT OWNER - MULTI SELECT
//           ================================================= */}

//           <CommonMultiSelect
//             label="Contact Owner"
//             name="contactOwner"
//             value={formData.contactOwner}
//             onChange={handleChange}
//             placeholder="Choose Owner"
//             options={users}
//             required
//           />

//           {/* =================================================
//               LEAD STATUS
//           ================================================= */}

//           <CommonSelect
//             label="Lead Status"
//             name="leadStatus"
//             value={formData.leadStatus}
//             onChange={handleChange}
//             placeholder="Choose Lead Status"
//             options={leadStatuses}
//           />

//           {/* =================================================
//               PRODUCTS - MULTI SELECT
//           ================================================= */}

//           <CommonMultiSelect
//             label="Products"
//             name="products"
//             value={formData.products}
//             onChange={handleChange}
//             placeholder="Choose Products"
//             options={products}
//           />

//           {/* =================================================
//               COMPANY
//           ================================================= */}

//           <CommonSelect
//             label="Company"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             placeholder="Select Contact Owner First"
//             options={
//               formData.company
//                 ? [
//                     {
//                       value: formData.company,
//                       label: formData.company,
//                     },
//                   ]
//                 : []
//             }
//             disabled
//           />

//           {/* =================================================
//               CITY
//           ================================================= */}

//           <CommonInput
//             label="City"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
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
//             borderTop: "1px solid #E5E7EB",
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
//               SAVE
//           ================================================= */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={loading}
//           >
//             {loading
//               ? "Saving..."
//               : selectedLead
//               ? "Update Lead"
//               : "Save Lead"}
//           <CommonButton type="submit" fullWidth disabled={loading}>
//             {loading ? "Saving..." : selectedLead ? "Update Lead" : "Save Lead"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }





import React, { useState, useEffect } from "react";
import { Drawer, Box } from "@mui/material";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";
import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
import { useToast } from "../../../Components/common/Toast";

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
  const { showToast } = useToast();

  // =====================================================
  // EMPTY FORM
  // =====================================================

  const emptyForm = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    jobTitle: "",
    contactOwner: [],
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

  // Companies
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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

      const statusOptions = response.data.map((status) => {
        if (typeof status === "string") {
          return {
            value: status,
            label: status,
          };
        }

        return {
          value: status.value || status.name || status.id,
          label:
            status.label ||
            status.name ||
            status.value,
        };
      });

      setLeadStatuses(statusOptions);
    } catch (error) {
      console.error(
        "Error fetching lead statuses:",
        error
      );

      setError("Failed to load lead statuses.");
    }
  };

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      const response = await api.get("/leads/products/");

      console.log(
        "Products from backend:",
        response.data
      );

      setProducts(response.data);

      console.log(
        "Product options:",
        response.data
      );
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );

      console.error(
        "Status:",
        error.response?.status
      );

      setError("Failed to load products.");
    }
  };

  // =====================================================
  // FETCH COMPANIES
  // =====================================================

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/leads/companies/");

      console.log(
        "Companies from backend:",
        response.data
      );

      setCompanies(response.data);

      console.log(
        "Company options:",
        response.data
      );
    } catch (error) {
      console.error(
        "Error fetching companies:",
        error.response?.data || error.message
      );

      console.error(
        "Status:",
        error.response?.status
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

  // =====================================================
  // LOAD SELECTED LEAD FOR EDIT
  // =====================================================

  useEffect(() => {
    const loadLead = async () => {
      if (!selectedLead) {
        setFormData(emptyForm);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getLeadById(
          selectedLead.id
        );

        const lead = response.data;

        console.log(
          "Lead details:",
          lead
        );

        // =================================================
        // CONTACT OWNERS
        // Supports the new contact_owners field.
        // Also supports old contact_owner response
        // temporarily for backward compatibility.
        // =================================================

        let selectedContactOwners = [];

        if (Array.isArray(lead.contact_owners)) {
          selectedContactOwners =
            lead.contact_owners.map((id) =>
              String(id)
            );
        } else if (
          lead.contact_owner !== null &&
          lead.contact_owner !== undefined &&
          lead.contact_owner !== ""
        ) {
          selectedContactOwners = [
            String(lead.contact_owner),
          ];
        }

        setFormData({
          email: lead.email || "",

          firstName:
            lead.first_name || "",

          lastName:
            lead.last_name || "",

          // Keep the complete phone number.
          // PhoneInputField will separate the country code
          // from the local number automatically.
          phoneNumber:
            lead.phone_number || "",

          jobTitle:
            lead.job_title || "",

          contactOwner:
            selectedContactOwners,

          leadStatus:
            lead.lead_status || "",

          products: Array.isArray(
            lead.products
          )
            ? lead.products.map((id) =>
                String(id)
              )
            : [],

          company:
            lead.company !== null &&
            lead.company !== undefined
              ? String(lead.company)
              : "",

          city: lead.city || "",
        });
      } catch (error) {
        console.error(
          "Error loading lead:",
          error.response?.data ||
            error.message
        );

        setError(
          "Failed to load lead details."
        );
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

    const phoneString =
      String(phone).trim();

    // ---------------------------------------------------
    // UAE
    // +971 + 9 local digits
    // Example: +971553074371
    // ---------------------------------------------------

    if (phoneString.startsWith("+971")) {
      const localNumber = phoneString
        .substring(4)
        .replace(/\D/g, "");

      if (localNumber.length !== 9) {
        return "UAE phone number must contain exactly 9 digits.";
      }

      return "";
    }

    // ---------------------------------------------------
    // INDIA
    // +91 + 10 local digits
    // Example: +919876543210
    // ---------------------------------------------------

    if (phoneString.startsWith("+91")) {
      const localNumber = phoneString
        .substring(3)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "India phone number must contain exactly 10 digits.";
      }

      return "";
    }

    // ---------------------------------------------------
    // USA
    // +1 + 10 local digits
    // ---------------------------------------------------

    if (phoneString.startsWith("+1")) {
      const localNumber = phoneString
        .substring(2)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "US phone number must contain exactly 10 digits.";
      }

      return "";
    }

    // ---------------------------------------------------
    // UK
    // +44 + 10 local digits
    // ---------------------------------------------------

    if (phoneString.startsWith("+44")) {
      const localNumber = phoneString
        .substring(3)
        .replace(/\D/g, "");

      if (localNumber.length !== 10) {
        return "UK phone number must contain exactly 10 digits.";
      }

      return "";
    }

    return "";
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ---------------------------------------------------
    // CONTACT OWNER - MULTIPLE
    // ---------------------------------------------------

    if (name === "contactOwner") {
      const selectedOwnerIds =
        Array.isArray(value)
          ? value.map((id) => String(id))
          : [];

      console.log(
        "Selected Contact Owner IDs:",
        selectedOwnerIds
      );

      // Find all selected users
      const selectedUsers = users.filter(
        (user) =>
          selectedOwnerIds.includes(
            String(user.value)
          )
      );

      console.log(
        "Selected Contact Owners:",
        selectedUsers
      );

      // -------------------------------------------------
      // COMPANY
      //
      // If multiple owners are selected, use the first
      // available company.
      // -------------------------------------------------

      const selectedCompanies = [
        ...new Set(
          selectedUsers
            .map((user) => user.company)
            .filter(Boolean)
        ),
      ];

      setFormData((prev) => ({
        ...prev,

        contactOwner:
          selectedOwnerIds,

        company:
          selectedCompanies[0] || "",
      }));

      if (error) {
        setError("");
      }

      return;
    }

    // ---------------------------------------------------
    // PRODUCTS
    // ---------------------------------------------------

    if (name === "products") {
      console.log(
        "Selected product IDs:",
        value
      );
    }

    // ---------------------------------------------------
    // UPDATE FORM
    // ---------------------------------------------------

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ---------------------------------------------------
    // CLEAR ERROR
    // ---------------------------------------------------

    if (error) {
      setError("");
    }
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------------------------------------------------
    // PHONE VALIDATION
    // ---------------------------------------------------

    const phoneError =
      validatePhoneNumber(
        formData.phoneNumber
      );

    if (phoneError) {
      setError(phoneError);
      showToast(phoneError, "error");
      return;
    }

    // ---------------------------------------------------
    // CONTACT OWNER VALIDATION
    // ---------------------------------------------------

    if (
      !Array.isArray(
        formData.contactOwner
      ) ||
      formData.contactOwner.length === 0
    ) {
      const message =
        "Please select at least one contact owner.";

      setError(message);
      showToast(message, "error");

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

        first_name:
          formData.firstName,

        last_name:
          formData.lastName,

        // Complete number from PhoneInputField.
        // Example:
        // UAE   -> +971553074371
        // India -> +919876543210
        phone_number:
          formData.phoneNumber,

        job_title:
          formData.jobTitle,

        // =================================================
        // MULTIPLE CONTACT OWNERS
        // =================================================

        contact_owners:
          formData.contactOwner.length
            ? formData.contactOwner.map(
                (id) => Number(id)
              )
            : [],

        lead_status:
          formData.leadStatus || "New",

        products:
          formData.products.map(
            (id) => Number(id)
          ),

        company: formData.company
          ? Number(formData.company)
          : null,

        city: formData.city,
      };

      console.log(
        "Sending Lead:",
        payload
      );

      // =================================================
      // CREATE / UPDATE
      // =================================================

      let response;

      if (selectedLead) {
        // =================================================
        // UPDATE LEAD
        // =================================================

        response = await updateLead(
          selectedLead.id,
          payload
        );

        console.log(
          "Lead updated:",
          response.data
        );

        showToast(
          "Lead updated successfully",
          "success"
        );
      } else {
        // =================================================
        // CREATE LEAD
        // =================================================

        response =
          await createLead(payload);

        console.log(
          "Lead created:",
          response.data
        );

        showToast(
          "Lead created successfully",
          "success"
        );
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

      setFormData({
        ...emptyForm,
        contactOwner: [],
        products: [],
      });

      // =================================================
      // CLOSE DRAWER
      // =================================================

      onClose();
    } catch (error) {
      console.error(
        "Error creating/updating lead:",
        error.response?.data ||
          error.message
      );

      const errorMessage =
        selectedLead
          ? "Failed to update lead."
          : "Failed to create lead.";

      if (error.response?.data) {
        setError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setError(errorMessage);
      }

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
            selectedLead
              ? "Edit Lead"
              : "Create Lead"
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
                wordBreak:
                  "break-word",
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
              CONTACT OWNER - MULTI SELECT
          ================================================= */}

          <CommonMultiSelect
            label="Contact Owner"
            name="contactOwner"
            value={
              formData.contactOwner
            }
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
            value={
              formData.leadStatus
            }
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
                      value:
                        formData.company,
                      label:
                        formData.company,
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
            borderTop:
              "1px solid #E5E7EB",
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
              SAVE
          ================================================= */}

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

