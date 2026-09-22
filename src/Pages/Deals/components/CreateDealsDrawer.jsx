// import React, { useEffect, useState } from "react";
// import { Drawer, Box, Grid } from "@mui/material";
// import dayjs from "dayjs";
// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import CommonSelect from "../../../Components/common/CommonSelect";
// import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
// import FormDatePicker from "../../../Components/common/FormDatePicker";
// import api from "../../../services/api";
// export default function CreateDealsDrawer({
//   open,
//   onClose,
//   onDealSaved,
//   deal,
//   leadId,
// }) {
//   // =================================================
//   // EMPTY FORM
//   // =================================================
//   const emptyForm = {
//     dealName: "",
//     dealStage: "",
//     associatedLead: "",
//     amount: "",
//     dealOwner: [],
//     closeDate: null,
//     priority: "",
//   };
//   // =================================================
//   // STATES
//   // =================================================

//   const [formData, setFormData] = useState(emptyForm);
//   const [leads, setLeads] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   // =================================================
//   // EDIT MODE
//   // =================================================
//   const isEditMode = Boolean(deal);
//   // =================================================
//   // FETCH LEADS
//   // =================================================
//   const fetchLeads = async () => {
//     try {
//       const response = await api.get("/leads/leadslist/");
//       console.log("LEADS RESPONSE:", response.data);
//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data.results || [];
//       setLeads(data);
//       return data;
//     } catch (error) {
//       console.error(
//         "LEADS ERROR:",

//         error.response?.data || error,
//       );
//       return [];
//     }
//   };
//   // =================================================
//   // FETCH USERS
//   // =================================================
//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");
//       console.log("USERS RESPONSE:", response.data);
//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data.results || [];
//       setUsers(data);
//       return data;
//     } catch (error) {
//       console.error("USERS ERROR:", error.response?.data || error);
//       return [];
//     }
//   };
//   // =================================================
//   // LOAD LEADS + USERS WHEN DRAWER OPENS
//   // =================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }
//     const loadOptions = async () => {
//       setError("");
//       await Promise.all([fetchLeads(), fetchUsers()]);
//     };
//     loadOptions();
//   }, [open]);
//   // =================================================
//   // LOAD DEAL DATA WHEN EDITING
//   // =================================================
//   useEffect(() => {
//     if (!open) {
//       return;
//     }
//     // =================================================
//     // CREATE MODE
//     // =================================================
//     if (!deal) {
//       setFormData({
//         ...emptyForm,
//         // Automatically select converted lead
//         associatedLead:
//           leadId !== null && leadId !== undefined && leadId !== ""
//             ? String(leadId)
//             : "",
//       });

//       setError("");
//       console.log("CREATE DEAL - ASSOCIATED LEAD:", leadId);
//       return;
//     }
//     // =================================================
//     // EDIT MODE
//     // =================================================
//     console.log("DEAL FOR EDIT:", deal);
//     setFormData({
//       dealName: deal.deal_name || "",
//       dealStage: deal.deal_stage || "",
//       associatedLead:
//         deal.associated_lead !== null && deal.associated_lead !== undefined
//           ? String(deal.associated_lead)
//           : "",
//       amount:
//         deal.amount !== null && deal.amount !== undefined
//           ? String(deal.amount)
//           : "",
//       // Multiple Deal Owners
//       //
//       // Backend response:
//       // deal_owner_ids: [1, 5, 8]

//       //
//       // CommonMultiSelect expects
//       // string values.
//       dealOwner: Array.isArray(deal.deal_owner_ids)
//         ? deal.deal_owner_ids.map((id) => String(id))
//         : [],
//       closeDate: deal.close_date ? dayjs(deal.close_date) : null,
//       priority: deal.priority || "",
//     });
//   }, [deal, open, leadId]);
//   // =================================================
//   // HANDLE INPUT CHANGE
//   // =================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   // =================================================
//   // CREATE / UPDATE DEAL
//   // =================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");
//       // =================================================
//       // VALIDATION
//       // =================================================
//       if (!formData.dealName) {
//         setError("Please enter deal name.");
//         setLoading(false);
//         return;
//       }
//       if (!formData.dealStage) {
//         setError("Please select deal stage.");
//         setLoading(false);
//         return;
//       }
//       if (!formData.associatedLead) {
//         setError("Please select an associated lead.");
//         setLoading(false);
//         return;
//       }
//       // =================================================
//       // DEAL OWNER VALIDATION
//       // =================================================
//       if (
//         !Array.isArray(formData.dealOwner) ||
//         formData.dealOwner.length === 0
//       ) {
//         setError("Please select at least one deal owner.");
//         setLoading(false);
//         return;
//       }
//       // =================================================
//       // PAYLOAD
//       // =================================================
//       const dealData = {
//         deal_name: formData.dealName,
//         deal_stage: formData.dealStage,
//         associated_lead: Number(formData.associatedLead),
//         amount: formData.amount,
//         // Multiple Deal Owners
//         deal_owners: formData.dealOwner.map((id) => Number(id)),
//         close_date: formData.closeDate
//           ? formData.closeDate.format("YYYY-MM-DD")
//           : null,
//         priority: formData.priority,
//       };
//       console.log("DEAL PAYLOAD:", dealData);
//       // =================================================
//       // UPDATE DEAL
//       // =================================================
//       if (isEditMode) {
//         console.log("Updating deal:", deal.id);
//         const response = await api.put(`/deals/${deal.id}/`, dealData);
//         console.log("DEAL UPDATED:", response.data);
//       }
//       // =================================================
//       // CREATE DEAL
//       // =================================================
//       else {
//         console.log("Creating deal");
//         const response = await api.post("/deals/", dealData);
//         console.log("DEAL CREATED:", response.data);
//       }
//       // =================================================
//       // REFRESH DEAL LIST
//       // =================================================
//       if (onDealSaved) {
//         await onDealSaved();
//       }
//       // =================================================
//       // CLEAR FORM
//       // =================================================
//       setFormData({
//         ...emptyForm,
//       });
//       // =================================================
//       // CLOSE DRAWER
//       // =================================================
//       onClose();
//     } catch (error) {
//       console.error("SAVE DEAL ERROR:", error.response?.data || error);
//       if (error.response?.data) {
//         setError(JSON.stringify(error.response.data));
//       } else {
//         setError(
//           isEditMode ? "Failed to update deal." : "Failed to create deal.",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   // =================================================
//   // LEAD OPTIONS
//   // =================================================
//   const leadOptions = leads.map((lead) => ({
//     value: String(lead.id),
//     label:
//       `${lead.first_name || ""} ${lead.last_name || ""}`.trim() ||
//       lead.name ||
//       lead.email ||
//       `Lead ${lead.id}`,
//   }));
//   // =================================================
//   // USER OPTIONS
//   // =================================================
//   const userOptions = users.map((user) => ({
//     value: String(user.id),
//     label:
//       `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
//       user.username ||
//       user.email ||
//       `User ${user.id}`,
//   }));
//   // =================================================
//   // UI
//   // =================================================
//   return (
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
// HEADER
// ================================================= */}
//         <DrawerHeader
//           title={isEditMode ? "Edit Deal" : "Create Deal"}
//           onClose={onClose}
//         />

