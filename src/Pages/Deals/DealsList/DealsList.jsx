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
import Pagination from "../../../Components/common/Pagination";
import MainLayout from "../../../layout/MainLayout";
import CommonButton from "../../../Components/common/CommonButton";
import CreateDealsDrawer from "../components/CreateDealsDrawer"

function DealsList() {
  const [page, setPage] = useState(1);
  const [dealStage, setDealStage] = useState("");
  const [dealOwner, setDealOwner] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  
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
          marginTop: "10px",
          padding: "20px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* ⭐ HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <PageHeader title="Deals" />

          <Box sx={{ display: "flex", gap: 2 }}>
            <CommonButton variant="outlined" sx={{ textTransform: "none", px: 3 }}>
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
              Create Deals
            </CommonButton>
          </Box>

          <CreateDealsDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          />
        </Box>

        {/* ⭐ SEARCH + PAGINATION */}
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
            placeholder="Search Deal Name, Owner, Stage"
            width={380}
          />

          <Pagination page={page} totalPages={5} onPageChange={setPage} />
        </Box>

        {/* ⭐ FILTERS */}
        <FilterSection>
          <SelectField
            label="Deal Owner"
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
            label="Deal Stage"
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

                    <InputField
                      label="Created Date"
                      placeholder="YYYY-MM-DD"
                      width={180}
                      value={createdDate}
                      onChange={(e) => setCreatedDate(e.target.value)}
                    />
          
                    <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1 }} />
        </FilterSection>

        {/* ⭐ DEALS TABLE */}
        <DataTable
          columns={[
            <Checkbox size="small" />,
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
                <Checkbox size="small" />
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





