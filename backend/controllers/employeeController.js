const employeeModel = require("../models/employeeModel");

const employeeController = {
  getAll: async (req, res) => {
    try {
      const employees = await employeeModel.getAll();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const employee = await employeeModel.getById(req.params.id);
      if (employee.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // buat
  create: async (req, res) => {
    try {
      const { Name, Position, Salary } = req.body;
      if (!Name || !Position || Salary <= 0) {
        return res.status(400).json({ message: "Invalid Input" });
      }
      await employeeModel.create({ Name, Position, Salary });
      res.status(201).json({ message: "Employee Created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // edit
  update: async (req, res) => {
    try {
      const rowsAffected = await employeeModel.update(req.params.id, req.body);
      if (rowsAffected === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // hapus
  remove: async (req, res) => {
    try {
      const rowsAffected = await employeeModel.remove(req.params.id);
      if (rowsAffected === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = employeeController;
