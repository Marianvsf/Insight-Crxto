import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./views/login";
import RegisterView from "./views/register";
import Home from "./views/home";
import Navbar from "./views/navbar";
import Dashboard from "./views/dashboard";

function App() {
  return (
    <>
      {/* <div>
        <img
          src="./public/InsightCrypto.png"
          alt="logo Insight Crxto"
        />
        </div> 
        <Navbar />
      */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
