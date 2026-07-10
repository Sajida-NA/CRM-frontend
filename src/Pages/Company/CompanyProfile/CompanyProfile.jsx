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
        p: 3,
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Paper
  elevation={2}
  sx={{
    borderRadius: 3,
    overflow: "hidden",
    height: "calc(100vh - 48px)",
  }}
>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "300px 1fr 320px",
            },
            minHeight: "calc(100vh - 48px)",
          }}
        >
         <Box sx={{ borderRight: "1px solid #E5E7EB" }}>
  <CompanyInfo company={company} />
</Box>

<Box sx={{ borderRight: "1px solid #E5E7EB" }}>
  <ActivityPanel activities={activities} />
</Box>

<Box>
  <AISummary />
</Box>
        </Box>
      </Paper>
    </Box>
    </MainLayout>
  );
}

export default CompanyDetails;