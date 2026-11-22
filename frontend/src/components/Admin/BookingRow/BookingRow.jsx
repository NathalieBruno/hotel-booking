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
        <button
          type="button"
          className={styles.actionBtn}
          onClick={onEdit}
          aria-label={`Edit booking #${id} for ${booking.guestName}`}
          title="Edit booking">
          <span className={styles.editIcon} aria-hidden="true">
            ✏️
          </span>
        </button>

        <button
          type="button"
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
          aria-label={`Delete booking #${id} for ${booking.guestName}`}
          title="Delete booking">
          <span className={styles.deleteIcon} aria-hidden="true">
            🗑️
          </span>
        </button>
      </td>
    </tr>
  );
}

export default BookingRow;
