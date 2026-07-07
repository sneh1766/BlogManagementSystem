const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getAllUsers,
  changeUserRole,
} = require("../controllers/userController");

// Only Admin
router.get("/", protect, authorize("Admin"), getAllUsers);

router.put("/:id/role", protect, authorize("Admin"), changeUserRole);

module.exports = router;