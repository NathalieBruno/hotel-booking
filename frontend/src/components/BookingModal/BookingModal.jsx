import styles from "./BookingModal.module.css";
import BookingForm from "./BookingForm";

function BookingModal({ roomType, booking, onSubmit, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close} aria-label="Close modal">
          ×
        </button>
        <h2>Booking details</h2>
        <BookingForm roomType={roomType} booking={booking} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default BookingModal;
