
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

// export default function EditTicketDrawer({
//   open,
//   onClose,
//   ticketId,
//   onUpdated,
// }) {
//   const [formData, setFormData] = useState({
//     ticketName: "",
//     description: "",
//     ticketStatus: "",
//     source: "",
//     priority: "",
//     ticketOwners: [],
//     associatedDeal: "",
//   });

//   const [users, setUsers] = useState([]);
//   const [deals, setDeals] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [loadingData, setLoadingData] = useState(false);

//   // =====================================================
//   // LOAD TICKET + USERS + DEALS
//   // =====================================================

//   useEffect(() => {
//     if (!open || !ticketId) return;

//     const fetchData = async () => {
//       try {
//         setLoadingData(true);

//         const [
//           ticketResponse,
//           usersResponse,
//           dealsResponse,
//         ] = await Promise.all([
//           api.get(`/tickets/${ticketId}/`),
//           api.get("/accounts/users/"),
//           api.get("/deals/"),
//         ]);

//         const ticketDetail = ticketResponse.data;

//         const usersData = Array.isArray(
//           usersResponse.data
//         )
//           ? usersResponse.data
//           : usersResponse.data?.results || [];

//         const dealsData = Array.isArray(
//           dealsResponse.data
//         )
//           ? dealsResponse.data
//           : dealsResponse.data?.results || [];

//         console.log(
//           "EDIT TICKET:",
//           ticketDetail
//         );

//         console.log(
//           "EDIT USERS:",
//           usersData
//         );

//         console.log(
//           "EDIT DEALS:",
//           dealsData
//         );

//         setUsers(usersData);
//         setDeals(dealsData);

//         // =================================================
//         // FIND TICKET OWNER IDS
//         // =================================================

//         let ownerIds = [];

//         // -------------------------------------------------
//         // Preferred backend response:
//         //
//         // ticket_owner_ids: [16, 17]
//         // -------------------------------------------------

//         if (
//           Array.isArray(
//             ticketDetail.ticket_owner_ids
//           )
//         ) {
//           ownerIds =
//             ticketDetail.ticket_owner_ids.map(
//               (id) => String(id)
//             );
//         }

//         // -------------------------------------------------
//         // Backend may return ticket_owners as IDs
//         //
//         // ticket_owners: [16, 17]
//         // -------------------------------------------------

//         if (
//           ownerIds.length === 0 &&
//           Array.isArray(
//             ticketDetail.ticket_owners
//           )
//         ) {
//           ownerIds =
//             ticketDetail.ticket_owners
//               .map((owner) => {
//                 // Owner is an ID
//                 if (
//                   typeof owner === "number"
//                 ) {
//                   return String(owner);
//                 }

//                 // Owner is numeric string
//                 if (
//                   typeof owner === "string" &&
//                   !isNaN(owner)
//                 ) {
//                   return String(owner);
//                 }

//                 // Owner is object
//                 if (
//                   owner &&
//                   typeof owner === "object" &&
//                   owner.id
//                 ) {
//                   return String(owner.id);
//                 }

//                 // Owner is name/email
//                 if (
//                   typeof owner === "string"
//                 ) {
//                   const foundUser =
//                     usersData.find(
//                       (user) => {
//                         const fullName =
//                           `${user.first_name || ""} ${
//                             user.last_name || ""
//                           }`.trim();

//                         return (
//                           String(
//                             user.email || ""
//                           ).toLowerCase() ===
//                             owner.toLowerCase() ||
//                           fullName.toLowerCase() ===
//                             owner.toLowerCase()
//                         );
//                       }
//                     );

//                   return foundUser
//                     ? String(foundUser.id)
//                     : null;
//                 }

//                 return null;
//               })
//               .filter(Boolean);
//         }

//         // -------------------------------------------------
//         // Backward compatibility with old ticket_owner
//         // -------------------------------------------------

//         if (
//           ownerIds.length === 0 &&
//           ticketDetail.ticket_owner !==
//             null &&
//           ticketDetail.ticket_owner !==
//             undefined
//         ) {
//           const oldOwner =
//             ticketDetail.ticket_owner;

//           // Numeric ID
//           if (
//             typeof oldOwner === "number"
//           ) {
//             ownerIds = [
//               String(oldOwner),
//             ];
//           }

//           // Numeric string
//           else if (
//             typeof oldOwner === "string" &&
//             !isNaN(oldOwner)
//           ) {
//             ownerIds = [
//               String(oldOwner),
//             ];
//           }

//           // Name/email
//           else if (
//             typeof oldOwner === "string"
//           ) {
//             const foundUser =
//               usersData.find((user) => {
//                 const fullName =
//                   `${user.first_name || ""} ${
//                     user.last_name || ""
//                   }`.trim();

//                 return (
//                   String(
//                     user.email || ""
//                   ).toLowerCase() ===
//                     oldOwner.toLowerCase() ||
//                   fullName.toLowerCase() ===
//                     oldOwner.toLowerCase()
//                 );
//               });

//             if (foundUser) {
//               ownerIds = [
//                 String(foundUser.id),
//               ];
//             }
//           }

//           // Object
//           else if (
//             oldOwner &&
//             typeof oldOwner === "object" &&
//             oldOwner.id
//           ) {
//             ownerIds = [
//               String(oldOwner.id),
//             ];
//           }
//         }

//         console.log(
//           "EDIT TICKET OWNER IDS:",
//           ownerIds
//         );

//         // =================================================
//         // FIND DEAL ID
//         // =================================================

//         let dealId = "";

//         const associatedDeal =
//           ticketDetail.associated_deal;

//         // Deal ID
//         if (
//           typeof associatedDeal === "number"
//         ) {
//           dealId = String(
//             associatedDeal
//           );
//         }

//         // Deal ID as string
//         if (
//           !dealId &&
//           typeof associatedDeal === "string" &&
//           !isNaN(associatedDeal)
//         ) {
//           dealId = String(
//             associatedDeal
//           );
//         }

//         // Deal object
//         if (
//           !dealId &&
//           associatedDeal &&
//           typeof associatedDeal === "object"
//         ) {
//           if (associatedDeal.id) {
//             dealId = String(
//               associatedDeal.id
//             );
//           }
//         }

//         // Find deal by deal name
//         if (!dealId) {
//           const dealName =
//             ticketDetail.deal_name ||
//             ticketDetail.associated_deal_name;

//           if (dealName) {
//             const deal =
//               dealsData.find(
//                 (item) =>
//                   String(
//                     item.deal_name || ""
//                   ).toLowerCase() ===
//                   String(
//                     dealName
//                   ).toLowerCase()
//               );

//             if (deal) {
//               dealId = String(
//                 deal.id
//               );
//             }
//           }
//         }

//         // =================================================
//         // SET FORM DATA
//         // =================================================

//         setFormData({
//           ticketName:
//             ticketDetail.ticket_name ||
//             "",

//           description:
//             ticketDetail.description ||
//             "",

//           ticketStatus:
//             ticketDetail.ticket_status ||
//             "",

//           source:
//             ticketDetail.source ||
//             "",

//           priority:
//             ticketDetail.priority ||
//             "",

//           ticketOwners:
//             ownerIds,

//           associatedDeal:
//             dealId,
//         });
//       } catch (error) {
//         console.error(
//           "Error loading ticket:",
//           error.response?.data || error
//         );
//       } finally {
//         setLoadingData(false);
//       }
//     };

