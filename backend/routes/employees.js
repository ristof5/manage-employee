const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Penting! Route untuk GET all (dengan pagination/search)
router.get("/", employeeController.getAll);

// Untuk dropdown department
router.get("/departments", employeeController.getDepartments);

// ...route lain
router.get("/:id", employeeController.getById);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.remove);

module.exports = router;