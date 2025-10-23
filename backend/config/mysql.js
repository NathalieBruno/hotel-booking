const mysql = require("mysql2");

// anslutning till min databas
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "hotel",
  dateStrings: true,
});

module.exports = db.promise();
