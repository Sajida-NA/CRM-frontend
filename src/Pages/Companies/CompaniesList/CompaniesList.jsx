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
import CreateCompanyDrawer from "../components/CreateCompanyDrawer";
import CommonButton from "../../../Components/common/CommonButton";

function CompaniesList() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const companiesData = [
    {
      id: 1,
      companyName: "ClientEdge",
      companyOwner: "Jane Cooper",
      phoneNumber: "078 5432 8505",
      industry: "Legal Services",
      city: "Toronto",
      country: "Canada",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 2,
      companyName: "Relatia",
      companyOwner: "Wade Warren",
      phoneNumber: "077 5465 8785",
      industry: "Healthcare",
      city: "Amsterdam",
      country: "Netherlands",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 3,
      companyName: "TrustSphere",
      companyOwner: "Brooklyn Simmons",
      phoneNumber: "070 4531 9507",
      industry: "Real Estate",
      city: "Bangalore",
      country: "India",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 4,
      companyName: "SalesTrail",
      companyOwner: "Leslie Alexander",
      phoneNumber: "078 2824 3334",
      industry: "Financial Advisory",
      city: "Zurich",
      country: "Switzerland",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 5,
      companyName: "PipelineIQ",
      companyOwner: "Jenny Wilson",
      phoneNumber: "079 8761 9681",
      industry: "Retail & E-commerce",
      city: "Austin",
      country: "USA",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 6,
      companyName: "Syncfolio",
      companyOwner: "Guy Hawkins",
      phoneNumber: "078 5432 8505",
      industry: "Logistics & Supply Chain",
      city: "Dubai",
      country: "UAE",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 7,
      companyName: "CustoLogic",
      companyOwner: "Robert Fox",
      phoneNumber: "077 5465 8785",
      industry: "Marketing Agencies",
      city: "Singapore",
      country: "Singapore",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
    },
    {
      id: 8,
      companyName: "EngageWare",
      companyOwner: "Cameron Williamson",
      phoneNumber: "078 2824 3334",
      industry: "Education Technology",
      city: "Cape Town",
      country: "South Africa",
      createdDate: "Apr 8, 2025 2:35 PM GMT+5:30",
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
        <PageHeader title="Companies" />

        {/* Right: Import + Create Lead */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <CommonButton
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px:3,
              
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
            Create Company
          </CommonButton>
        </Box>

        {/* Your companies table/list goes here */}

        <CreateCompanyDrawer
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
          label="Industry Type"
          options={["Legal Services","Healthcare","Real Estate","Education"]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <SelectField
          label="City"
          options={["Amsterdam", "Cape Town", "Dubai" , "Singapore", "Toronto"]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <SelectField
          label="Country/Region"
          options={["Netherlands","Switzerland" , "South Africa","Singapore","USA", "UAE"]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

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
           <Checkbox size="small" />,
          "COMPANY NAME",
          "COMPANY OWNER",
          "PHONE NUMBER",
          "INDUSTRY",
          "CITY",
          "COUNTRY/REGION",
          "CREATED DATE",
          "ACTIONS",
        ]}
      >
        {companiesData.map((company) => (
          <TableRow key={company.id}>
            <TableCell>
              <Checkbox size="small" />
            </TableCell>

            <TableCell>{company.companyName}</TableCell>
            <TableCell>{company.companyOwner}</TableCell>
            <TableCell>{company.phoneNumber}</TableCell>
            <TableCell>{company.industry}</TableCell>
            <TableCell>{company.city}</TableCell>
            <TableCell>{company.country}</TableCell>
            <TableCell>{company.createdDate}</TableCell>

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

export default CompaniesList;
