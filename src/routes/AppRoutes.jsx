// import { Routes, Route } from "react-router-dom";

// // Authentication Pages
// import Login from "../Pages/Auth/Login/login";
// import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
// import Register from "../Pages/Auth/Register/Register";

// // Dashboard
// import Dashboard from "../Pages/Dashboard/dashboard";

// // Lead Pages
// import Leadslist from "../Pages/Leads/LeadsList/Leadslist";
// // import EmailRecord from "../Pages/Leads/components/Tabs/Emails/EmailRecord";
// // import ViewEmailRecord from "../Pages/Leads/components/Tabs/Emails/ViewEmailRecords";
// import Leadnote from "../Pages/Leads/components/Tabs/Note/Leadnote";
// import Leadcalls from "../Pages/Leads/components/Tabs/Calls/Leadcalls";
// import LeadMeeting from "../Pages/Leads/components/Tabs/Meetings/LeadMeeting";
// import LeadProfile from "../Pages/Leads/LeadProfile/LeadProfile";
// import LeadTask from "../Pages/Leads/components/Tabs/Task/LeadTask"

// import LeadEmail from "../Pages/Leads/components/Tabs/Emails/LeadEmail";
// import EmailCard from "../Pages/Leads/components/Tabs/Emails/EmailCard";
// // Company Pages
// import CompaniesList from "../Pages/Companies/CompaniesList/CompaniesList";
// import CompanyMeeting from "../Pages/Companies/components/Tabs/Meeting/CompanyMeeting";
// import CompanyProfile from "../Pages/Companies/CompanyProfile/CompanyProfile";
// import CompanyNote from "../Pages/Companies/components/Tabs/Note/CompanyNote";
// import CompanyCalls from "../Pages/Companies/components/Tabs/Calls/CompanyCalls";
// import CompanyTask from "../Pages/Companies/components/Tabs/Task/CompanyTask";



// // Ticket Pages
// import TicketsList from "../Pages/Tickets/TicketsList/TicketsList";
// import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
// import TicketMeeting from "../Pages/Tickets/components/Tabs/Meeting/TicketMeeting";
// import TicketProfile from "../Pages/Tickets/TicketProfile/TicketProfile";
// import TicketNote from "../Pages/Tickets/components/Tabs/Note/TicketNote";
// import TicketCalls from "../Pages/Tickets/components/Tabs/Calls/TicketCalls";
// import TicketEmail from "../Pages/Tickets/components/Tabs/Emails/TicketEmail";

// // Deal Pages
// import DealsList from "../Pages/Deals/DealsList/DealsList";
// import DealMeeting from "../Pages/Deals/components/Tabs/Meeting/DealMeeting";
// import DealProfile from "../Pages/Deals/DealProfile/DealProfile";
// import DealNote from "../Pages/Deals/components/Tabs/Note/DealNote";
// import DealCalls from "../Pages/Deals/components/Tabs/Calls/DealCalls";
// import DealTask from "../Pages/Deals/components/Tabs/Task/DealTask";


// import DealEmail from "../Pages/Deals/components/Tabs/Emails/DealEmail";

// // Common Component
// import CommonEntityHeader from "../Components/common/CommonEntityHeader";
// import TicketLeftPanel from "../Pages/Tickets/components/TicketLeftPanel";
// import LeadsLeftPanel from "../Pages/Leads/components/LeadsLeftPanel";
// import CreateTaskDrawer from "../Pages/Leads/components/Tabs/Task/CreateTaskDrawer";


// import DealLeftPanel from "../Pages/Deals/components/DealLeftPanel";
// import CompanyLeftPanel from "../Pages/Companies/components/CompanyLeftPanel";
// import TicketTask from "../Pages/Tickets/components/Tabs/Task/TicketTask";

// import CompanyEmail from "../Pages/Companies/components/Tabs/Emails/CompanyEmail";

// function AppRoutes() {
//   return (
//     <Routes>

//       {/* Authentication Routes */}
//       <Route path="/" element={<Login />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/register" element={<Register />} />

//       {/* Dashboard Route */}
//       <Route path="/dashboard" element={<Dashboard />} />

//       {/* Lead Routes */}
//       <Route path="/leadslist" element={<Leadslist />} />
//       {/* <Route path="/emailrecord" element={<EmailRecord />} /> */}
//       {/* <Route path="/viewemailrecord" element={<ViewEmailRecord />} /> */}
//       <Route path="/leadnote" element={<Leadnote />} />
//       <Route path="/leadcalls" element={<Leadcalls />} />
//       <Route path="/leadmeeting" element={<LeadMeeting />} />
//       <Route path="/leadprofile" element={<LeadProfile />} />
//       <Route path="/leadtask" element={<LeadTask/>}/>
//       <Route path="/leademail" element={<LeadEmail />}/>
     
//       <Route path="/emailcard" element={<EmailCard />}/>

//       {/* Company Routes */}
//       <Route path="/companieslist" element={<CompaniesList />} />
//       <Route path="/companymeeting" element={<CompanyMeeting />} />
//       <Route path="/companyprofile" element={<CompanyProfile/>} />
//       <Route path="/companynote" element={<CompanyNote/>}/>
//       <Route path="/companycalls" element={<CompanyCalls />} />
//       <Route path="/companytask" element={<CompanyTask/>}/>

