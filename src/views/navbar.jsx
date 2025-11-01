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
      // logout successful — navigate to home
      navigate("/");
    }
  };

  return (
    <nav className="border-gray-200 ">
      <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reversetext-center text-2xl text-teal-400 hover:text-teal-600 hover:underline font-semibold"
        > 
          <img src={logo} className="h-20" alt="Logo" />
          INSIGHT CRXTO
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row space-y-2 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {location.pathname === "/" && (
              <>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/register"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    REGISTRARSE
                  </Link>
                </li>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/login"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    INICIAR SESIÓN
                  </Link>
                </li>
              </>
            )}
            {location.pathname === "/dashboard" && (
              <li className="mb-0 md:mb-0">
                <Link
                  onClick={handleLogout}
                  to="/"
                  className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                >
                  CERRAR SESIÓN
                </Link>
              </li>
            )}
            {location.pathname === "/register" && (
              <>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    INICIO
                  </Link>
                </li>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/login"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    INICIAR SESIÓN
                  </Link>
                </li>
              </>
            )}
            {location.pathname === "/login" && (
              <>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/register"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    REGISTRARSE
                  </Link>
                </li>
                <li className="mb-0 md:mb-0">
                  <Link
                    to="/"
                    className="block w-full text-center md:inline-block md:w-auto text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
                  >
                    INICIO
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
