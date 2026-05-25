import { useEffect, useState, useCallback } from "react";
import FilterSort from "../components/filterSort.jsx";
import UserBalances from "../components/userBalances.jsx";
import { useAuthStore } from "../store/authStore.js";
import CoinDetailsTable from "../components/coinDetails.jsx";
import MarketOverview from "../components/MarketOverview.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import { Link } from "react-router-dom";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentSlide] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const galleryImages = [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img3.jpg",
  ];

  const { user } = useAuthStore();
  const username = user?.username || "Usuario";
  const currentUserId = user?.id;
  const [showBalances, setShowBalances] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatPriceChange = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return { label: "N/D", className: "text-gray-500" };
    }

    return {
      label: `${numericValue > 0 ? "+" : ""}${numericValue.toFixed(2)}%`,
      className:
        numericValue > 0
          ? "text-green-600"
          : numericValue < 0
            ? "text-red-600"
            : "text-gray-500",
    };
  };

  const currentItems = filteredCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Error fetching coins:", response.statusText);
        }
        const data = await response.json();
        setCoins(data);
        setLastUpdated(new Date());

        if (filteredCoins.length === 0) {
          setFilteredCoins(data);
        }
      } catch {
        setError("Fallo al cargar los datos.");
      }
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 30000);
    return () => clearInterval(intervalId);
  }, [filteredCoins.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCoins]);

  useEffect(() => {
    const onAppLogout = () => {
      setIsLoggingOut(true);
      // safety reset in case navigation doesn't occur
      setTimeout(() => setIsLoggingOut(false), 1200);
    };

    window.addEventListener("app-logout", onAppLogout);
    return () => window.removeEventListener("app-logout", onAppLogout);
  }, []);

  const handleFilterSortChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const handleCloseDetails = () => {
    setSelectedCoin(null);
  };

  const handleShowBalances = () => {
    setShowBalances(true);
  };

  const handleBackToDashboard = () => {
    setShowBalances(false);
  };

  if (showBalances) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto py-6">
          <button
            onClick={handleBackToDashboard}
            className="mb-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out font-medium w-full sm:w-auto text-center"
          >
            ← Volver al Tablero
          </button>
          <UserBalances userId={currentUserId} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50/50 relative ${isLoggingOut ? "pointer-events-none" : ""}`}
    >
      <CryptoTicker />

      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity">
          <div className="text-center space-y-3">
            <svg
              className="animate-spin mx-auto h-10 w-10 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <div className="text-sm font-semibold text-gray-700">
              CERRANDO SESIÓN...
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 lg:py-8 lg:px-8 max-w-[1400px] grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* COLUMNA PRINCIPAL (TABLA Y CONTENIDO) */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          {/* Header de Bienvenida adaptable */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Bienvenido de nuevo,{" "}
              <span className="text-teal-600 block sm:inline">{username}</span>
            </h1>
            <button
              onClick={handleShowBalances}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl shadow-md text-sm font-bold text-white uppercase bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out text-center"
            >
              Ver Mi Balance 💰
            </button>
          </div>

          {!selectedCoin && coins.length > 0 && (
            <div className="w-full overflow-hidden">
              <MarketOverview coins={coins} />
            </div>
          )}

          {selectedCoin ? (
            <CoinDetailsTable
              coin={selectedCoin}
              onClose={handleCloseDetails}
            />
          ) : (
            <>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Criptomonedas disponibles
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Última actualización: {lastUpdated.toLocaleTimeString()} 🔄
                  <span className="hidden sm:inline"> (Cada 30 segundos)</span>
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-800 bg-red-100 border border-red-200 p-3 rounded-lg font-medium">
                  ⚠️ {error}
                </div>
              )}

              {coins.length === 0 ? (
                <p className="text-gray-600 animate-pulse">
                  Cargando datos de monedas...
                </p>
              ) : (
                <>
                  <div className="w-full">
                    <FilterSort
                      coins={coins}
                      setFilteredCoins={setFilteredCoins}
                      onFilterSortChange={handleFilterSortChange}
                    />
                  </div>

                  {/* Wrapper para evitar rotura de layout en mobile */}
                  <div className="w-full overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Ranking
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Símbolo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Precio actual
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Cap. de Mercado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Cambio (24h)
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((coin) => {
                          const priceChange = formatPriceChange(
                            coin.price_change_percentage_24h,
                          );

                          return (
                            <tr
                              key={coin.id}
                              className="hover:bg-gray-50/70 transition duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {coin.market_cap_rank}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
                                <img
                                  src={coin.image}
                                  alt={coin.name}
                                  width="24"
                                  height="24"
                                  className="mr-2 rounded-full"
                                />
                                <span className="uppercase font-bold text-gray-800">
                                  {coin.symbol}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {coin.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono font-medium">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 4,
                                }).format(coin.current_price)}
                              </td>
                              {/* Ocultamos la capitalización en pantallas muy pequeñas para mejorar legibilidad */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono hidden md:table-cell">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }).format(coin.market_cap)}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${priceChange.className}`}
                              >
                                {priceChange.label}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button
                                  onClick={() => handleCoinClick(coin)}
                                  className="text-teal-600 hover:text-teal-800 transition duration-150 font-semibold"
                                >
                                  Ver Detalles
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Paginación adaptable */}
                  <nav
                    className="flex justify-center items-center mt-6 overflow-x-auto py-2"
                    aria-label="Pagination"
                  >
                    <ul className="flex items-center space-x-1 sm:space-x-2">
                      <li>
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition ${
                            currentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }`}
                        >
                          ←
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1}>
                          <button
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${
                              currentPage === index + 1
                                ? "bg-teal-600 text-white shadow-sm"
                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition ${
                            currentPage === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }`}
                        >
                          →
                        </button>
                      </li>
                    </ul>
                  </nav>

                  {filteredCoins.length === 0 && (
                    <p className="mt-4 text-center text-gray-500 text-sm">
                      No se encontraron resultados con el filtro aplicado.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* COLUMNA LATERAL (BARRA DE WIDGETS) */}
        <div className="lg:col-span-1 w-full">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* WIDGET 1: NFT SPOTLIGHT */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Mercado NFT
                </h3>
                <span className="text-[11px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                  Trending 🔥
                </span>
              </div>

              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] w-full bg-slate-900 group">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`NFT Collection ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                ))}

                <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                  <p className="text-[11px] text-teal-400 font-bold uppercase tracking-wider mb-1">
                    Floor Price: 2.5 ETH
                  </p>
                  <h4 className="text-base sm:text-lg font-bold leading-tight">
                    Colección "Genesis" <br /> & Metaverso
                  </h4>
                </div>

                <div className="absolute top-4 right-4 flex gap-1.5">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        idx === currentSlide
                          ? "bg-teal-500 scale-125"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center italic">
                  "Not your keys, not your coins. Mantén tus activos seguros."
                </p>
              </div>
            </div>

            {/* WIDGET 2: SOPORTE PREMIUM / SEGURIDAD */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                  <span className="text-lg">🛡️</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Centro de Seguridad
                </h3>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                ¿Problemas con una transacción o tu billetera? Nuestros expertos
                en Blockchain están disponibles 24/7.
              </p>

              <Link
                to="/contact"
                className="block w-full py-2.5 bg-teal-600 hover:bg-teal-700 rounded-xl text-xs sm:text-sm font-bold text-white transition-all text-center shadow-sm"
              >
                Contactar Soporte Crypto
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
