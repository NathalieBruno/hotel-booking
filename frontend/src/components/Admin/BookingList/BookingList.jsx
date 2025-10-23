import styles from "./BookingList.module.css";
import BookingRow from "../BookingRow/BookingRow";

function BookingList({ bookings = [], onEdit, onDelete }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest</th>
            <th>Contact</th>
            <th>Room type</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Manage booking</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No bookings yet.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                id={booking.id}
                onEdit={() => onEdit(booking.id)}
                onDelete={() => onDelete(booking.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
