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
  tabs,
}) {
  return (
//     <MainLayout title={title}>
//       {/* Single White Profile Container */}
//       <Box
//         sx={{
//           width: "100%",
//           bgcolor: "#fff",
//           borderRadius: 2,
//           p: 2,
//           display: "flex",
//           gap: 2,
//           alignItems: "flex-start",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* Left Panel */}
//         <Box
//           sx={{
//             width: 300,
//             flexShrink: 0,
//           }}
//         >
//           <ProfileLeftPanel
//             profile={profileData.profile}
//             about={profileData.about}
//             quickActions={profileData.quickActions}
//             entityType={entityType}
//           />
//         </Box>

//         {/* Middle Panel */}
//         <Box
//           sx={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <ProfileMiddlePanel
//   activities={profileData.activities}
//   upcoming={profileData.upcoming || []}
//   entityType={entityType}
// />
//         </Box>

//         {/* Right Panel */}
//         <Box
//           sx={{
//             width: 300,
//             flexShrink: 0,
//           }}
//         >
//           <ProfileRightPanel
//             aiSummary={profileData.aiSummary}
//             attachments={profileData.attachments}
//             entityType={entityType}
//           />
//         </Box>
//       </Box>
//     </MainLayout>




<MainLayout title={title}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 2,
          p: 2,
          display: "flex",
          gap: 2,
        }}
      >
        <Box sx={{ width: 300 }}>
          <ProfileLeftPanel
            profile={profileData.profile}
            about={profileData.about}
            quickActions={profileData.quickActions}
            entityType={entityType}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <ProfileMiddlePanel
            activities={profileData.activities}
            upcoming={profileData.upcoming}
            entityType={entityType}
            tabs={tabs}
          />
        </Box>

        <Box sx={{ width: 300 }}>
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