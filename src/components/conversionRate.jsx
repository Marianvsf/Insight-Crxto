import React, { useState, useEffect } from "react";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export const ConversionRate = ({ ids, vs_currencies }) => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          console.log("Tasas de conversión recibidas:", data);
        }
      } catch (e) {
        console.error("Error fetching conversion rate:", e);
        if (mounted) {
          setError("No se pudieron cargar las tasas de cambio.");
          setRates(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchConversionRate();

    return () => {
      mounted = false;
    };
  }, [ids, vs_currencies]);

  if (loading) {
    return <span>Cargando tasas de {ids.split(",").join(" y ")}...</span>;
  }

  if (error) {
    return <span style={{ color: "red" }}>Error: {error}</span>;
  }

  if (!rates || Object.keys(rates).length === 0) {
    return (
      <span>
        No se encontraron tasas de conversión para las criptomonedas
        seleccionadas.
      </span>
    );
  }

  return (
    <div>
      <h1>Tasas de Cambio Actuales:</h1>

      {Object.entries(rates).map(([cryptoId, cryptoRates]) => (
        <div
          key={cryptoId}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h2>
            {cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)} (
            {cryptoId.toUpperCase()})
          </h2>

          {Object.entries(cryptoRates).map(([currency, rateValue]) => (
            <p key={currency} style={{ margin: "5px 0" }}>
              1 **{cryptoId.toUpperCase()}** = **
              {rateValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })}
              ** {currency.toUpperCase()}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
