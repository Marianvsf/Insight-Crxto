import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import logo from "../assets/logo.png";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
      setIsMenuOpen(false);
    }
  };

  const isHomePage = location.pathname === "/";

  const isPublicRoute = ["/", "/login", "/register"].includes(
    location.pathname
  );

  const commonSize =
    "block w-full md:inline-block md:w-auto text-center py-2 px-6 rounded-xl font-semibold border-2 transition-all duration-200 me-0 md:me-3 text-sm tracking-wide";

  // Lógica de Glassmorphism vs Normal
  const navClasses = isHomePage
    ? "absolute top-0 w-full bg-white/20 backdrop-blur-md border-b border-white/20 shadow-sm"
    : "relative w-full border-b-gray-50 bg-gradient-to-b from-teal-100 to-white";

  return (
    <nav className={`h-16 z-50 ${navClasses}`}>
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 h-full">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center space-x-2 rtl:space-x-reverse text-center text-xl text-teal-400 hover:text-teal-600 font-bold"
        >
          <img src={logo} className="h-10 w-auto" alt="Logo" />
          <span>INSIGHT CRXTO</span>
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-teal-400 rounded-lg md:hidden hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-200"
        >
          <span className="sr-only">Menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* MENÚ */}
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen
              ? "block absolute top-16 left-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
              : "hidden"
          } md:static md:bg-transparent md:shadow-none md:border-0`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row space-y-2 md:space-y-0 md:space-x-2 rtl:space-x-reverse md:mt-0 md:items-center">
            {isPublicRoute ? (
              <>
                {/* BOTÓN LOGIN */}
                {location.pathname !== "/login" && (
                  <li>
                    <Link
                      to="/login"
                      className={`${commonSize} text-white hover:bg-teal-50/20 hover:text-white border-transparent`}
                    >
                      INICIAR SESIÓN
                    </Link>
                  </li>
                )}

                {/* BOTÓN REGISTRO */}
                {location.pathname !== "/register" && (
                  <li>
                    <Link
                      to="/register"
                      className={`${commonSize} border-teal-500 text-white bg-teal-500 hover:bg-teal-600 hover:border-teal-600 shadow-md hover:shadow-lg`}
                    >
                      REGISTRARSE
                    </Link>
                  </li>
                )}
              </>
            ) : (
              /* BOTÓN LOGOUT */
              <li>
                <button
                  onClick={handleLogout}
                  className={`${commonSize} text-teal-500 hover:text-teal-700 hover:bg-teal-50 border-transparent`}
                >
                  CERRAR SESIÓN
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
