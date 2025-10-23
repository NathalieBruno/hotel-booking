import { useState, useEffect } from "react";
import styles from "./BookingModal.module.css";

function BookingForm({ roomType, booking, onSubmit }) {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    setGuestName(booking?.guestName || "");
    setEmail(booking?.email || "");
    setPhone(booking?.phone || "");
    setCheckIn(booking?.checkIn || "");
    setCheckOut(booking?.checkOut || "");
  }, [booking]);

  async function handleSubmit(e) {
    e.preventDefault();
    const bookingData = {
      id: booking?.id,
      roomType,
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
        <input type="text" name="roomType" value={roomType} readOnly className={styles.roomTypeInput} />
      </label>
      <label>
        Guest name:
        <input
          type="text"
          name="guestName"
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
          placeholder="070-111 11 11"
          required
          pattern={"^\\d{7,15}$|^07[0-9][ -]?\\d{3}[ -]?\\d{2}[ -]?\\d{2}$"}
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <div className={styles.dateRow}>
        <label className={styles.dateLabel}>
          Check-in date:
          <input
            type="date"
            name="checkIn"
            required
            min={new Date().toISOString().split("T")[0]}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label className={styles.dateLabel}>
          Check-out date:
          <input
            type="date"
            name="checkOut"
            required
            min={checkIn || new Date().toISOString().split("T")[0]}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
      </div>
      <button className={styles.submitBtn} type="submit">
        {booking ? "Confirm changes" : "Confirm booking"}
      </button>
    </form>
  );
}

export default BookingForm;
