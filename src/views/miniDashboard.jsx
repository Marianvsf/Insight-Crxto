import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useCoins } from "../hooks/useCoins.js";
import MarketOverview from "../components/MarketOverview.jsx";
import TopMovers from "../components/TopMovers.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";

const PREVIEW_SIZE = 5;

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const LOCKED_FEATURES = [
  {
    icon: "💰",
    title: "Tu balance y billetera",
    description: "Consulta tus saldos por moneda y su valor en tiempo real.",
  },
  {
    icon: "🔎",
    title: "Mercado completo",
    description: "Las 100 principales criptomonedas con filtros y búsqueda.",
  },
  {
    icon: "📊",
    title: "Detalle por moneda",
    description: "Gráficas de precio, histórico y conversión entre monedas.",
  },
];

export default function MiniDashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: coins = [], isLoading, isError, dataUpdatedAt } = useCoins();

  const previewCoins = coins.slice(0, PREVIEW_SIZE);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CryptoTicker />

      <main className="container mx-auto px-4 py-6 lg:py-8 lg:px-8 max-w-[1400px] space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
              Vista pública
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-3">
              Resumen del <span className="text-teal-600">mercado</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Última actualización:{" "}
              {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—"}{" "}
              🔄 <span className="hidden sm:inline">(cada 30 segundos)</span>
            </p>
          </div>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto text-center py-2.5 px-5 rounded-xl shadow-md text-sm font-bold text-white uppercase bg-teal-600 hover:bg-teal-700 transition duration-150"
            >
              Ir a mi dashboard →
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to="/login"
                className="text-center py-2.5 px-5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition duration-150"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-center py-2.5 px-5 rounded-xl shadow-md text-sm font-bold text-white uppercase bg-teal-600 hover:bg-teal-700 transition duration-150"
              >
                Crear cuenta gratis
              </Link>
            </div>
          )}
        </div>

        {isError && (
          <div className="text-sm text-red-800 bg-red-100 border border-red-200 p-3 rounded-lg font-medium">
            ⚠️ Fallo al cargar los datos de las criptomonedas.
          </div>
        )}

        {isLoading ? (
          <p className="text-gray-600 animate-pulse">
            Cargando datos de monedas...
          </p>
        ) : (
          <>
            {/* MÉTRICAS GENERALES (solo lectura: sin onSelectCoin) */}
            <MarketOverview coins={coins} />

            {/* GANADORES Y PERDEDORES */}
            {coins.length > 0 && <TopMovers coins={coins} />}

            {/* TABLA REDUCIDA */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Top {PREVIEW_SIZE} por capitalización
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Vista reducida. El listado completo con filtros y detalle está
                disponible al iniciar sesión.
              </p>

              <div className="w-full overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white">
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      {["#", "Moneda", "Precio", "Cambio (24h)"].map((label) => (
                        <th
                          key={label}
                          className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-left"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewCoins.map((coin) => {
                      const change = Number(coin.price_change_percentage_24h);
                      const isPositive = change > 0;
                      return (
                        <tr key={coin.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {coin.market_cap_rank}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <span className="flex items-center">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                width="24"
                                height="24"
                                className="mr-2 rounded-full"
                              />
                              <span className="uppercase font-bold text-gray-800 mr-2">
                                {coin.symbol}
                              </span>
                              {coin.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono font-medium">
                            {priceFormatter.format(coin.current_price)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                              isPositive
                                ? "text-green-600"
                                : change < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {Number.isFinite(change)
                              ? `${isPositive ? "+" : ""}${change.toFixed(2)}%`
                              : "N/D"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* FUNCIONES BLOQUEADAS */}
        {!isAuthenticated && (
          <section className="bg-slate-950 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_35%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Esto es solo una muestra 🔒
              </h2>
              <p className="text-slate-300 mt-3 max-w-2xl">
                Crea una cuenta gratis para desbloquear el dashboard completo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {LOCKED_FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="font-bold mt-3">{feature.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:-translate-y-0.5"
              >
                Registrarse gratis <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
