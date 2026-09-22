// import React, { useCallback, useEffect, useState } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
// import api from "../../services/api";

// export default function RightPanel({
//   module = "lead",
//   objectId,

//   summaryTitle = "AI Lead Summary",

//   summaryText =
//     "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
// }) {
//   const [aiSummary, setAiSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateAISummary = useCallback(async () => {
//     if (!module || !objectId) {
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post(
//         "/ai/summary/",
//         {
//           module,
//           object_id: Number(objectId),
//         }
//       );

//       console.log(
//         "AI SUMMARY RESPONSE:",
//         response.data
//       );

//       setAiSummary(
//         response.data?.summary || ""
//       );

//     } catch (error) {

//       console.error(
//         "ERROR GENERATING AI SUMMARY:",
//         error.response?.data ||
//           error.message
//       );

//       setAiSummary("");

//       setError(
//         error.response?.data?.detail ||
//           error.response?.data?.error ||
//           "Failed to generate AI summary."
//       );

//     } finally {
//       setLoading(false);
//     }
//   }, [module, objectId]);

//   useEffect(() => {

//     if (!module || !objectId) {
//       setAiSummary("");
//       setError("");
//       return;
//     }

//     generateAISummary();

//   }, [
//     module,
//     objectId,
//     generateAISummary,
//   ]);

//   const displaySummary =
//     aiSummary || summaryText;

//   return (
//     <Box
//       sx={{
//         width: 300,
//         backgroundColor: "#fff",
//         borderTopRightRadius: "12px",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           border: "1px solid #5948DB",
//           backgroundColor: "#F7F7FA",
//           borderRadius: "8px",
//           p: 2,
//           mb: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#5948DB",
//             mb: 1,
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <AutoAwesomeOutlinedIcon
//             color="primary"
//             sx={{ mr: 1 }}
//           />

//           {summaryTitle}
//         </Typography>

//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               py: 1,
//             }}
//           >
//             <CircularProgress
//               size={18}
//               color="primary"
//             />

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#516F90",
//               }}
//             >
//               Generating summary...
//             </Typography>
//           </Box>
//         )}

//         {!loading && error && (
//           <Typography
//             sx={{
//               fontSize: "13px",
//               color: "error.main",
//               lineHeight: 1.6,
//             }}
//           >
//             {error}
//           </Typography>
//         )}

//         {!loading && !error && (
//           <Typography
//             sx={{
//               fontSize: "14px",
//               color: "#33475B",
//               lineHeight: 1.6,
//             }}
//           >
//             {displaySummary}
//           </Typography>
//         )}
//       </Box>

//       <Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1,
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,
//             }}
//           >
//             Attachments
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#5948DB",
//               cursor: "pointer",
//             }}
//           >
//             + Add
//           </Typography>
//         </Box>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#516F90",
//             lineHeight: 1.6,
//           }}
//         >
//           See the files attached to your activities or uploaded to this record.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }




// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
// import api from "../../services/api";

// export default function RightPanel({
//   module = "lead",
//   objectId,

//   summaryTitle = "AI Lead Summary",

//   summaryText =
//     "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
// }) {
//   const [aiSummary, setAiSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateAISummary = useCallback(async () => {
//     if (!module || !objectId) {
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post(
//         "/ai/summary/",
//         {
//           module,
//           object_id: Number(objectId),
//         }
//       );

//       console.log(
//         "AI SUMMARY RESPONSE:",
//         response.data
//       );

//       setAiSummary(
//         response.data?.summary || ""
//       );

//     } catch (error) {
//       console.error(
//         "ERROR GENERATING AI SUMMARY:",
//         error.response?.data || error.message
//       );

//       setAiSummary("");

//       setError(
//         error.response?.data?.error ||
//           error.response?.data?.detail ||
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to generate AI summary."
//       );

//     } finally {
//       setLoading(false);
//     }
//   }, [module, objectId]);

//   /*
//    * IMPORTANT:
//    *
//    * We intentionally DO NOT call generateAISummary()
//    * automatically here.
//    *
//    * This prevents an OpenAI API request every time
//    * the page is opened or refreshed.
//    */

//   useEffect(() => {
//     setAiSummary("");
//     setError("");
//     setLoading(false);
//   }, [module, objectId]);

//   const displaySummary =
//     aiSummary || summaryText;

//   return (
//     <Box
//       sx={{
//         width: 300,
//         backgroundColor: "#fff",
//         borderTopRightRadius: "12px",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           border: "1px solid #5948DB",
//           backgroundColor: "#F7F7FA",
//           borderRadius: "8px",
//           p: 2,
//           mb: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#5948DB",
//             mb: 1,
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <AutoAwesomeOutlinedIcon
//             color="primary"
//             sx={{ mr: 1 }}
//           />

//           {summaryTitle}
//         </Typography>

//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               py: 1,
//             }}
//           >
//             <CircularProgress
//               size={18}
//               color="primary"
//             />

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#516F90",
//               }}
//             >
//               Generating summary...
//             </Typography>
//           </Box>
//         )}

//         {!loading && error && (
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "error.main",
//                 lineHeight: 1.6,
//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",
//                 mb: 1.5,
//               }}
//             >
//               {error}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 textTransform: "none",
//                 borderColor: "#5948DB",
//                 color: "#5948DB",
//               }}
//             >
//               Try Again
//             </Button>
//           </Box>
//         )}

//         {!loading && !error && !aiSummary && (
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,
//                 mb: 2,
//               }}
//             >
//               {displaySummary}
//             </Typography>

//             <Button
//               variant="contained"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 backgroundColor: "#5948DB",
//                 textTransform: "none",
//                 "&:hover": {
//                   backgroundColor: "#4939C5",
//                 },
//               }}
//             >
//               Generate AI Summary
//             </Button>
//           </Box>
//         )}

//         {!loading && !error && aiSummary && (
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,
//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",
//               }}
//             >
//               {aiSummary}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 mt: 1.5,
//                 textTransform: "none",
//                 borderColor: "#5948DB",
//                 color: "#5948DB",
//               }}
//             >
//               Regenerate
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1,
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,
//             }}
//           >
//             Attachments
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#5948DB",
//               cursor: "pointer",
//             }}
//           >
//             + Add
//           </Typography>
//         </Box>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#516F90",
//             lineHeight: 1.6,
//           }}
//         >
//           See the files attached to your activities or uploaded to this record.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }




// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
// import api from "../../services/api";

// export default function RightPanel({
//   module = "lead",
//   objectId,

//   summaryTitle = "AI Lead Summary",

//   summaryText =
//     "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
// }) {
//   const [aiSummary, setAiSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateAISummary = useCallback(async () => {
//     if (!module || !objectId) {
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post(
//         "/ai/summary/",
//         {
//           module,
//           object_id: Number(objectId),
//         }
//       );

//       console.log(
//         "AI SUMMARY RESPONSE:",
//         response.data
//       );

//       setAiSummary(
//         response.data?.summary || ""
//       );
//     } catch (error) {
//       console.error(
//         "ERROR GENERATING AI SUMMARY:",
//         error.response?.data || error.message
//       );

//       setAiSummary("");

//       setError(
//         error.response?.data?.error ||
//           error.response?.data?.detail ||
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to generate AI summary."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [module, objectId]);

//   /*
//    * Do NOT automatically generate the AI summary.
//    *
//    * OpenAI is called only when the user clicks:
//    * - Generate AI Summary
//    * - Try Again
//    * - Regenerate
//    */
//   useEffect(() => {
//     setAiSummary("");
//     setError("");
//     setLoading(false);
//   }, [module, objectId]);

//   const displaySummary =
//     aiSummary || summaryText;

//   return (
//     <Box
//       sx={{
//         width: 300,
//         minWidth: 300,
//         maxWidth: 300,
//         flexShrink: 0,

//         backgroundColor: "#fff",

//         borderTopRightRadius: "12px",

//         p: 2,

//         boxSizing: "border-box",

//         /*
//          * Prevent this panel from creating
//          * horizontal page overflow.
//          */
//         overflow: "hidden",
//       }}
//     >
//       {/* =====================================================
//           AI SUMMARY
//       ===================================================== */}

//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "100%",
//           minWidth: 0,

//           border: "1px solid #5948DB",
//           backgroundColor: "#F7F7FA",
//           borderRadius: "8px",

//           p: 2,
//           mb: 3,

//           boxSizing: "border-box",

//           overflow: "hidden",
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#5948DB",
//             mb: 1,

//             display: "flex",
//             alignItems: "center",

//             minWidth: 0,
//             maxWidth: "100%",

//             overflowWrap: "break-word",
//             wordBreak: "break-word",
//           }}
//         >
//           <AutoAwesomeOutlinedIcon
//             color="primary"
//             sx={{
//               mr: 1,
//               flexShrink: 0,
//             }}
//           />

//           <Box
//             component="span"
//             sx={{
//               minWidth: 0,
//               overflowWrap: "break-word",
//               wordBreak: "break-word",
//             }}
//           >
//             {summaryTitle}
//           </Box>
//         </Typography>

//         {/* ===================================================
//             LOADING
//         =================================================== */}

//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               py: 1,

//               minWidth: 0,
//               maxWidth: "100%",
//             }}
//           >
//             <CircularProgress
//               size={18}
//               color="primary"
//               sx={{
//                 flexShrink: 0,
//               }}
//             />

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#516F90",

//                 minWidth: 0,

//                 overflowWrap: "break-word",
//                 wordBreak: "break-word",
//               }}
//             >
//               Generating summary...
//             </Typography>
//           </Box>
//         )}

//         {/* ===================================================
//             ERROR
//         =================================================== */}

//         {!loading && error && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//               overflow: "hidden",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "error.main",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 mb: 1.5,
//               }}
//             >
//               {error}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 maxWidth: "100%",

//                 textTransform: "none",
//                 borderColor: "#5948DB",
//                 color: "#5948DB",

//                 whiteSpace: "normal",
//               }}
//             >
//               Try Again
//             </Button>
//           </Box>
//         )}

//         {/* ===================================================
//             EMPTY / DEFAULT STATE
//         =================================================== */}

//         {!loading && !error && !aiSummary && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//               overflow: "hidden",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 mb: 2,
//               }}
//             >
//               {displaySummary}
//             </Typography>

//             <Button
//               variant="contained"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 maxWidth: "100%",

//                 backgroundColor: "#5948DB",
//                 textTransform: "none",

//                 whiteSpace: "normal",

//                 "&:hover": {
//                   backgroundColor: "#4939C5",
//                 },
//               }}
//             >
//               Generate AI Summary
//             </Button>
//           </Box>
//         )}

//         {/* ===================================================
//             GENERATED SUMMARY
//         =================================================== */}

//         {!loading && !error && aiSummary && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//               overflow: "hidden",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",
//               }}
//             >
//               {aiSummary}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 mt: 1.5,

//                 maxWidth: "100%",

//                 textTransform: "none",
//                 borderColor: "#5948DB",
//                 color: "#5948DB",

//                 whiteSpace: "normal",
//               }}
//             >
//               Regenerate
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* =====================================================
//           ATTACHMENTS
//       ===================================================== */}

//       <Box
//         sx={{
//           minWidth: 0,
//           maxWidth: "100%",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",

//             mb: 1,

//             minWidth: 0,
//             maxWidth: "100%",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,

//               minWidth: 0,

//               overflowWrap: "break-word",
//               wordBreak: "break-word",
//             }}
//           >
//             Attachments
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#5948DB",
//               cursor: "pointer",

//               flexShrink: 0,
//             }}
//           >
//             + Add
//           </Typography>
//         </Box>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#516F90",
//             lineHeight: 1.6,

//             minWidth: 0,
//             maxWidth: "100%",

//             wordBreak: "break-word",
//             overflowWrap: "anywhere",
//           }}
//         >
//           See the files attached to your activities or uploaded to this record.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }



// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
// import api from "../../services/api";

// export default function RightPanel({
//   module = "lead",
//   objectId,

//   summaryTitle = "AI Lead Summary",

//   summaryText =
//     "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
// }) {
//   const [aiSummary, setAiSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generateAISummary = useCallback(async () => {
//     if (!module || !objectId) {
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post(
//         "/ai/summary/",
//         {
//           module,
//           object_id: Number(objectId),
//         }
//       );

//       console.log(
//         "AI SUMMARY RESPONSE:",
//         response.data
//       );

//       setAiSummary(
//         response.data?.summary || ""
//       );
//     } catch (error) {
//       console.error(
//         "ERROR GENERATING AI SUMMARY:",
//         error.response?.data || error.message
//       );

//       setAiSummary("");

//       setError(
//         error.response?.data?.error ||
//           error.response?.data?.detail ||
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to generate AI summary."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [module, objectId]);

//   /*
//    * AI summary is NOT generated automatically.
//    *
//    * API request happens only when the user clicks:
//    * - Generate AI Summary
//    * - Try Again
//    * - Regenerate
//    */
//   useEffect(() => {
//     setAiSummary("");
//     setError("");
//     setLoading(false);
//   }, [module, objectId]);

//   const displaySummary =
//     aiSummary || summaryText;

//   return (
//     <Box
//       sx={{
//         width: 300,
//         minWidth: 300,
//         maxWidth: 300,

//         flexShrink: 0,

//         backgroundColor: "#fff",

//         borderTopRightRadius: "12px",

//         p: 2,

//         boxSizing: "border-box",

//         /*
//          * Prevent this fixed panel from creating
//          * horizontal overflow.
//          */
//         overflowX: "hidden",
//       }}
//     >
//       {/* =====================================================
//           AI SUMMARY
//       ===================================================== */}

//       <Box
//         sx={{
//           width: "100%",
//           minWidth: 0,
//           maxWidth: "100%",

//           border: "1px solid #5948DB",
//           backgroundColor: "#F7F7FA",
//           borderRadius: "8px",

//           p: 2,
//           mb: 3,

//           boxSizing: "border-box",
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#5948DB",
//             mb: 1,

//             display: "flex",
//             alignItems: "center",

//             minWidth: 0,
//             maxWidth: "100%",

//             overflowWrap: "anywhere",
//             wordBreak: "break-word",
//           }}
//         >
//           <AutoAwesomeOutlinedIcon
//             color="primary"
//             sx={{
//               mr: 1,
//               flexShrink: 0,
//             }}
//           />

//           <Box
//             component="span"
//             sx={{
//               minWidth: 0,

//               overflowWrap: "anywhere",
//               wordBreak: "break-word",
//             }}
//           >
//             {summaryTitle}
//           </Box>
//         </Typography>

//         {/* ===================================================
//             LOADING
//         =================================================== */}

//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               py: 1,

//               minWidth: 0,
//               maxWidth: "100%",
//             }}
//           >
//             <CircularProgress
//               size={18}
//               color="primary"
//               sx={{
//                 flexShrink: 0,
//               }}
//             />

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#516F90",

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 overflowWrap: "anywhere",
//                 wordBreak: "break-word",
//               }}
//             >
//               Generating summary...
//             </Typography>
//           </Box>
//         )}

//         {/* ===================================================
//             ERROR
//         =================================================== */}

//         {!loading && error && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "error.main",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 mb: 1.5,
//               }}
//             >
//               {error}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 textTransform: "none",

//                 borderColor: "#5948DB",
//                 color: "#5948DB",

//                 maxWidth: "100%",

//                 whiteSpace: "normal",
//               }}
//             >
//               Try Again
//             </Button>
//           </Box>
//         )}

//         {/* ===================================================
//             DEFAULT STATE
//         =================================================== */}

//         {!loading && !error && !aiSummary && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 mb: 2,
//               }}
//             >
//               {displaySummary}
//             </Typography>

//             <Button
//               variant="contained"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 backgroundColor: "#5948DB",

//                 textTransform: "none",

//                 maxWidth: "100%",

//                 whiteSpace: "normal",

//                 "&:hover": {
//                   backgroundColor: "#4939C5",
//                 },
//               }}
//             >
//               Generate AI Summary
//             </Button>
//           </Box>
//         )}

//         {/* ===================================================
//             GENERATED SUMMARY
//         =================================================== */}

//         {!loading && !error && aiSummary && (
//           <Box
//             sx={{
//               minWidth: 0,
//               maxWidth: "100%",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//                 lineHeight: 1.6,

//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",
//               }}
//             >
//               {aiSummary}
//             </Typography>

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={generateAISummary}
//               startIcon={
//                 <AutoAwesomeOutlinedIcon />
//               }
//               sx={{
//                 mt: 1.5,

//                 textTransform: "none",

//                 borderColor: "#5948DB",
//                 color: "#5948DB",

//                 maxWidth: "100%",

//                 whiteSpace: "normal",
//               }}
//             >
//               Regenerate
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* =====================================================
//           ATTACHMENTS
//       ===================================================== */}

//       <Box
//         sx={{
//           minWidth: 0,
//           maxWidth: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",

//             mb: 1,

//             minWidth: 0,
//             maxWidth: "100%",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,

//               minWidth: 0,

//               overflowWrap: "anywhere",
//               wordBreak: "break-word",
//             }}
//           >
//             Attachments
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#5948DB",
//               cursor: "pointer",

//               flexShrink: 0,
//             }}
//           >
//             + Add
//           </Typography>
//         </Box>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#516F90",
//             lineHeight: 1.6,

//             minWidth: 0,
//             maxWidth: "100%",

//             wordBreak: "break-word",
//             overflowWrap: "anywhere",
//           }}
//         >
//           See the files attached to your activities or uploaded to this record.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import api from "../../services/api";

export default function RightPanel({
  module = "lead",
  objectId,

  summaryTitle = "AI Lead Summary",

  summaryText =
    "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
}) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // GENERATE AI SUMMARY
  // =========================================================

  const generateAISummary = useCallback(async () => {
    if (!module || !objectId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/ai/summary/",
        {
          module,
          object_id: Number(objectId),
        }
      );

      console.log(
        "AI SUMMARY RESPONSE:",
        response.data
      );

      setAiSummary(
        response.data?.summary || ""
      );
    } catch (error) {
      console.error(
        "ERROR GENERATING AI SUMMARY:",
        error.response?.data || error.message
      );

      setAiSummary("");

      setError(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to generate AI summary."
      );
    } finally {
      setLoading(false);
    }
  }, [module, objectId]);

  // =========================================================
  // RESET WHEN RECORD CHANGES
  // =========================================================

  useEffect(() => {
    setAiSummary("");
    setError("");
    setLoading(false);
  }, [module, objectId]);

  const displaySummary =
    aiSummary || summaryText;

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <Box
      sx={{
        width: 300,
        minWidth: 300,
        maxWidth: 300,

        flex: "0 0 300px",
        flexShrink: 0,

        minHeight: 0,

        backgroundColor: "#fff",

        borderTopRightRadius: "12px",

        p: 2,

        boxSizing: "border-box",

        /*
         * Important:
         * Prevent content inside this panel from
         * increasing the width of the page.
         */
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          AI SUMMARY
          ===================================================== */}

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",

          border: "1px solid #5948DB",
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",

          p: 2,
          mb: 3,

          boxSizing: "border-box",

          overflow: "hidden",
        }}
      >
        {/* ===================================================
            TITLE
            =================================================== */}

        <Typography
          sx={{
            fontWeight: 700,
            color: "#5948DB",

            mb: 1,

            display: "flex",
            alignItems: "flex-start",

            width: "100%",
            minWidth: 0,
            maxWidth: "100%",

            overflow: "hidden",
          }}
        >
          <AutoAwesomeOutlinedIcon
            color="primary"
            sx={{
              mr: 1,
              flexShrink: 0,
              mt: "2px",
            }}
          />

          <Box
            component="span"
            sx={{
              display: "block",

              minWidth: 0,
              maxWidth: "100%",

              overflowWrap: "anywhere",
              wordBreak: "break-word",

              whiteSpace: "normal",
            }}
          >
            {summaryTitle}
          </Box>
        </Typography>

        {/* ===================================================
            LOADING
            =================================================== */}

        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: 1,

              py: 1,

              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              boxSizing: "border-box",

              overflow: "hidden",
            }}
          >
            <CircularProgress
              size={18}
              color="primary"
              sx={{
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                fontSize: "13px",
                color: "#516F90",

                minWidth: 0,
                maxWidth: "100%",

                overflowWrap: "anywhere",
                wordBreak: "break-word",

                whiteSpace: "normal",
              }}
            >
              Generating summary...
            </Typography>
          </Box>
        )}

        {/* ===================================================
            ERROR
            =================================================== */}

        {!loading && error && (
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                color: "error.main",
                lineHeight: 1.5,

                width: "100%",
                minWidth: 0,
                maxWidth: "100%",

                wordBreak: "break-word",
                overflowWrap: "anywhere",

                whiteSpace: "normal",

                mb: 1.5,
              }}
            >
              {error}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              onClick={generateAISummary}
              startIcon={
                <AutoAwesomeOutlinedIcon />
              }
              sx={{
                textTransform: "none",

                borderColor: "#5948DB",
                color: "#5948DB",

                maxWidth: "100%",

                whiteSpace: "normal",

                wordBreak: "break-word",
              }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* ===================================================
            DEFAULT STATE
            =================================================== */}

        {!loading && !error && !aiSummary && (
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#33475B",
                lineHeight: 1.6,

                width: "100%",
                minWidth: 0,
                maxWidth: "100%",

                wordBreak: "break-word",
                overflowWrap: "anywhere",

                whiteSpace: "normal",

                mb: 2,
              }}
            >
              {displaySummary}
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={generateAISummary}
              startIcon={
                <AutoAwesomeOutlinedIcon />
              }
              sx={{
                backgroundColor: "#5948DB",

                textTransform: "none",

                maxWidth: "100%",

                whiteSpace: "normal",

                wordBreak: "break-word",

                "&:hover": {
                  backgroundColor: "#4939C5",
                },
              }}
            >
              Generate AI Summary
            </Button>
          </Box>
        )}

        {/* ===================================================
            GENERATED SUMMARY
            =================================================== */}

        {!loading && !error && aiSummary && (
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#33475B",
                lineHeight: 1.6,

                display: "block",

                width: "100%",
                minWidth: 0,
                maxWidth: "100%",

                wordBreak: "break-word",
                overflowWrap: "anywhere",

                whiteSpace: "normal",
              }}
            >
              {aiSummary}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              onClick={generateAISummary}
              startIcon={
                <AutoAwesomeOutlinedIcon />
              }
              sx={{
                mt: 1.5,

                textTransform: "none",

                borderColor: "#5948DB",
                color: "#5948DB",

                maxWidth: "100%",

                whiteSpace: "normal",

                wordBreak: "break-word",
              }}
            >
              Regenerate
            </Button>
          </Box>
        )}
      </Box>

      {/* =====================================================
          ATTACHMENTS
          ===================================================== */}

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            mb: 1,

            width: "100%",
            minWidth: 0,
            maxWidth: "100%",

            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,

              minWidth: 0,
              maxWidth: "100%",

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            Attachments
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              color: "#5948DB",
              cursor: "pointer",

              flexShrink: 0,
            }}
          >
            + Add
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#516F90",
            lineHeight: 1.6,

            width: "100%",
            minWidth: 0,
            maxWidth: "100%",

            wordBreak: "break-word",
            overflowWrap: "anywhere",

            whiteSpace: "normal",
          }}
        >
          See the files attached to your activities or uploaded to this record.
        </Typography>
      </Box>
    </Box>
  );
}