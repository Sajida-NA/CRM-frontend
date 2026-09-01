
import React, { useEffect, useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";

import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
import FormDatePicker from "../../../../../Components/common/FormDatePicker";

import api from "../../../../../services/api";

export default function CreateTaskDrawer({
  open,
  onClose,
  module,
  moduleId,
  onTaskCreated,
}) {
  // ========================================
  // FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    task_name: "",
    due_date: null,
    time: null,
    task_type: "",
    priority: "",
    assigned_to: "",
    note: "",
  });

  // ========================================
  // OPTIONS
  // ========================================

  const [taskTypes, setTaskTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [users, setUsers] = useState([]);

  // ========================================
  // LOADING
  // ========================================

  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  // ========================================
  // ERROR
  // ========================================

  const [errorMessage, setErrorMessage] = useState("");

  // ========================================
  // GET TASK OPTIONS
  // ========================================

  const fetchTaskOptions = async () => {
    try {
      setLoadingOptions(true);
      setErrorMessage("");

      const response = await api.get(
        "/activities/task/options/"
      );

      console.log(
        "TASK OPTIONS RESPONSE:",
        response.data
      );

      setTaskTypes(
        response.data?.task_types || []
      );

      setPriorities(
        response.data?.priorities || []
      );

      setUsers(
        response.data?.assigned_users || []
      );

    } catch (error) {
      console.error(
        "TASK OPTIONS ERROR:",
        error.response?.data || error
      );

      setTaskTypes([]);
      setPriorities([]);
      setUsers([]);

      setErrorMessage(
        "Unable to load task options."
      );

    } finally {
      setLoadingOptions(false);
    }
  };

  // ========================================
  // LOAD OPTIONS WHEN DRAWER OPENS
  // ========================================

  useEffect(() => {
    if (open) {
      fetchTaskOptions();
    }
  }, [open]);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "========== CREATE TASK =========="
    );

    console.log(
      "MODULE:",
      module
    );

    console.log(
      "MODULE ID:",
      moduleId
    );

    console.log(
      "FORM DATA:",
      formData
    );

    // ========================================
    // MODULE VALIDATION
    // ========================================

    if (!module || !moduleId) {
      const message =
        "Deal information is missing.";

      console.error(message);

      setErrorMessage(message);

      return;
    }

    // ========================================
    // REQUIRED FIELD VALIDATION
    // ========================================

    if (!formData.task_name?.trim()) {
      setErrorMessage(
        "Please enter Task Name."
      );
      return;
    }

    if (!formData.due_date) {
      setErrorMessage(
        "Please select Due Date."
      );
      return;
    }

    if (!formData.time) {
      setErrorMessage(
        "Please select Time."
      );
      return;
    }

    if (!formData.task_type) {
      setErrorMessage(
        "Please select Task Type."
      );
      return;
    }

    if (!formData.priority) {
      setErrorMessage(
        "Please select Priority."
      );
      return;
    }

    if (!formData.assigned_to) {
      setErrorMessage(
        "Please select Assigned To."
      );
      return;
    }

    if (!formData.note?.trim()) {
      setErrorMessage(
        "Please enter Note."
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // ========================================
      // FORMAT DATE
      // ========================================

      const formattedDate =
        typeof formData.due_date?.format ===
        "function"
          ? formData.due_date.format(
              "YYYY-MM-DD"
            )
          : formData.due_date;

      // ========================================
      // FORMAT TIME
      // ========================================

      const formattedTime =
        typeof formData.time?.format ===
        "function"
          ? formData.time.format(
              "HH:mm:ss"
            )
          : formData.time;

      // ========================================
      // PAYLOAD
      // ========================================

      const payload = {
        module: String(module).toLowerCase(),

        module_id: Number(moduleId),

        task_name:
          formData.task_name.trim(),

        due_date: formattedDate,

        time: formattedTime,

        task_type:
          formData.task_type,

        priority:
          formData.priority,

        assigned_to:
          Number(formData.assigned_to),

        note:
          formData.note,
      };

      // ========================================
      // DEBUG PAYLOAD
      // ========================================

      console.log(
        "CREATE TASK PAYLOAD:",
        payload
      );

      // ========================================
      // POST TASK
      // ========================================

      const response = await api.post(
        "/activities/task/",
        payload
      );

      console.log(
        "TASK CREATED SUCCESSFULLY:",
        response.data
      );

      // ========================================
      // RESET FORM
      // ========================================

      setFormData({
        task_name: "",
        due_date: null,
        time: null,
        task_type: "",
        priority: "",
        assigned_to: "",
        note: "",
      });

      // ========================================
      // REFRESH TASK LIST
      // ========================================

      if (onTaskCreated) {
        onTaskCreated(
          response.data
        );
      }

      // ========================================
      // CLOSE DRAWER
      // ========================================

      onClose();

    } catch (error) {
      console.error(
        "========== CREATE TASK ERROR =========="
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "DATA:",
        error.response?.data
      );

      console.error(
        "MESSAGE:",
        error.message
      );

      // ========================================
      // BACKEND ERROR
      // ========================================

      const backendError =
        error.response?.data;

      if (
        backendError &&
        typeof backendError === "object"
      ) {
        const messages = Object.entries(
          backendError
        )
          .map(
            ([field, value]) =>
              `${field}: ${
                Array.isArray(value)
                  ? value.join(", ")
                  : value
              }`
          )
          .join("\n");

        setErrorMessage(messages);

      } else {
        setErrorMessage(
          "Failed to create task."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    setErrorMessage("");

    onClose();
  };

  // ========================================
  // UI
  // ========================================

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

        {/* ====================================
            HEADER
        ==================================== */}

        <DrawerHeader
          title="Create Task"
          onClose={handleClose}
        />

        {/* ====================================
            FORM
        ==================================== */}

        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >

          {/* ==================================
              ERROR MESSAGE
          ================================== */}

          {errorMessage && (
            <Box
              sx={{
                whiteSpace: "pre-line",
                color: "#d32f2f",
                backgroundColor: "#fdecea",
                border: "1px solid #f5c2c0",
                borderRadius: 1,
                p: 1.5,
                fontSize: 13,
              }}
            >
              {errorMessage}
            </Box>
          )}

          {/* ==================================
              TASK NAME
          ================================== */}

          <CommonInput
            label="Task Name"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          {/* ==================================
              DATE + TIME
          ================================== */}

          <Grid
            container
            spacing={2}
          >

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <FormDatePicker
                label="Due Date"
                required
                value={
                  formData.due_date
                }
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    due_date:
                      newValue,
                  }))
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CommonTimePicker
                label="Time"
                required
                value={
                  formData.time
                }
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    time:
                      newValue,
                  }))
                }
              />
            </Grid>

          </Grid>

          {/* ==================================
              TASK TYPE + PRIORITY
          ================================== */}

          <Grid
            container
            spacing={2}
          >

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CommonSelect
                label="Task Type"
                required
                placeholder={
                  loadingOptions
                    ? "Loading..."
                    : "Choose"
                }
                options={taskTypes}
                name="task_type"
                value={
                  formData.task_type
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CommonSelect
                label="Priority"
                required
                placeholder={
                  loadingOptions
                    ? "Loading..."
                    : "Choose"
                }
                options={priorities}
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

          </Grid>

          {/* ==================================
              ASSIGNED TO
          ================================== */}

          <CommonSelect
            label="Assigned to"
            required
            placeholder={
              loadingOptions
                ? "Loading..."
                : "Choose"
            }
            options={users.map(
              (user) => ({
                label:
                  user.name,
                value:
                  String(user.id),
              })
            )}
            name="assigned_to"
            value={
              formData.assigned_to
            }
            onChange={
              handleChange
            }
          />

          {/* ==================================
              NOTE
          ================================== */}

          <CommonEditor
            label="Note"
            required
            value={
              formData.note
            }
            onChange={(value) =>
              setFormData(
                (prev) => ({
                  ...prev,
                  note: value,
                })
              )
            }
          />

        </Box>

        {/* ====================================
            FOOTER
        ==================================== */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop:
              "1px solid #E5E7EB",
          }}
        >

          {/* CANCEL */}

          <CommonButton
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </CommonButton>

          {/* SAVE */}

          <CommonButton
            type="submit"
            fullWidth
            disabled={
              loading ||
              loadingOptions
            }
          >
            {loading
              ? "Saving..."
              : "Save"}
          </CommonButton>

        </Box>

      </Box>
    </Drawer>
  );
}