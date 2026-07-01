<<<<<<< HEAD
import EmailRecord from "./Pages/EmailRecord";

function App() {
  return <EmailRecord />;
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import LeadsPage from "./Pages/Leads/LeadsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> main
}
export default App;
