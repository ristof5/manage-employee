const { poolPromise } = require("../db");

// ambil employee
const employeeModel = {
  getAll: async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Employees");
    return result.recordset;
  },

  getById: async (id) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM Employees WHERE EmployeeId = @id");
    return result.recordset;
  },

  // buat 
  create: async ({ Name, Position, Salary }) => {
    const pool = await poolPromise;
    await pool
      .request()
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .query(
        "INSERT INTO Employees (Name, Position, Salary) VALUES (@Name, @Position, @Salary)"
      );
  },
  // edit
  update: async (id, { Name, Position, Salary }) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .query(
        "UPDATE Employees SET Name=@Name, Position=@Position, Salary=@Salary WHERE EmployeeID=@id"
      );
    return result.rowsAffected[0];
  },
  // hapus
  remove: async (id) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("DELETE FROM Employees WHERE EmployeeId=@id");
    return result.rowsAffected[0];
  },
};

module.exports = employeeModel;
