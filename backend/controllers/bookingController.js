const BookingDAO = require("../dao/BookingDAO");
const bookingDAO = new BookingDAO();

module.exports = {
  getAllBookings: async (_, response) => {
    try {
      response.json(await bookingDAO.getAllBookings());
    } catch {
      response.status(500).json({ error: "Failed to fetch bookings" });
    }
  },

  createBooking: async (request, response) => {
    try {
      response.status(201).json(await bookingDAO.create(request.body));
    } catch {
      response.status(500).json({ error: "Failed to create a new booking" });
    }
  },

  updateBooking: async (request, response) => {
    try {
      const id = parseInt(request.params.id, 10);
      response.json(await bookingDAO.update({ ...request.body, id }));
    } catch {
      response.status(500).json({ error: "Failed to update booking" });
    }
  },

  deleteBooking: async (request, response) => {
    try {
      await bookingDAO.delete(parseInt(request.params.id, 10));
      response.status(204).end();
    } catch {
      response.status(500).json({ error: "Failed to delete booking" });
    }
  },
};
