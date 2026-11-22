import styles from "./BookingList.module.css";
import BookingRow from "../BookingRow/BookingRow";

function BookingList({ bookings = [], caption, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {caption && <caption className={styles.srOnly}>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
            <th scope="col">Guest</th>
            <th scope="col">Contact</th>
            <th scope="col">Room type</th>
            <th scope="col">Check-in</th>
            <th scope="col">Check-out</th>
            <th scope="col">Manage booking</th>
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
