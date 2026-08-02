import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import HowItWorks from "../components/howItWorks.jsx";
import TopMovers from "../components/TopMovers.jsx";
import { PricingPlans } from "../components/pricingPlans.jsx";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY =
  import.meta.env.VITE_COINGECKO_KEY || "CG-qpB7vSSJxz2hyL8M2QWJfZrS";

function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlans, setShowPlans] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [supportStatus, setSupportStatus] = useState(null);

  const handleSupportChange = (e) => {
    setSupportForm({ ...supportForm, [e.target.name]: e.target.value });
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();

    if (!supportForm.name || !supportForm.email || !supportForm.message) {
      setSupportStatus({
        type: "error",
        msg: "Por favor, completa los campos obligatorios.",
      });
      return;
    }

    console.log("Enviando soporte:", supportForm);
    setSupportStatus({
      type: "success",
      msg: "¡Mensaje enviado con éxito! Te responderemos pronto.",
    });
    setSupportForm({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del mercado.");
        }

        const data = await response.json();
        if (isMounted) setCoins(data);
      } catch (err) {
        console.error("Error cargando mercado:", err);
        if (isMounted)
          setError(
            "Hubo un problema al conectar con el servidor. Inténtalo más tarde.",
          );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCoins();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-teal-500 selection:text-white">
      {/* Hero & Intro */}
      <HeaderContent />
      <CryptoTicker />

      {/* Sección del Mercado */}
      <section className="py-16 bg-gray-50/70 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          {/* Encabezado de la sección */}
          <div className="text-center mb-12 transform transition-all duration-700">
            <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
              En Vivo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3 tracking-tight">
              Tendencias del Mercado 🔥
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
              Descubre las criptomonedas con mayor movimiento y capitalización
              en las últimas 24 horas.
            </p>
          </div>

          {/* Estados: Cargando -> Error -> Contenido */}
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="w-full h-72 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between animate-pulse shadow-sm">
                <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-200 rounded-md"></div>
                  <div className="h-10 bg-gray-200 rounded-md w-11/12"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 px-4 bg-red-50 rounded-2xl border border-red-100 max-w-xl mx-auto">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700 underline"
                >
                  Recargar página
                </button>
              </div>
            ) : (
              <div className="transition-all duration-500 ease-in-out">
                <TopMovers coins={coins} />
              </div>
            )}
          </div>

          {/* Call To Action Secundario */}
          <div className="mt-12 text-center">
            <Link
              to="/mercado"
              className="inline-flex items-center gap-2 font-bold text-teal-600 hover:text-teal-700 group transition-colors text-lg"
            >
              Ver el resumen del mercado
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Características / Cómo funciona */}
      <HowItWorks />

      {/* Planes y Precios */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] text-center">
          <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
            Planes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3 tracking-tight">
            Encuentra el plan ideal para ti
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg mb-8">
            Desde traders que recién empiezan hasta equipos profesionales,
            tenemos un plan pensado para cada necesidad.
          </p>
          <button
            type="button"
            onClick={() => setShowPlans((prev) => !prev)}
            aria-expanded={showPlans}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
          >
            {showPlans ? "Ocultar planes y precios" : "Ver planes y precios"}
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${showPlans ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`grid transition-all duration-500 ease-in-out ${
              showPlans
                ? "grid-rows-[1fr] opacity-100 mt-10"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <PricingPlans />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4 border border-teal-400/20">
                  Soporte Crypto
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  ¿Necesitas ayuda con tu cuenta o una transacción?
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  Nuestro equipo puede ayudarte con acceso, billetera, depósitos
                  y cualquier duda de la plataforma. Accede al centro de
                  soporte y envíanos tu consulta.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSupport((prev) => !prev)}
                  aria-expanded={showSupport}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
                >
                  {showSupport ? "Cerrar soporte" : "Contactar soporte"}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${showSupport ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Formulario de soporte desplegable */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                showSupport
                  ? "grid-rows-[1fr] opacity-100 mt-8"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 pt-8">
                  {supportStatus && (
                    <div
                      className={`flex items-center gap-3 mb-6 p-4 rounded-2xl text-sm font-medium ${
                        supportStatus.type === "error"
                          ? "bg-red-500/10 text-red-300 border border-red-400/20"
                          : "bg-teal-500/10 text-teal-300 border border-teal-400/20"
                      }`}
                    >
                      {supportStatus.type === "error" ? (
                        <svg
                          className="w-5 h-5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {supportStatus.msg}
                    </div>
                  )}

                  <form
                    onSubmit={handleSupportSubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-200">
                          Nombre *
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Ej. Ana Pérez"
                          value={supportForm.name}
                          onChange={handleSupportChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-200">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="ana@ejemplo.com"
                          value={supportForm.email}
                          onChange={handleSupportChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-200">
                        Asunto{" "}
                        <span className="text-slate-400 font-normal">
                          (Opcional)
                        </span>
                      </label>
                      <input
                        name="subject"
                        type="text"
                        placeholder="¿Cómo podemos ayudarte?"
                        value={supportForm.subject}
                        onChange={handleSupportChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-200">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        placeholder="Escribe los detalles aquí..."
                        value={supportForm.message}
                        onChange={handleSupportChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all duration-300 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSupportForm({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                          setSupportStatus(null);
                        }}
                        className="px-6 py-3 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
                      >
                        Limpiar
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
