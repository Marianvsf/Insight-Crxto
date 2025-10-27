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
      className="
        flex flex-col sm:flex-row gap-4 sm:gap-6
        mb-6 p-4
        border border-gray-200 rounded-xl shadow-lg
        bg-white
      "
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
        <label
          htmlFor="search"
          className="text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:mr-2 whitespace-nowrap"
        >
          Buscar Criptomoneda:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Ej: Bitcoin, ETH"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full sm:w-48 px-3 py-2
            border border-gray-300 rounded-lg shadow-sm
            focus:ring-teal-500 focus:border-teal-500
            text-sm text-gray-800
          "
        />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
        <label
          htmlFor="sortBy"
          className="text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:mr-2 whitespace-nowrap"
        >
          Ordenar por:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="
            w-full sm:w-40 px-3 py-2
            border border-gray-300 rounded-lg shadow-sm
            focus:ring-teal-500 focus:border-teal-500
            bg-white text-sm text-gray-800
          "
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
        className="
          flex-shrink-0
          px-4 py-2
          border border-gray-300 rounded-lg shadow-sm
          text-sm font-medium text-gray-700
          bg-gray-50 hover:bg-gray-100
          transition duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
        "
        title={`Cambiar a orden ${
          sortOrder === "asc" ? "descendente" : "ascendente"
        }`}
      >
        {sortIcon} {sortOrder === "asc" ? "Ascendente" : "Descendente"}
      </button>
      <p className="text-sm text-gray-600 self-center mt-2 sm:mt-0">
        Monedas encontradas:{" "}
        <span className="font-bold text-teal-600">
          {calculatedCoins.length}
        </span>
      </p>
    </div>
  );
}
