import { Hero, RoomCard, BookingModal, Content, Quote, Footer } from "../components";
import { useModal, useBookingData } from "../hooks";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Swal from "sweetalert2";

function Home() {
  const { bookings, postBooking } = useBookingData();
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
    await postBooking(booking);
    Swal.fire({
      title: "Thank you for your booking!",
      text: "We will send you a confirmation email shortly.",
      icon: "success",
      timer: 4000,
      showConfirmButton: false,
    });
    close();
    setSelectedRoom(null);
  }

  useEffect(() => {}, [bookings]);
  return (
    <>
      <header>
        <Hero />
      </header>
      <Content />
      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>ACCOMODATIONS</h2>
          <p className={styles.subtitle}>Find your ideal stay</p>
        </div>
        <div className={styles.roomList}>
          <RoomCard
            title="Single"
            description="Our smallest but coziest room, perfect for solo travelers seeking comfort and privacy."
            price="From 145 € per night"
            image="/rooms/single-bed.jpg"
            onBook={handleBook}
          />
          <RoomCard
            title="Double"
            description="Spacious double room with a comfortable bed, ideal for two guests."
            price="From 260 € per night"
            image="/rooms/double.jpg"
            onBook={handleBook}
          />
          <RoomCard
            title="Suite"
            description="An exclusive suite with a lounge area and private balcony with a view."
            price="From 530 € per night"
            image="/rooms/suite.jpg"
            onBook={handleBook}
          />
        </div>
      </main>

      <Quote
        subtitle="THE EXPERIENCE"
        text="A stay at our vineyard hotel is not just accommodation, it's a journey through the heart of Tuscany."
        author="Maria Rossi, Owner"
      />

      <Footer />

      {isModalOpen && <BookingModal roomType={selectedRoom} onClose={handleCloseModal} onSubmit={handleAddBooking} />}
    </>
  );
}

export default Home;