//       <Route path="/companyemail" element={<CompanyEmail/>}/>

//       {/* Ticket Routes */}
//       <Route path="/ticketslist" element={<TicketsList />} />
//       {/* <Route path="/create-ticket" element={<CreateTicketDrawer />} /> */}
//       <Route path="/ticketmeeting" element={<TicketMeeting />} />
//       <Route path="/ticketprofile" element={<TicketProfile />}/>
//       <Route path="/ticketnote" element={<TicketNote/>}/>
//       <Route path="/ticketcalls" element={<TicketCalls/>}/>
//       <Route path="/tickettask" element={<TicketTask/>}/>
//       <Route path="/ticketemail" element={<TicketEmail/>}/>

//       {/* Deal Routes */}
//       <Route path="/dealslist" element={<DealsList />} />
//       <Route path="/dealmeeting" element={<DealMeeting />} />
//       <Route path="/dealprofile" element={<DealProfile />} />
//       <Route path="/dealcalls" element={<DealCalls/>} />
//       <Route path="/dealnote" element={<DealNote/>}/>
//       <Route path="/dealtask" element={<DealTask/>}/>
//       <Route path="/dealemail" element={<DealEmail/>}/>

//       {/* Common Entity Header Route */}
//       <Route path="/entity" element={<CommonEntityHeader />} />


//       {/* Entity Left Panel Routes */}

   
//       <Route path="/leadsleftpanel"element={<LeadsLeftPanel/>}/>
   
//       <Route path="/dealleftpanel" element={<DealLeftPanel/>}/>
    
//       <Route path="/companyleftpanel" element={<CompanyLeftPanel/>}/>
     
//       <Route path="/ticketleftpanel"element={<TicketLeftPanel/>}/>
      

//       <Route path="/createtaskdrawer"element={<CreateTaskDrawer/>}/>

//     </Routes>
//   );
// }

// export default AppRoutes;




import { Routes, Route } from "react-router-dom";

/* ===========================
   Authentication Pages
=========================== */
import Login from "../Pages/Auth/Login/login";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import Register from "../Pages/Auth/Register/Register";

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
import EmailCard from "../Pages/Leads/components/Tabs/Emails/EmailCard";
import LeadsLeftPanel from "../Pages/Leads/components/LeadsLeftPanel";
import CreateTaskDrawer from "../Pages/Leads/components/Tabs/Task/CreateTaskDrawer";


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
import CreateTicketDrawer from "../Pages/Tickets/components/CreateTicketDrawer";
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

function AppRoutes() {
  return (
    <Routes>

      {/* ================= Authentication Routes ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      {/* ================= Dashboard Route ================= */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ================= Lead Routes ================= */}
      <Route path="/leadslist" element={<Leadslist />} />
      <Route path="/leadactivities" element={<LeadActivities/>}/>
      <Route path="/leadnote" element={<Leadnote />} />
      <Route path="/leadcalls" element={<Leadcalls />} />
      <Route path="/leadmeeting" element={<LeadMeeting />} />
      <Route path="/leadtask" element={<LeadTask />} />
      <Route path="/leademail" element={<LeadEmail />} />
      <Route path="/emailcard" element={<EmailCard />} />
      <Route path="/leadsleftpanel" element={<LeadsLeftPanel />} />
      <Route path="/createtaskdrawer" element={<CreateTaskDrawer />} />
      

      {/* ================= Company Routes ================= */}
      <Route path="/companieslist" element={<CompaniesList />} />
      <Route path="/companyactivities" element={<CompanyActivities />} />
      <Route path="/companymeeting" element={<CompanyMeeting />} />
      <Route path="/companynote" element={<CompanyNote />} />
      <Route path="/companycalls" element={<CompanyCalls />} />
      <Route path="/companytask" element={<CompanyTask />} />
      <Route path="/companyemail" element={<CompanyEmail />} />
      <Route path="/companyleftpanel" element={<CompanyLeftPanel />} />

      {/* ================= Ticket Routes ================= */}
      <Route path="/ticketslist" element={<TicketsList />} />
      <Route path="/ticketactivities" element={<TicketActivities />} />
      <Route path="/ticketmeeting" element={<TicketMeeting />} />
      <Route path="/ticketnote" element={<TicketNote />} />
      <Route path="/ticketcalls" element={<TicketCalls />} />
      <Route path="/tickettask" element={<TicketTask />} />
      <Route path="/ticketemail" element={<TicketEmail />} />
      <Route path="/ticketleftpanel" element={<TicketLeftPanel />} />

      {/* ================= Deal Routes ================= */}
      <Route path="/dealslist" element={<DealsList />} />
      <Route path="/dealactivities" element={<DealActivities />} />
      <Route path="/dealmeeting" element={<DealMeeting />} />
      <Route path="/dealnote" element={<DealNote />} />
      <Route path="/dealcalls" element={<DealCalls />} />
      <Route path="/dealtask" element={<DealTask />} />
      <Route path="/dealemail" element={<DealEmail />} />
      <Route path="/dealleftpanel" element={<DealLeftPanel />} />

      {/* ================= Common Routes ================= */}
      <Route path="/entity" element={<CommonEntityHeader />} />
      

    </Routes>
  );
}

export default AppRoutes;