import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Auth/Login/login";
import Dashboard from "../Pages/Dashboard/dashboard";
import EmailRecord from "../Pages/Leads/components/EmailRecord";
import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
import CompanyProfile from "../Pages/Companies/CompanyProfile/CompanyProfile";
import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "../Pages/Tickets/TicketProfile/TicketProfile";
import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
import Register from "../Pages/Auth/Register/Register";
import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
import DealsList from "../Pages/Deals/DealsList/DealsList";
import ViewEmailRecord from "../Pages/Leads/ViewEmailRecords/ViewEmailRecords";
import Meeting from "../Pages/Leads/components/Tabs/Meetings/Meeting";
import CommonEntityHeader from "../Components/common/CommonEntityHeader";
import Leadnote from '../Pages/Leads/components/Tabs/Note/Leadnote';



function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Lead Routes */}
      <Route path="/leadslist" element={<Leadslist />} />
      <Route path="/emailrecord" element={<EmailRecord />} />
      <Route path="/viewemailrecord" element={<ViewEmailRecord/>}/>
       <Route path="/leadnote" element={<Leadnote/>}/>

      {/* Company Routes */}
      <Route path="/companieslist" element={<CompaniesList />} />
      <Route path="/company-profile" element={<CompanyProfile />} />

      {/* Ticket Routes */}
      <Route path="/ticketslist" element={<TicketsList />} />
      <Route path="/ticket-profile" element={<TicketProfile />} />
      <Route path="/create-ticket" element={<CreateTicketDrawer />} />

      {/* Deal Routes */}
      <Route path="/dealslist" element={<DealsList />} />

     



      

      <Route path="/entity" element={<CommonEntityHeader/>}/>
       <Route path="/meeting" element={<Meeting/>}/>
    </Routes>
  );
}

export default AppRoutes;