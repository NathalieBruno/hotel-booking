import { useEffect, useRef } from "react";
import styles from "./BookingModal.module.css";
import BookingForm from "./BookingForm";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function BookingModal({ roomType, booking, onSubmit, onClose }) {
  const modalRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const modal = modalRef.current;

    // Flytta fokus in i dialogen (första formulärfältet)
    const firstField = modal.querySelector("select, input");
    (firstField || modal).focus();

    // Förhindra att sidan bakom scrollar
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      // Fokusfälla: Tab/Shift+Tab stannar inom dialogen
      const items = modal.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Återställ fokus till elementet som öppnade dialogen
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}>
        <button type="button" onClick={onClose} className={styles.close} aria-label="Close booking dialog">
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="booking-modal-title">Booking details</h2>
        <BookingForm roomType={roomType} booking={booking} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default BookingModal;
