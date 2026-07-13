import React from "react";
import { Box } from "@mui/material";
import MainLayout from "../../layout/MainLayout";

import ProfileLeftPanel from "./ProfileLeftPanel";
import ProfileMiddlePanel from "./ProfileMiddlePanel";
import ProfileRightPanel from "./ProfileRightPanel";

export default function ProfileLayout({
  title,
  profileData,
  entityType,
}) {
  return (
    <MainLayout title={title}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          p: 3,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: 320,
            flexShrink: 0,
          }}
        >
          <ProfileLeftPanel
            profile={profileData.profile}
            about={profileData.about}
            quickActions={profileData.quickActions}
            entityType={entityType}
          />
        </Box>

        {/* Middle Panel */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <ProfileMiddlePanel
            activities={profileData.activities}
            entityType={entityType}
          />
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            width: 320,
            flexShrink: 0,
          }}
        >
          <ProfileRightPanel
            aiSummary={profileData.aiSummary}
            attachments={profileData.attachments}
            entityType={entityType}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}