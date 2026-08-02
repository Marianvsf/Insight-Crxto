import { useQuery } from "@tanstack/react-query";
import { fetchCoinMarkets } from "../api/coingecko.js";

export const COINS_QUERY_KEY = ["coins", "markets", "usd"];
export const COINS_POLL_INTERVAL = 30000;

/**
 * Datos de mercado de CoinGecko con polling cada 30s, caché compartida
 * y estados de carga/error declarativos.
 *
 * Cualquier componente que llame a este hook se suscribe a la MISMA entrada
 * de caché: no se generan peticiones extra por consumidor.
 */
export function useCoins() {
  return useQuery({
    queryKey: COINS_QUERY_KEY,
    queryFn: ({ signal }) => fetchCoinMarkets({ signal }),
    refetchInterval: COINS_POLL_INTERVAL,
    refetchIntervalInBackground: false,
    staleTime: COINS_POLL_INTERVAL,
    retry: 2,
    // Mantiene los últimos datos válidos en pantalla si un refetch falla.
    placeholderData: (previous) => previous,
  });
}
