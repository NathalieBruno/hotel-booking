import styles from "./BookingRow.module.css";

function BookingRow({ booking, id, onEdit, onDelete }) {
  const isPast = new Date(booking.checkOut) < new Date();

  return (
    <tr className={`${styles.row} ${isPast ? styles.pastBooking : ""}`}>
      <td className={styles.id}>#{id}</td>
      <td>{booking.guestName}</td>
      <td>
        <div>{booking.email}</div>
        <div className={styles.phone}>{booking.phone}</div>
      </td>
      <td>
        <span
          className={
            `${styles.roomType} ` +
            (booking.roomType === "Single"
              ? styles.single
              : booking.roomType === "Double"
              ? styles.double
              : booking.roomType === "Suite"
              ? styles.suite
              : "")
          }>
          {booking.roomType}
        </span>
      </td>
      <td>{booking.checkIn}</td>
      <td>{booking.checkOut}</td>
      <td>
        <button className={styles.actionBtn} onClick={onEdit} aria-label="Change booking">
          <span className={styles.editIcon}>✏️</span>
        </button>

        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete} aria-label="Delete booking">
          <span className={styles.deleteIcon}>🗑️</span>
        </button>
      </td>
    </tr>
  );
}

export default BookingRow;
