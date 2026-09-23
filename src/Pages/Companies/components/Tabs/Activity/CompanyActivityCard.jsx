

// import React from "react";
// import { Box, Typography } from "@mui/material";

// export default function CompanyActivityCard({
//   title,
//   date,
//   children,
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         p: 2,
//         mb: 2,
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 1,
//         bgcolor: "background.paper",
//       }}
//     >
//       {/* LEFT */}
//       <Box flex={1}>
//         {title && (
//           <Typography
//             sx={{
//               fontSize: 16,
//               fontWeight: 600,
//               color: "text.primary",
//               mb: 1,
//             }}
//           >
//             {title}
//           </Typography>
//         )}

//         {/* Dynamic activity content */}
//         {children}
//       </Box>

//       {/* RIGHT - DATE */}
//       {date && (
//         <Typography
//           sx={{
//             fontSize: 14,
//             color: "text.secondary",
//             whiteSpace: "nowrap",
//             ml: 2,
//           }}
//         >
//           {date}
//         </Typography>
//       )}
//     </Box>
//   );
// }


import React from "react";
import { Box, Typography } from "@mui/material";

export default function CompanyActivityCard({
  title,
  date,
  children,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        p: 2,
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {title && (
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "text.primary",
              mb: 1,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {title}
          </Typography>
        )}

        {/* Dynamic activity content */}
        <Box
          sx={{
            minWidth: 0,
            maxWidth: "100%",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* RIGHT - DATE */}
      {date && (
        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
            whiteSpace: "nowrap",
            ml: 2,
            flexShrink: 0,
          }}
        >
          {date}
        </Typography>
      )}
    </Box>
  );
}