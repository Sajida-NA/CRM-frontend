// import { useState, useEffect } from "react";
// import { Box, IconButton, TableRow, TableCell } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PageHeader from "../../../Components/common/PageHeader";
// import FilterSection from "../../../Components/common/FilterSection";
// import SelectField from "../../../Components/common/SelectField";
// import DataTable from "../../../Components/common/DataTable";
// import CreateCompanyDrawer from "../components/CreateCompanyDrawer";
// import SearchSection from "../../../Components/common/SearchSection";
// import CommonButton from "../../../Components/common/CommonButton";
// import dayjs from "dayjs";
// import CommonDatePicker from "../../../Components/common/CommonDatePicker";
// import CommonCheckbox from "../../../Components/common/CommonCheckbox";
// import { useNavigate } from "react-router-dom";

// import api from "../../../services/api";

// function CompaniesList() {
//   const [page, setPage] = useState(1);
//   const [industry, setIndustry] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [leadStatus, setLeadStatus] = useState("");
//   const [search, setSearch] = useState("");
//   const [createdDate, setCreatedDate] = useState("");
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [companiesData, setCompaniesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   const navigate = useNavigate();

//   // =========================================================
//   // REMOVE COUNTRY CODE FROM PHONE NUMBER FOR DISPLAY
//   // =========================================================
//   // UAE:
//   // +971553074355 -> 0555674355
//   //
//   // India:
//   // +919876543210 -> 9876543210
//   //
//   // USA:
//   // +11234567890 -> 1234567890
//   //
//   // UK:
//   // +441234567890 -> 1234567890
//   // =========================================================

//   const removeCountryCode = (phone) => {
//     if (!phone) {
//       return "-";
//     }

//     const phoneString = String(phone).trim();

//     // UAE
//     if (phoneString.startsWith("+971")) {
//       return "0" + phoneString.substring(4);
//     }

//     // India
//     if (phoneString.startsWith("+91")) {
//       return phoneString.substring(3);
//     }

//     // USA
//     if (phoneString.startsWith("+1")) {
//       return phoneString.substring(2);
//     }

//     // UK
//     if (phoneString.startsWith("+44")) {
//       return phoneString.substring(3);
//     }

//     return phoneString;
//   };

//   // =========================================================
//   // FILTER SECTION - VALUES SAME AS LIST
//   // =========================================================

//   const industryOptions = [
//     ...new Set(
//       companiesData.map((company) => company.industry).filter(Boolean),
//     ),
//   ];

//   const cityOptions = [
//     ...new Set(
//       companiesData.map((company) => company.city).filter(Boolean),
//     ),
//   ];

//   const countryOptions = [
//     ...new Set(
//       companiesData
//         .map((company) => company.country_region)
//         .filter(Boolean),
//     ),
//   ];

//   // =========================================================
//   // FETCH COMPANIES
//   // =========================================================

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);

//       const params = {};

//       if (industry) {
//         params.industry = industry;
//       }

//       if (city) {
//         params.city = city;
//       }

//       if (country) {
//         params.country_region = country;
//       }

//       if (search) {
//         params.search = search;
//       }

//       if (createdDate) {
//         params.created_date = createdDate;
//       }

//       const response = await api.get("/companies/", {
//         params: params,
//       });

//       console.log("Filtered Companies:", response.data);

//       setCompaniesData(response.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // EDIT COMPANY
//   // =========================================================

//   const handleEdit = (company) => {
//     console.log("Editing company:", company);
//     console.log("Company Owner ID:", company.company_owner);
//     console.log("Company Owner Name:", company.company_owner_name);

//     setSelectedCompany(company);
//     setOpenDrawer(true);
//   };

//   // =========================================================
//   // DELETE COMPANY
//   // =========================================================

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this company?",
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await api.delete(`/companies/${id}/`);

//       await fetchCompanies();
//     } catch (error) {
//       console.error("Error deleting company:", error);
//     }
//   };

//   // =========================================================
//   // CALL FETCH COMPANIES WHILE SEARCHING / FILTERING
//   // =========================================================

//   useEffect(() => {
//     fetchCompanies();
//   }, [industry, city, country, search, createdDate]);

//   return (
//       <Box
//         sx={{
//           maxWidth: "1000",
//           margin: "0 auto",
//           marginTop: "5px",
//           padding: "5px",
//           bgcolor: "background.default",
//           borderRadius: "10px",
//           boxShadow: "3px",
//         }}
//       >
//         {/* =====================================================
//             OUTER BOX FOR PAGE HEADER
//         ===================================================== */}

