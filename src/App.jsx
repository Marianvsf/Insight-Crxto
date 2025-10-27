import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./views/login.jsx";
import RegisterView from "./views/register.jsx";
import Home from "./views/home.jsx";
import Navbar from "./views/navbar.jsx";
import Dashboard from "./views/dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
