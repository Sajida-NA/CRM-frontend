import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Auth/Login/login";
import Dashboard from "../Pages/Dashboard/dashboard";
import EmailRecord from "../Pages/Leads/components/EmailTab/EmailRecord";
import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
import CompanyProfile from "../Pages/Company/CompanyProfile/CompanyProfile";
import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import TicketProfile from "../Pages/Tickets/TicketProfile/TicketProfile";
import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
import Register from "../Pages/Auth/Register/Register";
import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
import DealsList from "../Pages/Deals/DealsList/DealsList";
import ViewEmailRecord from "../Pages/Leads/ViewEmailRecords/ViewEmailRecords";
import LeadMeeting from "../Pages/Leads/components/Tabs/Meetings/LeadMeeting";
import CommonEntityHeader from "../Components/common/CommonEntityHeader";
import Leadnote from '../Pages/Leads/components/Tabs/Note/Leadnote';
import DealMeeting from "../Pages/Deals/components/Tabs/Meeting/DealMeeting";
import Leadcalls from "../Pages/Leads/components/Tabs/Calls/Leadcalls";

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
      <Route path="/leadmeeting" element={<LeadMeeting/>}/>
      <Route path="/leadnote" element={<Leadnote/>}/>
      <Route path="/leadcalls" element={<Leadcalls/>}/>

      {/* Company Routes */}
      <Route path="/companieslist" element={<CompaniesList />} />
      <Route path="/company-profile" element={<CompanyProfile />} />

      {/* Ticket Routes */}
      <Route path="/ticketslist" element={<TicketsList />} />
      <Route path="/ticket-profile" element={<TicketProfile />} />
      <Route path="/create-ticket" element={<CreateTicketDrawer />} />

      {/* Deal Routes */}
      <Route path="/dealslist" element={<DealsList />} />
      <Route path="/dealmeeting" element={<DealMeeting/>}/>

      <Route path="/entity" element={<CommonEntityHeader/>}/>
       
    </Routes>
  );
}

export default AppRoutes;