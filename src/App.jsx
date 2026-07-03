import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login/login"
import Dashboard from "./Pages/Dashboard/dashboard";
import EmailRecord from "./Pages/Leads/components/EmailRecord";
import Leadslist from "./Pages/Leads/Leadslist";
import CompanyDetails from "./Pages/Companies/CompanyDetails/CompanyDetails";
import CreateTicket from "./Pages/Tickets/components/CreateTicket"; 
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import CompaniesList from "./Pages/Companies/CompaniesList/CompaniesList";
import Register from "./Pages/Auth/Register/Register";


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
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/companieslist" element={<CompaniesList />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );

}

export default App;