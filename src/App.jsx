import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import CreateTicket from "./Pages/CreateTicket";
import EmailRecord from "./Pages/EmailRecord";
import Leadslist from "./Pages/Leads/Leadslist";
import CompanyDetails from "./Pages/CompanyDetails";


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
      </Routes>
    </BrowserRouter>
    </>
  );

}

export default App;