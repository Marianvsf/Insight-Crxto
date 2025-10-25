import { useEffect, useState } from "react";
import PriceGraph from "../components/PriceGraph";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOffirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coins.slice(indexOffirstItem, indexOfLastItem);

  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(
        `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching coins:", response.statusText);
      }
      const data = await response.json();
      setCoins(data);
    };
    fetchCoins();
  }, []);

  return (
    <main>
      <h1>Bienvenido de nuevo, </h1>;
      {/*<PriceGraph coin={{ name: "Figure Heloc", id: "figure-heloc" }} />
      <PriceGraph coin={{ name: "USDT0", id: "usdt0" }} />*/}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Precio actual</th>

            {/* -------Details of bitcoins--------
            <th>Capitalización de Mercado</th>
            <th>Ranking por Capitalización de Mercado</th>
            <th>Volumen Total de Negociación en 24 horas</th>
            <th>Precios máximo</th>
            <th>Precios mínimo</th>
            <th>Cambio Porcentual de Precio en 24 horas</th>
            <th>Suministro Circulante</th>
            <th>Suministro Total</th>*/}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>
                <img src={coin.image} alt={coin.name} width="25" />
              </td>
              <td>{coin.current_price}$</td>
              {/*
              <td>{coin.market_cap}</td>
              <td>{coin.market_cap_rank}</td>
              
              <td>{coin.total_volume}</td>
              <td>{coin.high_24h}</td>
              <td>{coin.low_24h}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.circulating_supply}</td>
              <td>{coin.total_supply}</td>*/}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
          {/* Botón de retroceso */}
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>

          {/* Números de página */}
          {pageNumbers.map((number) => (
            <li key={number} style={{ margin: "0 5px" }}>
              <button
                onClick={() => paginate(number)}
                style={{
                  fontWeight: currentPage === number ? "bold" : "normal",
                  backgroundColor: currentPage === number ? "#ccc" : "white",
                }}
              >
                {number}
              </button>
            </li>
          ))}

          {/* Botón de avance */}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
