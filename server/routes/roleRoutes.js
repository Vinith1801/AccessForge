const express = require("express");
const router = express.Router();

const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const { protect } = require("../middleware/authMiddleware");
const { authorizePermission } = require("../middleware/authorize");

router.use(protect);
router.use(authorizePermission("manage_roles"));

router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
