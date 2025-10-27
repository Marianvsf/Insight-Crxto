import React, { useState, useEffect } from "react";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export const ConversionRate = ({
  ids,
  vs_currencies,
  refreshIntervalSeconds = 60,
  onDataFetched = () => {},
}) => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchConversionRate = async () => {
      const url = `${URL_BASE}/simple/price?ids=${encodeURIComponent(
        ids
      )}&vs_currencies=${encodeURIComponent(vs_currencies)}${API_KEY}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (mounted) {
          setRates(data);
          onDataFetched(data);
          setError(null);
          setLoading(false);
          setLastUpdated(new Date());
        }
      } catch (e) {
        console.error("Error fetching conversion rate:", e);
        if (mounted) {
          setError("No se pudieron cargar las tasas de cambio.");
          setRates(null);
          onDataFetched(null);
          setLoading(false);
        }
      }
    };
    const isValidPair =
      ids &&
      vs_currencies &&
      ids.split(",").length > 0 &&
      vs_currencies.split(",").length > 0;

    if (isValidPair) {
      fetchConversionRate();
      const intervalId = setInterval(
        fetchConversionRate,
        refreshIntervalSeconds * 1000
      );
      return () => {
        mounted = false;
        clearInterval(intervalId);
        console.log(`Polling detenido (intervalo ID: ${intervalId}).`);
      };
    } else {
      setLoading(false);
      setRates(null);
      onDataFetched(null);
    }
  }, [ids, vs_currencies, refreshIntervalSeconds, onDataFetched]);

  if (loading) {
    const displayIds = ids ? ids.split(",").join(" y ") : "criptomonedas";
    return <span>Cargando tasa de {displayIds}...</span>;
  }

  if (error) {
    return <span style={{ color: "red" }}>Error: {error}</span>;
  }

  if (!rates || Object.keys(rates).length === 0) {
    return (
      <span>
        Tasa no disponible para el par {ids?.toUpperCase()} /{" "}
        {vs_currencies?.toUpperCase()}.
      </span>
    );
  }
  return (
    <div>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Tasa se actualiza cada **{refreshIntervalSeconds}** segundos. (Última
        actualización: {lastUpdated.toLocaleTimeString()} 🔄)
      </p>
    </div>
  );
};
