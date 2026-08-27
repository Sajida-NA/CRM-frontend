import { useState,useEffect } from "react";
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

import api from "../../../services/api";

function CompaniesList() {
  const [page, setPage] = useState(1);
  const [industry, setIndustry] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [search, setSearch] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
const [companiesData, setCompaniesData] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedCompany, setSelectedCompany] = useState(null);
const fetchCompanies = async () => {
  try {
    setLoading(true);

    const response = await api.get("/companies/");

    console.log("Companies:", response.data);

    setCompaniesData(response.data);
  } catch (error) {
    console.error("Error fetching companies:", error);
  } finally {
    setLoading(false);
  }
};
//EDIT COMPANY
const handleEdit = (company) => {
   console.log("Editing company:", company);
  setSelectedCompany(company);
  setOpenDrawer(true);
};

// DELETE COMPANY

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this company?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/companies/${id}/`);
    await fetchCompanies();
  } catch (error) {
    console.error("Error deleting company:", error);
  }
};

useEffect(() => {
  fetchCompanies();
}, []);
  

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
          {/* <CreateCompanyDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          /> */}
         <CreateCompanyDrawer
  open={openDrawer}
  onClose={() => {
    setOpenDrawer(false);
    setSelectedCompany(null);
  }}
  onCompanyCreated={fetchCompanies}
  company={selectedCompany}
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
            value={industry}
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
            value={city}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <SelectField
            placeholder="Lead Status"
            options={["Open", "New", "In Progress"]}
            value={leadStatus}
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
              {/* <TableCell>{company.companyName}</TableCell>
              <TableCell>{company.companyOwner}</TableCell>
              <TableCell>{company.phoneNumber}</TableCell>
              <TableCell>{company.industry}</TableCell>
              <TableCell>{company.city}</TableCell>
              <TableCell>{company.country}</TableCell>
              <TableCell>{company.createdDate}</TableCell> */}
              <TableCell>{company.company_name}</TableCell>
<TableCell>{company.company_owner}</TableCell>
<TableCell>{company.phone_number}</TableCell>
<TableCell>{company.industry}</TableCell>
<TableCell>{company.city}</TableCell>
<TableCell>{company.country_region}</TableCell>
<TableCell>
  {company.created_date
    ? dayjs(company.created_date).format("MMM D, YYYY h:mm A")
    : ""}
</TableCell>
              <TableCell>
                <IconButton 
                  color="primary"
                   onClick={() => handleEdit(company)}>
                  <EditIcon />
                </IconButton>
                <IconButton 
                 color="error"
                   onClick={() => handleDelete(company.id)}>
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
