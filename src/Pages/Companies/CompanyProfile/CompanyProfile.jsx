import activitydata from "./data/activityData";
import companydata from "./data/companyData";
import { Box } from "@mui/material";
import MainLayout from "../../../layout/MainLayout";
import CompanyInfo from "../components/CompanyInfo";
import ActivityPanel from "../components/ActivityPanel";
import AISummary from "../components/AISummary";

function CompanyProfile() {
  return (
    <MainLayout>
    <Box sx={{ p: 3, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "280px 1fr 280px",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <CompanyInfo company={companydata} />
        <ActivityPanel activities={activitydata} />
        <AISummary />
      </Box>
    </Box>
    </MainLayout>
  );
}

export default CompanyProfile;