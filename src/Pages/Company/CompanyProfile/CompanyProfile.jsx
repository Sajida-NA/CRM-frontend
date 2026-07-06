import company from "./data/companyData";
import activities from "./data/activityData";
import { Box } from "@mui/material";

import CompanyInfo from "../../../Components/Company/CompanyInfo";
import ActivityPanel from "../../../Components/Company/ActivityPanel";
import AISummary from "../../../Components/Company/AISummary";

function CompanyDetails() {
  return (
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
        <CompanyInfo company={company} />
        <ActivityPanel activities={activities} />
        <AISummary />
      </Box>
    </Box>
  );
}

export default CompanyDetails;