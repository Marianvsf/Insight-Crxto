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
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>
                <img src={coin.image} alt={coin.name} width="25" />
              </td>
              <td>{coin.current_price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