//         <Box
//           sx={{
//             p: 2,
//             height: "12vh",
//             boxShadow: "4px",
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "background.paper",
//             borderTopLeftRadius: "12px",
//             borderTopRightRadius: "12px",
//           }}
//         >
//           {/* PAGE HEADER */}

//           <PageHeader
//             title="Companies"
//             actions={
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 {/* IMPORT */}

//                 <CommonButton variant="outlined">
//                   Import
//                 </CommonButton>

//                 {/* CREATE */}

//                 <CommonButton
//                   onClick={() => {
//                     setSelectedCompany(null);
//                     setOpenDrawer(true);
//                   }}
//                 >
//                   Create
//                 </CommonButton>
//               </Box>
//             }
//           />

//           {/* =====================================================
//               CREATE / EDIT COMPANY DRAWER
//           ===================================================== */}

//           <CreateCompanyDrawer
//             open={openDrawer}
//             onClose={() => {
//               setOpenDrawer(false);
//               setSelectedCompany(null);
//             }}
//             onCompanyCreated={fetchCompanies}
//             company={selectedCompany}
//           />
//         </Box>

//         {/* =====================================================
//             OUTER BOX FOR SEARCH + PAGINATION
//         ===================================================== */}

//         <Box
//           sx={{
//             p: 2,
//             boxShadow: "4px",
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "background.paper",
//             height: "12vh",
//             marginTop: "4px",
//             transform: "translateY(-5px)",
//           }}
//         >
//           {/* SEARCH + PAGINATION */}

//           <SearchSection
//             placeholder="Search Phone, Name, Email"
//             page={page}
//             totalPages={68}
//             onPageChange={setPage}
//             searchValue={search}
//             onSearchChange={(e) => setSearch(e.target.value)}
//           />
//         </Box>

//         {/* =====================================================
//             FILTERS
//         ===================================================== */}

//         <FilterSection>
//           {/* INDUSTRY */}

//           <SelectField
//             placeholder="Industry Type"
//             options={industryOptions}
//             value={industry}
//             onChange={(e) => setIndustry(e.target.value)}
//           />

//           {/* CITY */}

//           <SelectField
//             placeholder="City"
//             options={cityOptions}
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />

//           {/* COUNTRY */}

//           <SelectField
//             placeholder="Country/Region"
//             options={countryOptions}
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//           />

//           {/* LEAD STATUS */}

//           <SelectField
//             placeholder="Lead Status"
//             options={["Open", "New", "In Progress"]}
//             value={leadStatus}
//             onChange={(e) => setLeadStatus(e.target.value)}
//           />

//           {/* CREATED DATE */}

//           <CommonDatePicker
//             label="Created Date"
//             value={createdDate ? dayjs(createdDate) : null}
//             onChange={(newValue) =>
//               setCreatedDate(
//                 newValue
//                   ? newValue.format("YYYY-MM-DD")
//                   : "",
//               )
//             }
//           />

//           <Box sx={{ flexGrow: 1 }} />
//         </FilterSection>

//         {/* =====================================================
//             TABLE
//         ===================================================== */}

//         <DataTable
//           columns={[
//             <CommonCheckbox size="medium" />,
//             "COMPANY NAME",
//             "COMPANY OWNER",
//             "PHONE NUMBER",
//             "INDUSTRY",
//             "CITY",
//             "COUNTRY/REGION",
//             "CREATED DATE",
//             "ACTIONS",
//           ]}
//         >
//           {companiesData.map((company) => (
//             <TableRow key={company.id}>
//               {/* CHECKBOX */}

//               <TableCell>
//                 <CommonCheckbox size="medium" />
//               </TableCell>

//               {/* =================================================
//                   COMPANY NAME
//               ================================================= */}

//               <TableCell>
//                 <Box
//                   component="span"
//                   sx={{
//                     color: "primary.main",
//                     cursor: "pointer",
//                     fontWeight: 500,
//                     "&:hover": {
//                       textDecoration: "underline",
//                     },
//                   }}
//                   onClick={() =>
//                     navigate(
//                       `/company/${company.id}/activities`,
//                     )
//                   }
//                 >
//                   {company.company_name}
//                 </Box>
//               </TableCell>

