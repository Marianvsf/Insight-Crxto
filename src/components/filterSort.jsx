import React, { useState, useMemo, useEffect } from "react";

export default function FilterSort({
  coins,
  setFilteredCoins,
  onFilterSortChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortCriteria = [
    { value: "name", label: "Nombre" },
    { value: "current_price", label: "Precio Actual" },
    { value: "market_cap", label: "Capitalización de Mercado" },
    { value: "market_cap_rank", label: "Ranking" },
    { value: "price_change_percentage_24h", label: "Cambio % (24h)" }, //Cambio Porcentual de Precio en 24 horas
  ];

  const calculatedCoins = useMemo(() => {
    let filtered = coins;

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(lowerCaseSearch) ||
          coin.symbol.toLowerCase().includes(lowerCaseSearch)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (valA == null && valB != null) return sortOrder === "asc" ? 1 : -1;
      if (valA != null && valB == null) return sortOrder === "asc" ? -1 : 1;
      if (valA == null && valB == null) return 0;

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [coins, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    setFilteredCoins(calculatedCoins);
    onFilterSortChange();
  }, [calculatedCoins, setFilteredCoins, onFilterSortChange]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortIcon = sortOrder === "asc" ? "⬆️" : "⬇️";

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div>
        <label htmlFor="search">Buscar Criptomoneda:</label>
        <input
          id="search"
          type="text"
          placeholder="Ej: Bitcoin, ETH"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div>
        <label htmlFor="sortBy">Ordenar por:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {sortCriteria.map((criteria) => (
            <option key={criteria.value} value={criteria.value}>
              {criteria.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={toggleSortOrder}
        style={{
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
        title={`Cambiar a orden ${
          sortOrder === "asc" ? "descendente" : "ascendente"
        }`}
      >
        {sortIcon} {sortOrder === "asc" ? "Ascendente" : "Descendente"}
      </button>
      <p>Monedas encontradas: **{calculatedCoins.length}**</p>
    </div>
  );
}
