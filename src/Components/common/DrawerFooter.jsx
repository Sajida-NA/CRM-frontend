import { Box } from "@mui/material";
import CommonButton from "./CommonButton";

function DrawerFooter({
  onCancel,
  onSave,
  loading
}) {
  return (
    <Box
      display="flex"
      gap={2}
      mt={3}
    >
      <CommonButton
        variant="outlined"
        fullWidth
        onClick={onCancel}
      >
        Cancel
      </CommonButton>

      <CommonButton
        fullWidth
        loading={loading}
        onClick={onSave}
        
      >
        Save
      </CommonButton>
    </Box>
  );
}

export default DrawerFooter;