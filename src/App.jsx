import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import EmailRecord from "./Pages/Leads/components/EmailRecord";
import Leadslist from "./Pages/Leads/LeadsList/Leadslist";
import CompanyProfile from "./Pages/Companies/CompanyProfile/CompanyProfile";
import CreateTicketDrawer from "./Pages/Tickets/components/CreateTicketDrawer";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "./Pages/Tickets/TicketProfile/TicketProfile";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";
import Register from "./Pages/Auth/Register/Register";
import TicketsList from "./Pages/Tickets/TicketsList/TicketsList";
import DealsList from "./Pages/Deals/DealsList/DealsList";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emailrecord" element={<EmailRecord />} />
          <Route path="/create-ticket" element={<CreateTicketDrawer />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/ticket-profile" element={<TicketProfile />} />
          <Route path="/ticketslist" element={<TicketsList />} />
          <Route path="/leadslist" element={<Leadslist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/companieslist" element={<CompaniesList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dealslist" element={<DealsList />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;