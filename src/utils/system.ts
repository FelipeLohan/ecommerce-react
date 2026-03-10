export const CART_KEY = "com.celestialcommerce/Cart";
export const TOKEN_KEY = "com.celestialcommerce/Token";

// Runtime env (injected by docker-entrypoint.sh) takes priority over
// build-time env (VITE_ vars baked by Vite), which falls back to defaults.
const runtimeEnv = (window as any).__ENV__ ?? {};

export const BASE_URL =
  runtimeEnv.VITE_BACKEND_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "https://ecommerce-spring-ec44b57ed84d.herokuapp.com";

export const CLIENT_ID =
  runtimeEnv.VITE_CLIENT_ID ||
  import.meta.env.VITE_CLIENT_ID ||
  "myclientid";

export const CLIENT_SECRET =
  runtimeEnv.VITE_CLIENT_SECRET ||
  import.meta.env.VITE_CLIENT_SECRET ||
  "myclientsecret";
