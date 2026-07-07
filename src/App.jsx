import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import EmailRecord from "./Pages/Leads/components/EmailRecord";
import Leadslist from "./Pages/Leads/Leadslist";
import CompanyProfile from "./Pages/Companies/CompanyProfile/CompanyProfile";
import CreateTicket from "./Pages/Tickets/components/CreateTicket";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "./Pages/Ticket/TicketProfile/TicketProfile";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";
import Register from "./Pages/Auth/Register/Register";

// import theme from "./theme/theme";
// import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emailrecord" element={<EmailRecord />} />
          <Route path="/CreateTicket" element={<CreateTicket />} />
          <Route path="/CompanyProfile" element={<CompanyProfile />} />
          <Route path="/ticket-profile" element={<TicketProfile />} />
          <Route path="/leadslist" element={<Leadslist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/companieslist" element={<CompaniesList />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;