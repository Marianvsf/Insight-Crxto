import { useEffect, useState, useCallback } from "react";
import FilterSort from "../components/filterSort";
import UserBalances from "../components/userBalances";
import { useAuthStore } from "../store/authStore";
import CoinDetailsTable from "../components/coinDetails";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { user } = useAuthStore();
  const username = user?.username || "Usuario";
  const currentUserId = user?.id;
  const [showBalances, setShowBalances] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate currentItems based on pagination
  const currentItems = filteredCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          }
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
      } catch (error) {
        setError("Fallo al cargar los datos.");
      }
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 30000);
    return () => clearInterval(intervalId);
  }, [filteredCoins.length]);

  useEffect(() => {
    // Reset currentPage when filteredCoins changes
    setCurrentPage(1);
  }, [filteredCoins]);

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
            className="mb-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out font-medium"
          >
            ← Volver al Tablero
          </button>
          <UserBalances userId={currentUserId} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenido de nuevo,{" "}
            <span className="text-teal-600">{username}</span>
          </h1>
          <button
            onClick={handleShowBalances}
            className="py-2 px-4 rounded-lg shadow-lg text-sm font-bold text-white uppercase bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
          >
            Ver Mi Balance 💰
          </button>
        </div>

        {selectedCoin ? (
          <CoinDetailsTable coin={selectedCoin} onClose={handleCloseDetails} />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Criptomonedas disponibles
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Última actualización: {lastUpdated.toLocaleTimeString()} 🔄 (Cada
              30 segundos)
            </p>

            {error && (
              <div className="text-sm text-red-800 bg-red-100 border border-red-200 p-3 rounded-lg font-medium mb-4">
                ⚠️ {error}
              </div>
            )}

            {coins.length === 0 ? (
              <p className="text-gray-600">Cargando datos de monedas...</p>
            ) : (
              <>
                <div className="mb-6">
                  <FilterSort
                    coins={coins}
                    setFilteredCoins={setFilteredCoins}
                    onFilterSortChange={handleFilterSortChange}
                  />
                </div>

                <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ranking
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Símbolo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio actual
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Capitalización de Mercado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cambio % (24h)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.map((coin) => (
                        <tr
                          key={coin.id}
                          className="hover:bg-gray-50 transition duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {coin.market_cap_rank}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              width="25"
                              className="mr-2"
                            />
                            <span className="uppercase font-semibold">
                              {coin.symbol}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {coin.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4,
                            }).format(coin.current_price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(coin.market_cap)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                              coin.price_change_percentage_24h > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleCoinClick(coin)}
                              className="text-teal-600 hover:text-teal-800 transition duration-150 font-medium"
                            >
                              Ver Detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="flex justify-center items-center mt-6"
                  aria-label="Pagination"
                >
                  <ul className="flex items-center space-x-2">
                    <li>
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`
                          px-4 py-2 text-sm font-medium rounded-lg border
                          transition duration-150 ease-in-out
                          ${
                            currentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }
                        `}
                      >
                        ← Anterior
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1}>
                        <button
                          onClick={() => paginate(index + 1)}
                          className={`
                            px-4 py-2 text-sm font-semibold rounded-lg
                            transition duration-150 ease-in-out
                            ${
                              currentPage === index + 1
                                ? "bg-teal-600 text-white shadow-md"
                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                            }
                          `}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`
                          px-4 py-2 text-sm font-medium rounded-lg border
                          transition duration-150 ease-in-out
                          ${
                            currentPage === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }
                        `}
                      >
                        Siguiente →
                      </button>
                    </li>
                  </ul>
                </nav>
                {filteredCoins.length === 0 && (
                  <p className="mt-4 text-center text-gray-600">
                    No se encontraron resultados con el filtro aplicado.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
