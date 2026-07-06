import { useState } from "react";
import { Box, IconButton,Checkbox,TableRow, TableCell } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../../Components/common/PageHeader";
import FilterSection from "../../Components/common/FilterSection";
import InputField from "../../Components/common/InputField";
import SelectField from "../../Components/common/SelectField";
import StatusChip from "../../Components/common/StatusChip";
import DataTable from "../../Components/common/DataTable";
import Pagination from "../../Components/common/Pagination";
import CommonButton from "../../Components/common/CommonButton";
import CreateLeadsDrawer from "../Leads/components/CreateLeadsDrawer";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
export default function Leadslist() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
 // Dummy Leads Data
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
    <Box
      sx={{
        maxWidth: "1000px",
        margin: "0 auto",
        marginTop: "40px",
        padding: "32px",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* ⭐ LEADS + IMPORT + CREATE LEAD  */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        {/* Left: Page Title */}
        <PageHeader title="Leads" />

        {/* Right: Import + Create Lead */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Import
          </Button>

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#6C63FF",
              px: 3,
            }}
          >
            Create Lead
          </Button>
        </Box>
      </Box>

      {/* ⭐ SEARCH + PAGINATION*/}
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

        {/*  SEARCH + PAGINATION*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
        <Box sx={{ borderBottom: "1px solid #eee", mb: 3 }} />
        {/* Filters */}
        <FilterSection>
          <SelectField
            label="Lead Status"
            options={["Open", "New", "In Progress"]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          {/* Created Date Filter */}
          <DatePicker
            label="Created Date"
            value={createdDate ? dayjs(createdDate) : null}
            onChange={(newValue) =>
              setCreatedDate(newValue ? newValue.format("YYYY-MM-DD") : "")
            }
            slotProps={{
              textField: { size: "small", width: 180, error: false },
            }}
          />

          <Box sx={{ flexGrow: 1 }} />
        </FilterSection>

        {/* Table */}
        <DataTable
          columns={[
            "Name",
            "Email",
            "Phone Number",
            "Created Date",
            "Lead Status",
            "Actions",
          ]}
        >
          {leads.map((lead, index) => (
            <TableRow key={index}>
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

      {/* ⭐ FILTERS */}
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

      {/* ⭐ TABLE */}
      <DataTable
        columns={[
          "Name",
          "Email",
          "Phone Number",
          "Created Date",
          "Lead Status",
          "Actions",
        ]}
      >
        {leads.map((lead, index) => (
          <TableRow key={index}>
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
  );
}
