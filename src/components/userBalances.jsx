import { useState, useEffect, useMemo } from "react";
import { getMockUsers } from "../mocks/mockUsers";

const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-qpB7vSSJxz2hyL8M2QWJfZrS";

const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fallo la llamada a la API de CoinGecko:", error);
    return [];
  }
};

const UserBalances = ({ userId }) => {
  const [cryptoMarketData, setCryptoMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getMockUsers().find((u) => u.id === userId);
  const userBalances = currentUser ? currentUser.cryptoBalances : [];

  // Efecto para cargar los precios de CoinGecko
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        setCryptoMarketData(data);
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar los precios de las criptomonedas.");
        setCryptoMarketData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrices();
  }, []);

  const dataForTable = useMemo(() => {
    if (cryptoMarketData.length === 0 || userBalances.length === 0) {
      return [];
    }

    const priceMap = cryptoMarketData.reduce((map, coin) => {
      map[coin.id] = coin;
      return map;
    }, {});

    return userBalances.map((balance) => {
      const priceData = priceMap[balance.id];
      const currentPrice = priceData ? priceData.current_price : 0;
      const totalValueUSD = balance.balance * currentPrice;

      return {
        ...balance,
        currentPrice,
        totalValueUSD,
        image: priceData ? priceData.image : "",
        priceChange24h: priceData
          ? priceData.price_change_percentage_24h
          : null,
      };
    });
  }, [cryptoMarketData, userBalances]);

  const totalPortfolioValue = dataForTable.reduce(
    (sum, item) => sum + item.totalValueUSD,
    0
  );

  if (!currentUser) {
    return <p>Error: Usuario con {currentUser.username} no encontrado.</p>;
  }

  if (isLoading) {
    return <p>Cargando precios de mercado...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (userBalances.length === 0) {
    return (
      <p>El usuario {currentUser.firstName} no tiene balances registrados.</p>
    );
  }

  return (
    <div className="crypto-balances-widget">
      <h2>Portafolio de {currentUser.firstName} 💰</h2>

      <p className="total-value">
        Valor Total Estimado:{" "}
        <strong>
          ${totalPortfolioValue.toFixed(2).toLocaleString("en-US")} USD
        </strong>
      </p>

      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Saldo</th>
            <th>Precio (USD)</th>
            <th>Variación 24h</th>
            <th>Valor Total (USD)</th>
          </tr>
        </thead>
        <tbody>
          {dataForTable.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} width="20" height="20" />
                {item.name} ({item.symbol.toUpperCase()})
              </td>
              <td>{item.balance.toFixed(8)}</td>
              <td>
                $
                {item.currentPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                {item.priceChange24h !== null
                  ? `${item.priceChange24h.toFixed(2)}%`
                  : "N/A"}
              </td>
              <td>${item.totalValueUSD.toFixed(2).toLocaleString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBalances;
