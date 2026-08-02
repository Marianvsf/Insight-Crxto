import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { useCoins } from "../hooks/useCoins.js";
import { useLogoutListener } from "../hooks/useLogoutListener.js";
import UserBalances from "../components/userBalances.jsx";
import CoinDetailsTable from "../components/coinDetails.jsx";
import MarketOverview from "../components/MarketOverview.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import CryptoTable from "../components/CryptoTable.jsx";
import NFTCarousel from "../components/NFTCarousel.jsx";
import SupportWidget from "../components/SupportWidget.jsx";
import LogoutOverlay from "../components/LogoutOverlay.jsx";

export default function Dashboard() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showBalances, setShowBalances] = useState(false);

  const isLoggingOut = useLogoutListener();
  const { data: coins = [] } = useCoins();

  const { user } = useAuthStore();
  const username = user?.username || "Usuario";
  const currentUserId = user?.id;

  if (showBalances) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto py-6">
          <button
            onClick={() => setShowBalances(false)}
            className="mb-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 font-medium w-full sm:w-auto"
          >
            ← Volver al Tablero
          </button>
          <UserBalances
            userId={currentUserId}
            onSelectCoin={(coin) => {
              setSelectedCoin(coin);
              setShowBalances(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50/50 relative ${isLoggingOut ? "pointer-events-none" : ""}`}
    >
      <CryptoTicker />
      <LogoutOverlay show={isLoggingOut} />

      <main className="container mx-auto px-4 py-6 lg:py-8 lg:px-8 max-w-[1400px] grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* COLUMNA PRINCIPAL */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Bienvenido de nuevo,{" "}
              <span className="text-teal-600 block sm:inline">{username}</span>
            </h1>
            <button
              onClick={() => setShowBalances(true)}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl shadow-md text-sm font-bold text-white uppercase bg-teal-600 hover:bg-teal-700 transition duration-150"
            >
              Ver Mi Balance 💰
            </button>
          </div>

          {!selectedCoin && coins.length > 0 && (
            <div className="w-full overflow-hidden">
              <MarketOverview coins={coins} onSelectCoin={setSelectedCoin} />
            </div>
          )}

          {selectedCoin ? (
            <CoinDetailsTable
              coin={selectedCoin}
              onClose={() => setSelectedCoin(null)}
            />
          ) : (
            <CryptoTable onSelectCoin={setSelectedCoin} />
          )}
        </div>

        {/* COLUMNA LATERAL (WIDGETS) */}
        <div className="lg:col-span-1 w-full">
          <div className="lg:sticky lg:top-24 space-y-6">
            <NFTCarousel />
            <SupportWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
