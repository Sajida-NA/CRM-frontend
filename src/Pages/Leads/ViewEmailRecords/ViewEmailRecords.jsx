import { Box } from "@mui/material";

import emails from "../data/emailData";

import LeadsLeftPanel from "../components/LeadsLeftPanel";
import EmailPanel from "../components/Tabs/Email/EmailPanel";

function ViewEmailRecords() {
  return (
    <div>
      <LeadsLeftPanel />

      <Box
        sx={{
          p: 3,
          position: "absolute",
          top: 80,
          left: 430,
          width: "calc(100% - 680px)",
        }}
      >
        <EmailPanel emails={emails} />
      </Box>
    </div>
  );
}

export default ViewEmailRecords;
