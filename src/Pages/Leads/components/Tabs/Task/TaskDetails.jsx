import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import TaskCard from "./TaskCard";
import tasks from "./TaskData";
import CreateTaskDrawer from './CreateTaskDrawer'

export default function TaskDetails({tabs}) {
  const [activeTab, setActiveTab] = useState("Tasks");
    const [openCreateTask, setOpenCreateTask] = useState(false);

  return (
    <div>
      <Box
        sx={{
          p: 3,
          mx:-2,
          // position: "absolute",
          // top: 80,
          // left: 430,
          // width: "calc(100% - 680px)",
          // border:'4px solid black'
        }}
      >
        {/* ACTIVITY TABS */}

        <Box
          // sx={{
          //   mt: 10,
          //   mx: -2,
          // }}
        >
          {/* <CommonActivityTabs
            activeTab={activeTab}
            // onTabChange={setActiveTab}
            onTabChange={() => {}}
          /> */}


           <CommonActivityTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            marginTop: "35px",
            marginLeft: "1px",
            // border:'1px solid black',
          }}
        >
          <Typography variant="h6" fontWeight={100}>
            Tasks
          </Typography>

          <CommonButton
            variant="contained"
            onClick={() => setOpenCreateTask(true)}
          >
            Create Task
          </CommonButton>
        </Box>

        {/* Drawer */}
        <CreateTaskDrawer
              open={openCreateTask}
              onClose={() => setOpenCreateTask(false)}
            />

        {/* Task detail */}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </div>
  );
}
