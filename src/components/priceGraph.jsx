import { useEffect, useMemo, useState } from "react";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_CG_API_KEY
  ? `&x_cg_demo_api_key=${import.meta.env.VITE_CG_API_KEY}`
  : "";

const PRESETS = [
  { label: "1D", value: 1 },
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
  { label: "1A", value: 365 },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function PriceGraph({ coin }) {
  const [pricesData, setPricesData] = useState([]);
  const [days, setDays] = useState(1);
  const [inputDays, setInputDays] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce: sincroniza el valor del input con `days` tras una pausa de escritura.
  useEffect(() => {
    const handle = setTimeout(() => {
      let value = parseInt(inputDays, 10);
      if (isNaN(value) || value < 1) value = 1;
      if (value > 365) value = 365;
      setDays(value);
    }, 500);
    return () => clearTimeout(handle);
  }, [inputDays]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const dataGraphs = async () => {
      const coinId = coin.id || coin.name.toLowerCase();
      try {
        const response = await fetch(
          `${URL_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}${API_KEY}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (mounted) {
          setPricesData(data && data.prices ? data.prices : []);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setError("No se pudo cargar el historial de precios.");
          setPricesData([]);
          setLoading(false);
        }
      }
    };

    dataGraphs();

    return () => {
      mounted = false;
    };
  }, [coin.name, coin.id, days]);

  const lineColor = coin.name === "Bitcoin" ? "#f97316" : "rgb(75, 192, 192)";
  const fillColor =
    coin.name === "Bitcoin"
      ? "rgba(249, 115, 22, 0.15)"
      : "rgba(75, 192, 192, 0.15)";

  const data = useMemo(() => {
    const chartData = pricesData.map(([timestamp, price]) => ({
      x: timestamp,
      y: price,
    }));
    return {
      datasets: [
        {
          label: `Precio de ${coin.name} (USD)`,
          data: chartData,
          borderColor: lineColor,
          backgroundColor: fillColor,
          fill: true,
          pointRadius: 0,
          tension: 0.2,
        },
      ],
    };
  }, [pricesData, coin.name, lineColor, fillColor]);

  const timeUnit = useMemo(() => {
    if (days <= 1) return "hour";
    if (days <= 30) return "day";
    if (days <= 90) return "week";
    return "month";
  }, [days]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: `${coin.name} - Últimos ${days} ${days === 1 ? "Día" : "Días"}`,
        },
        tooltip: {
          callbacks: {
            label: (context) => currencyFormatter.format(context.parsed.y),
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: timeUnit,
            tooltipFormat: "MMM d, h:mm a",
          },
          title: { display: true, text: "Tiempo" },
        },
        y: {
          title: { display: true, text: "Precio (USD)" },
          beginAtZero: false,
          ticks: {
            callback: (value) => currencyFormatter.format(value),
          },
        },
      },
    }),
    [coin.name, days, timeUnit],
  );

  const handlePreset = (value) => {
    setInputDays(value.toString());
    setDays(value);
  };

  const handleDays = (e) => {
    setInputDays(e.target.value);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Historial de Precios
      </h3>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => handlePreset(preset.value)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition duration-150 ${
              days === preset.value
                ? "bg-teal-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {preset.label}
          </button>
        ))}

        <div className="flex items-center gap-1 ml-auto text-sm text-gray-600">
          <span>Días:</span>
          <input
            type="number"
            onChange={handleDays}
            value={inputDays}
            min="1"
            max="365"
            className="
              w-16 px-2 py-1
              border border-gray-300 rounded-md
              text-sm text-center font-bold text-gray-700
              focus:ring-teal-500 focus:border-teal-500 focus:outline-none
              transition duration-150
            "
          />
        </div>
      </div>

      <div className="h-80 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full text-sm text-teal-600 font-medium">
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span>Cargando gráfico...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-red-600 font-medium text-sm">{error}</span>
          </div>
        ) : pricesData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 font-medium text-sm">
              Sin datos disponibles
            </span>
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}