//               {/* =================================================
//                   COMPANY OWNER
//               ================================================= */}

//               <TableCell>
//                 {company.company_owner_name || "-"}
//               </TableCell>

//               {/* =================================================
//                   PHONE NUMBER
//               ================================================= */}

//               <TableCell>
//                 {removeCountryCode(company.phone_number)}
//               </TableCell>

//               {/* =================================================
//                   INDUSTRY
//               ================================================= */}

//               <TableCell>
//                 {company.industry || "-"}
//               </TableCell>

//               {/* =================================================
//                   CITY
//               ================================================= */}

//               <TableCell>
//                 {company.city || "-"}
//               </TableCell>

//               {/* =================================================
//                   COUNTRY
//               ================================================= */}

//               <TableCell>
//                 {company.country_region || "-"}
//               </TableCell>

//               {/* =================================================
//                   CREATED DATE
//               ================================================= */}

//               <TableCell>
//                 {company.created_date
//                   ? dayjs(company.created_date).format(
//                       "MMM D, YYYY h:mm A",
//                     )
//                   : ""}
//               </TableCell>

//               {/* =================================================
//                   ACTIONS
//               ================================================= */}

//               <TableCell>
//                 {/* EDIT */}

//                 <IconButton
//                   color="primary"
//                   onClick={() => handleEdit(company)}
//                 >
//                   <EditIcon />
//                 </IconButton>

//                 {/* DELETE */}

//                 <IconButton
//                   color="error"
//                   onClick={() =>
//                     handleDelete(company.id)
//                   }
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </DataTable>
//       </Box>
//   );
// }

// export default CompaniesList;




import { useState, useEffect } from "react";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import SelectField from "../../../Components/common/SelectField";
import DataTable from "../../../Components/common/DataTable";
import CreateCompanyDrawer from "../components/CreateCompanyDrawer";
import SearchSection from "../../../Components/common/SearchSection";
import CommonButton from "../../../Components/common/CommonButton";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import { useToast } from "../../../Components/common/Toast";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";

