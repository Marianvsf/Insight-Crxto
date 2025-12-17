import React from "react";
const CryptoTicker = () => {
  const coins = [
    { name: "BTC", price: "$64,230", change: "+2.4%" },
    { name: "ETH", price: "$3,450", change: "-0.5%" },
    { name: "SOL", price: "$145", change: "+5.1%" },
  ];

  return (
    <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        {coins.map((coin) => (
          <span key={coin.name} className="mx-6 font-mono">
            <span className="font-bold">{coin.name}</span>: {coin.price}
            <span
              className={
                coin.change.includes("+")
                  ? "text-green-400 ml-2"
                  : "text-red-400 ml-2"
              }
            >
              ({coin.change})
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
export default CryptoTicker;
