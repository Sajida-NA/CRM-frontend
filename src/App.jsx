import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
// import LeadsPage from "./Pages/Leads/LeadsPage";
import Dashboard from "./Pages/dashboard";
import CreateTicket from "./Pages/CreateTicket";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/emailrecord" element={<EmailRecord />} />  
        <Route path="/" element={<Login />} />
        {/* <Route path="/leads" element={<LeadsPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/CreateTicket" element={<CreateTicket/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );

}
export default App;