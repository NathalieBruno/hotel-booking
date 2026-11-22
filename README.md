# Villa Toscany – hotellbokning

Villa Toscany är ett fullstackprojekt för hotellbokningar, inspirerat av ett vingårdshotell i Toscana. Applikationen är utvecklad med React, Node.js, Express och MySQL och innehåller både ett bokningsflöde för gäster och en adminpanel för hantering av reservationer.

Projektet demonstrerar komponentbaserad frontendutveckling, tillståndshantering, REST API-integration och en backend strukturerad med routes, controllers och DAO-mönstret, med särskilt fokus på användarupplevelse och tillgänglighet i gränssnittet.

**Prova live (Netlify-demo, ingen backend):**
- **Startsida:** [hotel-booking-nathalie.netlify.app](https://hotel-booking-nathalie.netlify.app)
- **Adminpanel:** [hotel-booking-nathalie.netlify.app/admin](https://hotel-booking-nathalie.netlify.app/admin)

> Demon sparar data i webbläsarens minne och nollställs när sidan laddas om. Vill du se en bokning du själv har skapat i admin, öppna admin via länken "Admin (demo)" längst ner på startsidan i stället för att skriva in adressen.

## Höjdpunkter

**Frontend**
- Komponentbaserad React-app med routing, custom hooks (`useBookingData`, `useModal`) och CSS Modules.
- Gemensamt designsystem med CSS-variabler för färger och typsnitt (`frontend/src/index.css`).
- Tillgänglig bokningsdialog med fokushantering, ARIA-attribut och formulärvalidering (se Tillgänglighet).
- Demoläge som körs helt i webbläsaren, så att projektet kan visas utan backend.

**Backend**
- REST-API med Express 5 och MySQL, uppdelat i routes, controllers och DAO-lager.
- Parametriserade SQL-frågor och konfiguration via `.env`.

## Två versioner: demo och lokal fullstack

| | Netlify-demo (produktionsbygget) | Lokal fullstack (`npm run dev`) |
|---|---|---|
| Backend och databas | Ingen, körs helt i webbläsaren | Express + MySQL |
| Bokningar | Exempeldata i `frontend/src/data/demoBookings.js` | Hämtas från och sparas i databasen |
| Skapa, ändra, ta bort | Fungerar i minnet och delas mellan startsidan och admin. Nollställs vid sidladdning | Sparas permanent i MySQL |
| Markering | Grön banner "Demo version" och länken "Admin (demo)" i footern | Ingen banner |

Läget styrs av `import.meta.env.PROD` i `frontend/src/config.js`. Alla produktionsbyggen (`npm run build`, även `npm run preview`) körs alltså som demo.

## Funktioner

- **Gäster:** läsa om hotellet, välja rumstyp (Single, Double eller Suite) och boka via en dialog med validering och bekräftelse.
- **Admin (`/admin`):** se bokningar i en tabell uppdelad i öppna och avslutade (efter utcheckningsdatum), redigera en bokning i samma dialog som används för nya bokningar, och ta bort en bokning efter bekräftelse (röd bekräfta-knapp och fokus på "Cancel").

## Teknikstack

- **Frontend:** React 19, Vite 7, React Router 6, CSS Modules, Axios, SweetAlert2
- **Backend:** Node.js, Express 5, mysql2, dotenv, CORS
- **Databas:** MySQL 8
- **Struktur:** DAO-lager i backend och custom hooks (`useBookingData`, `useModal`) i frontend

## Kom igång lokalt

**Krav:** Node.js 20.19 eller senare, och MySQL 8.

```bash
git clone https://github.com/NathalieBruno/hotel-booking.git
cd hotel-booking
```

### 1. Databas

```sql
CREATE DATABASE hotel;
USE hotel;

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomType VARCHAR(45) NOT NULL,
  guestName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  checkIn DATE NOT NULL,
  checkOut DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend

```bash
cd backend
npm install
```

Skapa filen `backend/.env` (den är ignorerad av Git):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ditt_lösenord
DB_NAME=hotel
PORT=3000
```

Alla värden utom `DB_PASSWORD` har standardvärdena ovan, om de utelämnas.

```bash
npm start
```

Servern körs på `http://localhost:3000`. Öppna `http://localhost:3000/api` för att kontrollera att den svarar. Adressen `/` har ingen sida och ger "Cannot GET /", vilket är normalt.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Öppna `http://localhost:5173`. Frontend anropar backend på `http://localhost:3000`. Kör backend på en annan adress eller port: kopiera `frontend/.env.example` till `frontend/.env` och ändra `VITE_API_URL`.

För att prova demoläget lokalt: `npm run build` och sedan `npm run preview`.

## API

| Metod | Adress | Beskrivning |
|---|---|---|
| GET | `/api` | Statuskontroll |
| GET | `/api/bookings` | Hämta alla bokningar |
| POST | `/api/bookings` | Skapa bokning (svar: `201` och bokningen) |
| PUT | `/api/bookings/:id` | Uppdatera bokning |
| DELETE | `/api/bookings/:id` | Ta bort bokning (svar: `204`) |

Exempel på en bokning:

```json
{
  "guestName": "Anna Andersson",
  "email": "anna@test.se",
  "phone": "0701234567",
  "roomType": "Single",
  "checkIn": "2027-03-10",
  "checkOut": "2027-03-12"
}
```

## Projektstruktur

```
hotel-booking/
├── backend/
│   ├── config/mysql.js            # Anslutningspool (läser .env)
│   ├── dao/BookingDAO.js          # SQL-frågor (parametriserade)
│   ├── controllers/               # Hanterar requests och svar
│   ├── routes/                    # /api/bookings
│   └── server.js
└── frontend/
    ├── public/                    # Bilder och _redirects (routing på Netlify)
    └── src/
        ├── components/
        │   ├── Admin/             # AdminHeader, BookingList, BookingRow
        │   ├── BookingModal/      # BookingModal, BookingForm
        │   ├── Hero, Content, RoomCard, Highlights, Quote, Footer
        │   └── DemoBanner/        # Visas bara i demoläget
        ├── data/                  # demoBookings.js, highlights.js
        ├── hooks/                 # useBookingData, useModal
        ├── pages/                 # Home, Admin
        ├── config.js              # IS_DEMO
        └── index.css              # Designtokens (färger, typsnitt)
```

## Tillgänglighet

Jag har haft WCAG 2.2 som riktlinje under arbetet. Målet har varit att tillämpa praktiska åtgärder som gör gränssnittet enklare att använda för fler, och inte att uppnå full WCAG-efterlevnad. Chrome Lighthouse ger 100 i Accessibility för både startsidan och `/admin`, i både desktop- och mobilläge (mätt på den publika demon 2026-11-22). Automatiska verktyg hittar dock bara en del av problemen, och projektet har inte granskats manuellt eller med skärmläsare. Några områden återstår, bland annat stöd för `prefers-reduced-motion` och mobilanpassning av hero.

**Exempel på åtgärder i koden**
- Synlig fokusmarkering (`:focus-visible`) och en "Skip to main content"-länk på startsidan.
- Bokningsdialogen: `role="dialog"` med `aria-modal` och rubrikkoppling, fokus flyttas in i dialogen, hålls inom den och återställs, och Esc stänger.
- Semantisk HTML: `<main>`, en `h1` per sida, rubrikhierarki, sidtitlar och `alt`-texter på bilderna (hero-bakgrunderna är dekorativa).
- Formulär med etiketter, `autocomplete`, hjälptext kopplad med `aria-describedby`, datumbegränsningar och röd markering av ogiltiga fält.
- Adminpanelen: knappar för redigera och radera med unika namn, dolda emojis för skärmläsare, samt tabelltitel och `scope="col"`.
- Textfärgerna är beräknade för minst 4,5:1 kontrast mot sina bakgrunder (text över foton är inte mätt).

## Kända begränsningar

Projektet är utvecklat i utbildningssyfte och är inte avsett för verklig hotellverksamhet. En produktionsversion skulle behöva kompletteras med:

- Autentisering och behörighetskontroll för adminpanelen.
- Serverbaserad validering och kontroll av rumstillgänglighet (dubbelbokningar).
- Utökad felhantering och säkerhetskonfiguration, till exempel begränsad CORS.
- Betalningshantering och automatiska bokningsbekräftelser.
