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
    if (conversionRateData && cryptoFromId && cryptoToId) {
      return conversionRateData[cryptoFromId]?.[cryptoToId] || 0;
    }
    return 0;
  }, [conversionRateData, cryptoFromId, cryptoToId]);

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
  ]);

  // Manejadores de cambio para los selectores
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
    return <p>Error: Usuario no encontrado para realizar el intercambio.</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        margin: "20px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Realizar Intercambio de Criptomonedas 🔄</h2>

      <button
        onClick={onClose}
        style={{
          float: "right",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Cerrar X
      </button>
      <div>
        <label
          htmlFor="cryptoFrom"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Quiero Intercambiar:
        </label>
        <select
          id="cryptoFrom"
          value={cryptoFromId}
          onChange={handleFromChange}
          style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
        >
          {userCryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol}) - Saldo:{" "}
              {balances.find((b) => b.id === crypto.id)?.balance.toFixed(8)}
            </option>
          ))}
        </select>
        <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
          **Saldo de {symbolFrom}:** **{balanceFrom.toFixed(8)}**
        </p>
      </div>
      <div>
        <label
          htmlFor="cryptoTo"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Por (Recibir):
        </label>
        <select
          id="cryptoTo"
          value={cryptoToId}
          onChange={handleToChange}
          style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
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
        <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
          **Saldo de {symbolTo}:** **{balanceTo.toFixed(8)}**
        </p>
      </div>
      <div
        style={{
          margin: "15px 0",
          padding: "10px",
          border: "1px dashed #007bff",
        }}
      >
        <ConversionRate
          ids={rateIds}
          vs_currencies={rateVsCurrencies}
          refreshIntervalSeconds={15}
          onDataFetched={setConversionRateData}
        />
        {currentRate > 0 ? (
          <p style={{ fontWeight: "bold" }}>
            Tasa Actual: 1 **{symbolFrom}** = **
            {currentRate.toLocaleString(undefined, {
              maximumFractionDigits: 8,
            })}
            ** **{symbolTo}**
          </p>
        ) : (
          <p>Cargando o Tasa de Cambio no disponible...</p>
        )}
      </div>
      <div>
        <label
          htmlFor="amountToSwap"
          style={{ display: "block", marginBottom: "5px" }}
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
          style={{
            padding: "8px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={() => setAmountToSwap(balanceFrom)}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
            border: "none",
            marginBottom: "10px",
          }}
        >
          Máximo ({balanceFrom.toFixed(8)})
        </button>
      </div>
      <div
        style={{
          margin: "10px 0",
          padding: "10px",
          backgroundColor: "#e9ffe9",
          border: "1px solid #4CAF50",
        }}
      >
        <p style={{ fontWeight: "bold" }}>
          Cantidad Recibida Estimada de {symbolTo}:
        </p>
        <p style={{ fontSize: "1.2em", color: "#4CAF50" }}>
          **{calculatedAmount.toFixed(8)}** **{symbolTo}**
        </p>
      </div>
      {swapError && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ Error: {swapError}
        </p>
      )}
      {swapSuccess && (
        <p style={{ color: "green", fontWeight: "bold" }}>
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
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
          width: "100%",
        }}
      >
        Ejecutar Intercambio
      </button>
    </div>
  );
};
