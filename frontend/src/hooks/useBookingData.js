import { useState, useEffect } from "react";
import axios from "axios";

function useBookingData() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar från databas:", error);
      }
    }
    getBookings();
  }, []);

  async function postBooking(booking) {
    try {
      const response = await axios.post("http://localhost:3000/api/bookings", booking);
      setBookings((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Fel vid ny post av bokning:", error);
      throw error;
    }
  }

  async function updateBooking(id, updatedBooking) {
    try {
      const response = await axios.put(`http://localhost:3000/api/bookings/${id}`, updatedBooking);
      setBookings((prev) => prev.map((booking) => (booking.id === id ? response.data : booking)));
      return response.data;
    } catch (error) {
      console.error("Fel vid uppdatering av bokning:", error);
      throw error;
    }
  }

  async function deleteBooking(id) {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${id}`);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Fel vid borttagning av bokning:", error);
      throw error;
    }
  }

  return { bookings, postBooking, updateBooking, deleteBooking };
}

export default useBookingData;
