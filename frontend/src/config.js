// Produktionsbygget (Netlify) körs som demo utan backend. `npm run dev` använder MySQL-backenden.
export const IS_DEMO = import.meta.env.PROD;
