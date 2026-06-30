// import { Box, Typography, Button } from "@mui/material";

// export default function PageHeader({ title, onCreate }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: 3,
//       }}
//     >
//       <Typography variant="h5" sx={{ fontWeight: 600 }}>
//         {title}
//       </Typography>
//     </Box>
//   );
// }

import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, action }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>

      {action}
    </Box>
  );
}
