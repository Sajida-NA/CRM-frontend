// // import { useState } from "react";
// // import { Box, IconButton, Button, TableRow, TableCell } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import PageHeader from "../../Components/common/PageHeader";
// // import FilterSection from "../../Components/common/FilterSection";
// // import InputField from "../../Components/common/InputField";
// // import SelectField from "../../Components/common/SelectField";
// // import StatusChip from "../../Components/common/StatusChip";
// // import DataTable from "../../Components/common/DataTable";
// // import Pagination from "../../Components/common/Pagination";

// // export default function Leadslist() {
// //   const [page, setPage] = useState(1);
// //   const [status, setStatus] = useState("");
// //   const [createdDate, setCreatedDate] = useState("");
// //   const leads = [
// //     {
// //       name: "Jane Cooper",
// //       email: "janecooper@gmail.com",
// //       phone: "078 5432 8505",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "Open",
// //     },
// //     {
// //       name: "Wade Warren",
// //       email: "wadewarren@gmail.com",
// //       phone: "077 5465 8785",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Brooklyn Simmons",
// //       email: "brooklynsimmons@gmail.com",
// //       phone: "070 4531 9507",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Leslie Alexander",
// //       email: "lesliealexander@gmail.com",
// //       phone: "078 2824 3534",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Jenny Wilson",
// //       email: "jennywilson@gmail.com",
// //       phone: "079 6761 9681",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Guy Hawkins",
// //       email: "guyhawkins@gmail.com",
// //       phone: "077 5465 8785",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Robert Fox",
// //       email: "robertfox@gmail.com",
// //       phone: "077 5465 8785",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "New",
// //     },
// //     {
// //       name: "Cameron Williamson",
// //       email: "cameronwilliamson@gmail.com",
// //       phone: "078 2824 3534",
// //       date: "Apr 8, 2025 2:35 PM GMT+5:30",
// //       status: "In Progress",
// //     },
// //   ];

// //   return (
// //     <Box
// //       sx={{
// //         maxWidth: "1000px",
// //         margin: "0 auto",
// //         marginTop: "40px",
// //         padding: "32px",
// //         width: "100%",
// //         minHeight: "100vh",
// //       }}
// //     >
// //       {/* ⭐ LEADS + IMPORT + CREATE LEAD  */}

// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           mb: 3,
// //         }}
// //       >
// //         {/* Left: Page Title */}
// //         <PageHeader title="Leads" />

// //         {/* Right: Import + Create Lead */}
// //         <Box sx={{ display: "flex", gap: 2 }}>
// //           <Button
// //             variant="outlined"
// //             sx={{
// //               textTransform: "none",
// //               borderRadius: 2,
// //             }}
// //           >
// //             Import
// //           </Button>

// //           <Button
// //             variant="contained"
// //             sx={{
// //               textTransform: "none",
// //               borderRadius: 2,
// //               backgroundColor: "#6C63FF",
// //               px: 3,
// //             }}
// //           >
// //             Create Lead
// //           </Button>
// //         </Box>
// //       </Box>

// //       {/* ⭐ SEARCH + PAGINATION*/}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           mb: 3,
// //         }}
// //       >
// //         <InputField
// //           label="Search"
// //           placeholder="Search Phone, Name, Email"
// //           width={380}
// //         />

// //         <Pagination page={page} totalPages={5} onPageChange={setPage} />
// //       </Box>

// //       {/* ⭐ FILTERS */}
// //       <FilterSection>
// //         <SelectField
// //           label="Lead Status"
// //           options={["Open", "New", "In Progress"]}
// //           value={status}
// //           onChange={(e) => setStatus(e.target.value)}
// //         />

// //         <InputField
// //           label="Created Date"
// //           placeholder="YYYY-MM-DD"
// //           width={180}
// //           value={createdDate}
// //           onChange={(e) => setCreatedDate(e.target.value)}
// //         />

// //         <Box sx={{ flexGrow: 1 }} />
// //       </FilterSection>

