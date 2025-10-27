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
      };
    } else {
      setLoading(false);
      setRates(null);
      onDataFetched(null);
    }
  }, [ids, vs_currencies, refreshIntervalSeconds, onDataFetched]);

  if (loading) {
    const displayIds = ids ? ids.split(",").join(" y ") : "criptomonedas";
    return (
      <div className="flex items-center text-sm text-teal-600 font-medium">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Cargando tasa de {displayIds}...</span>
      </div>
    );
  }
  if (error) {
    return (
      <span className="text-red-600 font-medium text-sm">
        Error: {error} 🔴
      </span>
    );
  }

  if (!rates || Object.keys(rates).length === 0) {
    return (
      <span className="text-yellow-600 text-sm">
        Tasa no disponible para el par {ids?.toUpperCase()} /{" "}
        {vs_currencies?.toUpperCase()}. ⚠️
      </span>
    );
  }
  return (
    <div className="p-2 border border-gray-100 rounded-md bg-white">
      <p className="text-xs text-gray-500 font-medium">
        Tasa se actualiza cada{" "}
        <strong className="text-teal-600">{refreshIntervalSeconds}</strong>{" "}
        segundos. (Última actualización:{" "}
        <span className="font-semibold">
          {lastUpdated.toLocaleTimeString()}
        </span>{" "}
        🔄)
      </p>
    </div>
  );
};
