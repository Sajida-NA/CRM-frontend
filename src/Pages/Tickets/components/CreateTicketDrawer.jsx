// import React, { useEffect, useState } from "react";
// import {
//   Drawer,
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";

// import api from "../../../services/api";

// export default function CreateTicketDrawer({ open, onClose }) {
//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     ticketName: "",
//     description: "",
//     ticketStatus: "",
//     source: "",
//     priority: "",

//     // MULTIPLE TICKET OWNERS
//     ticketOwners: [],

//     associatedDeal: "",
//   });

//   // =====================================================
//   // OPTIONS
//   // =====================================================

//   const [deals, setDeals] = useState([]);
//   const [dealOwners, setDealOwners] = useState([]);

//   // =====================================================
//   // LOADING / ERROR
//   // =====================================================

//   const [loading, setLoading] = useState(false);
//   const [loadingOptions, setLoadingOptions] = useState(false);
//   const [loadingDealOwners, setLoadingDealOwners] = useState(false);
//   const [error, setError] = useState("");

//   // =====================================================
//   // LOAD CLOSED WON DEALS
//   // =====================================================

//   useEffect(() => {
//     if (!open) return;

//     const fetchDeals = async () => {
//       try {
//         setLoadingOptions(true);
//         setError("");

//         const response = await api.get("/deals/");

//         console.log("DEALS RESPONSE:", response.data);

//         const dealsData = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || response.data?.data || [];

//         // -------------------------------------------------
//         // ONLY CLOSED WON DEALS
//         // -------------------------------------------------

//         const closedWonDeals = dealsData.filter(
//           (deal) =>
//             deal.deal_stage?.toLowerCase() === "closed won"
//         );

//         setDeals(closedWonDeals);

//         console.log(
//           "CLOSED WON DEALS:",
//           closedWonDeals
//         );
//       } catch (err) {
//         console.error(
//           "Error loading deals:",
//           err.response?.data || err
//         );

//         setError("Failed to load Closed Won deals.");
//       } finally {
//         setLoadingOptions(false);
//       }
//     };

//     fetchDeals();
//   }, [open]);

//   // =====================================================
//   // LOAD DEAL OWNERS
//   // =====================================================

//   const loadDealOwners = async (dealId) => {
//     if (!dealId) {
//       setDealOwners([]);

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: [],
//       }));

//       return;
//     }

//     try {
//       setLoadingDealOwners(true);
//       setError("");

//       console.log(
//         "========== LOADING DEAL OWNERS =========="
//       );

//       console.log("DEAL ID:", dealId);

//       const response = await api.get(
//         `/deals/${dealId}/`
//       );

//       console.log(
//         "DEAL DETAILS RESPONSE:",
//         response.data
//       );

//       const dealData =
//         response.data?.data || response.data;

//       // -------------------------------------------------
//       // GET DEAL OWNER DETAILS
//       // -------------------------------------------------

//       const owners =
//         dealData?.deal_owner_details || [];

//       console.log(
//         "DEAL OWNERS:",
//         owners
//       );

//       setDealOwners(owners);

//       // -------------------------------------------------
//       // AUTOMATICALLY SELECT ALL DEAL OWNERS
//       // -------------------------------------------------

//       const ownerIds = owners.map(
//         (owner) => Number(owner.id)
//       );

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: ownerIds,
//       }));

//       if (owners.length === 0) {
//         setError(
//           "No Deal Owners are available for the selected Deal."
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Error loading Deal Owners:",
//         err.response?.data || err
//       );

//       setDealOwners([]);

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: [],
//       }));

//       setError(
//         "Failed to load Deal Owners."
//       );
//     } finally {
//       setLoadingDealOwners(false);
//     }
//   };

//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ---------------------------------------------------
//     // ASSOCIATED DEAL
//     // ---------------------------------------------------

//     if (name === "associatedDeal") {
//       setFormData((prev) => ({
//         ...prev,
//         associatedDeal: value,
//         ticketOwners: [],
//       }));

//       setDealOwners([]);

//       loadDealOwners(value);

//       return;
//     }

//     // ---------------------------------------------------
//     // TICKET OWNERS
//     // ---------------------------------------------------

//     if (name === "ticketOwners") {
//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: Array.isArray(value)
//           ? value.map((id) => Number(id))
//           : [],
//       }));

//       return;
//     }

//     // ---------------------------------------------------
//     // NORMAL FIELDS
//     // ---------------------------------------------------

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =====================================================
//   // RESET FORM
//   // =====================================================

//   const resetForm = () => {
//     setFormData({
//       ticketName: "",
//       description: "",
//       ticketStatus: "",
//       source: "",
//       priority: "",
//       ticketOwners: [],
//       associatedDeal: "",
//     });