// //       {/* ⭐ TABLE */}
// //       <DataTable
// //         columns={[
// //           "Name",
// //           "Email",
// //           "Phone Number",
// //           "Created Date",
// //           "Lead Status",
// //           "Actions",
// //         ]}
// //       >
// //         {leads.map((lead, index) => (
// //           <TableRow key={index}>
// //             <TableCell>{lead.name}</TableCell>
// //             <TableCell>{lead.email}</TableCell>
// //             <TableCell>{lead.phone}</TableCell>
// //             <TableCell>{lead.date}</TableCell>
// //             <TableCell>
// //               <StatusChip status={lead.status} />
// //             </TableCell>
// //             <TableCell>
// //               <IconButton color="primary">
// //                 <EditIcon />
// //               </IconButton>
// //               <IconButton color="error">
// //                 <DeleteIcon />
// //               </IconButton>
// //             </TableCell>
// //           </TableRow>
// //         ))}
// //       </DataTable>
// //     </Box>
// //   );
// // }


// import { useState } from "react";
// import { Box, IconButton, Button, TableRow, TableCell } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PageHeader from "../../Components/common/PageHeader";
// import FilterSection from "../../Components/common/FilterSection";
// import InputField from "../../Components/common/InputField";
// import SelectField from "../../Components/common/SelectField";
// import StatusChip from "../../Components/common/StatusChip";
// import DataTable from "../../Components/common/DataTable";
// import Pagination from "../../Components/common/Pagination";
// import MainLayout from "../../layout/MainLayout";
// import Checkbox from "@mui/material/Checkbox";
// import CommonButton from "../../Components/common/CommonButton";
// export default function Leadslist() {
//   const [page, setPage] = useState(1);
//   const [status, setStatus] = useState("");
//   const [createdDate, setCreatedDate] = useState("");

//   const leads = [
//     {
//       name: "Jane Cooper",
//       email: "janecooper@gmail.com",
//       phone: "078 5432 8505",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "Open",
//     },
//     {
//       name: "Wade Warren",
//       email: "wadewarren@gmail.com",
//       phone: "077 5465 8785",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Brooklyn Simmons",
//       email: "brooklynsimmons@gmail.com",
//       phone: "070 4531 9507",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Leslie Alexander",
//       email: "lesliealexander@gmail.com",
//       phone: "078 2824 3534",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Jenny Wilson",
//       email: "jennywilson@gmail.com",
//       phone: "079 6761 9681",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Guy Hawkins",
//       email: "guyhawkins@gmail.com",
//       phone: "077 5465 8785",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Robert Fox",
//       email: "robertfox@gmail.com",
//       phone: "077 5465 8785",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "New",
//     },
//     {
//       name: "Cameron Williamson",
//       email: "cameronwilliamson@gmail.com",
//       phone: "078 2824 3534",
//       date: "Apr 8, 2025 2:35 PM GMT+5:30",
//       status: "In Progress",
//     },
//   ];

//   return (
//     <MainLayout>
//     <Box
//       sx={{
//         maxWidth: "1000px",
//         margin: "0 auto",
//         marginTop: "10px",
//         padding: "20px",
//         width: "100%",
//         minHeight: "100vh",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 3,
//         }}
//       >
//         <PageHeader title="Leads" />

//         <Box sx={{ display: "flex", gap: 2 }}>
//           {/* <Button variant="outlined" sx={{ textTransform: "none", borderRadius: 2 }}>
//             Import
//           </Button> */}
//           <CommonButton>Import</CommonButton>
//            <CommonButton>Create Lead</CommonButton>

//           {/* <Button
//             variant="contained"
//             sx={{
//               textTransform: "none",
//               borderRadius: 2,
//               backgroundColor: "#6C63FF",
//               px: 3,
//             }}
//           >
//             Create Lead
//           </Button> */}
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 3,
//         }}
//       >
//         <InputField
//           label="Search Phone, Name, Email"
//           placeholder=""
//           width={380}
//         />

//         <Pagination page={page} totalPages={5} onPageChange={setPage} />
//       </Box>

//       <FilterSection>
//         <SelectField
//           label="Lead Status"
//           options={["Open", "New", "In Progress"]}
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         />

//         <InputField
//           label="Created Date"
//           placeholder="YYYY-MM-DD"
//           width={180}
//           value={createdDate}
//           onChange={(e) => setCreatedDate(e.target.value)}
//         />

//         <Box sx={{ flexGrow: 1 }} />
//       </FilterSection>

//       <DataTable
//         columns={[<Checkbox size="small"/>,
       
//           "Name",
//           "Email",
//           "Phone Number",
//           "Created Date",
//           "Lead Status",
//           "Actions",
//         ]}
//       >

