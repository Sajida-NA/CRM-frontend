import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonEditor from "../../../../../Components/common/CommonEditor";

export default function Createnote({ open, onClose }) {
  const [formData, setFormData] = useState({
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API call goes here

    onClose(); // Close drawer after saving (optional)
  };

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 500,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff",
          }}
        >
          {/* Header */}
          <DrawerHeader title="Create Note" onClose={onClose} />

          {/* Form Body */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              overflowY: "auto",
            }}
          >
            {/* Note */}
            <CommonEditor
              label="Note"
              required
              value={formData.note}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  note: value,
                }))
              }
            />
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 3,
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <CommonButton variant="outlined" fullWidth onClick={onClose}>
              Cancel
            </CommonButton>

            <CommonButton type="submit" fullWidth>
              Save
            </CommonButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
