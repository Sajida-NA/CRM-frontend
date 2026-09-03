

 
// import React, { useEffect, useState } from "react"; 
// import { Box, Typography } from "@mui/material"; 
// import { useParams } from "react-router-dom"; 
 
// import EmailCard from "./EmailCard"; 
// import CommonButton from "../../../../../Components/common/CommonButton"; 
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab"; 
// import NewEmailDialog from "./NewEmailDialog"; 
 
// import api from "../../../../../services/api"; 
 
// export default function EmailDetails({ 
//   tabs, 
//   relatedModule = "deal", 
//   objectId, 
// }) { 
//   const { dealId } = useParams(); 
 
//   const [activeTab, setActiveTab] = 
//     useState("Emails"); 
 
//   const [openCreateEmail, setOpenCreateEmail] = 
//     useState(false); 
 
//   const [emails, setEmails] = useState([]); 
 
//   const [loading, setLoading] = 
//     useState(false); 
 
//   // ========================================== 
//   // GET OBJECT ID 
//   // ========================================== 
 
//   const finalObjectId = 
//     objectId || dealId; 
 
//   console.log( 
//     "RELATED MODULE:", 
//     relatedModule 
//   ); 
 
//   console.log( 
//     "OBJECT ID:", 
//     finalObjectId 
//   ); 
 
//   // ========================================== 
//   // GET EMAILS 
//   // ========================================== 
 
//   const fetchEmails = async () => { 
//     try { 
//       setLoading(true); 
 
//       const response = await api.get( 
//         "/activities/email/" 
//       ); 
 
//       setEmails( 
//         response.data || [] 
//       ); 
//     } catch (error) { 
//       console.error( 
//         "Get Emails Error:", 
//         error 
//       ); 
//     } finally { 
//       setLoading(false); 
//     } 
//   }; 
 
//   // ========================================== 
//   // LOAD EMAILS 
//   // ========================================== 
 
//   useEffect(() => { 
//     fetchEmails(); 
//   }, []); 
 
//   // ========================================== 
//   // EMAIL CREATED 
//   // ========================================== 
 
//   const handleEmailCreated = () => { 
//     fetchEmails(); 
//   }; 
 
//   return ( 
//     <Box 
//       sx={{ 
//         p: 3, 
//         fontFamily: 
//           "Roboto, sans-serif", 
//         mx: -2, 
//       }} 
//     > 
//       {/* ================================= */} 
//       {/* ACTIVITY TABS */} 
//       {/* ================================= */} 
 
//       <Box> 
//         <CommonActivityTabs 
//           tabs={tabs} 
//           activeTab={activeTab} 
//           onTabChange={setActiveTab} 
//           title="Deals" 
//         /> 
//       </Box> 
 
//       {/* ================================= */} 
//       {/* HEADER */} 
//       {/* ================================= */} 
 
//       <Box 
//         sx={{ 
//           display: "flex", 
//           justifyContent: 
//             "space-between", 
//           alignItems: "center", 
//           mt: 3, 
//           mb: 1, 
//         }} 
//       > 
//         <Typography variant="h6"> 
//           Emails 
//         </Typography> 
 
//         <CommonButton 
//           variant="contained" 
//           onClick={() => 
//             setOpenCreateEmail(true) 
//           } 
//         > 
//           Create Email 
//         </CommonButton> 
//       </Box> 
 
//       {/* ================================= */} 
//       {/* NEW EMAIL */} 
//       {/* ================================= */} 
 
//       <NewEmailDialog 
//         open={openCreateEmail} 
//         onClose={() => 
//           setOpenCreateEmail(false) 
//         } 
//         relatedModule={relatedModule} 
//         objectId={finalObjectId} 
//         onEmailCreated={ 
//           handleEmailCreated 
//         } 
//       /> 
 
//       {/* ================================= */} 
//       {/* EMAIL LIST */} 
//       {/* ================================= */} 
 
