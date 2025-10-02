const { poolPromise } = require("../db");

const employeeModel = {
  getAll: async ({ page = 1, limit = 10, search = "" } = {}) => {
    const pool = await poolPromise;
    const offset = (page - 1) * limit;

    // Query dengan JOIN ke Departments
    const employeesQuery = `
      SELECT 
        e.EmployeeId, e.Name, e.Position, e.Salary, e.DepartmentID,
        d.DepartmentName
      FROM Employees e
      LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
      WHERE e.Name LIKE @search
      ORDER BY e.EmployeeId
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;
    const countQuery = `
      SELECT COUNT(*) as total FROM Employees e WHERE e.Name LIKE @search
    `;

    const request = pool.request();
    request.input("search", `%${search}%`);
    request.input("offset", offset);
    request.input("limit", limit);

    const employeesResult = await request.query(employeesQuery);
    const countResult = await pool
      .request()
      .input("search", `%${search}%`)
      .query(countQuery);

    return {
      employees: employeesResult.recordset,
      total: countResult.recordset[0].total,
    };
  },

  // Untuk create, update, pastikan menerima DepartmentID
  create: async ({ Name, Position, Salary, DepartmentID }) => {
    const pool = await poolPromise;
    await pool
      .request()
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .input("DepartmentID", DepartmentID)
      .query(
        "INSERT INTO Employees (Name, Position, Salary, DepartmentID) VALUES (@Name, @Position, @Salary, @DepartmentID)"
      );
  },
  update: async (id, { Name, Position, Salary, DepartmentID }) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .input("Name", Name)
      .input("Position", Position)
      .input("Salary", Salary)
      .input("DepartmentID", DepartmentID)
      .query(
        "UPDATE Employees SET Name=@Name, Position=@Position, Salary=@Salary, DepartmentID=@DepartmentID WHERE EmployeeID=@id"
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
  getDepartments: async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Departments");
    return result.recordset;
  },
};

module.exports = employeeModel;
