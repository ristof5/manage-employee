const { poolPromise } = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query("SELECT * FROM Employess WHERE EmployeeId = @id");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

getById: async (req, res) => {
    try{
        const pool = await poolPromise;
    }
}