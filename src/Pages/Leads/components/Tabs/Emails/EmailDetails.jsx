// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import EmailCard from "./EmailCard";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import NewEmailDialog from "./NewEmailDialog";

// export default function EmailDetails({tabs, companyId,}) {
//   const [activeTab, setActiveTab] = useState("Emails");
//   const [openCreateEmail, setOpenCreateEmail] = useState(false);

//   return (
//     <Box
//       sx={{
//         p: 3,
//         fontFamily: "Roboto, sans-serif",
//         mx:-2
//       }}
//     >
//       {/* Activity Tabs */}
//       <Box >
//         <CommonActivityTabs
//            tabs={tabs}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           title="Leads"
//         />
//       </Box>

//       {/* Header */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 3,
//           mb: 1,
//         }}
//       >
//         <Typography variant="h6">Emails</Typography>

//         <CommonButton
//           variant="contained"
//           onClick={() => setOpenCreateEmail(true)}
//         >
//           Create Email
//         </CommonButton>
//       </Box>

//       {/* Create Email Modal */}

//       {/* <NewEmailDialog
//         open={openCreateEmail}
//         onClose={() => setOpenCreateEmail(false)}
//       /> */}

//       <NewEmailDialog
//   open={openCreateEmail}
//   onClose={() => setOpenCreateEmail(false)}
//   companyId={companyId}
// />

//       <Typography variant="h6">June 2025</Typography>

//       <EmailCard />
  
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import EmailCard from "./EmailCard";

import {
  Box,
  Typography,
} from "@mui/material";

import CommonButton from "../../../../../Components/common/CommonButton";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";

import NewEmailDialog from "./NewEmailDialog";

import api from "../../../../../services/api";


export default function EmailDetails({
  tabs,
  companyId,
}) {

  const [activeTab, setActiveTab] = useState("Emails");

  const [openCreateEmail, setOpenCreateEmail] =
    useState(false);

  const [emails, setEmails] = useState([]);

  const [loading, setLoading] =
    useState(false);


  // ----------------------------------
  // Get company emails
  // ----------------------------------

  const fetchEmails = async () => {

    if (!companyId) {
      return;
    }

    try {

      setLoading(true);

      const response = await api.get(
        `/activities/email/?module=company&recipient_id=${companyId}`
      );

      console.log(
        "Company emails:",
        response.data
      );

      setEmails(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to fetch company emails:",
        error
      );

      setEmails([]);

    } finally {

      setLoading(false);

    }
  };


  // ----------------------------------
  // Fetch when company changes
  // ----------------------------------

  useEffect(() => {

    fetchEmails();

  }, [companyId]);


  // ----------------------------------
  // After email created
  // ----------------------------------

  const handleEmailCreated = () => {

    setOpenCreateEmail(false);

    fetchEmails();

  };


  return (

    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >

      {/* Activity Tabs */}

      <Box>

        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Companies"
        />

      </Box>


      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          mb: 2,
        }}
      >

        <Typography variant="h6">
          Emails
        </Typography>


        <CommonButton
          variant="contained"
          onClick={() =>
            setOpenCreateEmail(true)
          }
        >
          Create Email
        </CommonButton>

      </Box>


      {/* New Email */}

      <NewEmailDialog
        open={openCreateEmail}
        onClose={() =>
          setOpenCreateEmail(false)
        }
        companyId={companyId}
        onEmailCreated={handleEmailCreated}
      />


      {/* Email List */}

      {loading ? (

        <Typography>
          Loading emails...
        </Typography>

      ) : emails.length === 0 ? (

        <Typography
          sx={{
            color: "text.secondary",
            mt: 2,
          }}
        >
          No emails found.
        </Typography>

      ) : (

        emails.map((email) => (

          <EmailCard
            key={email.id}
            email={email}
          />

        ))

      )}

    </Box>

  );
}