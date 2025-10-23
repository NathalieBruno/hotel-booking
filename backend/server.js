require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", (_, response) => {
  response.json({ message: "My API is running smoothly! 😊" });
});
app.use("/api/bookings", bookingRoutes);

app.listen(port, () => console.log(`Servern körs på http://localhost:${port}`));
