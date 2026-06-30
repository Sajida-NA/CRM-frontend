import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";

import CreateTicket from "./Pages/CreateTicket";
import LeadsPage from "./Pages/Leads/LeadsPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/CricketTicket" element={<CricketTicket/>}/>
      </Routes>
    </BrowserRouter>
  );

}
export default App;
