const { poolPromise } = require("../db");

module.exports = {
  getAll: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Employess");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

getById: async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM Employess WHERE EmployeeId = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// crud buat
create: async (req, res) => {
  try {
    const { Name, Position, Salary } = req.body;
    if (!Name || Salary <= 0) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const pool = await poolPromise;
    await pool
      .request()
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .query(
        "INSERT INTO Employess (Name, Position, Salary) VALUES (@Name, @Position, @Salary)"
      );

    res.status(201).json({ message: "Employee Created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// crud ubah
update: async (req, res) => {
  try {
    const { Name, Position, Salary } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .query(
        "UPDATE Employees SET Name=@Name, Position=@Position, Salary=@Salary WHERE EmployeeID=@id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//crud hapus
remove: async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM Employess WHERE EmployeeId=@id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
