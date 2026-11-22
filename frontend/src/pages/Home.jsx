import { Hero, RoomCard, BookingModal, Content, Highlights, Quote, Footer } from "../components";
import { useModal, useBookingData } from "../hooks";
import { useState } from "react";
import styles from "./Home.module.css";
import { IS_DEMO } from "../config";
import rooms from "../data/rooms";
import Swal from "sweetalert2";

function Home() {
  const { postBooking } = useBookingData();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { isOpen: isModalOpen, open, close } = useModal();

  const handleBook = (roomType) => {
    setSelectedRoom(roomType);
    open();
  };

  const handleCloseModal = () => {
    close();
    setSelectedRoom(null);
  };

  async function handleAddBooking(booking) {
    try {
      await postBooking(booking);

      close();
      setSelectedRoom(null);

      Swal.fire({
        title: "Thank you for your booking!",
        text: IS_DEMO
          ? "This is a demo booking. No actual reservation has been made."
          : "Your booking has been registered successfully.",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "Booking failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  }

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to main content
      </a>
      <header>
        <Hero />
      </header>
      <main id="main">
        <Content />
        <section className={styles.main} aria-labelledby="rooms-title">
          <div className={styles.sectionHeader}>
            <h2 id="rooms-title" className={styles.title}>
              ACCOMMODATIONS
            </h2>
            <p className={styles.subtitle}>Find your ideal stay</p>
          </div>
          <div className={styles.roomList}>
            {rooms.map((room) => (
              <RoomCard key={room.title} {...room} onBook={handleBook} />
            ))}
          </div>
        </section>

        <Highlights />

        <Quote
          subtitle="THE EXPERIENCE"
          text="A stay at our vineyard hotel is not just accommodation, it's a journey through the heart of Tuscany."
          author="Maria Rossi, Owner"
        />
      </main>

      <Footer />

      {isModalOpen && <BookingModal roomType={selectedRoom} onClose={handleCloseModal} onSubmit={handleAddBooking} />}
    </>
  );
}

export default Home;
