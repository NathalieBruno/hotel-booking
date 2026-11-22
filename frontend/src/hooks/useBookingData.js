import { useState, useEffect, useSyncExternalStore } from "react";
import axios from "axios";
import demoBookings from "../data/demoBookings";
import { IS_DEMO, BOOKINGS_URL } from "../config";

// Demoläge: gemensam lagring så att en bokning som skapas på startsidan syns i admin.
// Data finns kvar vid navigering i appen men nollställs vid sidladdning.
let demoState = [...demoBookings];
const demoListeners = new Set();

function setDemoBookings(updater) {
  demoState = typeof updater === "function" ? updater(demoState) : updater;
  demoListeners.forEach((listener) => listener());
}

function subscribeToDemo(listener) {
  demoListeners.add(listener);
  return () => demoListeners.delete(listener);
}

function getDemoSnapshot() {
  return demoState;
}

function useBookingData() {
  const isDemo = IS_DEMO;
  const demoList = useSyncExternalStore(subscribeToDemo, getDemoSnapshot);
  const [apiBookings, setApiBookings] = useState([]);
  const bookings = isDemo ? demoList : apiBookings;
  const setBookings = isDemo ? setDemoBookings : setApiBookings;

  useEffect(() => {
    if (isDemo) return;

    async function getBookings() {
      try {
        const response = await axios.get(BOOKINGS_URL);
        setApiBookings(response.data);
      } catch (error) {
        console.error("Fel vid hämtning av bokningar från databas:", error);
      }
    }

    getBookings();
  }, [isDemo]);

  async function postBooking(booking) {
    if (isDemo) {
      const nextId = demoState.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const newBooking = { ...booking, id: nextId };
      setBookings((prev) => [...prev, newBooking]);
      return newBooking;
    }
    try {
      const response = await axios.post(BOOKINGS_URL, booking);
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
      const response = await axios.put(`${BOOKINGS_URL}/${id}`, updatedBooking);
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
      await axios.delete(`${BOOKINGS_URL}/${id}`);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Fel vid borttagning av bokning:", error);
      throw error;
    }
  }

  return { bookings, postBooking, updateBooking, deleteBooking };
}

export default useBookingData;
