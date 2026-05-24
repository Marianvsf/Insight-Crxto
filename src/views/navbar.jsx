import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import logo from "../assets/logo.png";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      window.dispatchEvent(new Event("app-logout"));
      closeMenu();
      await new Promise((res) => setTimeout(res, 300));
      const success = await logout();
      if (success) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isHomePage = location.pathname === "/";
  const isPublicRoute = ["/", "/login", "/register"].includes(
    location.pathname,
  );

  const navClasses = isHomePage
    ? "bg-[#0B1120]/40 backdrop-blur-md border-white/[0.05]"
    : "bg-[#0B1120]/70 backdrop-blur-xl border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]";

  return (
    <nav
      className={`fixed top-0 inset-x-0 h-[72px] z-50 border-b transition-all duration-300 ${navClasses}`}
    >
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO CON EFECTO HOVER */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group relative flex items-center gap-3 z-50"
        >
          {/* Resplandor detrás del logo al hacer hover */}
          <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={logo}
            className="h-10 w-auto relative z-10 drop-shadow-[0_0_8px_rgba(45,212,191,0.3)] group-hover:scale-105 transition-transform duration-300"
            alt="Logo"
          />
          <span className="text-xl font-bold tracking-wide text-white relative z-10">
            INSIGHT <span className="text-teal-400">CRXTO</span>
          </span>
        </Link>

        {/* BOTÓN HAMBURGUESA ANIMADO (Móvil) */}
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          className="md:hidden z-50 relative p-2 text-gray-300 hover:text-teal-400 focus:outline-none transition-colors"
        >
          <span className="sr-only">Menú</span>
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span
              className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
            />
            <span
              className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
            />
          </div>
        </button>

        {/* MENÚ DE NAVEGACIÓN (Desktop & Mobile) */}
        <div
          className={`
            absolute top-[72px] left-0 w-full bg-[#0f172a]/95 backdrop-blur-3xl border-b border-white/[0.05] p-6 flex flex-col gap-5
            transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
            md:static md:w-auto md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:flex-row md:items-center md:gap-6
            ${isMenuOpen ? "opacity-100 translate-y-0 visible shadow-2xl" : "opacity-0 -translate-y-4 invisible md:opacity-100 md:translate-y-0 md:visible md:shadow-none"}
          `}
        >
          {/* Enlace Normal con efecto Underline */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="group relative text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 md:py-0 text-center md:text-left"
          >
            Soporte
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {isPublicRoute ? (
            <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
              {/* BOTÓN LOGIN: Texto sutil pero elegante */}
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full md:w-auto text-center px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              )}

              {/* BOTÓN REGISTRO: CTA Principal con brillo */}
              {location.pathname !== "/register" && (
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="relative group w-full md:w-auto overflow-hidden rounded-full p-[1px]"
                >
                  {/* Borde animado de cristal */}
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-500/50 via-emerald-400/50 to-teal-500/50 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Interior del botón */}
                  <div className="relative flex items-center justify-center w-full bg-[#0B1120] px-6 py-2.5 rounded-full transition-all duration-300 group-hover:bg-[#0B1120]/50">
                    <span className="text-sm font-semibold text-teal-400 group-hover:text-teal-300 transition-colors tracking-wide">
                      Registrarse
                    </span>
                  </div>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
              {/* BOTÓN LOGOUT: Rojo oscuro con efecto cristal */}
              <button
                onClick={handleLogout}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0)] hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
