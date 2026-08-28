import { useState } from "react";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import InputField from "../../../Components/common/InputField";
import SelectField from "../../../Components/common/SelectField";
import StatusChip from "../../../Components/common/StatusChip";
import DataTable from "../../../Components/common/DataTable";
// import SearchSection from "../../../Components/common/SearchSection";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import dayjs from "dayjs";
import CreateLeadsDrawer from "../components/CreateLeadsDrawer";
import MainLayout from "../../../layout/MainLayout";
import CommonButton from "../../../Components/common/CommonButton";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";

export default function Leadslist() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");
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
      phone: "078 2824 3334",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Jenny Wilson",
      email: "jennywilson@gmail.com",
      phone: "079 8761 9681",
      date: "Apr 8, 2025 2:35 PM GMT+5:30",
      status: "New",
    },
    {
      name: "Guy Hawkins",
      email: "guyhawkins@gmail.com",
      phone: "078 5432 8505",
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
      phone: "078 2824 3334",
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
          marginTop: "5px",
          padding: "5px",
          backgroundColor: "background.default",
          borderRadius: "10px",
          boxShadow: "3px",
        }}
      >
        {/* outer box for leads header */}
        <Box
          sx={{
            p: 2,
            height: "12vh",
            boxShadow: "4px",
            border: " 1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          {/* HEADER */}
          
          <PageHeader
            title="Leads"
            actions={
              <Box sx={{ display: "flex", gap: 2 }}>
                <CommonButton variant="outlined">Import</CommonButton>
                <CommonButton onClick={() => setOpenCreate(true)}>
                  Create
                </CommonButton>
              </Box>
            }
          />

          {/* DRAWER */}
          <CreateLeadsDrawer
            open={openCreate}
            onClose={() => setOpenCreate(false)}
          />
        </Box>

        {/* outer box for search & pagination */}
        <Box
          sx={{
            p: 2,
            boxShadow: "4px",
            border: " 1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            height: "12vh",
            marginTop: "4px",
            transform: "translateY(-5px)",
          }}
        >
          {/* ⭐ SEARCH + PAGINATION*/}
          <SearchSection
            placeholder="Search Phone, Name, Email"
            page={page}
            totalPages={68}
            onPageChange={setPage}
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {/* FILTERS */}
        <FilterSection>
          <SelectField
            placeholder="Lead Status"
            options={["Open", "New", "In Progress"]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <CommonDatePicker
            label="Created Date"
            value={createdDate ? dayjs(createdDate) : null}
            onChange={(newValue) =>
              setCreatedDate(newValue ? newValue.format("YYYY-MM-DD") : "")
            }
          />
          <Box sx={{ flexGrow: 1 }} />
        </FilterSection>

        {/* TABLE */}
        <DataTable
          columns={[
            <CommonCheckbox size="medium" />,
            "NAME",
            "EMAIL",
            "PHONE NUMBER",
            "CREATED DATE",
            "LEAD STATUS",
            "ACTIONS",
          ]}
        >
          {leads.map((lead, index) => (
            <TableRow key={index}>
              <TableCell>
                <CommonCheckbox size="medium" />
              </TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.date}</TableCell>
              <TableCell>
                <StatusChip status={lead.status} />
              </TableCell>
              <TableCell>
                <IconButton color="primary"><EditIcon /></IconButton>
                <IconButton color="error"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
      </Box>
    </MainLayout>
  );
}
