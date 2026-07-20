import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalWrapper({
  open,
  onClose,
  title,
  children,
  maxWidth = "sm",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          p: 1,
          animation: "fadeIn 0.25s ease-in-out",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 1,
          pb: 0.5,
        }}
      >
        <DialogTitle
          sx={{
            p: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          {title}
        </DialogTitle>

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <DialogContent
        dividers
        sx={{
          px: 2,
          py: 2,
          backgroundColor: "#fafafa",
          borderRadius: 2,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
