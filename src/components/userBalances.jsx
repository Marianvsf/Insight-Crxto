import { useState, useEffect, useMemo, useCallback } from "react";
import { getMockUsers } from "../mocks/mockUsers.js";
import { CryptoSwapForm } from "./cryptoSwap.jsx";
import TopMovers from "./TopMovers.jsx"; // Asegúrate de que coincida mayúscula/minúscula

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

const ASSET_COLORS = [
  "bg-orange-500",
  "bg-blue-600",
  "bg-teal-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
];

const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
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
        setError("Error cargando precios.");
        setCryptoMarketData([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadPrices();
  }, [refreshKey]);

  // --- LÓGICA DE CÁLCULO OPTIMIZADA (Fix del error anterior) ---
  const portfolioData = useMemo(() => {
    if (!cryptoMarketData.length || !userBalances.length) {
      return {
        items: [],
        totalValue: 0,
        total24hChange: 0,
        total24hChangePct: 0,
      };
    }

    const priceMap = cryptoMarketData.reduce((map, coin) => {
      map[coin.id] = coin;
      return map;
    }, {});

    let totalCurrentValue = 0;
    let totalValue24hAgo = 0;

    const items = userBalances.map((balance) => {
      const priceData = priceMap[balance.id];
      const currentPrice = priceData ? priceData.current_price : 0;
      const changePct = priceData ? priceData.price_change_percentage_24h : 0;

      const totalValueUSD = balance.balance * currentPrice;

      // Cálculo del valor hace 24h
      const price24hAgo = currentPrice / (1 + changePct / 100);
      const value24hAgo = balance.balance * price24hAgo;

      totalCurrentValue += totalValueUSD;
      totalValue24hAgo += value24hAgo;

      return {
        ...balance,
        currentPrice,
        totalValueUSD,
        image: priceData ? priceData.image : "",
        symbol: priceData ? priceData.symbol : "",
        priceChange24h: changePct,
        name: priceData ? priceData.name : balance.id,
      };
    });

    const total24hChange = totalCurrentValue - totalValue24hAgo;
    const total24hChangePct =
      totalValue24hAgo !== 0 ? (total24hChange / totalValue24hAgo) * 100 : 0;

    // Ordenar de mayor a menor valor
    const sortedItems = [...items].sort(
      (a, b) => b.totalValueUSD - a.totalValueUSD
    );

    return {
      items: sortedItems,
      totalValue: totalCurrentValue,
      total24hChange,
      total24hChangePct,
    };
  }, [cryptoMarketData, userBalances]);

  const { items, totalValue, total24hChange, total24hChangePct } =
    portfolioData;

  const handleSwapClick = () => {
    if (isSwapping) {
      setIsSwapping(false);
      return;
    }
    if (userBalances.length < 1) {
      alert("Necesitas saldo para intercambiar.");
      return;
    }
    setIsSwapping(true);
  };

  const handleDeposit = () => alert("🟢 Simulación: Depositar...");
  const handleSend = () => alert("🔴 Simulación: Enviar...");
  const handleCloseSwap = useCallback(() => setIsSwapping(false), []);
  const handleSwapComplete = useCallback(
    () => setRefreshKey((prev) => prev + 1),
    []
  );

  if (!currentUser)
    return <p className="text-red-500 p-4">Usuario no encontrado.</p>;
  if (isLoading)
    return <p className="text-gray-500 p-4">Cargando portafolio...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  const isProfit = total24hChange >= 0;

  return (
    <div className="bg-white p-6 shadow-2xl rounded-xl">
      {/* 1. HEADER RESTAURADO (Estilo original) */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
        Portafolio de {currentUser.firstName} 💰
      </h2>

      {/* 2. SECCIÓN DE SALDO (Estilo original + P&L añadido sutilmente) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <p className="total-value text-xl font-medium text-gray-800">
            Valor Total Estimado:{" "}
            <strong className="text-teal-600 font-extrabold text-2xl">
              $
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(totalValue)}{" "}
              USD
            </strong>
          </p>
          {/* P&L añadido justo debajo del saldo, sin romper el estilo original */}
          <p
            className={`text-sm mt-1 font-semibold ${
              isProfit ? "text-green-600" : "text-red-600"
            }`}
          >
            {isProfit ? "▲" : "▼"} {Math.abs(total24hChangePct).toFixed(2)}%
            <span className="text-gray-500 font-normal ml-1">
              ({isProfit ? "+" : "-"}$
              {Math.abs(total24hChange).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              en 24h)
            </span>
          </p>
        </div>
      </div>

      {/* 3. BOTONES DE ACCIÓN (Integrados debajo del saldo) */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={handleDeposit}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            ⬇
          </div>
          <span className="text-sm font-bold text-gray-700 group-hover:text-teal-700">
            Recibir
          </span>
        </button>

        <button
          onClick={handleSend}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            ⬆
          </div>
          <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700">
            Enviar
          </span>
        </button>

        <button
          onClick={handleSwapClick}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all group ${
            isSwapping
              ? "bg-purple-50 border-purple-200 ring-2 ring-purple-100"
              : "bg-gray-50 border-transparent hover:bg-purple-50 hover:border-purple-200"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 ${
              isSwapping
                ? "bg-purple-200 text-purple-700 rotate-180"
                : "bg-purple-100 text-purple-600 group-hover:scale-110"
            }`}
          >
            {isSwapping ? "✕" : "🔄"}
          </div>
          <span
            className={`text-sm font-bold ${
              isSwapping
                ? "text-purple-700"
                : "text-gray-700 group-hover:text-purple-700"
            }`}
          >
            {isSwapping ? "Cerrar" : "Swap"}
          </span>
        </button>
      </div>

      {/* 4. BARRA DE DISTRIBUCIÓN */}
      {totalValue > 0 && (
        <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">
            <span>Distribución de Activos</span>
            <span>{items.length} Monedas</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
            {items.map((item, index) => {
              const percentage = (item.totalValueUSD / totalValue) * 100;
              if (percentage < 1) return null;
              return (
                <div
                  key={item.id}
                  style={{ width: `${percentage}%` }}
                  className={`h-full ${
                    ASSET_COLORS[index % ASSET_COLORS.length]
                  } hover:opacity-90 transition-opacity`}
                  title={`${item.name}: ${percentage.toFixed(2)}%`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            {items.slice(0, 4).map((item, index) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    ASSET_COLORS[index % ASSET_COLORS.length]
                  }`}
                />
                <span className="text-xs text-gray-600 font-bold uppercase">
                  {item.symbol}{" "}
                  <span className="font-normal text-gray-500 ml-1">
                    {((item.totalValueUSD / totalValue) * 100).toFixed(0)}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FORMULARIO SWAP (Se muestra al hacer click en el botón Swap) */}
      {isSwapping && (
        <div className="mb-8 border border-purple-200 p-4 rounded-lg bg-purple-50/50 shadow-inner">
          <CryptoSwapForm
            userId={userId}
            onSwapComplete={handleSwapComplete}
            onClose={handleCloseSwap}
            marketData={cryptoMarketData}
          />
        </div>
      )}

      {/* TABLA DE BALANCES */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saldo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="20"
                    className="mr-3 h-5 w-5"
                  />
                  {item.name}{" "}
                  <span className="uppercase ml-1 font-bold text-teal-600">
                    {item.symbol}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700 font-mono">
                  {item.balance.toFixed(8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700 font-mono">
                  $
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
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
                  }).format(item.totalValueUSD)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WIDGET TOP MOVERS (Footer) */}
      {cryptoMarketData.length > 0 && (
        <div className="mt-8">
          <TopMovers coins={cryptoMarketData} />
        </div>
      )}
    </div>
  );
};

export default UserBalances;
