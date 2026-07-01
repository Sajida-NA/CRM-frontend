import { Routes, Route } from "react-router-dom";

import Login from "./Pages/login";
import CompanyDetails from "./Pages/CompanyDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/company/:id" element={<CompanyDetails />} />
    </Routes>
  );
}

export default App;