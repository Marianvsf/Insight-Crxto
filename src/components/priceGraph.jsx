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
  Title,
  Tooltip,
  Legend
);

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export default function PriceGraph({ coin }) {
  const [pricesData, setPricesData] = useState([]);
  const [days, setDays] = useState("1");

  useEffect(() => {
    const dataGraphs = async () => {
      const coinId = coin.id || coin.name.toLowerCase();
      const response = await fetch(
        `${URL_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setPricesData([]);
        return;
      }
      const data = await response.json();
      if (data && data.prices) {
        setPricesData(data.prices);
      } else {
        setPricesData([]);
      }
    };
    dataGraphs();
  }, [coin.name, coin.id, days]);

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
          borderColor: coin.name === "Bitcoin" ? "orange" : "rgb(75, 192, 192)",
          pointRadius: 0,
          tension: 0.1,
        },
      ],
    };
  }, [pricesData, coin.name]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${coin.name}- Últimos ${days} Días`,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM d, h:mm a",
        },
        title: { display: true, text: "Tiempo" },
      },
      y: {
        title: { display: true, text: "Precio (USD)" },
        beginAtZero: false,
      },
    },
  };

  const handleDays = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 365) value = 365;
    setDays(value.toString());
  };

  return (
    <div className="w-full h-full p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Historial de Precios - Últimos{" "}
        <input
          type="number"
          onChange={handleDays}
          value={days}
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
        Días
      </h3>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
