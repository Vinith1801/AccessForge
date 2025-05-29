const Permission = require("../models/Permission");

// Create a new permission
exports.createPermission = async (req, res) => {
  const { name, description } = req.body;

  try {
    const permission = await Permission.create({ name, description });
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  const permissions = await Permission.find();
  res.json(permissions);
};
