import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";

import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonEditor from "../../../../../Components/common/CommonEditor";

import { createNote } from "../../../../../services/activityApi";

export default function Createnote({
  open,
  onClose,
  module,
  moduleId,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =================================================
  // HANDLE SUBMIT
  // =================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validate note
    if (!formData.note.trim()) {
      setError("Note is required.");
      return;
    }

    // Validate module and module ID
    if (!module || !moduleId) {
      setError("Related record information is missing.");
      return;
    }

    // =================================================
    // GET LOGGED-IN USER
    // =================================================

    const storedUser = localStorage.getItem("user");

    let user = null;

    try {
      user = storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error("Invalid user data:", error);
    }

    const senderId =
      user?.id ||
      user?.user_id;

    if (!senderId) {
      setError("Logged-in user information is missing.");
      return;
    }

    // =================================================
    // CREATE NOTE
    // =================================================

    try {
      setLoading(true);

      const payload = {
        sender_id: senderId,
        module: String(module).toLowerCase().trim(),
        module_id: Number(moduleId),
        note: formData.note,
      };

      console.log("Creating note:", payload);

      const response = await createNote(payload);

      console.log(
        "Note created successfully:",
        response
      );

      // Reset form
      setFormData({
        note: "",
      });

      // Notify parent
      if (onSuccess) {
        onSuccess(response);
      }

      // Close drawer
      onClose();
    } catch (error) {
      console.error(
        "Failed to create note:",
        error
      );

      const responseData =
        error?.response?.data;

      if (
        responseData &&
        typeof responseData === "object"
      ) {
        const firstError = Object.values(
          responseData
        )
          .flat()
          .find(Boolean);

        setError(
          firstError ||
          "Failed to create note."
        );
      } else {
        setError(
          "Failed to create note. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  // CLOSE
  // =================================================

  const handleClose = () => {
    if (loading) return;

    setFormData({
      note: "",
    });

    setError("");

    onClose();
  };

  // =================================================
  // UI
  // =================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
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
        {/* Header */}

        <DrawerHeader
          title="Create Note"
          onClose={handleClose}
        />

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

          {error && (
            <Box
              sx={{
                color: "#d32f2f",
                fontSize: "14px",
              }}
            >
              {error}
            </Box>
          )}
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
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}