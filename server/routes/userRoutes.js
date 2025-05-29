const express = require("express");
const router = express.Router();
const { assignRole } = require("../controllers/userController");


const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorizePermission } = require("../middleware/authorize");

router.use(protect);

router.get("/", authorizePermission("view_users"), getAllUsers);
router.get("/:id", getUserById); // view_self logic inside
router.put("/:id", updateUser);  // update_self logic inside
router.delete("/:id", authorizePermission("delete_user"), deleteUser);
router.put("/:id/role", authorizePermission("manage_roles"), assignRole);

module.exports = router;
