const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only allow self-view unless has view_users permission
    if (
      req.user._id.toString() !== req.params.id &&
      !req.hasPermission("view_users")
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    // Only allow self-update unless has update_user permission
    if (
      req.user._id.toString() !== req.params.id &&
      !req.hasPermission("update_user")
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    if (!req.hasPermission("delete_user")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Assign role to user
exports.assignRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    if (!req.hasPermission("manage_roles")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or Role not found" });
    }

    user.role = roleId;
    await user.save();

    res.json({message: `Role '${role.name}' assigned to ${user.name}` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
