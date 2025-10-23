import { useModal, useBookingData } from "../hooks";
import { AdminHeader, BookingList, BookingModal } from "../components";
import Swal from "sweetalert2";
import styles from "./Admin.module.css";

function Admin() {
  const { bookings, updateBooking, deleteBooking } = useBookingData();
  const { isOpen: isEditModalOpen, index: editIndex, open, close } = useModal();

  const activeBookings = bookings.filter((booking) => new Date(booking.checkOut) >= new Date());
  const pastBookings = bookings.filter((booking) => new Date(booking.checkOut) < new Date());

  async function handleUpdateBooking(booking) {
    await updateBooking(booking.id, booking);
    close();
  }

  async function handleDeleteBooking(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted and cannot be restored.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#589b59ff",
      cancelButtonColor: "rgba(224, 66, 66, 1)",
      confirmButtonText: "Yes, delete booking",
    });

    if (result.isConfirmed) {
      await deleteBooking(id);
      Swal.fire({
        title: "Booking deleted!",
        text: "The booking has been permanently removed.",
        icon: "success",
      });
    }
  }

  return (
    <>
      <AdminHeader />

      <div className={styles.container}>
        <details className={styles.activeBookingsToggle} open>
          <summary>Open bookings ({activeBookings.length})</summary>
          <BookingList bookings={activeBookings} onEdit={open} onDelete={handleDeleteBooking} />
        </details>

        <details className={styles.pastBookingsToggle}>
          <summary>Closed bookings ({pastBookings.length})</summary>
          <BookingList bookings={pastBookings} onEdit={open} onDelete={handleDeleteBooking} />
        </details>
      </div>

      {isEditModalOpen &&
        (() => {
          const editBooking = bookings.find((booking) => booking.id === editIndex);
          return (
            <BookingModal
              roomType={editBooking?.roomType}
              booking={editBooking}
              onClose={close}
              onSubmit={handleUpdateBooking}
            />
          );
        })()}
    </>
  );
}

export default Admin;
