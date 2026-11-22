import { useState, useEffect } from "react";
import styles from "./BookingModal.module.css";

// Lokalt datum som YYYY-MM-DD (toISOString ger UTC och kan bli fel dag)
function toDateString(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().split("T")[0];
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

function BookingForm({ roomType, booking, onSubmit }) {
  const [roomOption, setRoomOption] = useState("");
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    setRoomOption(booking?.roomType || roomType);
    setGuestName(booking?.guestName || "");
    setEmail(booking?.email || "");
    setPhone(booking?.phone || "");
    setCheckIn(booking?.checkIn || "");
    setCheckOut(booking?.checkOut || "");
  }, [booking, roomType]);

  const today = toDateString(new Date());
  // Nya bokningar får inte ligga bakåt i tiden. Vid redigering (admin) tillåts befintliga datum.
  const minCheckIn = booking ? undefined : today;
  const minCheckOut = checkIn ? addDays(checkIn, 1) : minCheckIn;

  function handleCheckInChange(value) {
    setCheckIn(value);
    // Utcheckning måste ligga efter incheckning
    if (checkOut && value && checkOut <= value) setCheckOut("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const bookingData = {
      id: booking?.id,
      roomType: roomOption,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
    };
    if (onSubmit) {
      await onSubmit(bookingData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room type:
        <select value={roomOption} onChange={(event) => setRoomOption(event.target.value)}>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </label>
      <label>
        Guest name:
        <input
          type="text"
          name="guestName"
          autoComplete="name"
          placeholder="Enter full name"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone number:
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          pattern={"^\\d{7,15}$|^07[0-9][ -]?\\d{3}[ -]?\\d{2}[ -]?\\d{2}$"}
          title="Enter a phone number, for example 070-111 11 11"
          inputMode="tel"
          aria-describedby="phone-hint"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span id="phone-hint" className={styles.hint}>
          Example: 070-111 11 11
        </span>
      </label>
      <div className={styles.dateRow}>
        <label className={styles.dateLabel}>
          Check-in date:
          <input
            type="date"
            name="checkIn"
            required
            min={minCheckIn}
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
          />
        </label>
        <label className={styles.dateLabel}>
          Check-out date:
          <input
            type="date"
            name="checkOut"
            required
            min={minCheckOut}
            aria-describedby="date-hint"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
      </div>
      <p id="date-hint" className={styles.hint}>
        Check-out must be at least one day after check-in.
      </p>
      <button className={styles.submitBtn} type="submit">
        {booking ? "Confirm changes" : "Confirm booking"}
      </button>
    </form>
  );
}

export default BookingForm;
