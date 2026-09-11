import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import TaskCard from "./TaskCard";
import CreateTaskDrawer from "./CreateTaskDrawer";

import api from "../../../../../services/api";

export default function TaskDetails({
  tabs,
  module,
  moduleId,
}) {
  const [activeTab, setActiveTab] = useState("Tasks");

  const [openCreateTask, setOpenCreateTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  // ========================================
  // GET TASKS
  // ========================================

  const fetchTasks = async () => {
    if (!module || !moduleId) {
      console.log("Missing module or moduleId:", {
        module,
        moduleId,
      });

      setTasks([]);
      return;
    }

    try {
      setLoading(true);

      console.log("Fetching tasks for:", {
        module,
        moduleId,
      });

      const response = await api.get("/activities/task/");

      console.log("ALL TASKS RESPONSE:", response.data);

      // Support both:
      // [...]
      // OR
      // { results: [...] }

      const allTasks = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      console.log("ALL TASKS:", allTasks);

      // ========================================
      // FILTER CURRENT LEAD
      // ========================================

      const filteredTasks = allTasks.filter(
        (task) =>
          String(task.module).toLowerCase() ===
            String(module).toLowerCase() &&
          Number(task.module_id) === Number(moduleId)
      );

      console.log("CURRENT MODULE:", module);
      console.log("CURRENT MODULE ID:", moduleId);
      console.log("FILTERED TASKS:", filteredTasks);

      setTasks(filteredTasks);
    } catch (error) {
      console.error(
        "FETCH TASKS ERROR:",
        error.response?.data || error.message
      );

      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FETCH WHEN MODULE / ID CHANGES
  // ========================================

  useEffect(() => {
    fetchTasks();
  }, [module, moduleId]);

  // ========================================
  // TASK CREATED
  // ========================================

  const handleTaskCreated = async (createdTask) => {
    console.log("TASK CREATED:", createdTask);

    // Close drawer
    setOpenCreateTask(false);

    // Refresh task list
    await fetchTasks();
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div>
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ========================================
            ACTIVITY TABS
        ======================================== */}

        <Box>
          <CommonActivityTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>

        {/* ========================================
            HEADER
        ======================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            marginTop: "35px",
            marginLeft: "1px",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={100}
          >
            Tasks
          </Typography>

          <CommonButton
            variant="contained"
            onClick={() => setOpenCreateTask(true)}
          >
            Create Task
          </CommonButton>
        </Box>

        {/* ========================================
            CREATE TASK DRAWER
        ======================================== */}

        <CreateTaskDrawer
          open={openCreateTask}
          onClose={() => setOpenCreateTask(false)}
          module={module}
          moduleId={moduleId}
          onTaskCreated={handleTaskCreated}
        />

        {/* ========================================
            TASK LIST
        ======================================== */}

        {loading ? (
          <Typography>
            Loading tasks...
          </Typography>
        ) : tasks.length === 0 ? (
          <Typography>
            No tasks found.
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        )}
      </Box>
    </div>
  );
}