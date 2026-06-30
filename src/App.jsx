import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leadslist from "./Pages/Leads/Leadslist";
import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<Leadslist />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;