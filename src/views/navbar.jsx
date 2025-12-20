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

  const isPublicRoute = ["/", "/login", "/register"].includes(
    location.pathname
  );

  const commonSize =
    "block w-full sm:w-[240px] md:inline-block md:w-48 text-center p-2 px-3 rounded-xl font-semibold border-2 transition-all duration-200 me-3";

  return (
    <nav className="h-20 w-full relative z-50 border-b-gray-50 bg-gradient-to-b from-teal-100 to-white">
      <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto">
        {/* LOGO ORIGINAL */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse text-center text-2xl text-teal-400 hover:text-teal-600 font-semibold"
        >
          <img src={logo} className="h-20" alt="Logo" />
          INSIGHT CRXTO
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-teal-400 rounded-lg md:hidden hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
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

        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row space-y-2 md:space-y-0 md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0">
            {isPublicRoute ? (
              <>
                {/* BOTÓN LOGIN */}
                {location.pathname !== "/login" && (
                  <li className="mb-0 md:mb-0">
                    <Link
                      to="/login"
                      className={`${commonSize} text-teal-400 hover:text-teal-500 hover:scale-105`}
                    >
                      INICIAR SESIÓN
                    </Link>
                  </li>
                )}

                {/* BOTÓN REGISTRO */}
                {location.pathname !== "/register" && (
                  <li className="mb-0 md:mb-0">
                    <Link
                      to="/register"
                      className={`${commonSize} border-teal-500 text-white bg-teal-500 hover:bg-teal-600 hover:scale-105 hover:border-teal-600`}
                    >
                      REGISTRARSE
                    </Link>
                  </li>
                )}
              </>
            ) : (
              /* BOTÓN LOGOUT */
              <li className="mb-0 md:mb-0">
                <button
                  onClick={handleLogout}
                  className={`${commonSize} text-teal-400 hover:text-teal-600`}
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
