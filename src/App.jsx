import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginView from "./views/login";
import RegisterView from "./views/register";
import Home from "./views/home";
import Navbar from "./views/navbar";

function App() {
  return (
    <>
      {/* <div>
        <img
          className="w-6 h-4 rounded-full bg-gray-500"
          src="./public/InsightCrypto.png"
          alt="logo Insight Crxto"
        />
      </div> 
      */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