//         {/* =================================================
// FORM
// ================================================= */}
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
//           {/* DEAL NAME */}
//           <CommonInput
//             label="Deal Name"
//             required
//             name="dealName"
//             value={formData.dealName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* DEAL STAGE */}
//           <CommonSelect
//             label="Deal Stage"
//             required
//             placeholder="Choose"
//             options={[
//               "Appointment Scheduled",
//               "Contract Sent",
//               "Closed Won",
//               "Closed Lost",
//               "Decision Maker Bought In",
//               "Presentation Scheduled",
//               "Qualified to Buy",
//             ]}
//             name="dealStage"
//             value={formData.dealStage}
//             onChange={handleChange}
//           />
//           {/* ASSOCIATED LEAD */}
//           <CommonSelect
//             label="Associated Lead"
//             required
//             placeholder={leads.length ? "Choose" : "No leads available"}
//             options={leadOptions}
//             name="associatedLead"
//             value={formData.associatedLead}
//             onChange={handleChange}
//           />
//           {/* AMOUNT */}
//           <CommonInput
//             label="Amount"
//             required
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />
//           {/* DEAL OWNER */}
//           <CommonMultiSelect
//             label="Deal Owner"
//             required
//             placeholder={users.length ? "Choose" : "No users available"}
//             options={userOptions}
//             name="dealOwner"
//             value={formData.dealOwner}
//             onChange={handleChange}
//           />
//           {/* CLOSE DATE + PRIORITY */}
//           <Grid container spacing={2}>
//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <FormDatePicker
//                 label="Close Date"
//                 required
//                 value={formData.closeDate}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     closeDate: newValue,
//                   }))
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
//                 label="Priority"
//                 required
//                 placeholder="Choose"
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 options={["High", "Medium", "Low"]}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         {/* =================================================
// FOOTER
// ================================================= */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 3,
//             p: 3,
//             borderTop: "1px solid #E5E7EB",
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
//           <CommonButton type="submit" fullWidth disabled={loading}>
//             {loading ? "Saving..." : isEditMode ? "Update" : "Save Deal"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Drawer, Box, Grid } from "@mui/material";
// import dayjs from "dayjs";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import CommonSelect from "../../../Components/common/CommonSelect";
// import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
// import FormDatePicker from "../../../Components/common/FormDatePicker";

// import api from "../../../services/api";

// export default function CreateDealsDrawer({
//   open,
//   onClose,
//   onDealSaved,
//   deal,
//   leadId,
// }) {
//   // =================================================
//   // EMPTY FORM
//   // =================================================
//   const emptyForm = {
//     dealName: "",
//     dealStage: "",
//     associatedLead: "",
//     amount: "",
//     dealOwner: [],
//     closeDate: null,
//     priority: "",
//   };

//   // =================================================
//   // STATES
//   // =================================================
//   const [formData, setFormData] = useState(emptyForm);
//   const [leads, setLeads] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // =================================================
//   // EDIT MODE
//   // =================================================
//   const isEditMode = Boolean(deal);

//   // =================================================
//   // FETCH LEADS
//   // =================================================
//   const fetchLeads = async () => {
//     try {
//       const response = await api.get("/leads/leadslist/");

//       console.log("LEADS RESPONSE:", response.data);

//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data.results || [];

//       setLeads(data);

//       return data;
//     } catch (error) {
//       console.error("LEADS ERROR:", error.response?.data || error);

//       return [];
//     }
//   };

//   // =================================================
//   // FETCH USERS
//   // =================================================
//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       console.log("USERS RESPONSE:", response.data);

//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data.results || [];

//       setUsers(data);

//       return data;
//     } catch (error) {
//       console.error("USERS ERROR:", error.response?.data || error);

//       return [];
//     }
//   };

//   // =================================================
//   // LOAD LEADS + USERS WHEN DRAWER OPENS
//   // =================================================
//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     const loadOptions = async () => {
//       setError("");

//       await Promise.all([fetchLeads(), fetchUsers()]);
//     };

//     loadOptions();
//   }, [open]);

//   // =================================================
//   // GET LEAD OWNER IDS
//   // =================================================
//   const getLeadOwnerIds = (selectedLead) => {
//     if (!selectedLead) {
//       return [];
//     }

//     // -----------------------------------------------
//     // Option 1:
//     // contact_owner_ids: [1, 2, 3]
//     // -----------------------------------------------
//     if (Array.isArray(selectedLead.contact_owner_ids)) {
//       return selectedLead.contact_owner_ids.map((id) => String(id));
//     }

//     // -----------------------------------------------
//     // Option 2:
//     // contact_owners: [1, 2, 3]
//     // -----------------------------------------------
//     if (Array.isArray(selectedLead.contact_owners)) {
//       return selectedLead.contact_owners.map((owner) =>
//         String(owner?.id ?? owner),
//       );
//     }

//     return [];
//   };

//   // =================================================
//   // LOAD DEAL DATA WHEN EDITING / CREATING
//   // =================================================
//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     // =================================================
//     // CREATE MODE
//     // =================================================
//     if (!deal) {
//       const selectedLead = leads.find(
//         (lead) => String(lead.id) === String(leadId),
//       );

//       const ownerIds = getLeadOwnerIds(selectedLead);

//       console.log("CREATE DEAL - ASSOCIATED LEAD:", leadId);

//       console.log("CREATE DEAL - SELECTED LEAD:", selectedLead);

//       console.log("CREATE DEAL - AUTO DEAL OWNERS:", ownerIds);

//       setFormData({
//         ...emptyForm,

//         // Automatically select converted lead
//         associatedLead:
//           leadId !== null && leadId !== undefined && leadId !== ""
//             ? String(leadId)
//             : "",

//         // Automatically select lead owners
//         dealOwner: ownerIds,
//       });

//       setError("");

//       return;
//     }

//     // =================================================
//     // EDIT MODE
//     // =================================================
//     console.log("DEAL FOR EDIT:", deal);

//     setFormData({
//       dealName: deal.deal_name || "",

//       dealStage: deal.deal_stage || "",

//       associatedLead:
//         deal.associated_lead !== null && deal.associated_lead !== undefined
//           ? String(deal.associated_lead)
//           : "",

//       amount:
//         deal.amount !== null && deal.amount !== undefined
//           ? String(deal.amount)
//           : "",

//       // Keep existing deal owners
//       dealOwner: Array.isArray(deal.deal_owner_ids)
//         ? deal.deal_owner_ids.map((id) => String(id))
//         : [],

//       closeDate: deal.close_date ? dayjs(deal.close_date) : null,

//       priority: deal.priority || "",
//     });
//   }, [deal, open, leadId, leads]);

//   // =================================================
//   // HANDLE INPUT CHANGE
//   // =================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // =================================================
//     // ASSOCIATED LEAD CHANGE
//     // =================================================
//     if (name === "associatedLead") {
//       const selectedLead = leads.find(
//         (lead) => String(lead.id) === String(value),
//       );

//       console.log("SELECTED ASSOCIATED LEAD:", selectedLead);

//       // Get contact owners from selected lead
//       const ownerIds = getLeadOwnerIds(selectedLead);

//       console.log("AUTO SELECTED DEAL OWNERS:", ownerIds);

//       setFormData((prev) => ({
//         ...prev,

//         associatedLead: value,

//         // Automatically update Deal Owners
//         dealOwner: ownerIds,
//       }));

//       return;
//     }

//     // =================================================
//     // NORMAL INPUT CHANGE
//     // =================================================
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =================================================
//   // CREATE / UPDATE DEAL
//   // =================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // VALIDATION
//       // =================================================
//       if (!formData.dealName) {
//         setError("Please enter deal name.");
//         setLoading(false);
//         return;
//       }

//       if (!formData.dealStage) {
//         setError("Please select deal stage.");
//         setLoading(false);
//         return;
//       }

//       if (!formData.associatedLead) {
//         setError("Please select an associated lead.");
//         setLoading(false);
//         return;
//       }

//       // =================================================
//       // DEAL OWNER VALIDATION
//       // =================================================
//       if (
//         !Array.isArray(formData.dealOwner) ||
//         formData.dealOwner.length === 0
//       ) {
//         setError("Please select at least one deal owner.");

//         setLoading(false);
//         return;
//       }

//       // =================================================
//       // PAYLOAD
//       // =================================================
//       const dealData = {
//         deal_name: formData.dealName,

//         deal_stage: formData.dealStage,

//         associated_lead: Number(formData.associatedLead),

//         amount: formData.amount,

//         // Multiple Deal Owners
//         deal_owners: formData.dealOwner.map((id) => Number(id)),

//         close_date: formData.closeDate
//           ? formData.closeDate.format("YYYY-MM-DD")
//           : null,

//         priority: formData.priority,
//       };

//       console.log("DEAL PAYLOAD:", dealData);

//       // =================================================
//       // UPDATE DEAL
//       // =================================================
//       if (isEditMode) {
//         console.log("Updating deal:", deal.id);

//         const response = await api.put(`/deals/${deal.id}/`, dealData);

//         console.log("DEAL UPDATED:", response.data);
//       }

//       // =================================================
//       // CREATE DEAL
//       // =================================================
//       else {
//         console.log("Creating deal");

//         const response = await api.post("/deals/", dealData);

//         console.log("DEAL CREATED:", response.data);
//       }

//       // =================================================
//       // REFRESH DEAL LIST
//       // =================================================
//       if (onDealSaved) {
//         await onDealSaved();
//       }

//       // =================================================
//       // CLEAR FORM
//       // =================================================
//       setFormData({
//         ...emptyForm,
//       });

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================
//       onClose();
//     } catch (error) {
//       console.error("SAVE DEAL ERROR:", error.response?.data || error);

//       if (error.response?.data) {
//         setError(JSON.stringify(error.response.data));
//       } else {
//         setError(
//           isEditMode ? "Failed to update deal." : "Failed to create deal.",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =================================================
//   // LEAD OPTIONS
//   // =================================================
//   const leadOptions = leads.map((lead) => ({
//     value: String(lead.id),

//     label:
//       `${lead.first_name || ""} ${lead.last_name || ""}`.trim() ||
//       lead.name ||
//       lead.email ||
//       `Lead ${lead.id}`,
//   }));

//   // =================================================
//   // USER OPTIONS
//   // =================================================
//   const userOptions = users.map((user) => ({
//     value: String(user.id),

//     label:
//       `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
//       user.username ||
//       user.email ||
//       `User ${user.id}`,
//   }));

//   // =================================================
//   // UI
//   // =================================================
//   return (
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
//         HEADER
//         ================================================= */}
//         <DrawerHeader
//           title={isEditMode ? "Edit Deal" : "Create Deal"}
//           onClose={onClose}
//         />

//         {/* =================================================
//         FORM
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

//           {/* DEAL NAME */}
//           <CommonInput
//             label="Deal Name"
//             required
//             name="dealName"
//             value={formData.dealName}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* DEAL STAGE */}
//           <CommonSelect
//             label="Deal Stage"
//             required
//             placeholder="Choose"
//             options={[
//               "Appointment Scheduled",
//               "Contract Sent",
//               "Closed Won",
//               "Closed Lost",
//               "Decision Maker Bought In",
//               "Presentation Scheduled",
//               "Qualified to Buy",
//             ]}
//             name="dealStage"
//             value={formData.dealStage}
//             onChange={handleChange}
//           />

//           {/* ASSOCIATED LEAD */}
//           <CommonSelect
//             label="Associated Lead"
//             required
//             placeholder={leads.length ? "Choose" : "No leads available"}
//             options={leadOptions}
//             name="associatedLead"
//             value={formData.associatedLead}
//             onChange={handleChange}
//           />

//           {/* AMOUNT */}
//           <CommonInput
//             label="Amount"
//             required
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* DEAL OWNER */}
//           <CommonMultiSelect
//             label="Deal Owner"
//             required
//             placeholder={users.length ? "Choose" : "No users available"}
//             options={userOptions}
//             name="dealOwner"
//             value={formData.dealOwner}
//             onChange={handleChange}
//           />