//       {loading ? ( 
//         <Typography 
//           sx={{ mt: 3 }} 
//         > 
//           Loading emails... 
//         </Typography> 
//       ) : emails.length === 0 ? ( 
//         <Typography 
//           sx={{ 
//             mt: 3, 
//             color: 
//               "text.secondary", 
//           }} 
//         > 
//           No emails found. 
//         </Typography> 
//       ) : ( 
//         emails.map((email) => ( 
//           <EmailCard 
//             key={email.id} 
//             email={email} 
//           /> 
//         )) 
//       )} 
//     </Box> 
//   ); 
// } 


 
import React, { useEffect, useState } from "react"; 
import { Box, Typography } from "@mui/material"; 
import { useParams } from "react-router-dom"; 
 
import EmailCard from "./EmailCard"; 
import CommonButton from "../../../../../Components/common/CommonButton"; 
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab"; 
import NewEmailDialog from "./NewEmailDialog"; 
 
import api from "../../../../../services/api"; 
 
export default function EmailDetails({ 
  tabs, 
  relatedModule = "deal", 
  objectId, 
}) { 
  const { dealId } = useParams(); 
 
  const [activeTab, setActiveTab] = 
    useState("Emails"); 
 
  const [openCreateEmail, setOpenCreateEmail] = 
    useState(false); 
 
  const [emails, setEmails] = useState([]); 
 
  const [loading, setLoading] = 
    useState(false); 
 
  // ========================================== 
  // GET OBJECT ID 
  // ========================================== 
 
  const finalObjectId = 
    objectId || dealId; 
 
  console.log( 
    "RELATED MODULE:", 
    relatedModule 
  ); 
 
  console.log( 
    "OBJECT ID:", 
    finalObjectId 
  ); 
 
  // ========================================== 
  // GET EMAILS 
  // ========================================== 
 
  const fetchEmails = async () => { 
    try { 
      setLoading(true); 
 
      const response = await api.get( 
        "/activities/email/" 
      ); 
 
      setEmails( 
        response.data || [] 
      ); 
    } catch (error) { 
      console.error( 
        "Get Emails Error:", 
        error 
      ); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  // ========================================== 
  // LOAD EMAILS 
  // ========================================== 
 
  useEffect(() => { 
    fetchEmails(); 
  }, []); 
 
  // ========================================== 
  // EMAIL CREATED 
  // ========================================== 
 
  const handleEmailCreated = () => { 
    fetchEmails(); 
  }; 
 
  return ( 
    <Box 
      sx={{ 
        p: 3, 
        fontFamily: 
          "Roboto, sans-serif", 
        mx: -2, 
      }} 
    > 
      {/* ================================= */} 
      {/* ACTIVITY TABS */} 
      {/* ================================= */} 
 
      <Box> 
        <CommonActivityTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          title="Deals" 
        /> 
      </Box> 
 
      {/* ================================= */} 
      {/* HEADER */} 
      {/* ================================= */} 
 
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: 
            "space-between", 
          alignItems: "center", 
          mt: 3, 
          mb: 1, 
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
 
      {/* ================================= */} 
      {/* NEW EMAIL */} 
      {/* ================================= */} 
 
      <NewEmailDialog 
        open={openCreateEmail} 
        onClose={() => 
          setOpenCreateEmail(false) 
        } 
        relatedModule={relatedModule} 
        objectId={finalObjectId} 
        onEmailCreated={ 
          handleEmailCreated 
        } 
      /> 
 
      {/* ================================= */} 
      {/* EMAIL LIST */} 
      {/* ================================= */} 
 
      {loading ? ( 
        <Typography 
          sx={{ mt: 3 }} 
        > 
          Loading emails... 
        </Typography> 
      ) : emails.length === 0 ? ( 
        <Typography 
          sx={{ 
            mt: 3, 
            color: 
              "text.secondary", 
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