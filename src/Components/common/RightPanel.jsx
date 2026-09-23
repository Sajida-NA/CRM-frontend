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

//   // =========================================================
//   // GENERATE AI SUMMARY
//   // =========================================================

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

//   // =========================================================
//   // RESET WHEN RECORD CHANGES
//   // =========================================================

//   useEffect(() => {
//     setAiSummary("");
//     setError("");
//     setLoading(false);
//   }, [module, objectId]);

//   const displaySummary =
//     aiSummary || summaryText;

//   // =========================================================
//   // RETURN
//   // =========================================================

//   return (
//     <Box
//       sx={{
//         width: 300,
//         minWidth: 300,
//         maxWidth: 300,

//         flex: "0 0 300px",
//         flexShrink: 0,

//         minHeight: 0,

//         backgroundColor: "#fff",

//         borderTopRightRadius: "12px",

//         p: 2,

//         boxSizing: "border-box",

//         /*
//          * Important:
//          * Prevent content inside this panel from
//          * increasing the width of the page.
//          */
//         overflow: "hidden",
//       }}
//     >
//       {/* =====================================================
//           AI SUMMARY
//           ===================================================== */}

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

//           overflow: "hidden",
//         }}
//       >
//         {/* ===================================================
//             TITLE
//             =================================================== */}

//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#5948DB",

//             mb: 1,

//             display: "flex",
//             alignItems: "flex-start",

//             width: "100%",
//             minWidth: 0,
//             maxWidth: "100%",

//             overflow: "hidden",
//           }}
//         >
//           <AutoAwesomeOutlinedIcon
//             color="primary"
//             sx={{
//               mr: 1,
//               flexShrink: 0,
//               mt: "2px",
//             }}
//           />

//           <Box
//             component="span"
//             sx={{
//               display: "block",

//               minWidth: 0,
//               maxWidth: "100%",

//               overflowWrap: "anywhere",
//               wordBreak: "break-word",

//               whiteSpace: "normal",
//             }}
//           >
//             {summaryTitle}
//           </Box>
//         </Typography>

//         {/* ===================================================
//             LOADING
//             =================================================== */}

//         {loading && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",

//               gap: 1,

//               py: 1,

//               width: "100%",
//               minWidth: 0,
//               maxWidth: "100%",

//               boxSizing: "border-box",

//               overflow: "hidden",
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

//                 whiteSpace: "normal",
//               }}
//             >
//               Generating summary...
//             </Typography>
//           </Box>
//         )}

//         {/* ===================================================
//             ERROR
//             =================================================== */}

//         {!loading && error && (
//           <Box
//             sx={{
//               width: "100%",
//               minWidth: 0,
//               maxWidth: "100%",

//               overflow: "hidden",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "error.main",
//                 lineHeight: 1.5,

//                 width: "100%",
//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 whiteSpace: "normal",

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

//                 wordBreak: "break-word",
//               }}
//             >
//               Try Again
//             </Button>
//           </Box>
//         )}

//         {/* ===================================================
//             DEFAULT STATE
//             =================================================== */}

//         {!loading && !error && !aiSummary && (
//           <Box
//             sx={{
//               width: "100%",
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

//                 width: "100%",
//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 whiteSpace: "normal",

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

//                 wordBreak: "break-word",

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
//             =================================================== */}

//         {!loading && !error && aiSummary && (
//           <Box
//             sx={{
//               width: "100%",
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

//                 display: "block",

//                 width: "100%",
//                 minWidth: 0,
//                 maxWidth: "100%",

//                 wordBreak: "break-word",
//                 overflowWrap: "anywhere",

//                 whiteSpace: "normal",
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

//                 wordBreak: "break-word",
//               }}
//             >
//               Regenerate
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* =====================================================
//           ATTACHMENTS
//           ===================================================== */}

//       <Box
//         sx={{
//           width: "100%",
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

//             width: "100%",
//             minWidth: 0,
//             maxWidth: "100%",

//             overflow: "hidden",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 700,

//               minWidth: 0,
//               maxWidth: "100%",

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

//             width: "100%",
//             minWidth: 0,
//             maxWidth: "100%",

//             wordBreak: "break-word",
//             overflowWrap: "anywhere",

//             whiteSpace: "normal",
//           }}
//         >
//           See the files attached to your activities or uploaded to this record.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }




import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

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
  crmData = null,

  summaryTitle = "AI Lead Summary",

  summaryText =
    "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
}) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // GENERATE AI SUMMARY
  // Works for:
  // lead
  // company
  // deal
  // ticket
  // =========================================================

  const generateAISummary = useCallback(async () => {
    // ---------------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------------

    if (!module) {
      setError("CRM module is missing.");
      return;
    }

    if (!objectId) {
      setError("CRM record ID is missing.");
      return;
    }

    if (!crmData) {
      setError(
        "CRM data is not available yet. Please try again."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(
        "========================================"
      );

      console.log(
        "AI SUMMARY REQUEST"
      );

      console.log(
        "MODULE:",
        module
      );

      console.log(
        "OBJECT ID:",
        objectId
      );

      console.log(
        "CRM DATA:",
        crmData
      );

      // -------------------------------------------------------
      // REQUEST PAYLOAD
      // -------------------------------------------------------

      const requestPayload = {
        data: {
          module: module,

          object_id: Number(objectId),

          // IMPORTANT:
          // Complete CRM record is passed here.
          crm_data: crmData,
        },
      };

      console.log(
        "REQUEST PAYLOAD:",
        requestPayload
      );

      console.log(
        "========================================"
      );

      // -------------------------------------------------------
      // API REQUEST
      // -------------------------------------------------------

      const response = await api.post(
        "/ai/summary/",
        requestPayload
      );

      console.log(
        "AI SUMMARY RESPONSE:",
        response.data
      );

      // -------------------------------------------------------
      // GET SUMMARY
      // -------------------------------------------------------

      const summary =
        response.data?.summary || "";

      if (!summary) {
        throw new Error(
          "AI returned an empty summary."
        );
      }

      setAiSummary(summary);

    } catch (error) {
      console.error(
        "ERROR GENERATING AI SUMMARY:",
        error.response?.data ||
          error.message
      );

      setAiSummary("");

      setError(
        error.response?.data?.details ||
          error.response?.data?.error ||
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to generate AI summary."
      );

    } finally {
      setLoading(false);
    }
  }, [
    crmData,
    module,
    objectId,
  ]);

  // =========================================================
  // RESET WHEN RECORD CHANGES
  // =========================================================

  useEffect(() => {
    setAiSummary("");
    setError("");
    setLoading(false);
  }, [
    module,
    objectId,
  ]);

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

        {!loading &&
          !error &&
          !aiSummary && (
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
                disabled={!crmData || loading}
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

        {!loading &&
          !error &&
          aiSummary && (
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

