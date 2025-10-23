# 🏨 Hotellbokningssystem

En fullstack-webbapplikation för hotellbokningar byggd med React, Express och MySQL. Projektet inkluderar ett användargränssnitt för bokningar samt en adminpanel för hantering av bokningar.

## 📋 Innehållsförteckning

- [Översikt](#-översikt)
- [Funktioner](#-funktioner)
- [Tekniker](#️-tekniker)
- [Installation](#-installation)
- [Användning](#-användning)
- [Projektstruktur](#-projektstruktur)
- [API-endpoints](#-api-endpoints)
- [Databas](#️-databas)

## 🎯 Översikt

Detta projekt är en hotellbokningsapplikation byggd som ett fullstack-projekt där både frontend och backend samarbetar. Applikationen visar hur man kan koppla ihop en React-frontend med en Express-backend och en MySQL-databas. För databasanrop används DAO-mönstret, vilket gör koden mer strukturerad och lättare att underhålla. Projektet följer även bra principer för att hålla frontend och backend separerade.

## ✨ Funktioner

### Användarsida

- **Bokningsformulär**: Interaktivt formulär för att skapa nya bokningar
- **Rumstypval**: Tre olika rumstyper (Single, Double, Suite)
- **Validering**: Formulärvalidering för telefonnummer, e-post och datum
- **Bekräftelsemeddelanden**: SweetAlert2-integration för feedback
- **Responsiv design**: Applikationen fungerar på desktop. Stöd för mobil och surfplatta är påbörjat men ännu inte fullt utvecklat.

### Admin-panel

- **Visa bokningar**: Listar alla aktiva och passerade bokningar
- **Sortering**: Automatisk sortering av bokningar efter checkout-datum passerat
- **Redigera bokningar**: Uppdatera befintliga reservationer via modal
- **Ta bort bokningar**: Radera bokningar med bekräftelsedialog
- **Filtrering**: Separata sektioner för aktiva och avslutade bokningar
- **Visuell feedback**: Gråade rader för passerade bokningar

## 🛠️ Tekniker

### Frontend

- **React** - JavaScript-bibliotek för att bygga användargränssnitt med komponenter
- **Vite** - Snabb build-tool och utvecklingsserver som används för att köra och bygga React-projekt
- **CSS Modules** - Gör det möjligt att skriva CSS som bara gäller för en specifik komponent (ingen risk att stilar krockar)
- **Axios** - Används för att skicka HTTP-anrop (GET, POST, PUT, DELETE) mellan frontend och backend
- **SweetAlert2** - Bibliotek för snygga och användarvänliga dialogrutor, bekräftelser och notiser
- **Custom Hooks** - `useModal`, `useBookingData` för återanvändbar logik

### Backend

- **Node.js** - JavaScript-runtime som körs på serversidan (backend)
- **Express** - Ramverk för att bygga API:er och webbservrar i Node.js
- **MySQL** - Relationsdatabas för att lagra bokningar och användardata
- **mysql2** - MySQL-klient för Node.js som används för att köra SQL-frågor
- **CORS** - Middleware som tillåter frontend och backend att kommunicera även om de körs på olika portar/domäner
- **DAO-mönster** - _(Data Access Object)_ används för att strukturera databaskod och skilja den från övrig logik.

## 📦 Installation

### Förutsättningar

- Node.js (v16 eller senare)
- MySQL (v8 eller senare)
- npm eller yarn

### Steg 1: Klona projektet

```bash
git clone <repository-url>
cd hotellbokning
```

### Steg 2: Installera dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### Steg 3: Konfigurera databas

1. Skapa en MySQL-databas:

```sql
CREATE DATABASE hotel_booking;
```

2. Skapa `bookings`-tabell:

```sql
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

3. Uppdatera `backend/config/mysql.js` med dina databasuppgifter:

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "hotel_booking",
  dateStrings: true,
});
```

## 🚀 Användning

### Starta Backend

```bash
cd backend
npm start
```

Backend körs på `http://localhost:3000`

### Starta Frontend

```bash
cd frontend
npm run dev
```

Frontend körs på `http://localhost:5173`

### Testdata (valfritt)

Infoga testdata i databasen:

```sql
INSERT INTO bookings (guestName, email, phone, roomType, checkIn, checkOut)
VALUES
('Anna Andersson', 'anna@test.se', '0701234567', 'Single', '2025-10-31', '2025-11-02'),
('Erik Eriksson', 'erik@test.se', '0709876543', 'Double', '2025-11-05', '2025-11-08');
```

## 📁 Projektstruktur

```
hotellbokning/
├── backend/
│   ├── config/
│   │   └── mysql.js           # Databasanslutning
│   ├── dao/
│   │   └── BookingDAO.js      # Data Access Object
│   ├── controllers/
│   │   └── bookingController.js
│   ├── routes/
│   │   └── bookingRoutes.js
│   ├── server.js              # Express-server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminHeader/
│   │   │   │   ├── BookingList/
│   │   │   │   └── BookingRow/
│   │   │   ├── BookingModal/
│   │   │   │   ├── BookingForm.jsx
│   │   │   │   └── BookingModal.jsx
│   │   │   ├── Hero/
│   │   │   ├── RoomCard/
│   │   │   └── Toast/
│   │   ├── hooks/
│   │   │   ├── useBookingData.js  # API-anrop
│   │   │   └── useModal.js        # Modalhantering
│   │   ├── pages/
│   │   │   ├── Admin.jsx          # Admin-panel
│   │   │   └── Home.jsx           # Användarsida
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### 📂 Mapp- och filförklaring

#### Backend

- **`config/mysql.js`** – Hanterar anslutningen till MySQL-databasen med connection pool
- **`dao/BookingDAO.js`** – Data Access Object som innehåller all SQL-logik (CRUD-operationer)
- **`controllers/bookingController.js`** – Controller-lager som tar emot requests, anropar DAO och returnerar responses
- **`routes/bookingRoutes.js`** – Definierar API-endpoints och kopplar dem till controller-funktioner
- **`server.js`** – Startar Express-servern, konfigurerar middleware (CORS, body-parser) och registrerar routes
- **`package.json`** – Projektets metadata och lista över npm-beroenden

#### Frontend

- **`hooks/useBookingData.js`** – Custom hook för API-anrop (GET, POST, PUT, DELETE) och state-hantering
- **`hooks/useModal.js`** – Custom hook för modal-state (öppna/stänga, index-hantering)
- **`pages/Home.jsx`** – Huvudsida med bokningsformulär och rumsöversikt
- **`pages/Admin.jsx`** – Admin-panel för att visa, redigera och ta bort bokningar
- **`components/BookingModal/`** – Återanvändbar modal med formulär för create/update
- **`components/Admin/`** – Admin-specifika komponenter (header, list, row)

## 🔌 API-endpoints

### Hämta alla bokningar

```http
GET /bookings
```

**Svar:**

```json
[
  {
    "id": 1,
    "guestName": "Anna Andersson",
    "email": "anna@test.se",
    "phone": "0701234567",
    "roomType": "Single",
    "checkIn": "2025-10-31",
    "checkOut": "2025-11-02"
  }
]
```

### Skapa ny bokning

```http
POST /bookings
Content-Type: application/json

{
  "guestName": "Anna Andersson",
  "email": "anna@test.se",
  "phone": "0701234567",
  "roomType": "Single",
  "checkIn": "2025-10-31",
  "checkOut": "2025-11-02"
}
```

### Uppdatera bokning

```http
PUT /bookings/:id
Content-Type: application/json

{
  "guestName": "Anna Andersson",
  "email": "anna.new@test.se",
  "phone": "0701234567",
  "roomType": "Double",
  "checkIn": "2025-10-31",
  "checkOut": "2025-11-03"
}
```

### Ta bort bokning

```http
DELETE /bookings/:id
```

## 🗄️ Databas

### ER-Diagram (förenklat)

```
┌─────────────────┐
│    bookings     │ ← tabellnamn
├─────────────────┤
│ id (PK)         │ ← primary key (unik nyckel)
│ guestName       │
│ email           │
│ phone           │
│ roomType        │
│ checkIn         │
│ checkOut        │
│ created_at      │
└─────────────────┘
```

### Databasschema

- **id**: AUTO_INCREMENT primärnyckel (INT)
- **roomType**: Rumstyp (VARCHAR(45)) - 'Single', 'Double' eller 'Suite'
- **guestName**: Gästens fullständiga namn (VARCHAR(100))
- **email**: E-postadress för bekräftelse (VARCHAR(100))
- **phone**: Telefonnummer (VARCHAR(40))
- **checkIn**: Incheckningsdatum (DATE)
- **checkOut**: Utcheckningsdatum (DATE)
- **created_at**: Tidsstämpel när bokningen skapades (TIMESTAMP)

## 🎨 Design & UX (under utveckling)

### Färgpalett

- **Primärfärg**: `#589b59` (grön för bekräftelse)
- **Bakgrund**: `#f5f5f5` (ljusgrå)
- **Text**: `#3d4149` (mörkgrå)
- **Accent**: `#7c624c` (brun för rubriker)

### Typografi

- **Rubriker**: Serif-font med letter-spacing
- **Brödtext**: Sans-serif för läsbarhet

### Responsivitet (under utveckling)

- **Desktop**: Grid med 3 kolumner för rumskort
- **Tablet**: Grid med 2 kolumner
- **Mobile**: 1 kolumn, fullbredd

## 🔐 Best Practices

### Frontend

- ✅ Custom hooks för återanvändbar logik
- ✅ CSS Modules för isolerad styling
- ✅ Komponentbaserad arkitektur
- ✅ Formulärvalidering
- ✅ Error handling med try-catch
- ✅ Loading states och feedback

### Backend

- ✅ DAO-mönster för databasabstraktion
- ✅ Separation av concerns (routes, controllers, DAO)
- ✅ Prepared statements för SQL-säkerhet
- ✅ Error handling med middleware
- ✅ CORS-konfiguration
- ✅ JSON body-parser

## 📝 Licens

Projektet är skapat för eget utbildningssyfte och med ❤️

---
