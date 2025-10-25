import { useEffect, useState } from "react";

const URL_BASE = "https://api.coingecko.com/api/v3";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(
        `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (!response.ok) {
        console.error("Error fetching coins:", response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setCoins(data);
    };
    fetchCoins();
  }, []);

  return (
    <main>
      <h1>Bienvenido de nuevo, </h1>;
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <h3>{coin.name}</h3>
            <img src={coin.image} alt={coin.name} width="25" />
            <p>Precio: ${coin.current_price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
