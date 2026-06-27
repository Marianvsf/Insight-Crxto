import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginView from "./views/login.jsx";
import RegisterView from "./views/register.jsx";
import Home from "./views/home.jsx";
import Navbar from "./views/navbar.jsx";
import Dashboard from "./views/dashboard.jsx";
import { Footer } from "./views/Footer.jsx";
import Contact from "./views/contact.jsx";
import Terms from "./views/terms.jsx";
import ChatBot from "./components/chatBot.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

function AppContent() {
  const location = useLocation();
  const showChatBot = ["/", "/dashboard"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 w-full">
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
      {showChatBot && <ChatBot />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
