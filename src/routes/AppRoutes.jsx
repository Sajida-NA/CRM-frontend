import { Routes, Route } from "react-router-dom";

/* ===========================
   Authentication Pages
=========================== */
import Login from "../Pages/Auth/Login/login";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import Register from "../Pages/Auth/Register/Register";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";

/* ===========================
   Dashboard
=========================== */
import Dashboard from "../Pages/Dashboard/dashboard";

/* ===========================
   Lead Pages
=========================== */
import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
import LeadActivities from "../Pages/Leads/components/Tabs/Activity/LeadActivities";
import Leadnote from "../Pages/Leads/components/Tabs/Note/Leadnote";
import Leadcalls from "../Pages/Leads/components/Tabs/Calls/Leadcalls";
import LeadMeeting from "../Pages/Leads/components/Tabs/Meetings/LeadMeeting";
import LeadTask from "../Pages/Leads/components/Tabs/Task/LeadTask";
import LeadEmail from "../Pages/Leads/components/Tabs/Emails/LeadEmail";
import LeadsLeftPanel from "../Pages/Leads/components/LeadsLeftPanel";

/* ===========================
   Company Pages
=========================== */
import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
import CompanyActivities from "../Pages/Companies/components/Tabs/Activity/CompanyActivities";
import CompanyMeeting from "../Pages/Companies/components/Tabs/Meeting/CompanyMeeting";
import CompanyNote from "../Pages/Companies/components/Tabs/Note/CompanyNote";
import CompanyCalls from "../Pages/Companies/components/Tabs/Calls/CompanyCalls";
import CompanyTask from "../Pages/Companies/components/Tabs/Task/CompanyTask";
import CompanyEmail from "../Pages/Companies/components/Tabs/Emails/CompanyEmail";
import CompanyLeftPanel from "../Pages/Companies/components/CompanyLeftPanel";

/* ===========================
   Ticket Pages
=========================== */
import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
import TicketActivities from "../Pages/Tickets/components/Tabs/Activity/TicketActivities";
import TicketMeeting from "../Pages/Tickets/components/Tabs/Meeting/TicketMeeting";
import TicketNote from "../Pages/Tickets/components/Tabs/Note/TicketNote";
import TicketCalls from "../Pages/Tickets/components/Tabs/Calls/TicketCalls";
import TicketTask from "../Pages/Tickets/components/Tabs/Task/TicketTask";
import TicketEmail from "../Pages/Tickets/components/Tabs/Emails/TicketEmail";
import TicketLeftPanel from "../Pages/Tickets/components/TicketLeftPanel";

/* ===========================
   Deal Pages
=========================== */
import DealsList from "../Pages/Deals/DealsList/DealsList";
import DealActivities from "../Pages/Deals/components/Tabs/Activity/DealActivities";
import DealMeeting from "../Pages/Deals/components/Tabs/Meeting/DealMeeting";
import DealNote from "../Pages/Deals/components/Tabs/Note/DealNote";
import DealCalls from "../Pages/Deals/components/Tabs/Calls/DealCalls";
import DealTask from "../Pages/Deals/components/Tabs/Task/DealTask";
import DealEmail from "../Pages/Deals/components/Tabs/Emails/DealEmail";
import DealLeftPanel from "../Pages/Deals/components/DealLeftPanel";

/* ===========================
   Common Components
=========================== */
import CommonEntityHeader from "../Components/common/CommonEntityHeader";
import ProtectedRoute from "../Components/common/ProtectedRoute";
import MainLayout from "../layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* ===========================
          Authentication Routes
      =========================== */}

      <Route path="/" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/register" element={<Register />} />

      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* ==================================================
          MAIN APPLICATION LAYOUT

          Header + Sidebar are rendered only once here.
          Child pages are rendered inside MainLayout Outlet.
      ================================================== */}

      <Route element={<MainLayout />}>
        {/* ===========================
            Dashboard
        =========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Lead Routes
        =========================== */}

        <Route path="/leadslist" element={<Leadslist />} />

        <Route path="/leads/:leadId" element={<LeadsLeftPanel />}>

          <Route path="activity" element={<LeadActivities />} />

          <Route path="note" element={<Leadnote />} />

          <Route path="calls" element={<Leadcalls />} />

          <Route path="meeting" element={<LeadMeeting />} />

          <Route path="task" element={<LeadTask />} />

          <Route path="email" element={<LeadEmail />} />

        </Route>

        {/* ===========================
            Company Routes
        =========================== */}

        <Route path="/companieslist" element={<CompaniesList />} />

        <Route path="/company/:companyId" element={<CompanyLeftPanel />}>

          <Route path="activities" element={<CompanyActivities />} />

          <Route path="note" element={<CompanyNote />} />

          <Route path="email" element={<CompanyEmail />} />

          <Route path="calls" element={<CompanyCalls />} />

          <Route path="task" element={<CompanyTask />} />

          <Route path="meeting" element={<CompanyMeeting />} />

        </Route>

        {/* ===========================
            Ticket Routes
        =========================== */}

        <Route path="/ticketslist" element={<TicketsList />} />

        <Route path="/tickets/:ticketId" element={<TicketLeftPanel />}>

          <Route path="activities" element={<TicketActivities />} />

          <Route path="meeting" element={<TicketMeeting />} />

          <Route path="note" element={<TicketNote />} />

          <Route path="calls" element={<TicketCalls />} />

          <Route path="task" element={<TicketTask />} />

          <Route path="email" element={<TicketEmail />} />

        </Route>

        {/* ===========================
            Deal Routes
        =========================== */}

        <Route path="/dealslist" element={<DealsList />} />

        <Route path="/deals/:dealId" element={<DealLeftPanel />}>

          <Route path="activities" element={<DealActivities />} />

          <Route path="meeting" element={<DealMeeting />} />

          <Route path="note" element={<DealNote />} />

          <Route path="calls" element={<DealCalls />} />

          <Route path="task" element={<DealTask />} />

          <Route path="email" element={<DealEmail />} />

        </Route>

        {/* ===========================
            Common Routes
        =========================== */}

        <Route path="/entity" element={<CommonEntityHeader />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
