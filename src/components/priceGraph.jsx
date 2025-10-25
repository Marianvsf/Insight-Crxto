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
import { useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    const dataGraphs = async () => {
      const coinId = coin.id || coin.name.toLowerCase();
      const response = await fetch(
        //id del coin para traer datos del gráfico
        `${URL_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=7${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error searching coun graph data", response.statusText);
        setPricesData([]);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data && data.prices) {
        setPricesData(data.prices);
      } else {
        setPricesData([]);
      }
    };
    dataGraphs();
  }, [coin.name, coin.id]);
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
        text: `Historial de Precios de ${coin.name} - Últimos 7 Días`,
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

  return (
    <div style={{ maxWidth: "800px", height: "400px", margin: "20px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
