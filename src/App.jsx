import { BrowserRouter, Routes, Route } from "react-router-dom";

//Auth
import Login from "./Pages/Auth/Login/login";
import Register from "./Pages/Auth/Register/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";

// Dashboard
import Dashboard from "./Pages/Dashboard/dashboard";

// Leads
import Leadslist from "./Pages/Leads/Leadslist";
import EmailRecord from "./Pages/Leads/components/EmailRecord";

// Companies
import CompanyDetails from "./Pages/Companies/CompanyDetails/CompanyDetails";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";

//Deals



//Tickets
import CreateTicket from "./Pages/Tickets/components/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Leads */}
        <Route path="/leadslist" element={<Leadslist />} />
        <Route path="/emailrecord" element={<EmailRecord />} />

        
         {/* Companies */}
        <Route path="/companieslist" element={<CompaniesList />} />
        <Route path="/company/:id" element={<CompanyDetails />} />

        {/* Deals */}

        
        {/* Tickets */}
        <Route path="/CreateTicket" element={<CreateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
