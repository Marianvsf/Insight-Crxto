import { useState, useEffect, useMemo, useCallback } from "react";
import { getMockUsers } from "../mocks/mockUsers.js";
import { CryptoSwapForm } from "./cryptoSwap.jsx";
import TopMovers from "./topMovers.jsx";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

const UserBalances = ({ userId }) => {
  const [cryptoMarketData, setCryptoMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentUser = getMockUsers().find((u) => u.id === userId);
  const userBalances = currentUser ? currentUser.cryptoBalances : [];

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        setCryptoMarketData(data);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los precios de las criptomonedas.");
        setCryptoMarketData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrices();
  }, [refreshKey]);

  const dataForTable = useMemo(() => {
    if (cryptoMarketData.length === 0 || userBalances.length === 0) {
      return [];
    }

    const priceMap = cryptoMarketData.reduce((map, coin) => {
      map[coin.id] = coin;
      return map;
    }, {});

    return userBalances.map((balance) => {
      const priceData = priceMap[balance.id];
      const currentPrice = priceData ? priceData.current_price : 0;
      const totalValueUSD = balance.balance * currentPrice;

      return {
        ...balance,
        currentPrice,
        totalValueUSD,
        image: priceData ? priceData.image : "",
        priceChange24h: priceData
          ? priceData.price_change_percentage_24h
          : null,
      };
    });
  }, [cryptoMarketData, userBalances]);

  const totalPortfolioValue = dataForTable.reduce(
    (sum, item) => sum + item.totalValueUSD,
    0
  );

  const handleSwapClick = () => {
    if (userBalances.length < 1) {
      alert("Necesitas tener al menos un saldo para iniciar un intercambio.");
      return;
    }
    setIsSwapping(true);
  };
  const handleCloseSwap = useCallback(() => {
    setIsSwapping(false);
  }, []);
  const handleSwapComplete = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  if (!currentUser) {
    return (
      <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">
        Error: Usuario con {userId} no encontrado.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-gray-600 p-4">Cargando precios de mercado...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">
        Error: {error}
      </p>
    );
  }

  if (userBalances.length === 0) {
    return (
      <p className="text-gray-600 p-4 bg-gray-100 rounded-lg">
        El usuario {currentUser.firstName} no tiene balances registrados.
      </p>
    );
  }

  return (
    <div className="bg-white p-6 shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
        Portafolio de {currentUser.firstName} 💰
      </h2>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button
          onClick={handleSwapClick}
          disabled={isSwapping}
          className={`
            py-2 px-4 rounded-lg shadow-md text-sm font-bold uppercase
            transition duration-150 ease-in-out
            ${
              isSwapping
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            }
          `}
        >
          {isSwapping ? "Intercambio Abierto" : "Realizar Intercambio 🔄"}
        </button>

        <p className="total-value text-xl font-medium text-gray-800">
          Valor Total Estimado:{" "}
          <strong className="text-teal-600 font-extrabold text-2xl">
            $
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(totalPortfolioValue)}{" "}
            USD
          </strong>
        </p>
      </div>

      {isSwapping && (
        <div className="mb-8 border border-teal-300 p-4 rounded-lg bg-teal-50/50 shadow-inner">
          <CryptoSwapForm
            userId={userId}
            onSwapComplete={handleSwapComplete}
            onClose={handleCloseSwap}
            marketData={cryptoMarketData}
          />
        </div>
      )}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criptomoneda
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saldo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio (USD)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variación 24h
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total (USD)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {dataForTable.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="20"
                    height="20"
                    className="mr-3 h-5 w-5"
                  />
                  {item.name} (
                  <span className="uppercase ml-1 font-bold text-teal-600">
                    {item.symbol}
                  </span>
                  )
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700 font-mono">
                  {item.balance.toFixed(8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700 font-mono">
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  }).format(item.currentPrice)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${
                    item.priceChange24h > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.priceChange24h !== null
                    ? `${item.priceChange24h.toFixed(2)}%`
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900 font-mono">
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.totalValueUSD)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cryptoMarketData.length > 0 && (
        <div className="my-8">
          <TopMovers coins={cryptoMarketData} />
        </div>
      )}
    </div>
  );
};

export default UserBalances;
