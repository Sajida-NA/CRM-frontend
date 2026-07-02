import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/login"
import Dashboard from "./Pages/Dashboard/dashboard";

import EmailRecord from "./Pages/EmailRecord";
import Leadslist from "./Pages/Leads/Leadslist";
import CompanyDetails from "./Pages/Companies/CompanyDetails/CompanyDetails";
import CreateTicket from "./Pages/Tickets/components/CreateTicket"; 

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/emailrecord" element={<EmailRecord />} />  
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/CreateTicket" element={<CreateTicket/>}/>
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/leadslist" element={<Leadslist/>}/>
        {/* <Route path="/register" element={<Register/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );

}

export default App;