//     fetchData();
//   }, [open, ticketId]);

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
//   // UPDATE TICKET
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!ticketId) return;

//     // =================================================
//     // VALIDATION
//     // =================================================

//     if (
//       !formData.ticketOwners ||
//       formData.ticketOwners.length === 0
//     ) {
//       alert(
//         "Please select at least one Ticket Owner."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         ticket_name:
//           formData.ticketName,

//         description:
//           formData.description,

//         ticket_status:
//           formData.ticketStatus,

//         source:
//           formData.source,

//         priority:
//           formData.priority,

//         // IMPORTANT:
//         // ManyToMany field
//         ticket_owners:
//           formData.ticketOwners.map(
//             (id) => Number(id)
//           ),

//         associated_deal:
//           Number(
//             formData.associatedDeal
//           ),
//       };

//       console.log(
//         "UPDATE TICKET PAYLOAD:",
//         payload
//       );

//       const response =
//         await api.put(
//           `/tickets/${ticketId}/`,
//           payload
//         );

//       console.log(
//         "Ticket updated:",
//         response.data
//       );

//       if (onUpdated) {
//         await onUpdated();
//       }

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Error updating ticket:",
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // CLOSE DRAWER
//   // =====================================================

//   const handleClose = () => {
//     if (loading) return;

//     setFormData({
//       ticketName: "",
//       description: "",
//       ticketStatus: "",
//       source: "",
//       priority: "",
//       ticketOwners: [],
//       associatedDeal: "",
//     });

//     setUsers([]);
//     setDeals([]);

//     onClose();
//   };

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
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <DrawerHeader
//           title="Edit Ticket"
//           onClose={handleClose}
//         />

//         {/* =====================================================
//             FORM
//         ===================================================== */}

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
//           {/* TICKET NAME */}

//           <CommonInput
//             label="Ticket Name"
//             name="ticketName"
//             value={
//               formData.ticketName
//             }
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//             disabled={loadingData}
//           />

//           {/* DESCRIPTION */}

//           <Grid container spacing={2}>
//             <Grid size={12}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Description
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <TextField
//                 name="description"
//                 placeholder="Enter description"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={
//                   formData.description
//                 }
//                 onChange={handleChange}
//                 required
//                 disabled={loadingData}
//                 sx={{
//                   "& .MuiOutlinedInput-root":
//                     {
//                       borderRadius:
//                         "10px",
//                     },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* STATUS + SOURCE */}

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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="ticketStatus"
//                   value={
//                     formData.ticketStatus
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     loadingData
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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="source"
//                   value={
//                     formData.source
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     loadingData
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

//           {/* PRIORITY */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="priority"
//                 value={
//                   formData.priority
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingData
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

//           {/* TICKET OWNER */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
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
//                   loadingData
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

//                       if (!user)
//                         return "";

//                       const fullName =
//                         `${user.first_name || ""} ${
//                           user.last_name || ""
//                         }`.trim();

//                       return (
//                         fullName ||
//                         user.email ||
//                         ""
//                       );
//                     })
//                     .filter(Boolean)
//                     .join(", ")
//                 }
//               >
//                 {users.map(
//                   (user) => {
//                     const userName =
//                       `${user.first_name || ""} ${
//                         user.last_name || ""
//                       }`.trim() ||
//                       user.email;

//                     return (
//                       <MenuItem
//                         key={user.id}
//                         value={String(
//                           user.id
//                         )}
//                       >
//                         <Checkbox
//                           checked={formData.ticketOwners.includes(
//                             String(
//                               user.id
//                             )
//                           )}
//                         />

//                         <ListItemText
//                           primary={
//                             userName
//                           }
//                         />
//                       </MenuItem>
//                     );
//                   }
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* ASSOCIATED DEAL */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="associatedDeal"
//                 value={
//                   formData.associatedDeal
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingData
//                 }
//               >
//                 {deals.map(
//                   (deal) => (
//                     <MenuItem
//                       key={deal.id}
//                       value={String(
//                         deal.id
//                       )}
//                     >
//                       {
//                         deal.deal_name
//                       }
//                     </MenuItem>
//                   )
//                 )}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>

