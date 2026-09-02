// import { Box, Drawer } from "@mui/material";
// import React, { useState } from "react";
// import DrawerHeader from "../../../../../Components/common/DrawerHeader";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import CommonEditor from "../../../../../Components/common/CommonEditor";

// export default function Createnote({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     note: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(formData);

//     // API call goes here

//     onClose(); // Close drawer after saving (optional)
//   };

//   return (
//     <div>
//       <Drawer anchor="right" open={open} onClose={onClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             width: 500,
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             bgcolor: "#fff",
//           }}
//         >
//           {/* Header */}
//           <DrawerHeader title="Create Note" onClose={onClose} />

//           {/* Form Body */}
//           <Box
//             sx={{
//               flex: 1,
//               p: 3,
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//               overflowY: "auto",
//             }}
//           >
//             {/* Note */}
//             <CommonEditor
//               label="Note"
//               required
//               value={formData.note}
//               onChange={(value) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   note: value,
//                 }))
//               }
//             />
//           </Box>

//           {/* Footer */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               p: 3,
//               borderTop: "1px solid #E5E7EB",
//             }}
//           >
//             <CommonButton variant="outlined" fullWidth onClick={onClose}>
//               Cancel
//             </CommonButton>

//             <CommonButton type="submit" fullWidth>
//               Save
//             </CommonButton>
//           </Box>
//         </Box>
//       </Drawer>
//     </div>
//   );
// }


import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import api from "../../../../../services/api";

export default function Createnote({
  open,
  onClose,
  module,
  moduleId,
  onCreated,
}) {
  const [formData, setFormData] = useState({
    note: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.note.trim()) {
      return;
    }

    try {
      setSaving(true);

      /*
       * Get logged-in user ID
       *
       * Change this if your localStorage
       * uses a different key.
       */
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const senderId = user?.id;

      if (!senderId) {
        console.error("Logged-in user ID not found");
        return;
      }

      const payload = {
        sender_id: senderId,
        module: module,
        module_id: Number(moduleId),
        note: formData.note,
      };

      console.log("Creating note:", payload);

      await api.post(
        "/activities/note/",
        payload
      );

      // Clear editor
      setFormData({
        note: "",
      });

      // Close drawer
      onClose();

      // Refresh notes
      if (onCreated) {
        onCreated();
      }

    } catch (error) {
      console.error(
        "Failed to create note:",
        error.response?.data || error
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
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
        <DrawerHeader
          title="Create Note"
          onClose={onClose}
        />

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

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}