//       <DataTable
//               columns={[
//                  <Checkbox size="small" />,
//                 "COMPANY NAME",
//                 "COMPANY OWNER",
//                 "PHONE NUMBER",
//                 "INDUSTRY",
//                 "CITY",
//                 "COUNTRY/REGION",
//                 "CREATED DATE",
//                 "ACTIONS",
//               ]}
//             />
//         {leads.map((lead) => (
//           <TableRow key={lead.email}>
//             <TableCell>
//                 <Checkbox size="small" />
//             </TableCell>
//             <TableCell>{lead.name}</TableCell>
//             <TableCell>{lead.email}</TableCell>
//             <TableCell>{lead.phone}</TableCell>
//             <TableCell>{lead.date}</TableCell>
//             <TableCell>
//               <StatusChip status={lead.status} />
//             </TableCell>
//             <TableCell>
//               <IconButton color="primary">
//                 <EditIcon />
//               </IconButton>
//               <IconButton color="error">
//                 <DeleteIcon />
//               </IconButton>
//             </TableCell>
//           </TableRow>
//         ))}
//       </DataTable>
//     </Box>
//     </MainLayout>
//   );
// }


import { useState } from "react";
import {
  Box,
  IconButton,
  TableRow,
  TableCell,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MainLayout from "../../layout/MainLayout";
import PageHeader from "../../Components/common/PageHeader";
import FilterSection from "../../Components/common/FilterSection";
import InputField from "../../Components/common/InputField";
import SelectField from "../../Components/common/SelectField";
import StatusChip from "../../Components/common/StatusChip";
import DataTable from "../../Components/common/DataTable";
import Pagination from "../../Components/common/Pagination";
import Checkbox from "@mui/material/Checkbox";
import CommonButton from "../../Components/common/CommonButton";

export default function Leadslist() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const leads = [
    {
      name: "Jane Cooper",
      email: "janecooper@gmail.com",
      phone: "078 5432 8505",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "Open",
    },
    {
      name: "Wade Warren",
      email: "wadewarren@gmail.com",
      phone: "077 5465 8785",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Brooklyn Simmons",
      email: "brooklynsimmons@gmail.com",
      phone: "070 4531 9507",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Leslie Alexander",
      email: "lesliealexander@gmail.com",
      phone: "078 2824 3534",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Jenny Wilson",
      email: "jennywilson@gmail.com",
      phone: "079 6761 9681",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Guy Hawkins",
      email: "guyhawkins@gmail.com",
      phone: "077 5465 8785",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Robert Fox",
      email: "robertfox@gmail.com",
      phone: "077 5465 8785",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Cameron Williamson",
      email: "cameronwilliamson@gmail.com",
      phone: "078 2824 3534",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "In Progress",
    },
  ];

  return (
    <MainLayout>
      <Box sx={{
        maxWidth: "1000",
        margin: "0 auto",
        marginTop: "10px",
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
      }}
    >

        {/* HEADER */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        {/* Left: Page Title */}
          <PageHeader title="Leads" />

          <Box sx={{ display: "flex", gap: 2 }}>
            <CommonButton>Import</CommonButton>
            <CommonButton>Create Lead</CommonButton>
          </Box>
        </Box>

        {/* SEARCH + PAGINATION */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      > 
          <InputField
            label="Search Name, Email, Phone"
            placeholder="Search Phone, Name, Email"
            width={380}
          />

          <Pagination page={page} totalPages={5} onPageChange={setPage} />
        </Box>

        {/* FILTERS */}
        <FilterSection>
          <SelectField
            label="Lead Status"
            options={["Open", "New", "In Progress"]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <InputField
            label="Created Date"
            placeholder="YYYY-MM-DD"
            width={180}
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          />

          <Box sx={{ flexGrow: 1 }} />
        </FilterSection>

        {/* TABLE */}
        <DataTable
          columns={[
            <Checkbox size="small" />,
            "Name",
            "Email",
            "Phone",
            "Date",
            "Status",
            "Actions",
          ]}
        >
          {leads.map((lead) => (
            <TableRow key={lead.email}>
              <TableCell>
                <Checkbox size="small" />
              </TableCell>

              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.date}</TableCell>

              <TableCell>
                <StatusChip status={lead.status} />
              </TableCell>

              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </DataTable>

      </Box>
    </MainLayout>
  );
}



