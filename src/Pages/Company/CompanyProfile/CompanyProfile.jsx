import company from "./data/companyData";
import activities from "./data/activityData";

import { Box, Paper } from "@mui/material";
import MainLayout from "../../../layout/MainLayout";

import CompanyInfo from "../../../Components/Company/CompanyInfo";
import ActivityPanel from "../../../Components/Company/ActivityPanel";
import AISummary from "../../Companies/components/AISummary";

function CompanyDetails() {
  return (
      <MainLayout>
   <Box
  sx={{
    p: 2,
    bgcolor: "#f5f7fb",
    minHeight: "100vh",
  }}
>
     <Paper
  elevation={0}
  sx={{
    borderRadius: 3,
    overflow: "hidden",
    height: "calc(100vh - 48px)",
    border: "1px solid #E5E7EB",
  }}
>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        lg: "260px 1fr 260px",
      },
      gap: 0,
      alignItems: "stretch",
    }}
  >
    <CompanyInfo company={company} />
    <ActivityPanel activities={activities} />
    <AISummary />
  </Box>
</Paper>
    </Box>
    </MainLayout>
  );
}

export default CompanyDetails;