//     setDealOwners([]);
//     setError("");
//   };

//   // =====================================================
//   // GET OWNER NAME
//   // =====================================================

//   const getOwnerName = (owner) => {
//     if (!owner) {
//       return "";
//     }

//     return (
//       `${owner.first_name || ""} ${
//         owner.last_name || ""
//       }`.trim() || owner.email
//     );
//   };

//   // =====================================================
//   // CREATE TICKET
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(
//       "========== SAVE CLICKED =========="
//     );

//     setError("");

//     // -----------------------------------------------------
//     // FRONTEND VALIDATION
//     // -----------------------------------------------------

//     if (
//       !formData.ticketName ||
//       !formData.description ||
//       !formData.ticketStatus ||
//       !formData.source ||
//       !formData.priority ||
//       formData.ticketOwners.length === 0 ||
//       !formData.associatedDeal
//     ) {
//       setError(
//         "Please fill all required fields."
//       );

//       return;
//     }

//     // -----------------------------------------------------
//     // VALIDATE TICKET OWNERS AGAINST DEAL OWNERS
//     // -----------------------------------------------------

//     const allowedOwnerIds = dealOwners.map(
//       (owner) => Number(owner.id)
//     );

//     const selectedOwnerIds =
//       formData.ticketOwners.map(
//         (id) => Number(id)
//       );

//     const invalidOwnerIds =
//       selectedOwnerIds.filter(
//         (id) =>
//           !allowedOwnerIds.includes(id)
//       );

//     if (invalidOwnerIds.length > 0) {
//       setError(
//         "Ticket Owners must be selected from the associated Deal Owners."
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       // ---------------------------------------------------
//       // PAYLOAD
//       // ---------------------------------------------------

//       const payload = {
//         ticket_name: formData.ticketName,
//         description: formData.description,
//         ticket_status: formData.ticketStatus,
//         source: formData.source,
//         priority: formData.priority,

//         // MULTIPLE OWNER IDS
//         ticket_owners:
//           selectedOwnerIds,

//         associated_deal:
//           Number(formData.associatedDeal),
//       };

//       console.log(
//         "========== CREATE TICKET PAYLOAD =========="
//       );

//       console.log(payload);

//       // ---------------------------------------------------
//       // POST REQUEST
//       // ---------------------------------------------------

//       const response = await api.post(
//         "/tickets/",
//         payload
//       );

//       console.log(
//         "========== TICKET CREATED =========="
//       );

//       console.log(response.data);

//       // ---------------------------------------------------
//       // RESET
//       // ---------------------------------------------------

//       resetForm();

//       // ---------------------------------------------------
//       // CLOSE DRAWER
//       // ---------------------------------------------------

//       onClose();
//     } catch (err) {
//       console.error(
//         "========== CREATE TICKET ERROR =========="
//       );

//       console.error(
//         "STATUS:",
//         err.response?.status
//       );

//       console.error(
//         "DATA:",
//         err.response?.data
//       );

//       console.error(
//         "MESSAGE:",
//         err.message
//       );

//       // ---------------------------------------------------
//       // SHOW BACKEND ERROR
//       // ---------------------------------------------------

//       let errorMessage =
//         "Failed to create ticket.";

//       if (err.response?.data) {
//         const backendError =
//           err.response.data;

//         if (
//           typeof backendError ===
//           "string"
//         ) {
//           errorMessage =
//             backendError;
//         } else if (
//           backendError.detail
//         ) {
//           errorMessage =
//             backendError.detail;
//         } else {
//           errorMessage =
//             Object.entries(
//               backendError
//             )
//               .map(
//                 ([
//                   field,
//                   messages,
//                 ]) => {
//                   const message =
//                     Array.isArray(
//                       messages
//                     )
//                       ? messages.join(
//                           ", "
//                         )
//                       : messages;

//                   return `${field}: ${message}`;
//                 }
//               )
//               .join("\n");
//         }
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // CLOSE DRAWER
//   // =====================================================

//   const handleClose = () => {
//     if (loading) return;

//     resetForm();
//     onClose();
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={handleClose}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: {
//             xs: "100vw",
//             sm: 500,
//           },
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
//           title="Create Ticket"
//           onClose={handleClose}
//         />

//         {/* =================================================
//             FORM CONTENT
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
//                 p: 1.5,
//                 borderRadius: "8px",
//                 backgroundColor: "#FEF2F2",
//                 border:
//                   "1px solid #FECACA",
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "#DC2626",
//                   fontSize: "13px",
//                   whiteSpace:
//                     "pre-line",
//                 }}
//               >
//                 {error}
//               </Typography>
//             </Box>
//           )}

//           {/* =================================================
//               TICKET NAME
//           ================================================= */}

//           <CommonInput
//             label="Ticket Name"
//             name="ticketName"
//             value={
//               formData.ticketName
//             }
//             onChange={
//               handleChange
//             }
//             placeholder="Enter ticket name"
//             fullWidth
//             required
//           />

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Description
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <TextField
//               name="description"
//               placeholder="Enter description"
//               fullWidth
//               multiline
//               rows={4}
//               value={
//                 formData.description
//               }
//               onChange={
//                 handleChange
//               }
//               required
//               sx={{
//                 "& .MuiOutlinedInput-root":
//                   {
//                     borderRadius:
//                       "10px",
//                   },
//               }}
//             />
//           </Box>

//           {/* =================================================
//               STATUS + SOURCE
//           ================================================= */}

//           <Grid container spacing={2}>

//             {/* STATUS */}

//             <Grid size={6}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Ticket Status
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <FormControl
//                 fullWidth
//                 size="small"
//                 required
//               >
//                 <InputLabel id="ticket-status-label">
//                   Choose
//                 </InputLabel>

//                 <Select
//                   labelId="ticket-status-label"
//                   name="ticketStatus"
//                   value={
//                     formData.ticketStatus
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <MenuItem value="NEW">
//                     New
//                   </MenuItem>

//                   <MenuItem value="OPEN">
//                     Open
//                   </MenuItem>

//                   <MenuItem value="IN_PROGRESS">
//                     In Progress
//                   </MenuItem>

//                   <MenuItem value="WAITING_ON_CONTACT">
//                     Waiting on Contact
//                   </MenuItem>

//                   <MenuItem value="WAITING_ON_US">
//                     Waiting on Us
//                   </MenuItem>

//                   <MenuItem value="CLOSED">
//                     Closed
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* SOURCE */}

//             <Grid size={6}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Source
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <FormControl
//                 fullWidth
//                 size="small"
//                 required
//               >
//                 <InputLabel id="source-label">
//                   Choose
//                 </InputLabel>

//                 <Select
//                   labelId="source-label"
//                   name="source"
//                   value={
//                     formData.source
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <MenuItem value="CHAT">
//                     Chat
//                   </MenuItem>

//                   <MenuItem value="EMAIL">
//                     Email
//                   </MenuItem>

//                   <MenuItem value="PHONE">
//                     Phone
//                   </MenuItem>

//                   <MenuItem value="WEB">
//                     Web
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           {/* =================================================
//               PRIORITY
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Priority
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="priority-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="priority-label"
//                 name="priority"
//                 value={
//                   formData.priority
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//               >
//                 <MenuItem value="HIGH">
//                   High
//                 </MenuItem>

//                 <MenuItem value="MEDIUM">
//                   Medium
//                 </MenuItem>

//                 <MenuItem value="LOW">
//                   Low
//                 </MenuItem>

//                 <MenuItem value="CRITICAL">
//                   Critical
//                 </MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* =================================================
//               TICKET OWNER - MULTI SELECT
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Ticket Owner
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="ticket-owner-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="ticket-owner-label"
//                 multiple
//                 name="ticketOwners"
//                 value={
//                   formData.ticketOwners
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   !formData.associatedDeal ||
//                   loadingDealOwners ||
//                   dealOwners.length === 0
//                 }
//                 renderValue={(
//                   selected
//                 ) => {
//                   if (
//                     !formData.associatedDeal
//                   ) {
//                     return "Choose";
//                   }

//                   if (
//                     loadingDealOwners
//                   ) {
//                     return "Loading...";
//                   }

//                   if (
//                     !selected ||
//                     selected.length === 0
//                   ) {
//                     return "Choose";
//                   }

//                   return selected
//                     .map((id) => {
//                       const owner =
//                         dealOwners.find(
//                           (item) =>
//                             Number(item.id) ===
//                             Number(id)
//                         );

//                       return owner
//                         ? getOwnerName(owner)
//                         : "";
//                     })
//                     .filter(Boolean)
//                     .join(", ");
//                 }}
//               >
//                 {!formData.associatedDeal ? (
//                   <MenuItem disabled>
//                     Select Associated Deal first
//                   </MenuItem>
//                 ) : loadingDealOwners ? (
//                   <MenuItem disabled>
//                     Loading Deal Owners...
//                   </MenuItem>
//                 ) : dealOwners.length === 0 ? (
//                   <MenuItem disabled>
//                     No Deal Owners available
//                   </MenuItem>
//                 ) : (
//                   dealOwners.map((owner) => {
//                     const ownerName =
//                       getOwnerName(owner);

//                     return (
//                       <MenuItem
//                         key={owner.id}
//                         value={Number(owner.id)}
//                       >
//                         <Checkbox
//                           checked={formData.ticketOwners.includes(
//                             Number(owner.id)
//                           )}
//                         />

//                         <ListItemText
//                           primary={
//                             ownerName
//                           }
//                         />
//                       </MenuItem>
//                     );
//                   })
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* =================================================
//               ASSOCIATED DEAL
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Associated Deal
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="associated-deal-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="associated-deal-label"
//                 name="associatedDeal"
//                 value={
//                   formData.associatedDeal
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingOptions
//                 }
//               >
//                 {loadingOptions ? (
//                   <MenuItem disabled>
//                     Loading deals...
//                   </MenuItem>
//                 ) : deals.length ===
//                   0 ? (
//                   <MenuItem disabled>
//                     No Closed Won deals available
//                   </MenuItem>
//                 ) : (
//                   deals.map((deal) => (
//                     <MenuItem
//                       key={deal.id}
//                       value={deal.id}
//                     >
//                       {
//                         deal.deal_name
//                       }
//                     </MenuItem>
//                   ))
//                 )}
//               </Select>
//             </FormControl>
//           </Box>
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
//             backgroundColor: "#fff",
//           }}
//         >
//           {/* CANCEL */}

//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={
//               handleClose
//             }
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           {/* SAVE */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading ||
//               loadingOptions
//             }
//           >
//             {loading
//               ? "Saving..."
//               : "Save"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Drawer,
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";

// import api from "../../../services/api";

// export default function CreateTicketDrawer({ open, onClose }) {
//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     ticketName: "",
//     description: "",
//     ticketStatus: "",
//     source: "",
//     priority: "",

//     // MULTIPLE TICKET OWNERS
//     ticketOwners: [],

//     associatedDeal: "",
//   });

//   // =====================================================
//   // OPTIONS
//   // =====================================================

//   const [users, setUsers] = useState([]);
//   const [deals, setDeals] = useState([]);

//   // =====================================================
//   // LOADING / ERROR
//   // =====================================================

//   const [loading, setLoading] = useState(false);
//   const [loadingOptions, setLoadingOptions] = useState(false);
//   const [error, setError] = useState("");

//   // =====================================================
//   // LOAD USERS + CLOSED WON DEALS
//   // =====================================================

//   useEffect(() => {
//     if (!open) return;

//     const fetchOptions = async () => {
//       try {
//         setLoadingOptions(true);
//         setError("");

//         const [usersResponse, dealsResponse] =
//           await Promise.all([
//             api.get("/accounts/users/"),
//             api.get("/deals/"),
//           ]);

//         console.log(
//           "USERS RESPONSE:",
//           usersResponse.data
//         );

//         console.log(
//           "DEALS RESPONSE:",
//           dealsResponse.data
//         );

//         const usersData = Array.isArray(
//           usersResponse.data
//         )
//           ? usersResponse.data
//           : usersResponse.data.results || [];

//         const dealsData = Array.isArray(
//           dealsResponse.data
//         )
//           ? dealsResponse.data
//           : dealsResponse.data.results || [];

//         // -------------------------------------------------
//         // ONLY CLOSED WON DEALS
//         // -------------------------------------------------

//         const closedWonDeals = dealsData.filter(
//           (deal) =>
//             deal.deal_stage?.toLowerCase() ===
//             "closed won"
//         );

//         setUsers(usersData);
//         setDeals(closedWonDeals);

//         console.log(
//           "CLOSED WON DEALS:",
//           closedWonDeals
//         );
//       } catch (err) {
//         console.error(
//           "Error loading ticket options:",
//           err.response?.data || err
//         );

//         setError(
//           "Failed to load Ticket Owners or Deals."
//         );
//       } finally {
//         setLoadingOptions(false);
//       }
//     };

//     fetchOptions();
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
//   // RESET FORM
//   // =====================================================

//   const resetForm = () => {
//     setFormData({
//       ticketName: "",
//       description: "",
//       ticketStatus: "",
//       source: "",
//       priority: "",
//       ticketOwners: [],
//       associatedDeal: "",
//     });

//     setError("");
//   };

//   // =====================================================
//   // CREATE TICKET
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(
//       "========== SAVE CLICKED =========="
//     );

//     setError("");

//     // -----------------------------------------------------
//     // FRONTEND VALIDATION
//     // -----------------------------------------------------

//     if (
//       !formData.ticketName ||
//       !formData.description ||
//       !formData.ticketStatus ||
//       !formData.source ||
//       !formData.priority ||
//       formData.ticketOwners.length === 0 ||
//       !formData.associatedDeal
//     ) {
//       setError(
//         "Please fill all required fields."
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       // ---------------------------------------------------
//       // PAYLOAD
//       // ---------------------------------------------------

//       const payload = {
//         ticket_name: formData.ticketName,
//         description: formData.description,
//         ticket_status: formData.ticketStatus,
//         source: formData.source,
//         priority: formData.priority,

//         // MULTIPLE OWNER IDS
//         ticket_owners:
//           formData.ticketOwners.map(
//             (id) => Number(id)
//           ),

//         associated_deal:
//           Number(formData.associatedDeal),
//       };

//       console.log(
//         "========== CREATE TICKET PAYLOAD =========="
//       );

//       console.log(payload);

//       // ---------------------------------------------------
//       // POST REQUEST
//       // ---------------------------------------------------

//       const response = await api.post(
//         "/tickets/",
//         payload
//       );

//       console.log(
//         "========== TICKET CREATED =========="
//       );

//       console.log(response.data);

//       // ---------------------------------------------------
//       // RESET
//       // ---------------------------------------------------

//       resetForm();

//       // ---------------------------------------------------
//       // CLOSE DRAWER
//       // ---------------------------------------------------

//       onClose();
//     } catch (err) {
//       console.error(
//         "========== CREATE TICKET ERROR =========="
//       );

//       console.error(
//         "STATUS:",
//         err.response?.status
//       );

//       console.error(
//         "DATA:",
//         err.response?.data
//       );

//       console.error(
//         "MESSAGE:",
//         err.message
//       );

//       // ---------------------------------------------------
//       // SHOW BACKEND ERROR
//       // ---------------------------------------------------

//       let errorMessage =
//         "Failed to create ticket.";

//       if (err.response?.data) {
//         const backendError =
//           err.response.data;

//         if (
//           typeof backendError ===
//           "string"
//         ) {
//           errorMessage =
//             backendError;
//         } else if (
//           backendError.detail
//         ) {
//           errorMessage =
//             backendError.detail;
//         } else {
//           errorMessage =
//             Object.entries(
//               backendError
//             )
//               .map(
//                 ([
//                   field,
//                   messages,
//                 ]) => {
//                   const message =
//                     Array.isArray(
//                       messages
//                     )
//                       ? messages.join(
//                           ", "
//                         )
//                       : messages;

//                   return `${field}: ${message}`;
//                 }
//               )
//               .join("\n");
//         }
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // CLOSE DRAWER
//   // =====================================================

//   const handleClose = () => {
//     if (loading) return;

//     resetForm();
//     onClose();
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={handleClose}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: {
//             xs: "100vw",
//             sm: 500,
//           },
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
//           title="Create Ticket"
//           onClose={handleClose}
//         />

//         {/* =================================================
//             FORM CONTENT
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
//                 p: 1.5,
//                 borderRadius: "8px",
//                 backgroundColor: "#FEF2F2",
//                 border:
//                   "1px solid #FECACA",
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "#DC2626",
//                   fontSize: "13px",
//                   whiteSpace:
//                     "pre-line",
//                 }}
//               >
//                 {error}
//               </Typography>
//             </Box>
//           )}

//           {/* =================================================
//               TICKET NAME
//           ================================================= */}

//           <CommonInput
//             label="Ticket Name"
//             name="ticketName"
//             value={
//               formData.ticketName
//             }
//             onChange={
//               handleChange
//             }
//             placeholder="Enter ticket name"
//             fullWidth
//             required
//           />

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Description
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <TextField
//               name="description"
//               placeholder="Enter description"
//               fullWidth
//               multiline
//               rows={4}
//               value={
//                 formData.description
//               }
//               onChange={
//                 handleChange
//               }
//               required
//               sx={{
//                 "& .MuiOutlinedInput-root":
//                   {
//                     borderRadius:
//                       "10px",
//                   },
//               }}
//             />
//           </Box>

//           {/* =================================================
//               STATUS + SOURCE
//           ================================================= */}

//           <Grid container spacing={2}>

//             {/* STATUS */}

//             <Grid size={6}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Ticket Status
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <FormControl
//                 fullWidth
//                 size="small"
//                 required
//               >
//                 <InputLabel id="ticket-status-label">
//                   Choose
//                 </InputLabel>

//                 <Select
//                   labelId="ticket-status-label"
//                   name="ticketStatus"
//                   value={
//                     formData.ticketStatus
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <MenuItem value="NEW">
//                     New
//                   </MenuItem>

//                   <MenuItem value="OPEN">
//                     Open
//                   </MenuItem>

//                   <MenuItem value="IN_PROGRESS">
//                     In Progress
//                   </MenuItem>

//                   <MenuItem value="WAITING_ON_CONTACT">
//                     Waiting on Contact
//                   </MenuItem>

//                   <MenuItem value="WAITING_ON_US">
//                     Waiting on Us
//                   </MenuItem>

//                   <MenuItem value="CLOSED">
//                     Closed
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* SOURCE */}

//             <Grid size={6}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Source
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <FormControl
//                 fullWidth
//                 size="small"
//                 required
//               >
//                 <InputLabel id="source-label">
//                   Choose
//                 </InputLabel>

//                 <Select
//                   labelId="source-label"
//                   name="source"
//                   value={
//                     formData.source
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <MenuItem value="CHAT">
//                     Chat
//                   </MenuItem>

//                   <MenuItem value="EMAIL">
//                     Email
//                   </MenuItem>

//                   <MenuItem value="PHONE">
//                     Phone
//                   </MenuItem>

//                   <MenuItem value="WEB">
//                     Web
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           {/* =================================================
//               PRIORITY
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Priority
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="priority-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="priority-label"
//                 name="priority"
//                 value={
//                   formData.priority
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//               >
//                 <MenuItem value="HIGH">
//                   High
//                 </MenuItem>

//                 <MenuItem value="MEDIUM">
//                   Medium
//                 </MenuItem>

//                 <MenuItem value="LOW">
//                   Low
//                 </MenuItem>

//                 <MenuItem value="CRITICAL">
//                   Critical
//                 </MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* =================================================
//               TICKET OWNER - MULTI SELECT
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Ticket Owner
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="ticket-owner-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="ticket-owner-label"
//                 multiple
//                 name="ticketOwners"
//                 value={
//                   formData.ticketOwners
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingOptions
//                 }
//                 renderValue={(
//                   selected
//                 ) =>
//                   selected
//                     .map((id) => {
//                       const user =
//                         users.find(
//                           (item) =>
//                             String(
//                               item.id
//                             ) ===
//                             String(id)
//                         );

//                       if (!user) {
//                         return "";
//                       }

//                       return (
//                         `${user.first_name || ""} ${
//                           user.last_name || ""
//                         }`.trim() ||
//                         user.email
//                       );
//                     })
//                     .filter(Boolean)
//                     .join(", ")
//                 }
//               >
//                 {loadingOptions ? (
//                   <MenuItem disabled>
//                     Loading users...
//                   </MenuItem>
//                 ) : users.length ===
//                   0 ? (
//                   <MenuItem disabled>
//                     No users available
//                   </MenuItem>
//                 ) : (
//                   users.map((user) => {
//                     const userName =
//                       `${user.first_name || ""} ${
//                         user.last_name || ""
//                       }`.trim() ||
//                       user.email;

//                     return (
//                       <MenuItem
//                         key={user.id}
//                         value={
//                           user.id
//                         }
//                       >
//                         <Checkbox
//                           checked={formData.ticketOwners.includes(
//                             user.id
//                           )}
//                         />

//                         <ListItemText
//                           primary={
//                             userName
//                           }
//                         />
//                       </MenuItem>
//                     );
//                   })
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* =================================================
//               ASSOCIATED DEAL
//           ================================================= */}

//           <Box>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#344054",
//               }}
//             >
//               Associated Deal
//               <span
//                 style={{
//                   color: "red",
//                 }}
//               >
//                 {" "}
//                 *
//               </span>
//             </Typography>

//             <FormControl
//               fullWidth
//               size="small"
//               required
//             >
//               <InputLabel id="associated-deal-label">
//                 Choose
//               </InputLabel>

//               <Select
//                 labelId="associated-deal-label"
//                 name="associatedDeal"
//                 value={
//                   formData.associatedDeal
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingOptions
//                 }
//               >
//                 {loadingOptions ? (
//                   <MenuItem disabled>
//                     Loading deals...
//                   </MenuItem>
//                 ) : deals.length ===
//                   0 ? (
//                   <MenuItem disabled>
//                     No Closed Won deals available
//                   </MenuItem>
//                 ) : (
//                   deals.map((deal) => (
//                     <MenuItem
//                       key={deal.id}
//                       value={deal.id}
//                     >
//                       {
//                         deal.deal_name
//                       }
//                     </MenuItem>
//                   ))
//                 )}
//               </Select>
//             </FormControl>
//           </Box>
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
//             backgroundColor: "#fff",
//           }}
//         >
//           {/* CANCEL */}

//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={
//               handleClose
//             }
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           {/* SAVE */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading ||
//               loadingOptions
//             }
//           >
//             {loading
//               ? "Saving..."
//               : "Save"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }



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
import { useToast } from "../../../Components/common/Toast";

import api from "../../../services/api";

export default function CreateTicketDrawer({ open, onClose }) {
  const { showToast } = useToast();

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    ticketName: "",
    description: "",
    ticketStatus: "",
    source: "",
    priority: "",
    ticketOwners: [],
    associatedDeal: "",
  });

  // =====================================================
  // OPTIONS
  // =====================================================

  const [deals, setDeals] = useState([]);
  const [dealOwners, setDealOwners] = useState([]);

  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingDealOwners, setLoadingDealOwners] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD CLOSED WON DEALS
  // =====================================================

  useEffect(() => {
    if (!open) return;

    const fetchDeals = async () => {
      try {
        setLoadingOptions(true);
        setError("");

        const response = await api.get("/deals/");

        console.log("DEALS RESPONSE:", response.data);

        const dealsData = Array.isArray(response.data)
          ? response.data
          : response.data?.results || response.data?.data || [];

        const closedWonDeals = dealsData.filter(
          (deal) =>
            String(deal.deal_stage || "")
              .trim()
              .toLowerCase() === "closed won"
        );

        setDeals(closedWonDeals);

        console.log("CLOSED WON DEALS:", closedWonDeals);
      } catch (err) {
        console.error(
          "Error loading deals:",
          err.response?.data || err
        );

        const message = "Failed to load Closed Won deals.";

        setError(message);
        showToast(message, "error");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchDeals();
  }, [open, showToast]);

  // =====================================================
  // LOAD DEAL OWNERS
  // =====================================================

  const loadDealOwners = async (dealId) => {
    if (!dealId) {
      setDealOwners([]);

      setFormData((prev) => ({
        ...prev,
        ticketOwners: [],
      }));

      return;
    }

    try {
      setLoadingDealOwners(true);
      setError("");

      console.log("========== LOADING DEAL OWNERS ==========");
      console.log("DEAL ID:", dealId);

      const response = await api.get(`/deals/${dealId}/`);

      console.log("DEAL DETAILS RESPONSE:", response.data);

      const dealData = response.data?.data || response.data;

      const owners = dealData?.deal_owner_details || [];

      console.log("DEAL OWNERS:", owners);

      setDealOwners(owners);

      // Automatically select all Deal Owners
      const ownerIds = owners.map((owner) => Number(owner.id));

      setFormData((prev) => ({
        ...prev,
        ticketOwners: ownerIds,
      }));

      if (owners.length === 0) {
        const message =
          "No Deal Owners are available for the selected Deal.";

        setError(message);
        showToast(message, "warning");
      }
    } catch (err) {
      console.error(
        "Error loading Deal Owners:",
        err.response?.data || err
      );

      setDealOwners([]);

      setFormData((prev) => ({
        ...prev,
        ticketOwners: [],
      }));

      const message = "Failed to load Deal Owners.";

      setError(message);
      showToast(message, "error");
    } finally {
      setLoadingDealOwners(false);
    }
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Associated Deal
    if (name === "associatedDeal") {
      setFormData((prev) => ({
        ...prev,
        associatedDeal: value,
        ticketOwners: [],
      }));

      setDealOwners([]);

      loadDealOwners(value);

      return;
    }

    // Ticket Owners
    if (name === "ticketOwners") {
      setFormData((prev) => ({
        ...prev,
        ticketOwners: Array.isArray(value)
          ? value.map((id) => Number(id))
          : [],
      }));

      return;
    }

    // Normal fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
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
      ticketOwners: [],
      associatedDeal: "",
    });

    setDealOwners([]);
    setError("");
  };

  // =====================================================
  // GET OWNER NAME
  // =====================================================

  const getOwnerName = (owner) => {
    if (!owner) {
      return "";
    }

    return (
      `${owner.first_name || ""} ${owner.last_name || ""}`.trim() ||
      owner.email ||
      `User ${owner.id}`
    );
  };

  // =====================================================
  // CREATE TICKET
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("========== SAVE CLICKED ==========");

    setError("");

    // ===================================================
    // FRONTEND VALIDATION
    // ===================================================

    if (
      !formData.ticketName.trim() ||
      !formData.description.trim() ||
      !formData.ticketStatus ||
      !formData.source ||
      !formData.priority ||
      formData.ticketOwners.length === 0 ||
      !formData.associatedDeal
    ) {
      const message = "Please fill all required fields.";

      setError(message);

      showToast(message, "error");

      return;
    }

    // ===================================================
    // VALIDATE TICKET OWNERS AGAINST DEAL OWNERS
    // ===================================================

    const allowedOwnerIds = dealOwners.map((owner) =>
      Number(owner.id)
    );

    const selectedOwnerIds = formData.ticketOwners.map((id) =>
      Number(id)
    );

    const invalidOwnerIds = selectedOwnerIds.filter(
      (id) => !allowedOwnerIds.includes(id)
    );

    if (invalidOwnerIds.length > 0) {
      const message =
        "Ticket Owners must be selected from the associated Deal Owners.";

      setError(message);

      showToast(message, "error");

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // PAYLOAD
      // =================================================

      const payload = {
        ticket_name: formData.ticketName.trim(),
        description: formData.description.trim(),
        ticket_status: formData.ticketStatus,
        source: formData.source,
        priority: formData.priority,
        ticket_owners: selectedOwnerIds,
        associated_deal: Number(formData.associatedDeal),
      };

      console.log(
        "========== CREATE TICKET PAYLOAD =========="
      );

      console.log(payload);

      // =================================================
      // POST REQUEST
      // =================================================

      const response = await api.post("/tickets/", payload);

      console.log("========== TICKET CREATED ==========");
      console.log(response.data);

      // =================================================
      // SUCCESS TOAST
      // =================================================

      showToast(
        "Ticket created successfully",
        "success"
      );

      // =================================================
      // RESET
      // =================================================

      resetForm();

      // =================================================
      // CLOSE DRAWER
      // =================================================

      onClose();
    } catch (err) {
      console.error(
        "========== CREATE TICKET ERROR =========="
      );

      console.error("STATUS:", err.response?.status);
      console.error("DATA:", err.response?.data);
      console.error("MESSAGE:", err.message);

      // =================================================
      // SHOW BACKEND ERROR
      // =================================================

      let errorMessage = "Failed to create ticket.";

      if (err.response?.data) {
        const backendError = err.response.data;

        if (typeof backendError === "string") {
          errorMessage = backendError;
        } else if (backendError.detail) {
          errorMessage = backendError.detail;
        } else if (typeof backendError === "object") {
          errorMessage = Object.entries(backendError)
            .map(([field, messages]) => {
              const message = Array.isArray(messages)
                ? messages.join(", ")
                : String(messages);

              return `${field}: ${message}`;
            })
            .join("\n");
        }
      }

      setError(errorMessage);

      // =================================================
      // ERROR TOAST
      // =================================================

      showToast(errorMessage, "error");
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
        {/* HEADER */}

        <DrawerHeader
          title="Create Ticket"
          onClose={handleClose}
        />

        {/* FORM CONTENT */}

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

          {/* TICKET NAME */}

          <CommonInput
            label="Ticket Name"
            name="ticketName"
            value={formData.ticketName}
            onChange={handleChange}
            placeholder="Enter ticket name"
            fullWidth
            required
          />

          {/* DESCRIPTION */}

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
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="OPEN">Open</MenuItem>
                  <MenuItem value="IN_PROGRESS">
                    In Progress
                  </MenuItem>
                  <MenuItem value="WAITING_ON_CONTACT">
                    Waiting on Contact
                  </MenuItem>
                  <MenuItem value="WAITING_ON_US">
                    Waiting on Us
                  </MenuItem>
                  <MenuItem value="CLOSED">Closed</MenuItem>
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
                  <MenuItem value="CHAT">Chat</MenuItem>
                  <MenuItem value="EMAIL">Email</MenuItem>
                  <MenuItem value="PHONE">Phone</MenuItem>
                  <MenuItem value="WEB">Web</MenuItem>
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
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
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
                multiple
                name="ticketOwners"
                value={formData.ticketOwners}
                label="Choose"
                onChange={handleChange}
                disabled={
                  !formData.associatedDeal ||
                  loadingDealOwners ||
                  dealOwners.length === 0
                }
                renderValue={(selected) => {
                  if (!formData.associatedDeal) {
                    return "Choose";
                  }

                  if (loadingDealOwners) {
                    return "Loading...";
                  }

                  if (
                    !selected ||
                    selected.length === 0
                  ) {
                    return "Choose";
                  }

                  return selected
                    .map((id) => {
                      const owner = dealOwners.find(
                        (item) =>
                          Number(item.id) === Number(id)
                      );

                      return owner
                        ? getOwnerName(owner)
                        : "";
                    })
                    .filter(Boolean)
                    .join(", ");
                }}
              >
                {!formData.associatedDeal ? (
                  <MenuItem disabled>
                    Select Associated Deal first
                  </MenuItem>
                ) : loadingDealOwners ? (
                  <MenuItem disabled>
                    Loading Deal Owners...
                  </MenuItem>
                ) : dealOwners.length === 0 ? (
                  <MenuItem disabled>
                    No Deal Owners available
                  </MenuItem>
                ) : (
                  dealOwners.map((owner) => {
                    const ownerName =
                      getOwnerName(owner);

                    return (
                      <MenuItem
                        key={owner.id}
                        value={Number(owner.id)}
                      >
                        <Checkbox
                          checked={formData.ticketOwners.includes(
                            Number(owner.id)
                          )}
                        />

                        <ListItemText
                          primary={ownerName}
                        />
                      </MenuItem>
                    );
                  })
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
                    No Closed Won deals available
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

        {/* FOOTER */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#fff",
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
              loadingOptions ||
              loadingDealOwners
            }
          >
            {loading ? "Saving..." : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
