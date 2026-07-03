import { useState } from "react";
import { Box, IconButton, Checkbox, TableRow, TableCell } from "@mui/material";

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

import CommonButton from "../../Components/common/CommonButton";
import CreateLeadsDrawer from "../Leads/components/CreateLeadsDrawer";
export default function Leadslist() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
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
      <Box
        sx={{
          maxWidth: "1000",
          margin: "0 auto",
          marginTop: "10px",
          padding: "20px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <PageHeader title="Leads" />

          <Box sx={{ display: "flex", gap: 2 }}>
            <CommonButton variant="outlined" sx={{ px: 3 }}>
              Import
            </CommonButton>

            <CommonButton onClick={() => setOpenCreate(true)}>
              Create Lead
            </CommonButton>
          </Box>
          <CreateLeadsDrawer
            open={openCreate}
            onClose={() => setOpenCreate(false)}
          />
        </Box>
        <Box sx={{ borderBottom: "1px solid #eee", mb: 2 }} />

        {/* SEARCH + PAGINATION */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <InputField
            label="Search"
            placeholder="Search Phone, Name, Email"
            width={380}
          />

          <Pagination page={page} totalPages={5} onPageChange={setPage} />
        </Box>
        <Box sx={{ borderBottom: "1px solid #eee", mb: 2 }} />

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
            "NAME",
            "EMAIL",
            "PHONE NUMBER",
            "CREATED DATE",
            "LEAD STATUS",
            "ACTIONS",
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