//         {/* =====================================================
//             FOOTER
//         ===================================================== */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop:
//               "1px solid #E5E7EB",
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={handleClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading ||
//               loadingData ||
//               !ticketId
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
// import { useToast } from "../../../Components/common/Toast";

// import api from "../../../services/api";

// export default function EditTicketDrawer({
//   open,
//   onClose,
//   ticketId,
//   onUpdated,
// }) {
//   // =====================================================
//   // TOAST
//   // =====================================================

//   const { showToast } = useToast();

//   // =====================================================
//   // FORM DATA
//   // =====================================================

//   const [formData, setFormData] = useState({
//     ticketName: "",
//     description: "",
//     ticketStatus: "",
//     source: "",
//     priority: "",
//     ticketOwners: [],
//     associatedDeal: "",
//   });

//   // =====================================================
//   // OPTIONS
//   // =====================================================

//   const [users, setUsers] = useState([]);
//   const [deals, setDeals] = useState([]);

//   // =====================================================
//   // LOADING
//   // =====================================================

//   const [loading, setLoading] = useState(false);
//   const [loadingData, setLoadingData] = useState(false);

//   // =====================================================
//   // LOAD TICKET + USERS + DEALS
//   // =====================================================

//   useEffect(() => {
//     if (!open || !ticketId) return;

//     const fetchData = async () => {
//       try {
//         setLoadingData(true);

//         const [
//           ticketResponse,
//           usersResponse,
//           dealsResponse,
//         ] = await Promise.all([
//           api.get(`/tickets/${ticketId}/`),
//           api.get("/accounts/users/"),
//           api.get("/deals/"),
//         ]);

//         const ticketDetail = ticketResponse.data;

//         const usersData = Array.isArray(
//           usersResponse.data,
//         )
//           ? usersResponse.data
//           : usersResponse.data?.results || [];

//         const dealsData = Array.isArray(
//           dealsResponse.data,
//         )
//           ? dealsResponse.data
//           : dealsResponse.data?.results || [];

//         console.log(
//           "EDIT TICKET:",
//           ticketDetail,
//         );

//         console.log(
//           "EDIT USERS:",
//           usersData,
//         );

//         console.log(
//           "EDIT DEALS:",
//           dealsData,
//         );

//         setUsers(usersData);
//         setDeals(dealsData);

//         // =================================================
//         // FIND TICKET OWNER IDS
//         // =================================================

//         let ownerIds = [];

//         // -------------------------------------------------
//         // Preferred backend response:
//         //
//         // ticket_owner_ids: [16, 17]
//         // -------------------------------------------------

//         if (
//           Array.isArray(
//             ticketDetail.ticket_owner_ids,
//           )
//         ) {
//           ownerIds =
//             ticketDetail.ticket_owner_ids.map(
//               (id) => String(id),
//             );
//         }

//         // -------------------------------------------------
//         // Backend may return ticket_owners as IDs
//         //
//         // ticket_owners: [16, 17]
//         // -------------------------------------------------

//         if (
//           ownerIds.length === 0 &&
//           Array.isArray(
//             ticketDetail.ticket_owners,
//           )
//         ) {
//           ownerIds =
//             ticketDetail.ticket_owners
//               .map((owner) => {
//                 // Owner is an ID
//                 if (
//                   typeof owner === "number"
//                 ) {
//                   return String(owner);
//                 }

//                 // Owner is numeric string
//                 if (
//                   typeof owner === "string" &&
//                   !isNaN(owner)
//                 ) {
//                   return String(owner);
//                 }

//                 // Owner is object
//                 if (
//                   owner &&
//                   typeof owner === "object" &&
//                   owner.id
//                 ) {
//                   return String(owner.id);
//                 }

//                 // Owner is name/email
//                 if (
//                   typeof owner === "string"
//                 ) {
//                   const foundUser =
//                     usersData.find(
//                       (user) => {
//                         const fullName =
//                           `${user.first_name || ""} ${
//                             user.last_name || ""
//                           }`.trim();

//                         return (
//                           String(
//                             user.email || "",
//                           ).toLowerCase() ===
//                             owner.toLowerCase() ||
//                           fullName.toLowerCase() ===
//                             owner.toLowerCase()
//                         );
//                       },
//                     );

//                   return foundUser
//                     ? String(foundUser.id)
//                     : null;
//                 }

//                 return null;
//               })
//               .filter(Boolean);
//         }

//         // -------------------------------------------------
//         // Backward compatibility with old ticket_owner
//         // -------------------------------------------------

//         if (
//           ownerIds.length === 0 &&
//           ticketDetail.ticket_owner !==
//             null &&
//           ticketDetail.ticket_owner !==
//             undefined
//         ) {
//           const oldOwner =
//             ticketDetail.ticket_owner;

//           // Numeric ID
//           if (
//             typeof oldOwner === "number"
//           ) {
//             ownerIds = [
//               String(oldOwner),
//             ];
//           }

//           // Numeric string
//           else if (
//             typeof oldOwner === "string" &&
//             !isNaN(oldOwner)
//           ) {
//             ownerIds = [
//               String(oldOwner),
//             ];
//           }

//           // Name/email
//           else if (
//             typeof oldOwner === "string"
//           ) {
//             const foundUser =
//               usersData.find((user) => {
//                 const fullName =
//                   `${user.first_name || ""} ${
//                     user.last_name || ""
//                   }`.trim();

//                 return (
//                   String(
//                     user.email || "",
//                   ).toLowerCase() ===
//                     oldOwner.toLowerCase() ||
//                   fullName.toLowerCase() ===
//                     oldOwner.toLowerCase()
//                 );
//               });

//             if (foundUser) {
//               ownerIds = [
//                 String(foundUser.id),
//               ];
//             }
//           }

//           // Object
//           else if (
//             oldOwner &&
//             typeof oldOwner === "object" &&
//             oldOwner.id
//           ) {
//             ownerIds = [
//               String(oldOwner.id),
//             ];
//           }
//         }

//         console.log(
//           "EDIT TICKET OWNER IDS:",
//           ownerIds,
//         );

//         // =================================================
//         // FIND DEAL ID
//         // =================================================

//         let dealId = "";

//         const associatedDeal =
//           ticketDetail.associated_deal;

//         // Deal ID
//         if (
//           typeof associatedDeal === "number"
//         ) {
//           dealId = String(
//             associatedDeal,
//           );
//         }

//         // Deal ID as string
//         if (
//           !dealId &&
//           typeof associatedDeal === "string" &&
//           !isNaN(associatedDeal)
//         ) {
//           dealId = String(
//             associatedDeal,
//           );
//         }

//         // Deal object
//         if (
//           !dealId &&
//           associatedDeal &&
//           typeof associatedDeal === "object"
//         ) {
//           if (associatedDeal.id) {
//             dealId = String(
//               associatedDeal.id,
//             );
//           }
//         }

//         // Find deal by deal name
//         if (!dealId) {
//           const dealName =
//             ticketDetail.deal_name ||
//             ticketDetail.associated_deal_name;

//           if (dealName) {
//             const deal =
//               dealsData.find(
//                 (item) =>
//                   String(
//                     item.deal_name || "",
//                   ).toLowerCase() ===
//                   String(
//                     dealName,
//                   ).toLowerCase(),
//               );

//             if (deal) {
//               dealId = String(
//                 deal.id,
//               );
//             }
//           }
//         }

//         // =================================================
//         // SET FORM DATA
//         // =================================================

//         setFormData({
//           ticketName:
//             ticketDetail.ticket_name ||
//             "",

//           description:
//             ticketDetail.description ||
//             "",

//           ticketStatus:
//             ticketDetail.ticket_status ||
//             "",

//           source:
//             ticketDetail.source ||
//             "",

//           priority:
//             ticketDetail.priority ||
//             "",

//           ticketOwners:
//             ownerIds,

//           associatedDeal:
//             dealId,
//         });
//       } catch (error) {
//         console.error(
//           "Error loading ticket:",
//           error.response?.data || error,
//         );

//         showToast(
//           "Failed to load ticket details.",
//           "error",
//         );
//       } finally {
//         setLoadingData(false);
//       }
//     };

//     fetchData();
//   }, [open, ticketId, showToast]);

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
//   // UPDATE TICKET
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!ticketId) return;

//     // =================================================
//     // VALIDATION
//     // =================================================

//     if (
//       !formData.ticketName.trim() ||
//       !formData.description.trim() ||
//       !formData.ticketStatus ||
//       !formData.source ||
//       !formData.priority ||
//       !formData.associatedDeal
//     ) {
//       showToast(
//         "Please fill all required fields.",
//         "error",
//       );

//       return;
//     }

//     if (
//       !formData.ticketOwners ||
//       formData.ticketOwners.length === 0
//     ) {
//       showToast(
//         "Please select at least one Ticket Owner.",
//         "error",
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         ticket_name:
//           formData.ticketName.trim(),

//         description:
//           formData.description.trim(),

//         ticket_status:
//           formData.ticketStatus,

//         source:
//           formData.source,

//         priority:
//           formData.priority,

//         // IMPORTANT:
//         // ManyToMany field
//         ticket_owners:
//           formData.ticketOwners.map(
//             (id) => Number(id),
//           ),

//         associated_deal:
//           Number(
//             formData.associatedDeal,
//           ),
//       };

//       console.log(
//         "UPDATE TICKET PAYLOAD:",
//         payload,
//       );

//       const response =
//         await api.put(
//           `/tickets/${ticketId}/`,
//           payload,
//         );

//       console.log(
//         "Ticket updated:",
//         response.data,
//       );

//       // Refresh ticket list
//       if (onUpdated) {
//         await onUpdated();
//       }

//       // SUCCESS TOAST
//       showToast(
//         "Ticket updated successfully.",
//         "success",
//       );

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Error updating ticket:",
//         error.response?.data || error,
//       );

//       let errorMessage =
//         "Failed to update ticket.";

//       if (error.response?.data) {
//         const backendError =
//           error.response.data;

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
//         } else if (
//           typeof backendError ===
//           "object"
//         ) {
//           errorMessage =
//             Object.entries(
//               backendError,
//             )
//               .map(
//                 ([
//                   field,
//                   messages,
//                 ]) => {
//                   const message =
//                     Array.isArray(
//                       messages,
//                     )
//                       ? messages.join(
//                           ", ",
//                         )
//                       : String(
//                           messages,
//                         );

//                   return `${field}: ${message}`;
//                 },
//               )
//               .join("\n");
//         }
//       }

//       showToast(
//         errorMessage,
//         "error",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // CLOSE DRAWER
//   // =====================================================

//   const handleClose = () => {
//     if (loading) return;

