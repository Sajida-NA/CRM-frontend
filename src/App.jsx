import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import EmailRecord from "./Pages/Leads/components/EmailRecord";
import Leadslist from "./Pages/Leads/LeadsList/Leadslist";
import CompanyDetails from "./Pages/Companies/CompanyDetails/CompanyDetails";

import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "./Pages/Ticket/TicketProfile/TicketProfile";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";
import Register from "./Pages/Auth/Register/Register";
import TicketsList from "./Pages/Tickets/TicketsList/TicketsList";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DealsList from "./Pages/Deals/DealsList/DealsList"


// import theme from "./theme/theme";
// import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <ThemeProvider theme={theme}>
       */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emailrecord" element={<EmailRecord />} />
          <Route path="/ticketslist" element={<TicketsList/>} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/ticket-profile" element={<TicketProfile />} />
          <Route path="/leadslist" element={<Leadslist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/companieslist" element={<CompaniesList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dealslist" element={<DealsList/>}/>
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
      </LocalizationProvider>
    </>
  );
}

export default App;
