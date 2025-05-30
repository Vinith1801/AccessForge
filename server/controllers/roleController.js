const Role = require("../models/Role");
const Permission = require("../models/Permission");

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const existing = await Role.findOne({ name });
    if (existing) return res.status(400).json({ message: "Role already exists" });

    // Validate permission IDs
    const validPermissions = await Permission.find({ _id: { $in: permissions } });
    const role = new Role({ name, permissions: validPermissions.map(p => p._id) });
    await role.save();

    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update role (name or permissions)
exports.updateRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    if (name) role.name = name;
    if (permissions) {
      const validPermissions = await Permission.find({ _id: { $in: permissions } });
      role.permissions = validPermissions.map(p => p._id);
    }

    await role.save();
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
