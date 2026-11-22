// Produktionsbygget (Netlify) körs som demo utan backend. `npm run dev` använder MySQL-backenden.
export const IS_DEMO = import.meta.env.PROD;

// Backendens adress. Sätts med VITE_API_URL i frontend/.env (se .env.example), annars används lokal backend.
const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const BOOKINGS_URL = `${API_URL}/api/bookings`;
