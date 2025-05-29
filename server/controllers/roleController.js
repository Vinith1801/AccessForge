const Role = require("../models/Role");
const Permission = require("../models/Permission");

// Create a new role
exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const role = await Role.create({ name, permissions });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  const roles = await Role.find().populate("permissions");
  res.json(roles);
};
