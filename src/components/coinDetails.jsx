import PriceGraph from "./priceGraph.jsx";

export default function CoinDetailsTable({ coin, onClose }) {
  if (!coin) {
    return null;
  }

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 10,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div
      className="
        bg-white p-6 shadow-xl rounded-xl border border-gray-200
        mb-8 relative
      "
    >
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4 text-xl font-semibold text-gray-400
          hover:text-red-500 transition duration-150
          p-1 leading-none
        "
        aria-label="Cerrar detalles de la moneda"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        Detalles de {coin.name} ({coin.symbol.toUpperCase()})
        <img
          src={coin.image}
          alt={coin.name}
          width="30"
          className="ml-3 h-7 w-7"
        />
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:order-1">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Ranking por Capitalización:
                </td>
                <td className="py-2 text-sm font-semibold text-gray-900">
                  #{formatNumber(coin.market_cap_rank)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Precio Actual:
                </td>
                <td className="py-2 text-sm font-bold text-teal-600">
                  {formatCurrency(coin.current_price)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Capitalización de Mercado:
                </td>
                <td className="py-2 text-sm text-gray-900 font-mono">
                  {formatCurrency(coin.market_cap)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Volumen Total de Negociación (24h):
                </td>
                <td className="py-2 text-sm text-gray-900 font-mono">
                  {formatCurrency(coin.total_volume)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Cambio Porcentual (24h):
                </td>
                <td
                  className={`py-2 text-sm font-semibold ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin.price_change_percentage_24h
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : "N/A"}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Precio Más Alto (24h):
                </td>
                <td className="py-2 text-sm text-green-600 font-semibold">
                  {formatCurrency(coin.high_24h)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Precio Más Bajo (24h):
                </td>
                <td className="py-2 text-sm text-red-600 font-semibold">
                  {formatCurrency(coin.low_24h)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Suministro Circulante:
                </td>
                <td className="py-2 text-sm text-gray-900 font-mono">
                  {formatNumber(coin.circulating_supply)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-sm font-medium text-gray-600">
                  Suministro Total:
                </td>
                <td className="py-2 text-sm text-gray-900 font-mono">
                  {formatNumber(coin.total_supply)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="lg:order-2">
          <PriceGraph coin={{ name: coin.name, id: coin.id }} />
        </div>
      </div>
    </div>
  );
}
