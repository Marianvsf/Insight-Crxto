const MarketStatCard = ({
  title,
  value,
  subValue,
  isPositive,
  icon,
  color,
}) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-lg font-bold text-gray-900">{value}</h4>
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {subValue}
        </span>
      </div>
    </div>
  </div>
);

const MarketOverview = ({ coins }) => {
  if (!coins || coins.length === 0) return null;

  const sortedByChange = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];
  const btc = coins.find((c) => c.symbol === "btc") || coins[0];

  const marketSentiment =
    coins
      .slice(0, 10)
      .reduce((acc, curr) => acc + curr.price_change_percentage_24h, 0) / 10;
  const isBullish = marketSentiment > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* TARJETA BITCOIN */}
      <MarketStatCard
        title="Líder del Mercado (BTC)"
        value={`$${btc.current_price.toLocaleString()}`}
        subValue={`${btc.price_change_percentage_24h.toFixed(2)}%`}
        isPositive={btc.price_change_percentage_24h > 0}
        color="bg-orange-500"
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        }
      />

      {/* TARJETA TOP GAINER */}
      <MarketStatCard
        title="Mejor Rendimiento (24h)"
        value={topGainer.symbol.toUpperCase()}
        subValue={`+${topGainer.price_change_percentage_24h.toFixed(2)}%`}
        isPositive={true}
        color="bg-green-500"
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        }
      />

      {/* TARJETA TOP LOSER */}
      <MarketStatCard
        title="Mayor Caída (24h)"
        value={topLoser.symbol.toUpperCase()}
        subValue={`${topLoser.price_change_percentage_24h.toFixed(2)}%`}
        isPositive={false}
        color="bg-red-500"
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        }
      />

      {/* TARJETA SENTIMIENTO */}
      <MarketStatCard
        title="Tendencia Global"
        value={isBullish ? "Alcista (Bullish)" : "Bajista (Bearish)"}
        subValue={marketSentiment.toFixed(2) + "%"}
        isPositive={isBullish}
        color={isBullish ? "bg-teal-500" : "bg-gray-500"}
        icon={isBullish ? "🐂" : "🐻"}
      />
    </div>
  );
};
export default MarketOverview;
