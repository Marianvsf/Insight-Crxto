import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import HowItWorks from "../components/howItWorks.jsx";
import TopMovers from "../components/TopMovers.jsx";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY =
  import.meta.env.VITE_COINGECKO_KEY || "CG-qpB7vSSJxz2hyL8M2QWJfZrS";

function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
              to="/dashboard"
              className="inline-flex items-center gap-2 font-bold text-teal-600 hover:text-teal-700 group transition-colors text-lg"
            >
              Ver mercado completo en el Dashboard
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Características / Cómo funciona */}
      <HowItWorks />
    </div>
  );
}

export default Home;