//           {/* CLOSE DATE + PRIORITY */}
//           <Grid container spacing={2}>
//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <FormDatePicker
//                 label="Close Date"
//                 required
//                 value={formData.closeDate}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     closeDate: newValue,
//                   }))
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
//                 label="Priority"
//                 required
//                 placeholder="Choose"
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 options={["High", "Medium", "Low"]}
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         {/* =================================================
//         FOOTER
//         ================================================= */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 3,
//             p: 3,
//             borderTop: "1px solid #E5E7EB",
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
//           <CommonButton type="submit" fullWidth disabled={loading}>
//             {loading ? "Saving..." : isEditMode ? "Update" : "Save Deal"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { Drawer, Box, Grid } from "@mui/material";
// import dayjs from "dayjs";

// import DrawerHeader from "../../../Components/common/DrawerHeader";
// import CommonInput from "../../../Components/common/CommonInput";
// import CommonButton from "../../../Components/common/CommonButton";
// import CommonSelect from "../../../Components/common/CommonSelect";
// import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
// import FormDatePicker from "../../../Components/common/FormDatePicker";

// import api from "../../../services/api";

// export default function CreateDealsDrawer({
//   open,
//   onClose,
//   onDealSaved,
//   deal,
//   leadId,
// }) {
//   // =================================================
//   // EMPTY FORM
//   // =================================================

//   const emptyForm = {
//     dealName: "",
//     dealStage: "",
//     associatedLead: "",
//     amount: "",
//     dealOwner: [],
//     closeDate: null,
//     priority: "",
//   };

//   // =================================================
//   // STATES
//   // =================================================

//   const [formData, setFormData] = useState(emptyForm);

//   const [leads, setLeads] = useState([]);

//   const [users, setUsers] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =================================================
//   // EDIT MODE
//   // =================================================

//   const isEditMode = Boolean(deal);

//   // =================================================
//   // FETCH LEADS
//   // =================================================

//   const fetchLeads = async () => {
//     try {
//       const response = await api.get("/leads/leadslist/");

//       console.log("LEADS RESPONSE:", response.data);

//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data?.results || [];

//       setLeads(data);

//       return data;
//     } catch (error) {
//       console.error(
//         "LEADS ERROR:",
//         error.response?.data || error
//       );

//       return [];
//     }
//   };

//   // =================================================
//   // FETCH USERS
//   // =================================================

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/accounts/users/");

//       console.log("USERS RESPONSE:", response.data);

//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data?.results || [];

//       setUsers(data);

//       return data;
//     } catch (error) {
//       console.error(
//         "USERS ERROR:",
//         error.response?.data || error
//       );

//       return [];
//     }
//   };

//   // =================================================
//   // LOAD LEADS + USERS WHEN DRAWER OPENS
//   // =================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     const loadOptions = async () => {
//       setError("");

//       await Promise.all([
//         fetchLeads(),
//         fetchUsers(),
//       ]);
//     };

//     loadOptions();
//   }, [open]);

//   // =================================================
//   // GET LEAD OWNER IDS
//   // =================================================

//   const getLeadOwnerIds = (selectedLead) => {
//     if (!selectedLead) {
//       return [];
//     }

//     // -------------------------------------------------
//     // contact_owner_ids
//     // Example:
//     // [16, 17]
//     // -------------------------------------------------

//     if (
//       Array.isArray(
//         selectedLead.contact_owner_ids
//       )
//     ) {
//       return selectedLead.contact_owner_ids.map(
//         (id) => String(id)
//       );
//     }

//     // -------------------------------------------------
//     // contact_owners
//     // Example:
//     // [16, 17]
//     // OR
//     // [{ id: 16 }, { id: 17 }]
//     // -------------------------------------------------

//     if (
//       Array.isArray(
//         selectedLead.contact_owners
//       )
//     ) {
//       return selectedLead.contact_owners.map(
//         (owner) =>
//           String(
//             typeof owner === "object"
//               ? owner.id
//               : owner
//           )
//       );
//     }

//     return [];
//   };

//   // =================================================
//   // GET LEAD DETAILS
//   // =================================================

//   const fetchLeadDetails = async (id) => {
//     if (
//       id === null ||
//       id === undefined ||
//       id === ""
//     ) {
//       return null;
//     }

//     try {
//       console.log(
//         "FETCHING LEAD DETAILS:",
//         id
//       );

//       const response = await api.get(
//         `/leads/${id}/`
//       );

//       console.log(
//         "LEAD DETAILS RESPONSE:",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.error(
//         "LEAD DETAILS ERROR:",
//         error.response?.data || error
//       );

//       return null;
//     }
//   };

//   // =================================================
//   // LOAD DEAL DATA
//   // =================================================

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     // =================================================
//     // CREATE MODE
//     // =================================================

//     if (!deal) {
//       const loadCreateData = async () => {
//         let automaticOwners = [];

//         // -------------------------------------------------
//         // No converted Lead
//         // -------------------------------------------------

//         if (
//           leadId === null ||
//           leadId === undefined ||
//           leadId === ""
//         ) {
//           setFormData({
//             ...emptyForm,
//           });

//           setError("");

//           return;
//         }

//         // -------------------------------------------------
//         // First try Lead list data
//         // -------------------------------------------------

//         let selectedLead = leads.find(
//           (lead) =>
//             String(lead.id) ===
//             String(leadId)
//         );

//         // -------------------------------------------------
//         // If not available in list,
//         // fetch Lead details directly
//         // -------------------------------------------------

//         if (!selectedLead) {
//           selectedLead =
//             await fetchLeadDetails(
//               leadId
//             );
//         }

//         // -------------------------------------------------
//         // Get Contact Owners
//         // -------------------------------------------------

//         automaticOwners =
//           getLeadOwnerIds(
//             selectedLead
//           );

//         console.log(
//           "CREATE DEAL - ASSOCIATED LEAD:",
//           leadId
//         );

//         console.log(
//           "CREATE DEAL - SELECTED LEAD:",
//           selectedLead
//         );

//         console.log(
//           "CREATE DEAL - AUTO DEAL OWNERS:",
//           automaticOwners
//         );

//         // -------------------------------------------------
//         // Set Form
//         // -------------------------------------------------

//         setFormData({
//           ...emptyForm,

//           // Automatically select Lead
//           associatedLead:
//             String(leadId),

//           // Automatically select
//           // Lead Contact Owners
//           dealOwner:
//             automaticOwners,
//         });

//         setError("");
//       };

//       loadCreateData();

//       return;
//     }

//     // =================================================
//     // EDIT MODE
//     // =================================================

//     console.log(
//       "DEAL FOR EDIT:",
//       deal
//     );

//     setFormData({
//       dealName:
//         deal.deal_name || "",

//       dealStage:
//         deal.deal_stage || "",

//       associatedLead:
//         deal.associated_lead !== null &&
//         deal.associated_lead !== undefined
//           ? String(
//               deal.associated_lead
//             )
//           : "",

//       amount:
//         deal.amount !== null &&
//         deal.amount !== undefined
//           ? String(deal.amount)
//           : "",

//       // Keep existing Deal Owners
//       dealOwner:
//         Array.isArray(
//           deal.deal_owner_ids
//         )
//           ? deal.deal_owner_ids.map(
//               (id) => String(id)
//             )
//           : [],

//       closeDate:
//         deal.close_date
//           ? dayjs(
//               deal.close_date
//             )
//           : null,

//       priority:
//         deal.priority || "",
//     });

//     setError("");
//   }, [
//     deal,
//     open,
//     leadId,
//     leads,
//   ]);

//   // =================================================
//   // HANDLE INPUT CHANGE
//   // =================================================

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     // =================================================
//     // ASSOCIATED LEAD CHANGE
//     // =================================================

//     if (
//       name ===
//       "associatedLead"
//     ) {
//       const updateAssociatedLead =
//         async () => {
//           // -------------------------------------------------
//           // Find Lead from already loaded list
//           // -------------------------------------------------

//           let selectedLead =
//             leads.find(
//               (lead) =>
//                 String(
//                   lead.id
//                 ) ===
//                 String(value)
//             );

//           // -------------------------------------------------
//           // If Lead is not in list,
//           // fetch it directly
//           // -------------------------------------------------

//           if (!selectedLead) {
//             selectedLead =
//               await fetchLeadDetails(
//                 value
//               );
//           }

//           console.log(
//             "SELECTED ASSOCIATED LEAD:",
//             selectedLead
//           );

//           // -------------------------------------------------
//           // Get Contact Owners
//           // -------------------------------------------------

//           const ownerIds =
//             getLeadOwnerIds(
//               selectedLead
//             );

//           console.log(
//             "AUTO SELECTED DEAL OWNERS:",
//             ownerIds
//           );

//           // -------------------------------------------------
//           // Update Form
//           // -------------------------------------------------

//           setFormData(
//             (prev) => ({
//               ...prev,

//               associatedLead:
//                 value,

//               // Automatically replace
//               // Deal Owners with
//               // selected Lead owners
//               dealOwner:
//                 ownerIds,
//             })
//           );
//         };

//       updateAssociatedLead();

//       return;
//     }

//     // =================================================
//     // NORMAL INPUT CHANGE
//     // =================================================

//     setFormData(
//       (prev) => ({
//         ...prev,
//         [name]: value,
//       })
//     );
//   };

//   // =================================================
//   // CREATE / UPDATE DEAL
//   // =================================================

//   const handleSubmit = async (
//     e
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       // =================================================
//       // VALIDATION
//       // =================================================

//       if (
//         !formData.dealName
//       ) {
//         setError(
//           "Please enter deal name."
//         );

//         setLoading(false);

//         return;
//       }

//       if (
//         !formData.dealStage
//       ) {
//         setError(
//           "Please select deal stage."
//         );

//         setLoading(false);

//         return;
//       }

//       if (
//         !formData.associatedLead
//       ) {
//         setError(
//           "Please select an associated lead."
//         );

//         setLoading(false);

//         return;
//       }

//       // =================================================
//       // DEAL OWNER VALIDATION
//       // =================================================

//       if (
//         !Array.isArray(
//           formData.dealOwner
//         ) ||
//         formData.dealOwner
//           .length === 0
//       ) {
//         setError(
//           "Please select at least one deal owner."
//         );

//         setLoading(false);

//         return;
//       }

//       // =================================================
//       // PAYLOAD
//       // =================================================

//       const dealData = {
//         deal_name:
//           formData.dealName,

//         deal_stage:
//           formData.dealStage,

//         associated_lead:
//           Number(
//             formData.associatedLead
//           ),

//         amount:
//           formData.amount,

//         // Multiple Deal Owners
//         deal_owners:
//           formData.dealOwner.map(
//             (id) =>
//               Number(id)
//           ),

//         close_date:
//           formData.closeDate
//             ? formData.closeDate.format(
//                 "YYYY-MM-DD"
//               )
//             : null,

//         priority:
//           formData.priority,
//       };

//       console.log(
//         "DEAL PAYLOAD:",
//         dealData
//       );

//       // =================================================
//       // UPDATE DEAL
//       // =================================================

//       if (isEditMode) {
//         console.log(
//           "Updating deal:",
//           deal.id
//         );

//         const response =
//           await api.put(
//             `/deals/${deal.id}/`,
//             dealData
//           );

//         console.log(
//           "DEAL UPDATED:",
//           response.data
//         );
//       }

//       // =================================================
//       // CREATE DEAL
//       // =================================================

//       else {
//         console.log(
//           "Creating deal"
//         );

//         const response =
//           await api.post(
//             "/deals/",
//             dealData
//           );

//         console.log(
//           "DEAL CREATED:",
//           response.data
//         );
//       }

//       // =================================================
//       // REFRESH DEAL LIST
//       // =================================================

//       if (onDealSaved) {
//         await onDealSaved();
//       }

//       // =================================================
//       // CLEAR FORM
//       // =================================================

//       setFormData({
//         ...emptyForm,
//       });

//       // =================================================
//       // CLOSE DRAWER
//       // =================================================

//       onClose();

//     } catch (error) {
//       console.error(
//         "SAVE DEAL ERROR:",
//         error.response?.data ||
//           error
//       );

//       if (
//         error.response?.data
//       ) {
//         setError(
//           JSON.stringify(
//             error.response.data
//           )
//         );
//       } else {
//         setError(
//           isEditMode
//             ? "Failed to update deal."
//             : "Failed to create deal."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =================================================
//   // LEAD OPTIONS
//   // =================================================

//   const leadOptions =
//     leads.map(
//       (lead) => ({
//         value: String(
//           lead.id
//         ),

//         label:
//           `${lead.first_name || ""} ${
//             lead.last_name || ""
//           }`.trim() ||
//           lead.name ||
//           lead.email ||
//           `Lead ${lead.id}`,
//       })
//     );

//   // =================================================
//   // USER OPTIONS
//   // =================================================

//   const userOptions =
//     users.map(
//       (user) => ({
//         value: String(
//           user.id
//         ),

//         label:
//           `${user.first_name || ""} ${
//             user.last_name || ""
//           }`.trim() ||
//           user.username ||
//           user.email ||
//           `User ${user.id}`,
//       })
//     );

//   // =================================================
//   // UI
//   // =================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//     >
//       <Box
//         component="form"
//         onSubmit={
//           handleSubmit
//         }
//         sx={{
//           width: 520,
//           height: "100%",
//           display: "flex",
//           flexDirection:
//             "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <DrawerHeader
//           title={
//             isEditMode
//               ? "Edit Deal"
//               : "Create Deal"
//           }
//           onClose={
//             onClose
//           }
//         />

//         {/* =================================================
//             FORM
//         ================================================= */}

//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection:
//               "column",
//             gap: 2,
//             overflowY:
//               "auto",
//           }}
//         >
//           {/* ERROR */}

//           {error && (
//             <Box
//               sx={{
//                 color: "red",
//                 fontSize:
//                   "14px",
//                 wordBreak:
//                   "break-word",
//               }}
//             >
//               {error}
//             </Box>
//           )}

//           {/* DEAL NAME */}

//           <CommonInput
//             label="Deal Name"
//             required
//             name="dealName"
//             value={
//               formData.dealName
//             }
//             onChange={
//               handleChange
//             }
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* DEAL STAGE */}

