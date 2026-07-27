import { memo, useCallback, useMemo, useState } from "react";
import FilterSort from "./filterSort.jsx";
import { useCoins } from "../hooks/useCoins.js";

const ITEMS_PER_PAGE = 10;

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const marketCapFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatPriceChange(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue))
    return { label: "N/D", className: "text-gray-500" };

  return {
    label: `${numericValue > 0 ? "+" : ""}${numericValue.toFixed(2)}%`,
    className:
      numericValue > 0
        ? "text-green-600"
        : numericValue < 0
          ? "text-red-600"
          : "text-gray-500",
  };
}

const TABLE_HEADERS = [
  { label: "Ranking", className: "text-left" },
  { label: "Símbolo", className: "text-left" },
  { label: "Nombre", className: "text-left" },
  { label: "Precio actual", className: "text-left" },
  { label: "Cap. de Mercado", className: "text-left hidden md:table-cell" },
  { label: "Cambio (24h)", className: "text-left" },
  { label: "Acción", className: "text-center" },
];

function CryptoTable({ onSelectCoin }) {
  const { data: coins = [], isLoading, isError, dataUpdatedAt } = useCoins();

  const [filteredCoins, setFilteredCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(filteredCoins.length / ITEMS_PER_PAGE),
    [filteredCoins.length],
  );

  // Si el filtro reduce los resultados, no dejamos la página fuera de rango.
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const currentItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCoins.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCoins, safePage]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  // Estable: FilterSort no se re-renderiza por identidad de callback.
  const handleFilterSortChange = useCallback(() => setCurrentPage(1), []);

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Criptomonedas disponibles
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Última actualización:{" "}
          {dataUpdatedAt
            ? new Date(dataUpdatedAt).toLocaleTimeString()
            : "—"}{" "}
          🔄
          <span className="hidden sm:inline"> (Cada 30 segundos)</span>
        </p>
      </div>

      {isError && (
        <div className="text-sm text-red-800 bg-red-100 border border-red-200 p-3 rounded-lg font-medium mt-4">
          ⚠️ Fallo al cargar los datos de las criptomonedas.
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-600 animate-pulse mt-4">
          Cargando datos de monedas...
        </p>
      ) : (
        <>
          <FilterSort
            coins={coins}
            setFilteredCoins={setFilteredCoins}
            onFilterSortChange={handleFilterSortChange}
          />

          <div className="w-full overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white mt-4">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {TABLE_HEADERS.map((header) => (
                    <th
                      key={header.label}
                      className={`px-6 py-3 text-xs font-semibold text-gray-500 uppercase ${header.className}`}
                    >
                      {header.label}
                    </th>
                  ))}
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
                      onClick={() => onSelectCoin(coin)}
                      className="hover:bg-gray-50/70 transition duration-150 cursor-pointer"
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
                        {priceFormatter.format(coin.current_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono hidden md:table-cell">
                        {marketCapFormatter.format(coin.market_cap)}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${priceChange.className}`}
                      >
                        {priceChange.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => onSelectCoin(coin)}
                          className="text-teal-600 hover:text-teal-800 font-semibold"
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

          {filteredCoins.length > 0 ? (
            <nav className="flex justify-center items-center mt-6 overflow-x-auto py-2">
              <ul className="flex items-center space-x-1 sm:space-x-2">
                <li>
                  <button
                    onClick={() => paginate(safePage - 1)}
                    disabled={safePage === 1}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition ${safePage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    ←
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg transition border ${safePage === i + 1 ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => paginate(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition ${safePage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    →
                  </button>
                </li>
              </ul>
            </nav>
          ) : (
            <p className="mt-4 text-center text-gray-500 text-sm">
              No se encontraron resultados con el filtro aplicado.
            </p>
          )}
        </>
      )}
    </>
  );
}

export default memo(CryptoTable);
