import React from "react";

const TopMovers = ({ coins }) => {
  // Ordenar para ganadores (Mayor a menor porcentaje)
  const gainers = [...coins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 3);

  // Ordenar para perdedores (Menor a mayor porcentaje)
  const losers = [...coins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 3);

  // Sub-componente para cada fila (DRY)
  const CoinRow = ({ coin, isGainer }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-500 uppercase">
            {coin.symbol}
          </span>
          <span className="text-xs text-gray-400 truncate max-w-[80px]">
            ${coin.current_price.toLocaleString()}
          </span>
        </div>
      </div>
      <div
        className={`text-sm font-bold flex items-center gap-1 ${
          isGainer ? "text-teal-400" : "text-rose-500"
        }`}
      >
        {isGainer ? "▲" : "▼"}{" "}
        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* TARJETA GANADORES */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
          <span className="text-xl">🚀</span>
          <h3 className="font-bold text-gray-500">Top Ganadores (24h)</h3>
        </div>
        <div>
          {gainers.map((coin) => (
            <CoinRow key={coin.id} coin={coin} isGainer={true} />
          ))}
        </div>
      </div>

      {/* TARJETA PERDEDORES */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
          <span className="text-xl">📉</span>
          <h3 className="font-bold text-gray-500">Top Perdedores (24h)</h3>
        </div>
        <div>
          {losers.map((coin) => (
            <CoinRow key={coin.id} coin={coin} isGainer={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
