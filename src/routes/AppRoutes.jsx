import { Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "../Pages/Auth/Login/login";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import Register from "../Pages/Auth/Register/Register";

// Dashboard
import Dashboard from "../Pages/Dashboard/dashboard";

// Lead Pages
import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
import EmailRecord from "../Pages/Leads/components/EmailTab/EmailRecord";
import ViewEmailRecord from "../Pages/Leads/ViewEmailRecords/ViewEmailRecords";
import Leadnote from "../Pages/Leads/components/Tabs/Note/Leadnote";
import Leadcalls from "../Pages/Leads/components/Tabs/Calls/Leadcalls";
import LeadMeeting from "../Pages/Leads/components/Tabs/Meetings/LeadMeeting";

// Company Pages
import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
import CompanyMeeting from "../Pages/Companies/components/Tabs/Meeting/CompanyMeeting";
import CompanyProfile from "../Pages/Companies/CompanyProfile/companyprofile1";

// Ticket Pages
import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
import TicketMeeting from "../Pages/Tickets/components/Tabs/Meeting/TicketMeeting";
import TicketProfile1 from "../Pages/Tickets/TicketProfile/TicketProfile1";
import TicketNote from "../Pages/Tickets/components/Tabs/Note/TicketNote";


// Deal Pages
import DealsList from "../Pages/Deals/DealsList/DealsList";
import DealMeeting from "../Pages/Deals/components/Tabs/Meeting/DealMeeting";
import DealProfile from "../Pages/Deals/DealProfile/DealProfile";

// Common Component
import CommonEntityHeader from "../Components/common/CommonEntityHeader";
import TicketLeftPanel from "../Pages/Tickets/components/TicketLeftPanel";

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
      <Route path="/viewemailrecord" element={<ViewEmailRecord />} />
      <Route path="/leadnote" element={<Leadnote />} />
      <Route path="/leadcalls" element={<Leadcalls />} />
      <Route path="/leadmeeting" element={<LeadMeeting />} />

      {/* Company Routes */}
      <Route path="/companieslist" element={<CompaniesList />} />
      <Route path="/companymeeting" element={<CompanyMeeting />} />
      <Route path="/CompanyProfile1" element={<CompanyProfile />} />

      {/* Ticket Routes */}
      <Route path="/ticketslist" element={<TicketsList />} />
      <Route path="/create-ticket" element={<CreateTicketDrawer />} />
      <Route path="/ticketmeeting" element={<TicketMeeting />} />
      <Route path="/ticketprofile" element={<TicketProfile1 />} />
      <Route path="/ticketnote" element={<TicketNote/>}/>

      {/* Deal Routes */}
      <Route path="/dealslist" element={<DealsList />} />
      <Route path="/dealmeeting" element={<DealMeeting />} />
      <Route path="/dealprofile" element={<DealProfile />} />

      {/* Common Entity Header Route */}
      <Route path="/entity" element={<CommonEntityHeader />} />

      {/* Old Routes (Kept for Reference) */}
      {/* <Route path="/ticket-profile" element={<TicketProfile />} /> */}
      {/* <Route path="/company-profile" element={<CompanyProfile />} /> */}

      <Route path="/ticketleftpanel"element={<TicketLeftPanel/>}/>
    </Routes>
  );
}

export default AppRoutes;