import { Box } from "@mui/material";
import ProfileDetailsPanel from "./ProfileDetailPanel";
import ProfileActivityTabs from "./ProfileActivityTab";
import ProfileAISidebar from "./ProfileAISidebar";

const ProfileLayout = ({ details, activities, aiSummary, attachments }) => {
  return (
   
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        backgroundColor: "#F9FAFB",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* LEFT PANEL — DETAILS */}
      <Box sx={{ width: "22%" }}>
        <ProfileDetailsPanel details={details} />
      </Box>

      {/* CENTER PANEL — ACTIVITY TABS */}
      <Box sx={{ width: "55%" }}>
        <ProfileActivityTabs activities={activities} />
      </Box>

      {/* RIGHT PANEL — AI SUMMARY + ATTACHMENTS */}
      <Box sx={{ width: "23%" }}>
        <ProfileAISidebar summary={aiSummary} attachments={attachments} />
      </Box>
    </Box>
  
  );
};
export default ProfileLayout;


