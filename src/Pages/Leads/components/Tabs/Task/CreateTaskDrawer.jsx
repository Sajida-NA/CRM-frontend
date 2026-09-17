

import React, { useEffect, useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";

import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonMultiSelect from "../../../../../Components/common/CommonMultiSelect";
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

  const emptyForm = {
    task_name: "",
    due_date: null,
    time: null,
    task_type: "",
    priority: "",
    assigned_to: [],
    note: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  // ========================================
  // OPTIONS
  // ========================================

  const [taskTypes, setTaskTypes] =
    useState([]);

  const [priorities, setPriorities] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  // ========================================
  // LOADING
  // ========================================

  const [loadingOptions, setLoadingOptions] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // ERROR
  // ========================================

  const [errorMessage, setErrorMessage] =
    useState("");

  // ========================================
  // NORMALIZE MODULE
  // ========================================

  const normalizedModule =
    String(module || "")
      .trim()
      .toLowerCase();

  const normalizedModuleId =
    moduleId !== null &&
    moduleId !== undefined &&
    moduleId !== ""
      ? Number(moduleId)
      : null;

  // ========================================
  // GET TASK OPTIONS
  // ========================================

  const fetchTaskOptions = async () => {
    if (
      !normalizedModule ||
      !normalizedModuleId
    ) {
      console.log(
        "TASK OPTIONS - Missing module information:",
        {
          module,
          moduleId,
          normalizedModule,
          normalizedModuleId,
        }
      );

      setTaskTypes([]);
      setPriorities([]);
      setUsers([]);

      return;
    }

    try {
      setLoadingOptions(true);
      setErrorMessage("");

      const params =
        new URLSearchParams();

      params.append(
        "module",
        normalizedModule
      );

      params.append(
        "module_id",
        String(normalizedModuleId)
      );

      const optionsUrl =
        `/activities/task/options/?${params.toString()}`;

      console.log(
        "========================================"
      );

      console.log(
        "TASK OPTIONS REQUEST"
      );

      console.log(
        "MODULE:",
        normalizedModule
      );

      console.log(
        "MODULE ID:",
        normalizedModuleId
      );

      console.log(
        "URL:",
        optionsUrl
      );

      console.log(
        "========================================"
      );

      const response =
        await api.get(optionsUrl);

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

      const assignedUsers =
        response.data?.assigned_users || [];

      setUsers(
        assignedUsers
      );

      // ========================================
      // REMOVE INVALID CURRENT USERS
      // ========================================

      setFormData((prev) => {
        if (
          !Array.isArray(
            prev.assigned_to
          ) ||
          prev.assigned_to.length === 0
        ) {
          return prev;
        }

        const validUserIds =
          new Set(
            assignedUsers.map(
              (user) =>
                String(user.id)
            )
          );

        return {
          ...prev,

          assigned_to:
            prev.assigned_to.filter(
              (id) =>
                validUserIds.has(
                  String(id)
                )
            ),
        };
      });

    } catch (error) {
      console.error(
        "TASK OPTIONS ERROR:",
        error.response?.data ||
          error.message
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
  // LOAD OPTIONS
  // ========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    fetchTaskOptions();
  }, [
    open,
    normalizedModule,
    normalizedModuleId,
  ]);

  // ========================================
  // RESET WHEN DRAWER OPENS FOR
  // DIFFERENT CRM RECORD
  // ========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setErrorMessage("");

    setFormData(emptyForm);
  }, [
    open,
    normalizedModule,
    normalizedModuleId,
  ]);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (
      name === "assigned_to"
    ) {
      const selectedIds =
        Array.isArray(value)
          ? value
          : value
            ? [value]
            : [];

      setFormData((prev) => ({
        ...prev,

        assigned_to:
          selectedIds.map(
            (id) =>
              String(id)
          ),
      }));

      setErrorMessage("");

      return;
    }

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
      "========================================"
    );

    console.log(
      "CREATE TASK START"
    );

    console.log(
      "MODULE:",
      normalizedModule
    );

    console.log(
      "MODULE ID:",
      normalizedModuleId
    );

    console.log(
      "FORM DATA:",
      formData
    );

    console.log(
      "========================================"
    );

    // ========================================
    // MODULE VALIDATION
    // ========================================

    if (
      !normalizedModule ||
      !normalizedModuleId
    ) {
      setErrorMessage(
        "Module information is missing."
      );

      return;
    }

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (
      !formData.task_name?.trim()
    ) {
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

    // ========================================
    // ASSIGNED TO
    // ========================================

    if (
      !Array.isArray(
        formData.assigned_to
      ) ||
      formData.assigned_to.length === 0
    ) {
      setErrorMessage(
        "Please select at least one Assigned To user."
      );

      return;
    }

    // ========================================
    // NOTE
    // ========================================

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
      // DATE
      // ========================================

      const formattedDate =
        typeof formData.due_date?.format ===
        "function"
          ? formData.due_date.format(
              "YYYY-MM-DD"
            )
          : formData.due_date;

      // ========================================
      // TIME
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
        module:
          normalizedModule,

        module_id:
          normalizedModuleId,

        task_name:
          formData.task_name.trim(),

        due_date:
          formattedDate,

        time:
          formattedTime,

        task_type:
          formData.task_type,

        priority:
          formData.priority,

        assigned_to:
          formData.assigned_to.map(
            (id) =>
              Number(id)
          ),

        note:
          formData.note,
      };

      console.log(
        "========================================"
      );

      console.log(
        "CREATE TASK PAYLOAD:"
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "========================================"
      );

      // ========================================
      // CREATE TASK
      // ========================================

      const response =
        await api.post(
          "/activities/task/",
          payload
        );

      console.log(
        "========================================"
      );

      console.log(
        "TASK CREATED SUCCESSFULLY:"
      );

      console.log(
        response.data
      );

      console.log(
        "========================================"
      );

      // ========================================
      // RESET
      // ========================================

      setFormData({
        ...emptyForm,
      });

      // ========================================
      // REFRESH PARENT ACTIVITY
      // ========================================

      if (onTaskCreated) {
        await onTaskCreated(
          response.data
        );
      }

      // ========================================
      // CLOSE
      // ========================================

      onClose();

    } catch (error) {
      console.error(
        "========================================"
      );

      console.error(
        "CREATE TASK ERROR"
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

      console.error(
        "========================================"
      );

      const backendError =
        error.response?.data;

      if (
        backendError &&
        typeof backendError ===
          "object"
      ) {
        const messages =
          Object.entries(
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

        setErrorMessage(
          messages
        );

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

          {/* ERROR */}

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

          {/* TASK NAME */}

          <CommonInput
            label="Task Name"
            name="task_name"
            value={
              formData.task_name
            }
            onChange={
              handleChange
            }
            placeholder="Enter"
            fullWidth
            required
          />

          {/* DATE + TIME */}

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
                onChange={(
                  newValue
                ) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      due_date:
                        newValue,
                    })
                  )
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
                onChange={(
                  newValue
                ) =>
                  setFormData(
                    (prev) => ({
                      ...prev,
                      time:
                        newValue,
                    })
                  )
                }
              />
            </Grid>

          </Grid>

          {/* TASK TYPE + PRIORITY */}

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
                options={
                  taskTypes
                }
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
                options={
                  priorities
                }
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

          {/* ASSIGNED TO */}

          <CommonMultiSelect
            label="Assigned to"
            required
            placeholder={
              loadingOptions
                ? "Loading..."
                : users.length === 0
                  ? "No contact owners"
                  : formData
                      .assigned_to
                      .length === 0
                    ? "Choose"
                    : ""
            }
            options={
              users.map(
                (user) => ({
                  label:
                    user.name,
                  value:
                    String(
                      user.id
                    ),
                })
              )
            }
            name="assigned_to"
            value={
              formData.assigned_to
            }
            onChange={
              handleChange
            }
          />

          {/* NOTE */}

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

          <CommonButton
            variant="outlined"
            fullWidth
            onClick={
              handleClose
            }
            disabled={
              loading
            }
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={
              loading ||
              loadingOptions ||
              users.length === 0
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

