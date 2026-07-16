// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
// } from "@mui/material";

// import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

// function AISummary() {
//   return (
//     <Box
//       sx={{
//         p: 3,
//         height: "100%",
//       }}
//     >
//       {/* Header */}
//       <Box
//         display="flex"
//         alignItems="center"
//         gap={1}
//         mb={2}
//       >
//         <AutoAwesomeOutlinedIcon
//           color="primary"
//           fontSize="small"
//         />

//         <Typography
//           variant="subtitle1"
//           fontWeight={700}
//         >
//           AI Company Summary
//         </Typography>
//       </Box>

//       {/* Summary */}
//       <Typography
//         variant="body2"
//         color="text.secondary"
//         sx={{
//           lineHeight: 1.7,
//           fontSize: 13,
//         }}
//       >
//         There are no activities associated with this
//         company yet. Additional information and
//         activities are required to generate a more
//         comprehensive AI summary.
//       </Typography>

//       {/* Attachments */}
//       <Box
//         sx={{
//           mt: 3,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           variant="body1"
//           fontWeight={700}
//         >
//           Attachments
//         </Typography>

//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//             textTransform: "none",
//             borderRadius: 2,
//             minWidth: 64,
//             height: 32,
//           }}
//         >
//           + Add
//         </Button>
//       </Box>

//       {/* Upload Box */}
//       <Paper
//         elevation={0}
//         sx={{
//           mt: 2,
//           p: 3,
//           border: "2px dashed #D1D5DB",
//           borderRadius: 2,
//           bgcolor: "#FAFAFA",
//           textAlign: "center",
//         }}
//       >
//         <CloudUploadOutlinedIcon
//           sx={{
//             fontSize: 36,
//             color: "#9CA3AF",
//             mb: 1.5,
//           }}
//         />

//         <Typography
//           variant="body2"
//           fontWeight={700}
//         >
//           No attachments yet
//         </Typography>

//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{
//             display: "block",
//             mt: 1,
//             lineHeight: 1.6,
//           }}
//         >
//           Upload documents, contracts,
//           invoices or company files here.
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }

// export default AISummary;