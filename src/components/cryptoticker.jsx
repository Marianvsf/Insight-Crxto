import React, { useState } from "react";

const CryptoTicker = () => {
  const [isHovered, setIsHovered] = useState(false);

  const coins = [
    { name: "BTC", price: "$64,230", change: "+2.4%" },
    { name: "ETH", price: "$3,450", change: "-0.5%" },
    { name: "SOL", price: "$145", change: "+5.1%" },
    { name: "BNB", price: "$590", change: "-0.2%" },
    { name: "USDT", price: "$1.00", change: "0.0%" },
  ];

  return (
    <div
      className="relative flex w-full overflow-hidden bg-gray-950/90 backdrop-blur-md border-y border-gray-800/60 py-2.5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-10 w-full h-full bg-[linear-gradient(to_right,#030712_0%,transparent_5%,transparent_95%,#030712_100%)]" />
      <div
        className="flex w-fit animate-marquee"
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {[...Array(2)].map((_, arrayIndex) => (
          <div
            key={arrayIndex}
            className="flex shrink-0 items-center justify-around"
          >
            {coins.map((coin) => {
              const isPositive = coin.change.startsWith("+");
              const isNegative = coin.change.startsWith("-");
              const isNeutral = !isPositive && !isNegative;

              return (
                <div
                  key={`${arrayIndex}-${coin.name}`}
                  className="mx-3 flex items-center gap-2.5 rounded-full bg-gray-900/50 px-4 py-1.5 border border-gray-800/50 transition-colors hover:bg-gray-800/80 cursor-default"
                >
                  <span className="font-bold text-gray-100 tracking-wider text-sm">
                    {coin.name}
                  </span>

                  <span className="font-mono text-gray-400 text-sm">
                    {coin.price}
                  </span>

                  <span
                    className={`flex items-center text-xs font-semibold font-mono px-1.5 py-0.5 rounded-md ${
                      isPositive
                        ? "text-emerald-400 bg-emerald-400/10"
                        : isNegative
                          ? "text-rose-400 bg-rose-400/10"
                          : "text-gray-400 bg-gray-400/10"
                    }`}
                  >
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
