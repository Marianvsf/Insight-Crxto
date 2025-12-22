import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./views/login.jsx";
import RegisterView from "./views/register.jsx";
import Home from "./views/home.jsx";
import Navbar from "./views/navbar.jsx";
import Dashboard from "./views/dashboard.jsx";
import { Footer } from "./views/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
