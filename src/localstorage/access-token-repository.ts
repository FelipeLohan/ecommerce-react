import { TOKEN_KEY } from "../utils/system";

export function save(token: string, expiresInSeconds = 86400) {
  const expires = new Date(Date.now() + expiresInSeconds * 1000).toUTCString();
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
}

export function get(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_KEY}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

export function remove() {
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
}