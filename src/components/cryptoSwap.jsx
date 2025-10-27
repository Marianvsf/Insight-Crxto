import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ConversionRate } from "./ConversionRate";
import { getMockUsers } from "../mocks/mockUsers";

const findUserAndBalances = (userId) => {
  const currentUser = getMockUsers().find((u) => u.id === userId);
  return {
    currentUser,
    userBalances: currentUser ? currentUser.cryptoBalances : [],
  };
};

export const CryptoSwapForm = ({
  userId,
  onSwapComplete,
  onClose,
  marketData,
}) => {
  const { currentUser, userBalances: initialBalances } =
    findUserAndBalances(userId);
  const [balances, setBalances] = useState(initialBalances);

  const userCryptos = useMemo(() => {
    return balances.map((b) => ({
      id: b.id,
      name: b.name,
      symbol: b.symbol.toUpperCase(),
    }));
  }, [balances]);

  const [cryptoFromId, setCryptoFromId] = useState(userCryptos[0]?.id || "");
  const [cryptoToId, setCryptoToId] = useState("");
  const [amountToSwap, setAmountToSwap] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [conversionRateData, setConversionRateData] = useState(null);
  const [swapError, setSwapError] = useState(null);
  const [swapSuccess, setSwapSuccess] = useState(false);

  useEffect(() => {
    if (cryptoFromId) {
      let initialTo = userCryptos.find((c) => c.id !== cryptoFromId)?.id;
      if (!initialTo && marketData.length > 0) {
        initialTo =
          marketData.find((c) => c.id !== cryptoFromId)?.id || marketData[0].id;
      }
      if (initialTo && initialTo !== cryptoToId) {
        setCryptoToId(initialTo);
      }
    } else if (marketData.length > 0 && cryptoToId === "") {
      setCryptoToId(marketData[0].id);
    }
  }, [cryptoFromId, marketData, userCryptos, cryptoToId]);

  const rateIds = `${cryptoFromId}`;
  const rateVsCurrencies = `${cryptoToId}`;

  useEffect(() => {
    const updatedUser = getMockUsers().find((u) => u.id === userId);
    setBalances(updatedUser ? updatedUser.cryptoBalances : initialBalances);
  }, [userId]);

  const currentRate = useMemo(() => {
    // Prefer conversion data from the ConversionRate component when available
    if (conversionRateData && cryptoFromId && cryptoToId) {
      const direct = conversionRateData[cryptoFromId]?.[cryptoToId];
      if (typeof direct === "number" && direct > 0) return direct;
    }

    // Fallback: compute rate using marketData (USD prices) if available.
    // 1 unit of cryptoFrom equals (priceFromUSD / priceToUSD) units of cryptoTo.
    const fromPrice = marketData.find(
      (c) => c.id === cryptoFromId
    )?.current_price;
    const toPrice = marketData.find((c) => c.id === cryptoToId)?.current_price;
    if (fromPrice != null && toPrice != null && toPrice > 0) {
      return fromPrice / toPrice;
    }

    return 0;
  }, [conversionRateData, cryptoFromId, cryptoToId, marketData]);

  const balanceFrom = balances.find((b) => b.id === cryptoFromId)?.balance || 0;
  const balanceTo = balances.find((b) => b.id === cryptoToId)?.balance || 0;
  const symbolFrom =
    balances.find((b) => b.id === cryptoFromId)?.symbol.toUpperCase() || "";
  const symbolTo =
    marketData.find((c) => c.id === cryptoToId)?.symbol.toUpperCase() || "";

  useEffect(() => {
    if (amountToSwap > 0 && currentRate > 0) {
      const received = amountToSwap * currentRate;
      setCalculatedAmount(received);
      setSwapError(null);
    } else {
      setCalculatedAmount(0);
    }
  }, [amountToSwap, currentRate]);

  const handleSwap = useCallback(() => {
    setSwapError(null);
    setSwapSuccess(false);

    if (amountToSwap <= 0) {
      setSwapError("La cantidad a intercambiar debe ser mayor a cero.");
      return;
    }
    if (amountToSwap > balanceFrom) {
      setSwapError(
        `Saldo insuficiente de ${symbolFrom}. Su saldo es ${balanceFrom.toFixed(
          8
        )}`
      );
      return;
    }

    if (currentRate === 0) {
      setSwapError(
        "No se ha podido obtener la tasa de cambio actual. Inténtelo de nuevo."
      );
      return;
    }

    const allUsers = getMockUsers();
    const userIndex = allUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      setSwapError("Error interno: Usuario no encontrado.");
      return;
    }

    const newBalances = [...allUsers[userIndex].cryptoBalances];

    const fromIndex = newBalances.findIndex((b) => b.id === cryptoFromId);
    if (fromIndex !== -1) {
      newBalances[fromIndex].balance -= amountToSwap;
    } else {
      setSwapError(
        `Error interno: Moneda ${cryptoFromId} no encontrada en balances.`
      );
      return;
    }
    const toIndex = newBalances.findIndex((b) => b.id === cryptoToId);
    if (toIndex !== -1) {
      newBalances[toIndex].balance += calculatedAmount;
    } else {
      const coinData = marketData.find((c) => c.id === cryptoToId);
      newBalances.push({
        id: cryptoToId,
        symbol: symbolTo.toLowerCase(),
        name:
          coinData?.name ||
          cryptoToId.charAt(0).toUpperCase() + cryptoToId.slice(1),
        balance: calculatedAmount,
      });
    }

    allUsers[userIndex].cryptoBalances = newBalances;
    setBalances(newBalances);
    onSwapComplete();
    setSwapSuccess(true);
    setAmountToSwap(0);
    setCalculatedAmount(0);
  }, [
    amountToSwap,
    calculatedAmount,
    balanceFrom,
    cryptoFromId,
    cryptoToId,
    symbolFrom,
    currentRate,
    userId,
    onSwapComplete,
    marketData,
    symbolTo,
  ]);

  const handleFromChange = (e) => {
    setCryptoFromId(e.target.value);
    setAmountToSwap(0);
    setCalculatedAmount(0);
    setSwapSuccess(false);
  };

  const handleToChange = (e) => {
    setCryptoToId(e.target.value);
    setAmountToSwap(0);
    setCalculatedAmount(0);
    setSwapSuccess(false);
  };

  const allAvailableCryptos = useMemo(() => {
    return marketData.map((c) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol.toUpperCase(),
    }));
  }, [marketData]);

  if (!currentUser) {
    return (
      <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">
        Error: Usuario no encontrado para realizar el intercambio.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg relative max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Realizar Intercambio de Criptomonedas
      </h2>
      <button
        onClick={onClose}
        className="
          absolute top-0 right-3 text-gray-500 hover:text-red-500 transition duration-150
          p-2 text-lg font-semibold
        "
        aria-label="Cerrar formulario de intercambio"
      >
        &times;
      </button>
      <div className="mb-4">
        <label
          htmlFor="cryptoFrom"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiero Intercambiar:
        </label>
        <select
          id="cryptoFrom"
          value={cryptoFromId}
          onChange={handleFromChange}
          className="
            w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
            focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900
          "
        >
          {userCryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol}) - Saldo:{" "}
              {balances.find((b) => b.id === crypto.id)?.balance.toFixed(8)}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          **Saldo de {symbolFrom}:**{" "}
          <span className="font-bold text-gray-800">
            {balanceFrom.toFixed(8)}
          </span>
        </p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="cryptoTo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Por (Recibir):
        </label>
        <select
          id="cryptoTo"
          value={cryptoToId}
          onChange={handleToChange}
          className="
            w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
            focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900
          "
        >
          {allAvailableCryptos
            .filter((crypto) => crypto.id !== cryptoFromId)
            .map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol})
                {balances.find((b) => b.id === crypto.id) &&
                  ` - Saldo Actual: ${balances
                    .find((b) => b.id === crypto.id)
                    ?.balance.toFixed(8)}`}
              </option>
            ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          **Saldo de {symbolTo}:**{" "}
          <span className="font-bold text-gray-800">
            {balanceTo.toFixed(8)}
          </span>
        </p>
      </div>
      <div className="mb-6 p-3 border border-dashed border-teal-400 bg-teal-50/50 rounded-lg">
        <ConversionRate
          ids={rateIds}
          vs_currencies={rateVsCurrencies}
          refreshIntervalSeconds={15}
          onDataFetched={setConversionRateData}
        />
        {currentRate > 0 ? (
          <p className="font-bold text-sm text-gray-700 mt-2">
            Tasa Actual: 1 <span className="text-teal-600">{symbolFrom}</span> ={" "}
            <span className="text-teal-600">
              {currentRate.toLocaleString(undefined, {
                maximumFractionDigits: 8,
              })}
            </span>{" "}
            {symbolTo}
          </p>
        ) : (
          <p className="text-sm text-yellow-600 mt-2">
            Cargando o Tasa de Cambio no disponible...
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="amountToSwap"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cantidad de {symbolFrom} a intercambiar:
        </label>
        <input
          type="number"
          id="amountToSwap"
          value={amountToSwap}
          min="0"
          step="any"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setAmountToSwap(value >= 0 ? value : 0);
            setSwapSuccess(false);
          }}
          className="
            w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
            focus:ring-teal-500 focus:border-teal-500 text-gray-900
          "
        />
        <button
          onClick={() => setAmountToSwap(balanceFrom)}
          className="
            mt-2 py-1 px-3 text-xs font-semibold rounded-md
            bg-gray-100 text-gray-700 hover:bg-gray-200 transition
          "
        >
          Máximo ({balanceFrom.toFixed(8)})
        </button>
      </div>
      <div className="mb-6 p-3 bg-green-50 border border-green-300 rounded-lg">
        <p className="font-bold text-green-700 text-sm">
          Cantidad Recibida Estimada de {symbolTo}:
        </p>
        <p className="text-xl font-extrabold text-green-600">
          {calculatedAmount.toFixed(8)} {symbolTo}
        </p>
      </div>
      {swapError && (
        <p className="text-red-600 font-bold mb-4 p-2 bg-red-50 border border-red-300 rounded-lg">
          ⚠️ Error: {swapError}
        </p>
      )}
      {swapSuccess && (
        <p className="text-green-600 font-bold mb-4 p-2 bg-green-50 border border-green-300 rounded-lg">
          ✅ ¡Intercambio completado con éxito!
        </p>
      )}
      <button
        onClick={handleSwap}
        disabled={
          amountToSwap <= 0 ||
          amountToSwap > balanceFrom ||
          currentRate === 0 ||
          swapSuccess
        }
        className={`
          w-full py-3 rounded-lg text-white font-bold uppercase transition duration-150
          ${
            amountToSwap <= 0 ||
            amountToSwap > balanceFrom ||
            currentRate === 0 ||
            swapSuccess
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 shadow-md focus:outline-none focus:ring-4 focus:ring-teal-300"
          }
        `}
      >
        Ejecutar Intercambio
      </button>
    </div>
  );
};