//     setFormData({
//       ticketName: "",
//       description: "",
//       ticketStatus: "",
//       source: "",
//       priority: "",
//       ticketOwners: [],
//       associatedDeal: "",
//     });

//     setUsers([]);
//     setDeals([]);

//     onClose();
//   };

//   // =====================================================
//   // UI
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
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <DrawerHeader
//           title="Edit Ticket"
//           onClose={handleClose}
//         />

//         {/* =====================================================
//             FORM
//         ===================================================== */}

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
//           {/* TICKET NAME */}

//           <CommonInput
//             label="Ticket Name"
//             name="ticketName"
//             value={
//               formData.ticketName
//             }
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//             disabled={loadingData}
//           />

//           {/* DESCRIPTION */}

//           <Grid container spacing={2}>
//             <Grid size={12}>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#344054",
//                 }}
//               >
//                 Description
//                 <span
//                   style={{
//                     color: "red",
//                   }}
//                 >
//                   {" "}
//                   *
//                 </span>
//               </Typography>

//               <TextField
//                 name="description"
//                 placeholder="Enter description"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={
//                   formData.description
//                 }
//                 onChange={handleChange}
//                 required
//                 disabled={loadingData}
//                 sx={{
//                   "& .MuiOutlinedInput-root":
//                     {
//                       borderRadius:
//                         "10px",
//                     },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* STATUS + SOURCE */}

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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="ticketStatus"
//                   value={
//                     formData.ticketStatus
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     loadingData
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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="source"
//                   value={
//                     formData.source
//                   }
//                   label="Choose"
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     loadingData
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

//           {/* PRIORITY */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="priority"
//                 value={
//                   formData.priority
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingData
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

//           {/* TICKET OWNER */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
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
//                   loadingData
//                 }
//                 renderValue={(
//                   selected,
//                 ) =>
//                   selected
//                     .map((id) => {
//                       const user =
//                         users.find(
//                           (item) =>
//                             String(
//                               item.id,
//                             ) ===
//                             String(id),
//                         );

//                       if (!user)
//                         return "";

//                       const fullName =
//                         `${user.first_name || ""} ${
//                           user.last_name || ""
//                         }`.trim();

//                       return (
//                         fullName ||
//                         user.email ||
//                         ""
//                       );
//                     })
//                     .filter(Boolean)
//                     .join(", ")
//                 }
//               >
//                 {users.map(
//                   (user) => {
//                     const userName =
//                       `${user.first_name || ""} ${
//                         user.last_name || ""
//                       }`.trim() ||
//                       user.email;

//                     return (
//                       <MenuItem
//                         key={user.id}
//                         value={String(
//                           user.id,
//                         )}
//                       >
//                         <Checkbox
//                           checked={formData.ticketOwners.includes(
//                             String(
//                               user.id,
//                             ),
//                           )}
//                         />

//                         <ListItemText
//                           primary={
//                             userName
//                           }
//                         />
//                       </MenuItem>
//                     );
//                   },
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* ASSOCIATED DEAL */}

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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="associatedDeal"
//                 value={
//                   formData.associatedDeal
//                 }
//                 label="Choose"
//                 onChange={
//                   handleChange
//                 }
//                 disabled={
//                   loadingData
//                 }
//               >
//                 {deals.map(
//                   (deal) => (
//                     <MenuItem
//                       key={deal.id}
//                       value={String(
//                         deal.id,
//                       )}
//                     >
//                       {
//                         deal.deal_name
//                       }
//                     </MenuItem>
//                   ),
//                 )}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>

