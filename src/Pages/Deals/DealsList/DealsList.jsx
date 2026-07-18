import { useState } from "react";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import InputField from "../../../Components/common/InputField";
import SelectField from "../../../Components/common/SelectField";
import DataTable from "../../../Components/common/DataTable";
import MainLayout from "../../../layout/MainLayout";
import CommonButton from "../../../Components/common/CommonButton";
import CreateDealsDrawer from "../components/CreateDealsDrawer";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import SearchSection from "../../../Components/common/searchSection";

function DealsList() {
  const [page, setPage] = useState(1);
  const [dealStage, setDealStage] = useState("");
  const [dealOwner, setDealOwner] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const dealsData = [
    {
      id: 1,
      name: "Website Revamp – Atlas Corp",
      stage: "Presentation Scheduled",
      closeDate: "Apr 8, 2025",
      owner: "Jane Cooper",
      amount: "$12,500",
    },
    {
      id: 2,
      name: "Mobile App for FitBuddy",
      stage: "Qualified to Buy",
      closeDate: "Apr 8, 2025",
      owner: "Wade Warren",
      amount: "$25,000",
    },
    {
      id: 3,
      name: "HR Software License – ZenoHR",
      stage: "Contract Sent",
      closeDate: "Apr 8, 2025",
      owner: "Brooklyn Simmons",
      amount: "$18,750",
    },
    {
      id: 4,
      name: "CRM Onboarding – NexTech",
      stage: "Closed Won",
      closeDate: "Apr 8, 2025",
      owner: "Leslie Alexander",
      amount: "$32,000",
    },
    {
      id: 5,
      name: "Marketing Suite – QuickAdz",
      stage: "Appointment Scheduled",
      closeDate: "Apr 8, 2025",
      owner: "Jenny Wilson",
      amount: "$14,800",
    },
    {
      id: 6,
      name: "Inventory Tool – GreenMart",
      stage: "Decision Maker Bought In",
      closeDate: "Apr 8, 2025",
      owner: "Guy Hawkins",
      amount: "$9,300",
    },
    {
      id: 7,
      name: "ERP Integration – BlueChip",
      stage: "Qualified to Buy",
      closeDate: "Apr 8, 2025",
      owner: "Robert Fox",
      amount: "$41,000",
    },
    {
      id: 8,
      name: "Loyalty Program – FoodieFox",
      stage: "Closed Lost",
      closeDate: "Apr 8, 2025",
      owner: "Cameron Williamson",
      amount: "$11,000",
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
          bgcolor: "background.default",
          borderRadius: "10px",
          boxShadow: "3px",
        }}
      >
        {/* outer box for deal header */}
        <Box
          sx={{
            p: 2,
            height: "12vh",
            boxShadow: "4px",
            border: " 1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            marginBottom: "3px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          {/* ⭐ Page Title (Deals) + (Import and Create) buttons */}

          {/* Left: Page Title */}
          <PageHeader
            title="Deals"
            actions={
              <Box sx={{ display: "flex", gap: 2 }}>
                <CommonButton variant="outlined">Import</CommonButton>
                <CommonButton onClick={() => setOpenDrawer(true)}>
                  Create
                </CommonButton>
              </Box>
            }
          />
          {/* Drawer */}
          <CreateDealsDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          />
        </Box>

        {/* outer box for search & pagination */}
        <Box
          sx={{
            p: 2,
            boxShadow: "4px",
            border: " 1px solid #ddd",
            backgroundColor: "background.paper",
            height: "12vh",
            marginTop: "4px",
            transform: "translateY(-5px)",
          }}
        >
          {/* ⭐ SEARCH + PAGINATION */}
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
            placeholder="Deal Owner"
            options={[
              "Jane Cooper",
              "Wade Warren",
              "Brooklyn Simmons",
              "Leslie Alexander",
              "Jenny Wilson",
              "Guy Hawkins",
              "Robert Fox",
              "Cameron Williamson",
            ]}
            value={dealOwner}
            onChange={(e) => setDealOwner(e.target.value)}
          />

          <SelectField
            placeholder="Deal Stage"
            options={[
              "Presentation Scheduled",
              "Qualified to Buy",
              "Contract Sent",
              "Closed Won",
              "Appointment Scheduled",
              "Decision Maker Bought In",
              "Closed Lost",
            ]}
            value={dealStage}
            onChange={(e) => setDealStage(e.target.value)}
          />

          {/* Created Date Filter */}
          <CommonDatePicker
            label="Created Date"
            value={createdDate ? dayjs(createdDate) : null}
            onChange={(newValue) =>
              setCreatedDate(newValue ? newValue.format("YYYY-MM-DD") : "")
            }
          />
          <Box sx={{ flexGrow: 1 }} />
        </FilterSection>

        {/* ⭐ DEALS TABLE */}
        <DataTable
          columns={[
            <CommonCheckbox size="medium" />,
            "DEAL NAME",
            "DEAL STAGE",
            "CLOSE DATE",
            "DEAL OWNER",
            "AMOUNT",
            "ACTIONS",
          ]}
        >
          {dealsData.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell>
                <CommonCheckbox size="medium" />
              </TableCell>
              <TableCell>{deal.name}</TableCell>
              <TableCell>{deal.stage}</TableCell>
              <TableCell>{deal.closeDate}</TableCell>
              <TableCell>{deal.owner}</TableCell>
              <TableCell>{deal.amount}</TableCell>
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

export default DealsList;
