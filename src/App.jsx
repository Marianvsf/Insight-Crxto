import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginView from "./views/login.jsx";
import RegisterView from "./views/register.jsx";
import Home from "./views/home.jsx";
import Navbar from "./views/navbar.jsx";
import Dashboard from "./views/dashboard.jsx";
import MiniDashboard from "./views/miniDashboard.jsx";
import { Footer } from "./views/Footer.jsx";
import Terms from "./views/terms.jsx";
import Sales from "./views/sales.jsx";
import ChatBot from "./components/chatBot.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

function AppContent() {
  const location = useLocation();
  const showChatBot = ["/", "/dashboard", "/mercado"].includes(
    location.pathname,
  );
  const fullBleedRoutes = ["/", "/login", "/register"];
  const isFullBleed = fullBleedRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className={`flex-1 w-full ${isFullBleed ? "" : "pt-20"}`}>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Mini dashboard público: no requiere sesión */}
          <Route path="/mercado" element={<MiniDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </main>
      <Footer />
      {showChatBot && <ChatBot />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
