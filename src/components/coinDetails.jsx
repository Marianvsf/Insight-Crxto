import PriceGraph from "./PriceGraph";

export default function CoinDetailsTable({ coin, onClose }) {
  if (!coin) {
    return null;
  }

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 10,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>
        &times; Cerrar
      </button>
      <h2>
        Detalles de {coin.name} ({coin.symbol.toUpperCase()})
        <img src={coin.image} alt={coin.name} width="30" />
      </h2>

      <table>
        <tbody>
          <tr>
            <td>Ranking por Capitalización: </td>
            <td>#{formatNumber(coin.market_cap_rank)}</td>
          </tr>
          <tr>
            <td>Precio Actual:</td>
            <td>{formatCurrency(coin.current_price)}</td>
          </tr>
          <tr>
            <td>Capitalización de Mercado:</td>
            <td>{formatCurrency(coin.market_cap)}</td>
          </tr>
          <tr>
            <td>Volumen Total de Negociación (24h):</td>
            <td>{formatCurrency(coin.total_volume)}</td>
          </tr>
          <tr>
            <td>Cambio Porcentual (24h):</td>
            <td>
              {coin.price_change_percentage_24h
                ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Precio Más Alto (24h):</td>
            <td>{formatCurrency(coin.high_24h)}</td>
          </tr>
          <tr>
            <td>Precio Más Bajo (24h):</td>
            <td>{formatCurrency(coin.low_24h)}</td>
          </tr>
          <tr>
            <td>Suministro Circulante:</td>
            <td>{formatNumber(coin.circulating_supply)}</td>
          </tr>
          <tr>
            <td>Suministro Total:</td>
            <td>{formatNumber(coin.total_supply)}</td>
          </tr>
        </tbody>
      </table>
      <PriceGraph coin={{ name: coin.name, id: coin.id }} />
    </div>
  );
}
