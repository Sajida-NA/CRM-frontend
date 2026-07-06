import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import PageHeader from "../../../Components/common/PageHeader";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import CommonButton from "../../../Components/common/CommonButton";
import InputField from "../../../Components/common/InputField";
import Pagination from "../../../Components/common/Pagination";
import SelectField from "../../../Components/common/SelectField";
import FilterSection from "../../../Components/common/FilterSection";
import DataTable from "../../../Components/common/DataTable";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTicketDrawer from "../components/CreateTicketDrawer";

export default function TicketsList() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");

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
            marginTop: "10px",
            padding: "20px",
            // width: "100%",
          }}
        >
          {/* ⭐ TICKET + IMPORT + CREATE LEAD  */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            {/* Left: Page Title */}
            <PageHeader title="Tickets" />

            {/* Right: Import + Create Lead */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <CommonButton
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Import
              </CommonButton>

              <CommonButton
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  backgroundColor: "#6C63FF",
                  px: 3,
                }}
                onClick={() => setOpenDrawer(true)}
              >
                Create Ticket
              </CommonButton>
            </Box>

            {/* Your companies table/list goes here */}

            <CreateTicketDrawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            />
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

            <Pagination page={page} totalPages={5} onPageChange={setPage} />
          </Box>

          {/* ⭐ FILTERS */}
          <FilterSection>
            <SelectField
              label="Ticket Owner"
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
              label="Ticket Status"
              options={["Waiting on contact", "New", "Closed", "Waiting on us"]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <SelectField
              label="Source"
              options={["Chat", "Email", "Phone "]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <SelectField
              label="Priority"
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
              <Checkbox size="small" />,
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
                  <Checkbox size="small" />
                </TableCell>

                <TableCell>{tickets.ticketName}</TableCell>
                <TableCell>{tickets.dealName}</TableCell>
                <TableCell>{tickets.ticketStatus}</TableCell>
                <TableCell>{tickets.priority}</TableCell>
                <TableCell>{tickets.source}</TableCell>
                <TableCell>{tickets.ticketOwner}</TableCell>
                <TableCell>{tickets.createdDate}</TableCell>

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
    </div>
  );
}
