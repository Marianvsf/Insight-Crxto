import { useEffect, useState } from "react";

const LOGOUT_EVENT = "app-logout";
const OVERLAY_DURATION = 1200;

/**
 * Escucha el evento global `app-logout` y expone si se está cerrando sesión.
 */
export function useLogoutListener() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let timeoutId;

    const onAppLogout = () => {
      setIsLoggingOut(true);
      timeoutId = setTimeout(() => setIsLoggingOut(false), OVERLAY_DURATION);
    };

    window.addEventListener(LOGOUT_EVENT, onAppLogout);
    return () => {
      window.removeEventListener(LOGOUT_EVENT, onAppLogout);
      clearTimeout(timeoutId);
    };
  }, []);

  return isLoggingOut;
}
