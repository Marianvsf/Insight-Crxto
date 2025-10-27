import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/chinchin-logo.png";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setMessage("¡Inicio de sesión exitoso! Serás redirigido al Home.");
      setIsSuccess(true);
      navigate("/");
    }
  };

  return (
    <nav className="border-gray-200 ">
      <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Chinchin Logo" />
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-centerp-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="true"
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                to="/register"
                className="text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
              >
                REGISTRARSE
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
              >
                INICIAR SESIÓN
              </Link>
            </li>
            <button>
              <Link
                onClick={handleLogout}
                to="/"
                className="text-teal-400 outline-1 p-2 px-3 rounded-xl hover:text-teal-600 hover:underline font-semibold"
              >
                CERRAR SESIÓN
              </Link>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
