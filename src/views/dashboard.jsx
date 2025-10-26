import { useEffect, useState } from "react";
import FilterSort from "../components/FilterSort";
import { ConversionRate } from "../components/conversionRate";
import UserBalances from "../components/userBalances";
import { useAuthStore } from "../store/authStore";
import CoinDetailsTable from "../components/coinDetails";
import { useNavigate } from "react-router-dom";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { user } = useAuthStore();
  const username = user?.username || "Usuario";
  const currentUserId = user?.id;
  const [showBalances, setShowBalances] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  {
    /*const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOffirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoins.slice(indexOffirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }*/
  }

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching coins:", response.statusText);
        }
        const data = await response.json();
        setCoins(data);
        setLastUpdated(new Date());

        if (filteredCoins.length === 0 || coins.length === 0) {
          setFilteredCoins(data);
        }
      } catch (error) {
        console.error("Fallo al obtener datos de las monedas:", error);
        setError("Fallo al cargar los datos.");
      }
    };

    fetchCoins();

    const intervalId = setInterval(fetchCoins, 30000);
    return () => clearInterval(intervalId);
  }, [selectedCoin]);

  const handleFilterSortChange = () => {
    setCurrentPage(1);
  };
  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  const handleCloseDetails = () => {
    setSelectedCoin(null);
  };
  const handleShowBalances = () => {
    console.log(currentUserId);
    setShowBalances(true);
  };

  // Función para volver al dashboard
  const handleBackToDashboard = () => {
    setShowBalances(false);
  };
  if (showBalances) {
    return (
      <div>
        {/* Botón para volver al Dashboard */}
        <button onClick={handleBackToDashboard}>← Volver al Dashboard</button>

        {/* 💡 AQUI ES DONDE PASAS EL userId AL COMPONENTE UserBalances */}
        <UserBalances userId={currentUserId} />
      </div>
    );
  }

  return (
    <main>
      <h1>Bienvenido de nuevo, {username} </h1>
      <button
        onClick={handleShowBalances}
        style={{ marginBottom: "20px", padding: "10px 15px" }}
      >
        Ver Mi Balance 💰
      </button>
      <h1>Criptomonedas disponibles, actualización cada 30 segundos.</h1>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Última actualización: {lastUpdated.toLocaleTimeString()} 🔄
      </p>
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
      {coins.length === 0 ? (
        <p>Cargando datos de monedas...</p>
      ) : (
        <>
          <CoinDetailsTable coin={selectedCoin} onClose={handleCloseDetails} />
          {selectedCoin ? (
            <></>
          ) : (
            <>
              <FilterSort
                coins={coins}
                setFilteredCoins={setFilteredCoins}
                onFilterSortChange={handleFilterSortChange}
              />
              {/*
                <ConversionRate ids="bitcoin,ethereum" vs_currencies="usd,eur,eth" />
                <UserBalances userId={1} />;
              */}
              <table>
                <thead>
                  <tr>
                    <th>Ranking</th>
                    <th>Nombre</th>
                    <th>Símbolo</th>
                    <th>Precio actual</th>
                    <th>Capitalización de Mercado</th>
                    <th>Cambio % (24h)</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin) => (
                    <tr key={coin.id}>
                      <td>{coin.market_cap_rank}</td>
                      <td>{coin.name}</td>
                      <td>
                        <img src={coin.image} alt={coin.name} width="25" />
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4,
                        }).format(coin.current_price)}
                        $
                      </td>
                      <td>{coin.market_cap}$</td>
                      <td>{coin.price_change_percentage_24h}</td>
                      <td>
                        <button onClick={() => handleCoinClick(coin)}>
                          Ver Detalles
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/*<nav>
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
              {/* Botón de retroceso *
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>

              {/* Números de página *
              {pageNumbers.map((number) => (
                <li key={number} style={{ margin: "0 5px" }}>
                  <button
                    onClick={() => paginate(number)}
                    style={{
                      fontWeight: currentPage === number ? "bold" : "normal",
                      backgroundColor:
                        currentPage === number ? "#ccc" : "white",
                    }}
                  >
                    {number}
                  </button>
                </li>
              ))}

              {/* Botón de avance 
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>*/}
              {filteredCoins.length === 0 && (
                <p>No se encontraron resultados con el filtro aplicado.</p>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
