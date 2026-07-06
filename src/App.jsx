import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import EmailRecord from "./Pages/Leads/components/EmailRecord";
import Leadslist from "./Pages/Leads/Leadslist";
import CompanyDetails from "./Pages/Companies/CompanyDetails/CompanyDetails";
import CreateTicket from "./Pages/Tickets/components/CreateTicket";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "./Pages/Ticket/TicketProfile/TicketProfile";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";
import Register from "./Pages/Auth/Register/Register";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
<<<<<<< HEAD
import DealsList from "./Pages/Deals/DealsList/DealsList"
// import theme from "./theme/theme";
// import { ThemeProvider } from "@mui/material";
=======
import LeadProfile from "./Pages/Leads/LeadProfile";

// import theme from "./theme";
import { ThemeProvider } from "@mui/material";
>>>>>>> 1f2c122b6ee66ea63c430984656cb33295e0ee2c

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
          <Route path="/CreateTicket" element={<CreateTicket />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/ticket-profile" element={<TicketProfile />} />
          <Route path="/leadslist" element={<Leadslist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/companieslist" element={<CompaniesList />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/dealslist" element={<DealsList/>}/>
        </Routes>
=======
          <Route path="/lead-profile" element={<LeadProfile/>}/>
          </Routes>
>>>>>>> 1f2c122b6ee66ea63c430984656cb33295e0ee2c
      </BrowserRouter>
      {/* </ThemeProvider> */}
      </LocalizationProvider>
    </>
  );
}

export default App;