//           <CommonSelect
//             label="Deal Stage"
//             required
//             placeholder="Choose"
//             options={[
//               "Appointment Scheduled",
//               "Contract Sent",
//               "Closed Won",
//               "Closed Lost",
//               "Decision Maker Bought In",
//               "Presentation Scheduled",
//               "Qualified to Buy",
//             ]}
//             name="dealStage"
//             value={
//               formData.dealStage
//             }
//             onChange={
//               handleChange
//             }
//           />

//           {/* ASSOCIATED LEAD */}

//           <CommonSelect
//             label="Associated Lead"
//             required
//             placeholder={
//               leads.length
//                 ? "Choose"
//                 : "No leads available"
//             }
//             options={
//               leadOptions
//             }
//             name="associatedLead"
//             value={
//               formData.associatedLead
//             }
//             onChange={
//               handleChange
//             }
//           />

//           {/* AMOUNT */}

//           <CommonInput
//             label="Amount"
//             required
//             name="amount"
//             value={
//               formData.amount
//             }
//             onChange={
//               handleChange
//             }
//             fullWidth
//             placeholder="Enter"
//           />

//           {/* DEAL OWNER */}

//           <CommonMultiSelect
//             label="Deal Owner"
//             required
//             placeholder={
//               users.length
//                 ? "Choose"
//                 : "No users available"
//             }
//             options={
//               userOptions
//             }
//             name="dealOwner"
//             value={
//               formData.dealOwner
//             }
//             onChange={
//               handleChange
//             }
//           />

