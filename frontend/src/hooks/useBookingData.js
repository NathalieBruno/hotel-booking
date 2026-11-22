import { useState, useEffect } from "react";
import axios from "axios";
import demoBookings from "../data/demoBookings";

function useBookingData() {
  const isDemo = import.meta.env.PROD;
  const [bookings, setBookings] = useState(isDemo ? demoBookings : []);
  useEffect(() => {
    if (isDemo) return;

    async function getBookings() {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar från databas:", error);
      }
    }

    getBookings();
  }, [isDemo]);

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
    if (isDemo) {
      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? { ...booking, ...updatedBooking, id } : booking)),
      );
      return updatedBooking;
    }
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
    if (isDemo) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      return;
    }
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