function CompaniesList() {
  const { showToast } = useToast();

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

  const navigate = useNavigate();

  // =========================================================
  // REMOVE COUNTRY CODE FROM PHONE NUMBER FOR DISPLAY
  // =========================================================

  const removeCountryCode = (phone) => {
    if (!phone) {
      return "-";
    }

    const phoneString = String(phone).trim();

    // UAE
    if (phoneString.startsWith("+971")) {
      return "0" + phoneString.substring(4);
    }

    // India
    if (phoneString.startsWith("+91")) {
      return phoneString.substring(3);
    }

    // USA
    if (phoneString.startsWith("+1")) {
      return phoneString.substring(2);
    }

    // UK
    if (phoneString.startsWith("+44")) {
      return phoneString.substring(3);
    }

    return phoneString;
  };

  // =========================================================
  // FILTER OPTIONS
  // =========================================================

  const industryOptions = [
    ...new Set(
      companiesData
        .map((company) => company.industry)
        .filter(Boolean),
    ),
  ];

  const cityOptions = [
    ...new Set(
      companiesData
        .map((company) => company.city)
        .filter(Boolean),
    ),
  ];

  const countryOptions = [
    ...new Set(
      companiesData
        .map((company) => company.country_region)
        .filter(Boolean),
    ),
  ];

  // =========================================================
  // FETCH COMPANIES
  // =========================================================

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const params = {};

      if (industry) {
        params.industry = industry;
      }

      if (city) {
        params.city = city;
      }

      if (country) {
        params.country_region = country;
      }

      if (search) {
        params.search = search;
      }

      if (createdDate) {
        params.created_date = createdDate;
      }

      const response = await api.get("/companies/", {
        params,
      });

      console.log("Filtered Companies:", response.data);

      setCompaniesData(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);

      showToast(
        "Failed to load companies.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT COMPANY
  // =========================================================

  const handleEdit = (company) => {
    console.log("Editing company:", company);
    console.log("Company Owner ID:", company.company_owner);
    console.log(
      "Company Owner Name:",
      company.company_owner_name,
    );

    setSelectedCompany(company);
    setOpenDrawer(true);
  };

  // =========================================================
  // DELETE COMPANY
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/companies/${id}/`);

      await fetchCompanies();

      showToast(
        "Company deleted successfully.",
        "success",
      );
    } catch (error) {
      console.error(
        "Error deleting company:",
        error.response?.data || error,
      );

      let errorMessage =
        "Failed to delete company.";

      if (error.response?.data) {
        const backendError = error.response.data;

        if (typeof backendError === "string") {
          errorMessage = backendError;
        } else if (backendError.detail) {
          errorMessage = backendError.detail;
        } else if (
          typeof backendError === "object"
        ) {
          errorMessage = Object.entries(
            backendError,
          )
            .map(([field, messages]) => {
              const message = Array.isArray(messages)
                ? messages.join(", ")
                : String(messages);

              return `${field}: ${message}`;
            })
            .join("\n");
        }
      }

      showToast(errorMessage, "error");
    }
  };

  // =========================================================
  // FETCH WHEN FILTER / SEARCH CHANGES
  // =========================================================

  useEffect(() => {
    fetchCompanies();
  }, [
    industry,
    city,
    country,
    search,
    createdDate,
  ]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
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
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

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
        <PageHeader
          title="Companies"
          actions={
            <Box sx={{ display: "flex", gap: 2 }}>
              <CommonButton variant="outlined">
                Import
              </CommonButton>

              <CommonButton
                onClick={() => {
                  setSelectedCompany(null);
                  setOpenDrawer(true);
                }}
              >
                Create
              </CommonButton>
            </Box>
          }
        />

        {/* =====================================================
            CREATE / EDIT COMPANY DRAWER
        ===================================================== */}

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

      {/* =====================================================
          SEARCH + PAGINATION
      ===================================================== */}

      <Box
        sx={{
          p: 2,
          boxShadow: "4px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          height: "12vh",
          marginTop: "4px",
          transform: "translateY(-5px)",
        }}
      >
        <SearchSection
          placeholder="Search Phone, Name, Email"
          page={page}
          totalPages={68}
          onPageChange={setPage}
          searchValue={search}
          onSearchChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </Box>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <FilterSection>
        <SelectField
          placeholder="Industry Type"
          options={industryOptions}
          value={industry}
          onChange={(e) =>
            setIndustry(e.target.value)
          }
        />

        <SelectField
          placeholder="City"
          options={cityOptions}
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <SelectField
          placeholder="Country/Region"
          options={countryOptions}
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
        />

        <SelectField
          placeholder="Lead Status"
          options={[
            "Open",
            "New",
            "In Progress",
          ]}
          value={leadStatus}
          onChange={(e) =>
            setLeadStatus(e.target.value)
          }
        />

        <CommonDatePicker
          label="Created Date"
          value={
            createdDate
              ? dayjs(createdDate)
              : null
          }
          onChange={(newValue) =>
            setCreatedDate(
              newValue
                ? newValue.format("YYYY-MM-DD")
                : "",
            )
          }
        />

        <Box sx={{ flexGrow: 1 }} />
      </FilterSection>

      {/* =====================================================
          TABLE
      ===================================================== */}

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
            {/* CHECKBOX */}

            <TableCell>
              <CommonCheckbox size="medium" />
            </TableCell>

            {/* COMPANY NAME */}

            <TableCell>
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() =>
                  navigate(
                    `/company/${company.id}/activities`,
                  )
                }
              >
                {company.company_name}
              </Box>
            </TableCell>

            {/* COMPANY OWNER */}

            <TableCell>
              {company.company_owner_name || "-"}
            </TableCell>

            {/* PHONE NUMBER */}

            <TableCell>
              {removeCountryCode(
                company.phone_number,
              )}
            </TableCell>

            {/* INDUSTRY */}

            <TableCell>
              {company.industry || "-"}
            </TableCell>

            {/* CITY */}

            <TableCell>
              {company.city || "-"}
            </TableCell>

            {/* COUNTRY */}

            <TableCell>
              {company.country_region || "-"}
            </TableCell>

            {/* CREATED DATE */}

            <TableCell>
              {company.created_date
                ? dayjs(
                    company.created_date,
                  ).format(
                    "MMM D, YYYY h:mm A",
                  )
                : ""}
            </TableCell>

            {/* ACTIONS */}

            <TableCell>
              {/* EDIT */}

              <IconButton
                color="primary"
                onClick={() =>
                  handleEdit(company)
                }
              >
                <EditIcon />
              </IconButton>

              {/* DELETE */}

              <IconButton
                color="error"
                onClick={() =>
                  handleDelete(company.id)
                }
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </Box>
  );
}

export default CompaniesList;