//           {/* CLOSE DATE + PRIORITY */}

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
//               <FormDatePicker
//                 label="Close Date"
//                 required
//                 value={
//                   formData.closeDate
//                 }
//                 onChange={(
//                   newValue
//                 ) =>
//                   setFormData(
//                     (prev) => ({
//                       ...prev,
//                       closeDate:
//                         newValue,
//                     })
//                   )
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
//                 label="Priority"
//                 required
//                 placeholder="Choose"
//                 name="priority"
//                 value={
//                   formData.priority
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 options={[
//                   "High",
//                   "Medium",
//                   "Low",
//                 ]}
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         {/* =================================================
//             FOOTER
//         ================================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 3,
//             p: 3,
//             borderTop:
//               "1px solid #E5E7EB",
//           }}
//         >
//           {/* CANCEL */}

//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={
//               onClose
//             }
//             disabled={
//               loading
//             }
//           >
//             Cancel
//           </CommonButton>

//           {/* SAVE / UPDATE */}

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={
//               loading
//             }
//           >
//             {loading
//               ? "Saving..."
//               : isEditMode
//               ? "Update"
//               : "Save Deal"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }




import React, { useEffect, useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import dayjs from "dayjs";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import CommonSelect from "../../../Components/common/CommonSelect";
import CommonMultiSelect from "../../../Components/common/CommonMultiSelect";
import FormDatePicker from "../../../Components/common/FormDatePicker";
import { useToast } from "../../../Components/common/Toast";

import api from "../../../services/api";

export default function CreateDealsDrawer({
  open,
  onClose,
  onDealSaved,
  deal,
  leadId,
}) {
  const { showToast } = useToast();

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
      const response = await api.get("/leads/leadslist/");

      console.log("LEADS RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

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

  // =================================================
  // FETCH USERS
  // =================================================

  const fetchUsers = async () => {
    try {
      const response = await api.get("/accounts/users/");

      console.log("USERS RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

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

  // =================================================
  // LOAD LEADS + USERS WHEN DRAWER OPENS
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
  // GET LEAD OWNER IDS
  // =================================================

  const getLeadOwnerIds = (selectedLead) => {
    if (!selectedLead) {
      return [];
    }

    // -------------------------------------------------
    // contact_owner_ids
    // Example:
    // [16, 17]
    // -------------------------------------------------

    if (
      Array.isArray(
        selectedLead.contact_owner_ids
      )
    ) {
      return selectedLead.contact_owner_ids.map(
        (id) => String(id)
      );
    }

    // -------------------------------------------------
    // contact_owners
    // Example:
    // [16, 17]
    // OR
    // [{ id: 16 }, { id: 17 }]
    // -------------------------------------------------

    if (
      Array.isArray(
        selectedLead.contact_owners
      )
    ) {
      return selectedLead.contact_owners.map(
        (owner) =>
          String(
            typeof owner === "object"
              ? owner.id
              : owner
          )
      );
    }

    return [];
  };

  // =================================================
  // GET LEAD DETAILS
  // =================================================

  const fetchLeadDetails = async (id) => {
    if (
      id === null ||
      id === undefined ||
      id === ""
    ) {
      return null;
    }

    try {
      console.log(
        "FETCHING LEAD DETAILS:",
        id
      );

      const response = await api.get(
        `/leads/${id}/`
      );

      console.log(
        "LEAD DETAILS RESPONSE:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(
        "LEAD DETAILS ERROR:",
        error.response?.data || error
      );

      return null;
    }
  };

  // =================================================
  // LOAD DEAL DATA
  // =================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    // =================================================
    // CREATE MODE
    // =================================================

    if (!deal) {
      const loadCreateData = async () => {
        let automaticOwners = [];

        // -------------------------------------------------
        // No converted Lead
        // -------------------------------------------------

        if (
          leadId === null ||
          leadId === undefined ||
          leadId === ""
        ) {
          setFormData({
            ...emptyForm,
          });

          setError("");

          return;
        }

        // -------------------------------------------------
        // First try Lead list data
        // -------------------------------------------------

        let selectedLead = leads.find(
          (lead) =>
            String(lead.id) ===
            String(leadId)
        );

        // -------------------------------------------------
        // If not available in list,
        // fetch Lead details directly
        // -------------------------------------------------

        if (!selectedLead) {
          selectedLead =
            await fetchLeadDetails(
              leadId
            );
        }

        // -------------------------------------------------
        // Get Contact Owners
        // -------------------------------------------------

        automaticOwners =
          getLeadOwnerIds(
            selectedLead
          );

        console.log(
          "CREATE DEAL - ASSOCIATED LEAD:",
          leadId
        );

        console.log(
          "CREATE DEAL - SELECTED LEAD:",
          selectedLead
        );

        console.log(
          "CREATE DEAL - AUTO DEAL OWNERS:",
          automaticOwners
        );

        // -------------------------------------------------
        // Set Form
        // -------------------------------------------------

        setFormData({
          ...emptyForm,

          // Automatically select Lead
          associatedLead:
            String(leadId),

          // Automatically select
          // Lead Contact Owners
          dealOwner:
            automaticOwners,
        });

        setError("");
      };

      loadCreateData();

      return;
    }

    // =================================================
    // EDIT MODE
    // =================================================

    console.log(
      "DEAL FOR EDIT:",
      deal
    );

    setFormData({
      dealName:
        deal.deal_name || "",

      dealStage:
        deal.deal_stage || "",

      associatedLead:
        deal.associated_lead !== null &&
        deal.associated_lead !== undefined
          ? String(
              deal.associated_lead
            )
          : "",

      amount:
        deal.amount !== null &&
        deal.amount !== undefined
          ? String(deal.amount)
          : "",

      // Keep existing Deal Owners
      dealOwner:
        Array.isArray(
          deal.deal_owner_ids
        )
          ? deal.deal_owner_ids.map(
              (id) => String(id)
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
  }, [
    deal,
    open,
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
    // ASSOCIATED LEAD CHANGE
    // =================================================

    if (
      name ===
      "associatedLead"
    ) {
      const updateAssociatedLead =
        async () => {
          // -------------------------------------------------
          // Find Lead from already loaded list
          // -------------------------------------------------

          let selectedLead =
            leads.find(
              (lead) =>
                String(
                  lead.id
                ) ===
                String(value)
            );

          // -------------------------------------------------
          // If Lead is not in list,
          // fetch it directly
          // -------------------------------------------------

          if (!selectedLead) {
            selectedLead =
              await fetchLeadDetails(
                value
              );
          }

          console.log(
            "SELECTED ASSOCIATED LEAD:",
            selectedLead
          );

          // -------------------------------------------------
          // Get Contact Owners
          // -------------------------------------------------

          const ownerIds =
            getLeadOwnerIds(
              selectedLead
            );

          console.log(
            "AUTO SELECTED DEAL OWNERS:",
            ownerIds
          );

          // -------------------------------------------------
          // Update Form
          // -------------------------------------------------

          setFormData(
            (prev) => ({
              ...prev,

              associatedLead:
                value,

              // Automatically replace
              // Deal Owners with
              // selected Lead owners
              dealOwner:
                ownerIds,
            })
          );
        };

      updateAssociatedLead();

      return;
    }

    // =================================================
    // NORMAL INPUT CHANGE
    // =================================================

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );
  };

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

      if (
        !formData.dealName
      ) {
        setError(
          "Please enter deal name."
        );

        showToast(
          "Please enter deal name.",
          "error"
        );

        setLoading(false);
        return;
      }

      if (
        !formData.dealStage
      ) {
        setError(
          "Please select deal stage."
        );

        showToast(
          "Please select deal stage.",
          "error"
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

        showToast(
          "Please select an associated lead.",
          "error"
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
          "Please select at least one deal owner."
        );

        showToast(
          "Please select at least one deal owner.",
          "error"
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

        // Multiple Deal Owners
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

        // -------------------------------------------------
        // SUCCESS TOAST
        // -------------------------------------------------

        showToast(
          "Deal updated successfully",
          "success"
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

        // -------------------------------------------------
        // SUCCESS TOAST
        // -------------------------------------------------

        showToast(
          "Deal created successfully",
          "success"
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

      const errorMessage =
        isEditMode
          ? "Failed to update deal."
          : "Failed to create deal.";

      // -------------------------------------------------
      // API ERROR
      // -------------------------------------------------

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
          errorMessage
        );
      }

      // -------------------------------------------------
      // ERROR TOAST
      // -------------------------------------------------

      showToast(
        errorMessage,
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  // =================================================
  // LEAD OPTIONS
  // =================================================

  const leadOptions =
    leads.map(
      (lead) => ({
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
      })
    );

  // =================================================
  // USER OPTIONS
  // =================================================

  const userOptions =
    users.map(
      (user) => ({
        value: String(
          user.id
        ),

        label:
          `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim() ||
          user.username ||
          user.email ||
          `User ${user.id}`,
      })
    );

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
        onSubmit={
          handleSubmit
        }
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
          onClose={
            onClose
          }
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
            overflowY:
              "auto",
          }}
        >
          {/* ERROR */}

          {error && (
            <Box
              sx={{
                color: "red",
                fontSize:
                  "14px",
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

          {/* DEAL OWNER */}

          <CommonMultiSelect
            label="Deal Owner"
            required
            placeholder={
              users.length
                ? "Choose"
                : "No users available"
            }
            options={
              userOptions
            }
            name="dealOwner"
            value={
              formData.dealOwner
            }
            onChange={
              handleChange
            }
          />

          {/* CLOSE DATE + PRIORITY */}

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
            onClick={
              onClose
            }
            disabled={
              loading
            }
          >
            Cancel
          </CommonButton>

          {/* SAVE / UPDATE */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={
              loading
            }
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
