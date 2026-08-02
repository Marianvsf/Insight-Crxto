const URL_BASE = "https://api.coingecko.com/api/v3";
const API_KEY_PARAM = import.meta.env.VITE_CG_API_KEY
  ? `&x_cg_demo_api_key=${import.meta.env.VITE_CG_API_KEY}`
  : "";

export async function fetchCoinMarkets({ signal } = {}) {
  const response = await fetch(
    `${URL_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false${API_KEY_PARAM}`,
    { signal },
  );

  if (!response.ok)
    throw new Error(`Error fetching coins: ${response.statusText}`);

  return response.json();
}
