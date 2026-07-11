import { useState } from "react";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import SelectField from "../../../Components/common/SelectField";
import DataTable from "../../../Components/common/DataTable";
import MainLayout from "../../../layout/MainLayout";
import CreateCompanyDrawer from "../components/CreateCompanyDrawer";
import SearchSection from "../../../Components/common/SearchSection";
import CommonButton from "../../../Components/common/CommonButton";
import dayjs from "dayjs";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";

function CompaniesList() {
  const [page, setPage] = useState(1);
  const [industry, setIndustry] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [search, setSearch] = useState("");
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
          marginTop: "5px",
          padding: "5px",
          bgcolor: "background.default",
          borderRadius: "10px",
          boxShadow: "3px",
        }}
      >
        {/* outer box for pageHeader*/}
        <Box
          sx={{
            p: 2,
            height: "12vh",
            boxShadow: "4px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          {/*⭐ Page Title (Companies) + (Import and Create) buttons  */}

          {/* Left: Page Title */}
          <PageHeader
            title="Companies"
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
          <CreateCompanyDrawer
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
            placeholder="Industry Type"
            options={[
              "Legal Services",
              "Healthcare",
              "Real Estate",
              "Education",
            ]}
            value={status}
            onChange={(e) => setIndustry(e.target.value)}
          />

          <SelectField
            placeholder="City"
            options={[
              "Amsterdam",
              "Cape Town",
              "Dubai",
              "Singapore",
              "Toronto",
            ]}
            value={status}
            onChange={(e) => setCity(e.target.value)}
          />

          <SelectField
            placeholder="Country/Region"
            options={[
              "Netherlands",
              "Switzerland",
              "South Africa",
              "Singapore",
              "USA",
              "UAE",
            ]}
            value={status}
            onChange={(e) => setCountry(e.target.value)}
          />

          <SelectField
            placeholder="Lead Status"
            options={["Open", "New", "In Progress"]}
            value={status}
            onChange={(e) => setLeadStatus(e.target.value)}
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

        {/* ⭐ TABLE */}
        <DataTable
          columns={[
            <CommonCheckbox size="medium" />,
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
                <CommonCheckbox size="medium" />
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
