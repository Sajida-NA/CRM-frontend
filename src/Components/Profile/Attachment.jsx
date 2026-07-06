// import { Box, Typography, Button } from "@mui/material";

// const Attachments = ({ files }) => {
//   return (
//     <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//         Attachments
//       </Typography>

//       {files?.length === 0 && (
//         <Typography sx={{ fontSize: 14, color: "gray" }}>
//           No attachments available.
//         </Typography>
//       )}

//       {files?.map((file, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             p: 1.5,
//             borderRadius: 2,
//             border: "1px solid #eee",
//             mb: 1,
//             bgcolor: "#fafafa",
//           }}
//         >
//           <Typography sx={{ fontWeight: 600 }}>{file.name}</Typography>
//           <Typography sx={{ fontSize: 13, color: "gray" }}>
//             {file.date}
//           </Typography>
//         </Box>
//       ))}

//       <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
//         Add Attachment
//       </Button>
//     </Box>
//   );
// };

// export default Attachments;


import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Attachments = ({ files = [] }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        p: 3,
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Attachments
      </Typography>

      {/* No Files */}
      {files.length === 0 && (
        <Typography color="text.secondary" variant="body2">
          No attachments available.
        </Typography>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <List disablePadding>
          {files.map((file, index) => (
            <ListItem
              key={index}
              divider
              secondaryAction={
                <IconButton edge="end">
                  <DeleteOutlinedIcon color="error" />
                </IconButton>
              }
            >
              <AttachFileIcon
                sx={{
                  mr: 2,
                  color: "primary.main",
                }}
              />

              <ListItemText
                primary={file.name}
                secondary={file.date}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Attachments;