//         {/* =====================================================
//             FOOTER
//         ===================================================== */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop:
//               "1px solid #E5E7EB",
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={handleClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading ||
//               loadingData ||
//               !ticketId
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
// import { useToast } from "../../../Components/common/Toast";

// import api from "../../../services/api";

// export default function EditTicketDrawer({
//   open,
//   onClose,
//   ticketId,
//   onUpdated,
// }) {
//   const { showToast } = useToast();

//   const [formData, setFormData] = useState({
//     ticketName: "",
//     description: "",
//     ticketStatus: "",
//     source: "",
//     priority: "",
//     ticketOwners: [],
//     associatedDeal: "",
//   });

//   const [deals, setDeals] = useState([]);
//   const [dealOwners, setDealOwners] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingData, setLoadingData] = useState(false);
//   const [loadingDealOwners, setLoadingDealOwners] = useState(false);

//   // =========================================================
//   // OWNER NAME
//   // =========================================================

//   const getOwnerName = (owner) => {
//     if (!owner) return "";

//     const fullName =
//       `${owner.first_name || ""} ${owner.last_name || ""}`.trim();

//     return fullName || owner.email || `User ${owner.id}`;
//   };

//   // =========================================================
//   // GET ALL DEAL OWNERS
//   // =========================================================

//   const getAllDealOwners = (dealsData) => {
//     const ownersMap = new Map();

//     dealsData.forEach((deal) => {
//       const owners = deal?.deal_owner_details || [];

//       owners.forEach((owner) => {
//         if (owner?.id) {
//           ownersMap.set(String(owner.id), owner);
//         }
//       });
//     });

//     return Array.from(ownersMap.values());
//   };

//   // =========================================================
//   // GET ASSOCIATED DEAL OWNERS
//   // =========================================================

//   const getAssociatedDealOwnerIds = (dealsData, dealId) => {
//     if (!dealId) return [];

//     const selectedDeal = dealsData.find(
//       (deal) => String(deal.id) === String(dealId)
//     );

//     if (!selectedDeal) return [];

//     return (selectedDeal.deal_owner_details || []).map((owner) =>
//       String(owner.id)
//     );
//   };

//   // =========================================================
//   // LOAD DEAL OWNERS
//   // =========================================================

//   const loadDealOwners = async (
//     dealId,
//     dealsData = [],
//     existingOwnerIds = [],
//     selectAssociatedOwners = false
//   ) => {
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

//       let currentDeals = dealsData;

//       // If deals are not available, load them
//       if (!currentDeals.length) {
//         const dealsResponse = await api.get("/deals/");

//         currentDeals = Array.isArray(dealsResponse.data)
//           ? dealsResponse.data
//           : dealsResponse.data?.results ||
//             dealsResponse.data?.data ||
//             [];
//       }

//       // -----------------------------------------------------
//       // ALL OWNERS FROM ALL DEALS
//       // -----------------------------------------------------

//       const allOwners = getAllDealOwners(currentDeals);

//       setDealOwners(allOwners);

//       // -----------------------------------------------------
//       // OWNERS OF CURRENT ASSOCIATED DEAL
//       // -----------------------------------------------------

//       const associatedDealOwnerIds = getAssociatedDealOwnerIds(
//         currentDeals,
//         dealId
//       );

//       console.log("Associated Deal:", dealId);
//       console.log(
//         "Associated Deal Owner IDs:",
//         associatedDealOwnerIds
//       );
//       console.log("All Deal Owners:", allOwners);
//       console.log("Existing Ticket Owners:", existingOwnerIds);

//       // -----------------------------------------------------
//       // INITIAL EDIT
//       // -----------------------------------------------------

//       if (selectAssociatedOwners) {
//         // Existing Ticket Owners that belong to
//         // the associated Deal
//         const existingValidOwnerIds = existingOwnerIds
//           .map((id) => String(id))
//           .filter((id) =>
//             associatedDealOwnerIds.includes(id)
//           );

//         // If ticket already has owners, keep those selected.
//         // Otherwise select all owners of the associated Deal.
//         const selectedOwnerIds =
//           existingValidOwnerIds.length > 0
//             ? existingValidOwnerIds
//             : associatedDealOwnerIds;

//         setFormData((prev) => ({
//           ...prev,
//           ticketOwners: selectedOwnerIds,
//         }));

//         return;
//       }

//       // -----------------------------------------------------
//       // DEAL CHANGED
//       // -----------------------------------------------------
//       // When user changes Associated Deal:
//       // all owners of the NEW associated Deal
//       // become checked automatically.

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: associatedDealOwnerIds,
//       }));
//     } catch (error) {
//       console.error(
//         "Error loading Deal Owners:",
//         error.response?.data || error
//       );

//       setDealOwners([]);

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: [],
//       }));

//       showToast(
//         "Failed to load Deal Owners.",
//         "error"
//       );
//     } finally {
//       setLoadingDealOwners(false);
//     }
//   };

//   // =========================================================
//   // LOAD TICKET + DEALS
//   // =========================================================

//   useEffect(() => {
//     if (!open || !ticketId) return;

//     const fetchData = async () => {
//       try {
//         setLoadingData(true);

//         const [ticketResponse, dealsResponse] =
//           await Promise.all([
//             api.get(`/tickets/${ticketId}/`),
//             api.get("/deals/"),
//           ]);

//         const ticketDetail = ticketResponse.data;

//         const dealsData = Array.isArray(dealsResponse.data)
//           ? dealsResponse.data
//           : dealsResponse.data?.results ||
//             dealsResponse.data?.data ||
//             [];

//         setDeals(dealsData);

//         // =====================================================
//         // EXISTING TICKET OWNER IDS
//         // =====================================================

//         let ownerIds = [];

//         if (
//           Array.isArray(ticketDetail.ticket_owner_ids)
//         ) {
//           ownerIds =
//             ticketDetail.ticket_owner_ids.map((id) =>
//               String(id)
//             );
//         }

//         // Fallback
//         if (
//           ownerIds.length === 0 &&
//           Array.isArray(ticketDetail.ticket_owners)
//         ) {
//           ownerIds = ticketDetail.ticket_owners
//             .map((owner) => {
//               if (typeof owner === "number") {
//                 return String(owner);
//               }

//               if (
//                 typeof owner === "string" &&
//                 !isNaN(owner)
//               ) {
//                 return String(owner);
//               }

//               if (
//                 owner &&
//                 typeof owner === "object" &&
//                 owner.id
//               ) {
//                 return String(owner.id);
//               }

//               return null;
//             })
//             .filter(Boolean);
//         }

//         // =====================================================
//         // ASSOCIATED DEAL ID
//         // =====================================================

//         let dealId = "";

//         if (ticketDetail.associated_deal_id) {
//           dealId = String(
//             ticketDetail.associated_deal_id
//           );
//         }

//         if (
//           !dealId &&
//           typeof ticketDetail.associated_deal === "number"
//         ) {
//           dealId = String(
//             ticketDetail.associated_deal
//           );
//         }

//         if (
//           !dealId &&
//           typeof ticketDetail.associated_deal ===
//             "string" &&
//           !isNaN(ticketDetail.associated_deal)
//         ) {
//           dealId = String(
//             ticketDetail.associated_deal
//           );
//         }

//         if (
//           !dealId &&
//           ticketDetail.associated_deal &&
//           typeof ticketDetail.associated_deal ===
//             "object"
//         ) {
//           if (ticketDetail.associated_deal.id) {
//             dealId = String(
//               ticketDetail.associated_deal.id
//             );
//           }
//         }

//         // Fallback by deal name
//         if (!dealId) {
//           const dealName =
//             ticketDetail.deal_name ||
//             ticketDetail.associated_deal_name;

//           if (dealName) {
//             const foundDeal = dealsData.find(
//               (deal) =>
//                 String(
//                   deal.deal_name || ""
//                 ).toLowerCase() ===
//                 String(dealName).toLowerCase()
//             );

//             if (foundDeal) {
//               dealId = String(foundDeal.id);
//             }
//           }
//         }

//         // =====================================================
//         // SET BASIC FORM DATA
//         // =====================================================

//         setFormData({
//           ticketName: ticketDetail.ticket_name || "",
//           description:
//             ticketDetail.description || "",
//           ticketStatus:
//             ticketDetail.ticket_status || "",
//           source: ticketDetail.source || "",
//           priority: ticketDetail.priority || "",
//           ticketOwners: ownerIds,
//           associatedDeal: dealId,
//         });

//         // =====================================================
//         // LOAD ALL DEAL OWNERS
//         // =====================================================

//         if (dealId) {
//           await loadDealOwners(
//             dealId,
//             dealsData,
//             ownerIds,
//             true
//           );
//         } else {
//           setDealOwners([]);
//         }
//       } catch (error) {
//         console.error(
//           "Error loading ticket:",
//           error.response?.data || error
//         );

//         showToast(
//           "Failed to load ticket details.",
//           "error"
//         );
//       } finally {
//         setLoadingData(false);
//       }
//     };

//     fetchData();
//   }, [open, ticketId]);

//   // =========================================================
//   // HANDLE CHANGE
//   // =========================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // =======================================================
//     // ASSOCIATED DEAL CHANGED
//     // =======================================================

//     if (name === "associatedDeal") {
//       const newDealId = String(value);

//       setFormData((prev) => ({
//         ...prev,
//         associatedDeal: newDealId,
//         ticketOwners: [],
//       }));

//       // Load ALL deal owners.
//       // New Associated Deal owners will be checked.
//       loadDealOwners(
//         newDealId,
//         deals,
//         [],
//         false
//       );

//       return;
//     }

//     // =======================================================
//     // TICKET OWNERS
//     // =======================================================

//     if (name === "ticketOwners") {
//       const selectedValues = Array.isArray(value)
//         ? value.map((id) => String(id))
//         : [];

//       setFormData((prev) => ({
//         ...prev,
//         ticketOwners: selectedValues,
//       }));

//       return;
//     }

//     // =======================================================
//     // OTHER FIELDS
//     // =======================================================

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================================================
//   // SUBMIT
//   // =========================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!ticketId) return;

//     if (
//       !formData.ticketName.trim() ||
//       !formData.description.trim() ||
//       !formData.ticketStatus ||
//       !formData.source ||
//       !formData.priority ||
//       !formData.associatedDeal
//     ) {
//       showToast(
//         "Please fill all required fields.",
//         "error"
//       );
//       return;
//     }

//     if (
//       !formData.ticketOwners ||
//       formData.ticketOwners.length === 0
//     ) {
//       showToast(
//         "Please select at least one Ticket Owner.",
//         "error"
//       );
//       return;
//     }

//     // =======================================================
//     // IMPORTANT
//     // Ticket Owners must be Deal Owners.
//     // =======================================================

//     const allowedOwnerIds = dealOwners.map((owner) =>
//       String(owner.id)
//     );

//     const selectedOwnerIds =
//       formData.ticketOwners.map((id) =>
//         String(id)
//       );

//     const invalidOwnerIds =
//       selectedOwnerIds.filter(
//         (id) => !allowedOwnerIds.includes(id)
//       );

//     if (invalidOwnerIds.length > 0) {
//       showToast(
//         "Ticket Owners must be selected from Deal Owners.",
//         "error"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         ticket_name:
//           formData.ticketName.trim(),

//         description:
//           formData.description.trim(),

//         ticket_status:
//           formData.ticketStatus,

//         source:
//           formData.source,

//         priority:
//           formData.priority,

//         ticket_owners:
//           selectedOwnerIds.map((id) =>
//             Number(id)
//           ),

//         associated_deal:
//           Number(formData.associatedDeal),
//       };

//       const response = await api.put(
//         `/tickets/${ticketId}/`,
//         payload
//       );

//       if (onUpdated) {
//         await onUpdated();
//       }

//       showToast(
//         "Ticket updated successfully.",
//         "success"
//       );

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Error updating ticket:",
//         error.response?.data || error
//       );

//       let errorMessage =
//         "Failed to update ticket.";

//       if (error.response?.data) {
//         const backendError =
//           error.response.data;

//         if (
//           typeof backendError === "string"
//         ) {
//           errorMessage = backendError;
//         } else if (backendError.detail) {
//           errorMessage =
//             backendError.detail;
//         } else if (
//           typeof backendError === "object"
//         ) {
//           errorMessage =
//             Object.entries(
//               backendError
//             )
//               .map(
//                 ([field, messages]) => {
//                   const message =
//                     Array.isArray(messages)
//                       ? messages.join(", ")
//                       : String(messages);

//                   return `${field}: ${message}`;
//                 }
//               )
//               .join("\n");
//         }
//       }

//       showToast(
//         errorMessage,
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // CLOSE
//   // =========================================================

//   const handleClose = () => {
//     if (loading) return;

//     setFormData({
//       ticketName: "",
//       description: "",
//       ticketStatus: "",
//       source: "",
//       priority: "",
//       ticketOwners: [],
//       associatedDeal: "",
//     });

//     setDeals([]);
//     setDealOwners([]);

//     onClose();
//   };

//   // =========================================================
//   // UI
//   // =========================================================

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
//         <DrawerHeader
//           title="Edit Ticket"
//           onClose={handleClose}
//         />

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
//           <CommonInput
//             label="Ticket Name"
//             name="ticketName"
//             value={formData.ticketName}
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//             required
//             disabled={loadingData}
//           />

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
//               value={formData.description}
//               onChange={handleChange}
//               required
//               disabled={loadingData}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "10px",
//                 },
//               }}
//             />
//           </Box>

//           <Grid container spacing={2}>
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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="ticketStatus"
//                   value={
//                     formData.ticketStatus
//                   }
//                   label="Choose"
//                   onChange={handleChange}
//                   disabled={loadingData}
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
//                 <InputLabel>
//                   Choose
//                 </InputLabel>

//                 <Select
//                   name="source"
//                   value={formData.source}
//                   label="Choose"
//                   onChange={handleChange}
//                   disabled={loadingData}
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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="priority"
//                 value={formData.priority}
//                 label="Choose"
//                 onChange={handleChange}
//                 disabled={loadingData}
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
//               TICKET OWNERS
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
//               Ticket Owners
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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 multiple
//                 name="ticketOwners"
//                 value={
//                   formData.ticketOwners
//                 }
//                 label="Choose"
//                 onChange={handleChange}
//                 disabled={
//                   loadingData ||
//                   loadingDealOwners ||
//                   !formData.associatedDeal
//                 }
//                 renderValue={(selected) => {
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
//                             String(item.id) ===
//                             String(id)
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
//                     const ownerId =
//                       String(owner.id);

//                     const isSelected =
//                       formData.ticketOwners.includes(
//                         ownerId
//                       );

//                     return (
//                       <MenuItem
//                         key={owner.id}
//                         value={ownerId}
//                       >
//                         <Checkbox
//                           checked={isSelected}
//                         />

//                         <ListItemText
//                           primary={getOwnerName(
//                             owner
//                           )}
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
//               <InputLabel>
//                 Choose
//               </InputLabel>

//               <Select
//                 name="associatedDeal"
//                 value={
//                   formData.associatedDeal
//                 }
//                 label="Choose"
//                 onChange={handleChange}
//                 disabled={loadingData}
//               >
//                 {deals.map((deal) => (
//                   <MenuItem
//                     key={deal.id}
//                     value={String(deal.id)}
//                   >
//                     {deal.deal_name}
//                   </MenuItem>
//                 ))}
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
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={handleClose}
//             disabled={loading}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading ||
//               loadingData ||
//               loadingDealOwners ||
//               !ticketId
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

export default function EditTicketDrawer({
  open,
  onClose,
  ticketId,
  onUpdated,
}) {
  const { showToast } = useToast();

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    ticketName: "",
    description: "",
    ticketStatus: "",
    source: "",
    priority: "",
    ticketOwners: [],
    associatedDeal: "",
  });

  // =========================================================
  // OPTIONS
  // =========================================================

  const [deals, setDeals] = useState([]);
  const [dealOwners, setDealOwners] = useState([]);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDealOwners, setLoadingDealOwners] =
    useState(false);

  // =========================================================
  // OWNER NAME
  // =========================================================

  const getOwnerName = (owner) => {
    if (!owner) return "";

    const fullName =
      `${owner.first_name || ""} ${
        owner.last_name || ""
      }`.trim();

    return (
      fullName ||
      owner.email ||
      `User ${owner.id}`
    );
  };

  // =========================================================
  // GET ALL DEAL OWNERS
  // =========================================================
  //
  // IMPORTANT:
  //
  // This endpoint returns every user who is a Deal Owner
  // of at least one Deal.
  //
  // It does NOT depend on which Deals the current user
  // can see.
  //
  // =========================================================

  const fetchAllDealOwners = async () => {
    const response = await api.get(
      "/deals/owners/"
    );

    const ownersData = Array.isArray(
      response.data
    )
      ? response.data
      : response.data?.results ||
        response.data?.data ||
        [];

    return ownersData;
  };

  // =========================================================
  // GET OWNERS OF SELECTED DEAL
  // =========================================================

  const getAssociatedDealOwnerIds = (
    dealsData,
    dealId
  ) => {
    if (!dealId) {
      return [];
    }

    const selectedDeal = dealsData.find(
      (deal) =>
        String(deal.id) ===
        String(dealId)
    );

    if (!selectedDeal) {
      return [];
    }

    return (
      selectedDeal.deal_owner_details || []
    )
      .map((owner) =>
        String(owner.id)
      )
      .filter(Boolean);
  };

  // =========================================================
  // LOAD ALL DEAL OWNERS + ASSOCIATED DEAL OWNERS
  // =========================================================

  const loadDealOwners = async (
    dealId,
    dealsData = [],
    existingOwnerIds = [],
    isInitialLoad = false
  ) => {
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

      console.log(
        "========== LOADING TICKET OWNERS =========="
      );

      console.log(
        "ASSOCIATED DEAL ID:",
        dealId
      );

      // =====================================================
      // GET ALL DEAL OWNERS
      // =====================================================

      const allOwners =
        await fetchAllDealOwners();

      console.log(
        "ALL DEAL OWNERS:",
        allOwners
      );

      // =====================================================
      // GET OWNERS OF ASSOCIATED DEAL
      // =====================================================

      const associatedDealOwnerIds =
        getAssociatedDealOwnerIds(
          dealsData,
          dealId
        );

      console.log(
        "ASSOCIATED DEAL OWNER IDS:",
        associatedDealOwnerIds
      );

      console.log(
        "EXISTING TICKET OWNER IDS:",
        existingOwnerIds
      );

      // =====================================================
      // SET ALL DEAL OWNERS
      // =====================================================

      setDealOwners(allOwners);

      // =====================================================
      // INITIAL EDIT
      // =====================================================
      //
      // When opening an existing ticket:
      //
      // Keep ALL existing ticket owners selected.
      //
      // This is important because a Ticket Owner can be
      // a Deal Owner from another Deal.
      //
      // Example:
      //
      // Associated Deal:
      //   Liha + Shirin
      //
      // Existing Ticket Owners:
      //   Liha + Saji
      //
      // Result:
      //   ☑ Liha
      //   ☑ Shirin
      //   ☑ Saji
      //   ☐ Mehak
      //
      // Actually we preserve the existing ticket owners
      // exactly. We do NOT remove Saji just because Saji
      // isn't an owner of the associated Deal.
      //
      // =====================================================

      if (isInitialLoad) {
        const validExistingOwnerIds =
          existingOwnerIds
            .map((id) =>
              String(id)
            )
            .filter((id) =>
              allOwners.some(
                (owner) =>
                  String(owner.id) === id
              )
            );

        // If the ticket already has valid owners,
        // preserve them.
        //
        // If no owners exist, automatically select
        // owners of the associated Deal.

        const selectedOwnerIds =
          validExistingOwnerIds.length > 0
            ? validExistingOwnerIds
            : associatedDealOwnerIds;

        setFormData((prev) => ({
          ...prev,
          ticketOwners:
            selectedOwnerIds,
        }));

        return;
      }

      // =====================================================
      // ASSOCIATED DEAL CHANGED
      // =====================================================
      //
      // When user changes the Associated Deal:
      //
      // Owners of the NEW associated Deal are checked.
      //
      // Other Deal Owners are visible but unchecked.
      //
      // =====================================================

      setFormData((prev) => ({
        ...prev,
        ticketOwners:
          associatedDealOwnerIds,
      }));
    } catch (error) {
      console.error(
        "Error loading Deal Owners:",
        error.response?.data ||
          error
      );

      setDealOwners([]);

      setFormData((prev) => ({
        ...prev,
        ticketOwners: [],
      }));

      showToast(
        "Failed to load Deal Owners.",
        "error"
      );
    } finally {
      setLoadingDealOwners(false);
    }
  };

  // =========================================================
  // LOAD TICKET + DEALS
  // =========================================================

  useEffect(() => {
    if (!open || !ticketId) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingData(true);

        console.log(
          "========== LOADING TICKET =========="
        );

        console.log(
          "TICKET ID:",
          ticketId
        );

        // ===================================================
        // LOAD TICKET + DEALS
        // ===================================================

        const [
          ticketResponse,
          dealsResponse,
        ] = await Promise.all([
          api.get(
            `/tickets/${ticketId}/`
          ),
          api.get("/deals/"),
        ]);

        const ticketDetail =
          ticketResponse.data;

        console.log(
          "TICKET DETAIL:",
          ticketDetail
        );

        // ===================================================
        // DEAL DATA
        // ===================================================

        const dealsData =
          Array.isArray(
            dealsResponse.data
          )
            ? dealsResponse.data
            : dealsResponse.data
                ?.results ||
              dealsResponse.data
                ?.data ||
              [];

        setDeals(dealsData);

        // ===================================================
        // EXISTING TICKET OWNER IDS
        // ===================================================

        let ownerIds = [];

        // Preferred field
        if (
          Array.isArray(
            ticketDetail.ticket_owner_ids
          )
        ) {
          ownerIds =
            ticketDetail.ticket_owner_ids.map(
              (id) =>
                String(id)
            );
        }

        // ===================================================
        // FALLBACK
        // ===================================================

        if (
          ownerIds.length === 0 &&
          Array.isArray(
            ticketDetail.ticket_owners
          )
        ) {
          ownerIds =
            ticketDetail.ticket_owners
              .map((owner) => {
                if (
                  typeof owner ===
                  "number"
                ) {
                  return String(
                    owner
                  );
                }

                if (
                  typeof owner ===
                    "string" &&
                  !isNaN(owner)
                ) {
                  return String(
                    owner
                  );
                }

                if (
                  owner &&
                  typeof owner ===
                    "object" &&
                  owner.id
                ) {
                  return String(
                    owner.id
                  );
                }

                return null;
              })
              .filter(Boolean);
        }

        console.log(
          "EXISTING TICKET OWNER IDS:",
          ownerIds
        );

        // ===================================================
        // ASSOCIATED DEAL ID
        // ===================================================

        let dealId = "";

        // -----------------------------------------------
        // associated_deal_id
        // -----------------------------------------------

        if (
          ticketDetail.associated_deal_id
        ) {
          dealId = String(
            ticketDetail.associated_deal_id
          );
        }

        // -----------------------------------------------
        // associated_deal as number
        // -----------------------------------------------

        if (
          !dealId &&
          typeof ticketDetail.associated_deal ===
            "number"
        ) {
          dealId = String(
            ticketDetail.associated_deal
          );
        }

        // -----------------------------------------------
        // associated_deal as string
        // -----------------------------------------------

        if (
          !dealId &&
          typeof ticketDetail.associated_deal ===
            "string" &&
          !isNaN(
            ticketDetail.associated_deal
          )
        ) {
          dealId = String(
            ticketDetail.associated_deal
          );
        }

        // -----------------------------------------------
        // associated_deal as object
        // -----------------------------------------------

        if (
          !dealId &&
          ticketDetail.associated_deal &&
          typeof ticketDetail.associated_deal ===
            "object"
        ) {
          if (
            ticketDetail.associated_deal
              .id
          ) {
            dealId = String(
              ticketDetail.associated_deal
                .id
            );
          }
        }

        // -----------------------------------------------
        // FALLBACK BY DEAL NAME
        // -----------------------------------------------

        if (!dealId) {
          const dealName =
            ticketDetail.deal_name ||
            ticketDetail.associated_deal_name;

          if (dealName) {
            const foundDeal =
              dealsData.find(
                (deal) =>
                  String(
                    deal.deal_name ||
                      ""
                  )
                    .toLowerCase()
                    .trim() ===
                  String(
                    dealName
                  )
                    .toLowerCase()
                    .trim()
              );

            if (foundDeal) {
              dealId = String(
                foundDeal.id
              );
            }
          }
        }

        console.log(
          "ASSOCIATED DEAL ID:",
          dealId
        );

        // ===================================================
        // SET BASIC FORM DATA
        // ===================================================

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

        // ===================================================
        // LOAD ALL DEAL OWNERS
        // ===================================================

        if (dealId) {
          await loadDealOwners(
            dealId,
            dealsData,
            ownerIds,
            true
          );
        } else {
          setDealOwners([]);
        }
      } catch (error) {
        console.error(
          "Error loading ticket:",
          error.response?.data ||
            error
        );

        showToast(
          "Failed to load ticket details.",
          "error"
        );
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [open, ticketId]);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    // =======================================================
    // ASSOCIATED DEAL
    // =======================================================

    if (
      name ===
      "associatedDeal"
    ) {
      const newDealId =
        String(value);

      console.log(
        "NEW ASSOCIATED DEAL:",
        newDealId
      );

      // Clear old selected owners
      setFormData((prev) => ({
        ...prev,
        associatedDeal:
          newDealId,
        ticketOwners: [],
      }));

      setDealOwners([]);

      // =====================================================
      // LOAD:
      //
      // 1. ALL Deal Owners
      // 2. Owners of new Associated Deal
      // 3. Automatically check new Deal owners
      // =====================================================

      loadDealOwners(
        newDealId,
        deals,
        [],
        false
      );

      return;
    }

    // =======================================================
    // TICKET OWNERS
    // =======================================================

    if (
      name ===
      "ticketOwners"
    ) {
      const selectedValues =
        Array.isArray(value)
          ? value.map((id) =>
              String(id)
            )
          : [];

      setFormData(
        (prev) => ({
          ...prev,
          ticketOwners:
            selectedValues,
        })
      );

      return;
    }

    // =======================================================
    // OTHER FIELDS
    // =======================================================

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!ticketId) {
      return;
    }

    // =======================================================
    // REQUIRED FIELDS
    // =======================================================

    if (
      !formData.ticketName.trim() ||
      !formData.description.trim() ||
      !formData.ticketStatus ||
      !formData.source ||
      !formData.priority ||
      !formData.associatedDeal
    ) {
      showToast(
        "Please fill all required fields.",
        "error"
      );

      return;
    }

    // =======================================================
    // TICKET OWNER REQUIRED
    // =======================================================

    if (
      !formData.ticketOwners ||
      formData.ticketOwners
        .length === 0
    ) {
      showToast(
        "Please select at least one Ticket Owner.",
        "error"
      );

      return;
    }

    // =======================================================
    // VALIDATE DEAL OWNERS
    // =======================================================
    //
    // Only users returned from:
    //
    // /deals/owners/
    //
    // are allowed.
    //
    // =======================================================

    const allowedOwnerIds =
      dealOwners.map(
        (owner) =>
          String(owner.id)
      );

    const selectedOwnerIds =
      formData.ticketOwners.map(
        (id) =>
          String(id)
      );

    const invalidOwnerIds =
      selectedOwnerIds.filter(
        (id) =>
          !allowedOwnerIds.includes(
            id
          )
      );

    if (
      invalidOwnerIds.length > 0
    ) {
      showToast(
        "Ticket Owners must be selected from Deal Owners.",
        "error"
      );

      return;
    }

    // =======================================================
    // UPDATE
    // =======================================================

    try {
      setLoading(true);

      const payload = {
        ticket_name:
          formData.ticketName.trim(),

        description:
          formData.description.trim(),

        ticket_status:
          formData.ticketStatus,

        source:
          formData.source,

        priority:
          formData.priority,

        ticket_owners:
          selectedOwnerIds.map(
            (id) =>
              Number(id)
          ),

        associated_deal:
          Number(
            formData.associatedDeal
          ),
      };

      console.log(
        "========== UPDATE TICKET PAYLOAD =========="
      );

      console.log(
        payload
      );

      const response =
        await api.put(
          `/tickets/${ticketId}/`,
          payload
        );

      console.log(
        "========== TICKET UPDATED =========="
      );

      console.log(
        response.data
      );

      // =====================================================
      // REFRESH TICKET LIST
      // =====================================================

      if (onUpdated) {
        await onUpdated();
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      showToast(
        "Ticket updated successfully.",
        "success"
      );

      // =====================================================
      // CLOSE
      // =====================================================

      handleClose();
    } catch (error) {
      console.error(
        "Error updating ticket:",
        error.response?.data ||
          error
      );

      let errorMessage =
        "Failed to update ticket.";

      if (
        error.response?.data
      ) {
        const backendError =
          error.response.data;

        if (
          typeof backendError ===
          "string"
        ) {
          errorMessage =
            backendError;
        } else if (
          backendError.detail
        ) {
          errorMessage =
            backendError.detail;
        } else if (
          typeof backendError ===
          "object"
        ) {
          errorMessage =
            Object.entries(
              backendError
            )
              .map(
                ([
                  field,
                  messages,
                ]) => {
                  const message =
                    Array.isArray(
                      messages
                    )
                      ? messages.join(
                          ", "
                        )
                      : String(
                          messages
                        );

                  return `${field}: ${message}`;
                }
              )
              .join("\n");
        }
      }

      showToast(
        errorMessage,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CLOSE
  // =========================================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    setFormData({
      ticketName: "",
      description: "",
      ticketStatus: "",
      source: "",
      priority: "",
      ticketOwners: [],
      associatedDeal: "",
    });

    setDeals([]);
    setDealOwners([]);

    setLoadingData(false);
    setLoadingDealOwners(false);

    onClose();
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <Box
        component="form"
        onSubmit={
          handleSubmit
        }
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
        {/* =================================================
            HEADER
        ================================================= */}

        <DrawerHeader
          title="Edit Ticket"
          onClose={
            handleClose
          }
        />

        {/* =================================================
            FORM CONTENT
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
              TICKET NAME
          ================================================= */}

          <CommonInput
            label="Ticket Name"
            name="ticketName"
            value={
              formData.ticketName
            }
            onChange={
              handleChange
            }
            placeholder="Enter"
            fullWidth
            required
            disabled={
              loadingData
            }
          />

          {/* =================================================
              DESCRIPTION
          ================================================= */}

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
              onChange={
                handleChange
              }
              required
              disabled={
                loadingData
              }
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    borderRadius:
                      "10px",
                  },
              }}
            />
          </Box>

          {/* =================================================
              STATUS + SOURCE
          ================================================= */}

          <Grid
            container
            spacing={2}
          >
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

          {/* =================================================
              PRIORITY
          ================================================= */}

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

          {/* =================================================
              TICKET OWNERS
          ================================================= */}

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 600,
                color: "#344054",
              }}
            >
              Ticket Owners

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
                  loadingData ||
                  loadingDealOwners ||
                  !formData.associatedDeal
                }
                renderValue={(
                  selected
                ) => {
                  if (
                    !selected ||
                    selected.length ===
                      0
                  ) {
                    return "Choose";
                  }

                  return selected
                    .map((id) => {
                      const owner =
                        dealOwners.find(
                          (item) =>
                            String(
                              item.id
                            ) ===
                            String(
                              id
                            )
                        );

                      return owner
                        ? getOwnerName(
                            owner
                          )
                        : "";
                    })
                    .filter(
                      Boolean
                    )
                    .join(", ");
                }}
              >
                {/* NO DEAL */}

                {!formData.associatedDeal ? (
                  <MenuItem disabled>
                    Select Associated Deal first
                  </MenuItem>
                ) : loadingDealOwners ? (
                  <MenuItem disabled>
                    Loading Deal Owners...
                  </MenuItem>
                ) : dealOwners.length ===
                  0 ? (
                  <MenuItem disabled>
                    No Deal Owners available
                  </MenuItem>
                ) : (
                  dealOwners.map(
                    (owner) => {
                      const ownerId =
                        String(
                          owner.id
                        );

                      const isSelected =
                        formData.ticketOwners.includes(
                          ownerId
                        );

                      return (
                        <MenuItem
                          key={
                            owner.id
                          }
                          value={
                            ownerId
                          }
                        >
                          <Checkbox
                            checked={
                              isSelected
                            }
                          />

                          <ListItemText
                            primary={getOwnerName(
                              owner
                            )}
                          />
                        </MenuItem>
                      );
                    }
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          {/* =================================================
              ASSOCIATED DEAL
          ================================================= */}

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
                      key={
                        deal.id
                      }
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
            backgroundColor:
              "#fff",
          }}
        >
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={
              handleClose
            }
            disabled={
              loading
            }
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={
              loading ||
              loadingData ||
              loadingDealOwners ||
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

