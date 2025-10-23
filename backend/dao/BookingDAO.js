const db = require("../config/mysql");

class BookingDAO {
  async getAllBookings() {
    const [rows] = await db.query("SELECT * FROM bookings");
    return rows;
  }

  async create(booking) {
    const { roomType, guestName, email, phone, checkIn, checkOut } = booking;
    const [result] = await db.query(
      "INSERT INTO bookings (roomType, guestName, email, phone, checkIn, checkOut) VALUES (?, ?, ?, ?, ?, ?)",
      [roomType, guestName, email, phone, checkIn, checkOut]
    );
    return { id: result.insertId, ...booking };
  }

  async update(booking) {
    const { id, roomType, guestName, email, phone, checkIn, checkOut } = booking;
    await db.query(
      "UPDATE bookings SET roomType = ?, guestName = ?, email = ?, phone = ?, checkIn = ?, checkOut = ? WHERE id = ?",
      [roomType, guestName, email, phone, checkIn, checkOut, id]
    );
    return { id, ...booking };
  }

  async delete(id) {
    await db.query("DELETE FROM bookings WHERE id = ?", [id]);
  }
}

module.exports = BookingDAO;
