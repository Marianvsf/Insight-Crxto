import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import logo from "../assets/logo.png";

// 1. EXTRAER CONSTANTES: Evita que se re-creen en cada render
const TOP_LEVEL_ROUTES = ["/", "/login", "/register", "/dashboard"];
const PUBLIC_ROUTES = ["/", "/login", "/register"];

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. OPTIMIZAR EVENT LISTENERS
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true }); // passive mejora el rendimiento del scroll
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    // 3. MEJOR LIMPIEZA DE ESTILOS
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      window.dispatchEvent(new Event("app-logout"));
      closeMenu();
      await new Promise((res) => setTimeout(res, 300));
      const success = await logout();
      if (success) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Variables de estado derivadas
  const isHomePage = location.pathname === "/";
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  const showLogoutButton = isAuthenticated && !isPublicRoute;
  const showBackButton = !TOP_LEVEL_ROUTES.includes(location.pathname);

  // Clases dinámicas
  const navBackground =
    isHomePage && !isScrolled
      ? "bg-transparent border-transparent"
      : "bg-[#0a0f1c]/80 backdrop-blur-2xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]";

  const navPadding = isScrolled ? "py-3" : "py-5";

  // 4. ABSTRAER LÓGICA REPETITIVA (Botones de Autenticación)
  const AuthLinks = ({ isMobile = false }) => {
    const baseClasses = isMobile
      ? "w-full text-center px-6 py-3.5 text-base rounded-xl transition-colors"
      : "text-sm transition-colors";

    if (showLogoutButton) {
      return (
        <button
          onClick={handleLogout}
          className={`${baseClasses} font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white ${!isMobile ? "px-5 py-2 rounded-full" : ""}`}
        >
          Cerrar Sesión
        </button>
      );
    }

    return (
      <>
        {location.pathname !== "/login" && (
          <Link
            to="/login"
            onClick={closeMenu}
            className={`${baseClasses} font-medium text-gray-200 hover:text-white ${isMobile ? "bg-white/5 hover:bg-white/10" : ""}`}
          >
            Iniciar Sesión
          </Link>
        )}
        {location.pathname !== "/register" && (
          <Link
            to="/register"
            onClick={closeMenu}
            className={`${baseClasses} font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-500/20 ${!isMobile ? "px-6 py-2.5 rounded-full hover:-translate-y-0.5" : ""}`}
          >
            {isMobile ? "Registrarse Gratis" : "Registrarse"}
          </Link>
        )}
      </>
    );
  };

  return (
    <header>
      <nav
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ease-out ${navBackground}`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 ${navPadding} flex items-center justify-between`}
        >
          {/* LOGO + BOTÓN VOLVER */}
          <div className="flex items-center gap-3 md:gap-5 z-50">
            <Link
              to="/"
              onClick={closeMenu}
              className="group relative flex items-center gap-3 focus:outline-none"
            >
              <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src={logo}
                className="h-9 md:h-10 w-auto relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out"
                alt="Logo Insight"
              />
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white relative z-10 flex gap-1.5">
                INSIGHT{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                  CRXTO
                </span>
              </span>
            </Link>

            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                aria-label="Volver a la página anterior"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <span aria-hidden="true">←</span> Volver
              </button>
            )}
          </div>

          {/* BOTÓN HAMBURGUESA ANIMADO */}
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden z-50 relative p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
          >
            <span className="sr-only">Menú</span>
            <div className="w-6 h-5 flex flex-col justify-between items-center relative">
              <span
                className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-[9px] bg-white" : ""}`}
              />
              <span
                className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-[9px] bg-white" : ""}`}
              />
            </div>
          </button>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4 border-l border-white/10 pl-8 ml-2">
              <AuthLinks isMobile={false} />
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY MÓVIL */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* MENÚ MÓVIL */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-[80px] inset-x-4 z-40 bg-[#131c2f]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <AuthLinks isMobile={true} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
