// db.js
// Konfigurasi koneksi SQL Server menggunakan mssql
const sql = require("mssql");

const config = {
  user: "sa",
  password: "select123",
  server: "localhost",
  database: "wms",
  options: {
    encrypt: false,
    trustServerSertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected To MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed", err));

module.exports = {
    sql, poolPromise
}
