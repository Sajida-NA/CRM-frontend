import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import PageHeader from "../../../Components/common/PageHeader";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import CommonButton from "../../../Components/common/CommonButton";
import InputField from "../../../Components/common/InputField";
import SelectField from "../../../Components/common/SelectField";
import FilterSection from "../../../Components/common/FilterSection";
import DataTable from "../../../Components/common/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTicketDrawer from "../components/CreateTicketDrawer";
import SearchSection from "../../../Components/common/SearchSection";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";

export default function TicketsList() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");

  const ticketsData = [
    {
      id: 1,
      ticketName: "Payment Failure Issue",
      dealName: "Payment Failure Issue",
      ticketStatus: "Waiting on contact",
      priority: "High",
      source: "Chat",
      ticketOwner: "Jane Cooper",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 2,
      ticketName: "Product Inquiry",
      dealName: "Product Inquiry",
      ticketStatus: "Waiting on us",
      priority: "Medium",
      source: "Email",
      ticketOwner: "Wade Warren",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 3,
      ticketName: "Subscription Upgrade",
      dealName: "Subscription Upgrade",
      ticketStatus: "New",
      priority: "High",
      source: "Chat",
      ticketOwner: "Brooklyn Simmons",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 4,
      ticketName: "Refund Request - Order #456",
      dealName: "Refund Request - Order #456",
      ticketStatus: "New",
      priority: "Low",
      source: "Phone",
      ticketOwner: "Leslie Alexander",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 5,
      ticketName: "Pricing Clarification",
      dealName: "Pricing Clarification",
      ticketStatus: "Closed",
      priority: "Medium",
      source: "Chat",
      ticketOwner: "Jenny Wilson",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 6,
      ticketName: "Login Not Working",
      dealName: "Login Not Working",
      ticketStatus: "Waiting on us",
      priority: "Critical",
      source: "Phone",
      ticketOwner: "Guy Hawkins",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 7,
      ticketName: "Feature Request: Reports",
      dealName: "Feature Request: Reports",
      ticketStatus: "Waiting on contact",
      priority: "High",
      source: "Phone",
      ticketOwner: "Robert Fox",
      createdDate: "Apr 8, 2025 2:35 PM",
    },

    {
      id: 8,
      ticketName: "SLA Violation Complaint",
      dealName: "SLA Violation Complaint",
      ticketStatus: "Closed",
      priority: "Medium",
      source: "Chat",
      ticketOwner: "Cameron Williamson",
      createdDate: "Apr 8, 2025 2:35 PM",
    },
  ];

  return (
    <div>
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
          {/* outer box for ticket header */}
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
            {/* ⭐ TICKET + IMPORT + CREATE LEAD  */}

            {/* Left: Page Title */}
            <PageHeader
              title="Tickets"
              actions={
                <Box sx={{ display: "flex", gap: 2 }}>
                  <CommonButton variant="outlined">Import</CommonButton>
                  <CommonButton onClick={() => setOpenDrawer(true)}>
                    Create
                  </CommonButton>
                </Box>
              }
            />

            {/* DRAWER */}

            <CreateTicketDrawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
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

          {/* ⭐ FILTERS */}
          <FilterSection>
            <SelectField
              placeholder="Ticket Owner"
              options={[
                "Jane Cooper",
                "Brooklyn Simmons",
                "Jenny Wilson",
                "Robert Fox",
                "Guy Hawkins",
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <SelectField
              placeholder="Ticket Status"
              options={["Waiting on contact", "New", "Closed", "Waiting on us"]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <SelectField
              placeholder="Source"
              options={["Chat", "Email", "Phone "]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <SelectField
              placeholder="Priority"
              options={["High", "Medium", "Low", "Critical"]}
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
              <CommonCheckbox size="medium" />,
              "TICKET NAME",
              "DEAL NAME",
              "TICKET STATUS",
              "PRIORITY",
              "SOURCE",
              "TICKET OWNER",
              "CREATED DATE",
              "ACTIONS",
            ]}
          >
            {ticketsData.map((tickets) => (
              <TableRow key={tickets.id}>
                <TableCell>
                  <CommonCheckbox size="medium" />
                </TableCell>
                <TableCell>{tickets.ticketName}</TableCell>
                <TableCell>{tickets.dealName}</TableCell>
                <TableCell>{tickets.ticketStatus}</TableCell>
                <TableCell>{tickets.priority}</TableCell>
                <TableCell>{tickets.source}</TableCell>
                <TableCell>{tickets.ticketOwner}</TableCell>
                <TableCell>{tickets.createdDate}</TableCell>
                <TableCell>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Box>
      </MainLayout>
    </div>
  );
}
