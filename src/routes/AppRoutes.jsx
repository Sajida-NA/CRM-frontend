import { Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "../Pages/Auth/Login/login";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import Register from "../Pages/Auth/Register/Register";

// Dashboard
import Dashboard from "../Pages/Dashboard/dashboard";

// Lead Pages
import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
import EmailRecord from "../Pages/Leads/components/Tabs/Email/EmailRecord";
import ViewEmailRecord from "../Pages/Leads/ViewEmailRecords/ViewEmailRecords";
import Leadnote from "../Pages/Leads/components/Tabs/Note/Leadnote";
import Leadcalls from "../Pages/Leads/components/Tabs/Calls/Leadcalls";
import LeadMeeting from "../Pages/Leads/components/Tabs/Meetings/LeadMeeting";

// Company Pages
import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
import CompanyMeeting from "../Pages/Companies/components/Tabs/Meeting/CompanyMeeting";
import CompanyProfile from "../Pages/Companies/CompanyProfile/CompanyProfile";
import CompanyNote from "../Pages/Companies/components/Tabs/Note/CompanyNote";
import CompanyCalls from "../Pages/Companies/components/Tabs/Calls/CompanyCalls";


// Ticket Pages
import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
import TicketMeeting from "../Pages/Tickets/components/Tabs/Meeting/TicketMeeting";
import TicketNote from "../Pages/Tickets/components/Tabs/Note/TicketNote";
import TicketProfile from "../Pages/Tickets/TicketProfile/TicketProfile";
import TicketCalls from "../Pages/Tickets/components/Tabs/Calls/TicketCalls";


// Deal Pages
import DealsList from "../Pages/Deals/DealsList/DealsList";
import DealMeeting from "../Pages/Deals/components/Tabs/Meeting/DealMeeting";
import DealProfile from "../Pages/Deals/DealProfile/DealProfile";
import DealNote from "../Pages/Deals/components/Tabs/Note/DealNote";
import DealCalls from "../Pages/Deals/components/Tabs/Calls/DealCalls";


// Common Component
import CommonEntityHeader from "../Components/common/CommonEntityHeader";
import TicketLeftPanel from "../Pages/Tickets/components/TicketLeftPanel";
import LeadsLeftPanel from "../Pages/Leads/components/LeadsLeftPanel";
import DealLeftPanel from "../Pages/Deals/components/DealLeftPanel";
import CompanyLeftPanel from "../Pages/Companies/components/CompanyLeftPanel";

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
      <Route path="/companyprofile" element={<CompanyProfile/>} />
      <Route path="/companynote" element={<CompanyNote/>}/>

      {/* Ticket Routes */}
      <Route path="/ticketslist" element={<TicketsList />} />
      {/* <Route path="/create-ticket" element={<CreateTicketDrawer />} /> */}
      <Route path="/ticketmeeting" element={<TicketMeeting />} />
      <Route path="/ticketnote" element={<TicketNote/>}/>
      <Route path="/ticketprofile" element={<TicketProfile />}/>
      <Route path="/ticketnote" element={<TicketNote/>}/>
      <Route path="/ticketcalls" element={<TicketCalls/>}/>

      {/* Deal Routes */}
      <Route path="/dealslist" element={<DealsList />} />
      <Route path="/dealmeeting" element={<DealMeeting />} />
      <Route path="/dealprofile" element={<DealProfile />} />
      <Route path="/dealcalls" element={<DealCalls/>} />
      <Route path="/dealnote" element={<DealNote/>}/>

      {/* Common Entity Header Route */}
      <Route path="/entity" element={<CommonEntityHeader />} />


      {/* Entity Left Panel Routes */}

      {/* Lead Left Panel */}
      <Route path="/leadsleftpanel"element={<LeadsLeftPanel/>}/>
      {/* Deal Left Panel */}
      <Route path="/dealleftpanel" element={<DealLeftPanel/>}/>
      {/* Company Left Panel */}
      <Route path="/companyleftpanel" element={<CompanyLeftPanel/>}/>
      {/* Ticket Left Panel */}
      <Route path="/ticketleftpanel"element={<TicketLeftPanel/>}/>
    </Routes>
  );
}

export default AppRoutes;