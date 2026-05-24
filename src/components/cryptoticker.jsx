import React from "react";

const CryptoTicker = () => {
  const coins = [
    { name: "BTC", price: "$64,230", change: "+2.4%" },
    { name: "ETH", price: "$3,450", change: "-0.5%" },
    { name: "SOL", price: "$145", change: "+5.1%" },
    { name: "BNB", price: "$590", change: "-0.2%" },
    { name: "USDT", price: "$1.00", change: "0.0%" }, // Cambiado a 0.0% para ser neutral
  ];

  return (
    // Contenedor principal con fondo oscuro y efecto cristal
    <div className="group relative flex w-full overflow-hidden bg-gray-950/90 backdrop-blur-md border-y border-gray-800/60 py-2.5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]">
      {/* 
        Máscara de difuminado para los bordes:
        Crea un efecto de desvanecimiento a la izquierda y derecha para que 
        el texto no se corte de golpe. Usa el mismo color del fondo (gray-950).
      */}
      <div className="pointer-events-none absolute inset-0 z-10 w-full h-full bg-[linear-gradient(to_right,#030712_0%,transparent_5%,transparent_95%,#030712_100%)]" />

      {/* Contenedor animado con pausa on-hover */}
      <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">
        {/* Renderizamos el array 2 veces para el bucle infinito sin duplicar código */}
        {[...Array(2)].map((_, arrayIndex) => (
          <div
            key={arrayIndex}
            className="flex shrink-0 items-center justify-around"
          >
            {coins.map((coin) => {
              // Lógica para determinar el estado de la moneda
              const isPositive = coin.change.startsWith("+");
              const isNegative = coin.change.startsWith("-");
              const isNeutral = !isPositive && !isNegative;

              return (
                <div
                  key={`${arrayIndex}-${coin.name}`}
                  className="mx-3 flex items-center gap-2.5 rounded-full bg-gray-900/50 px-4 py-1.5 border border-gray-800/50 transition-colors hover:bg-gray-800/80 cursor-default"
                >
                  {/* Nombre de la moneda */}
                  <span className="font-bold text-gray-100 tracking-wider text-sm">
                    {coin.name}
                  </span>

                  {/* Precio */}
                  <span className="font-mono text-gray-400 text-sm">
                    {coin.price}
                  </span>

                  {/* Porcentaje en formato Badge (Etiqueta) */}
                  <span
                    className={`flex items-center text-xs font-semibold font-mono px-1.5 py-0.5 rounded-md ${
                      isPositive
                        ? "text-emerald-400 bg-emerald-400/10"
                        : isNegative
                          ? "text-rose-400 bg-rose-400/10"
                          : "text-gray-400 bg-gray-400/10"
                    }`}
                  >
                    {/* Flechas indicadoras visuales */}
                    {isPositive && <span className="mr-0.5">↗</span>}
                    {isNegative && <span className="mr-0.5">↘</span>}
                    {isNeutral && <span className="mr-0.5">•</span>}

                    {coin.change.replace(/[+-]/, "")}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoTicker;
