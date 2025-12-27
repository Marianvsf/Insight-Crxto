import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import HowItWorks from "../components/howItWorks.jsx";
import Navbar from "./navbar.jsx";
import { Footer } from "./Footer.jsx";
import { useEffect, useState } from "react";
import TopMovers from "../components/TopMovers.jsx";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false${API_KEY}`
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error cargando mercado:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <>
      <Navbar />
      <CryptoTicker />
      <HeaderContent />
      {/* <div className="mt-10 sm:container sm:mx-auto sm:max-w-md sm:px-6 lg:max-w-md lg:px-8 flex flex-col text-center items-center justify-center space-y-6 pb-10">
        <p className="text-2xl">
          Por favor, selecciona una de las siguientes opciones para continuar.
        </p>
        <div className="flex w-full gap-4 px-6 mt-5">
          <button className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-600 hover:scale-105 shadow-xl shadow-teal-500/30">
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </button>
          <button className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-600 hover:scale-105 shadow-xl shadow-teal-500/30">
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>*/}
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tendencias del Mercado 🔥
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Descubre las criptomonedas con mayor movimiento en las últimas 24
              horas.
            </p>
          </div>

          {/* Si está cargando, mostramos un pequeño esqueleto, si no, el widget */}
          {isLoading ? (
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <TopMovers coins={coins} />
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center font-bold text-teal-600 hover:text-teal-700 hover:underline transition-all"
            >
              Ver mercado completo en el Dashboard →
            </Link>
          </div>
        </div>
      </section>
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Home;
