const User = require("../models/User");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

// Middleware to check if user has required role
const authorizeRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate("role");

      if (!user || user.role.name !== roleName) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }

      next();
    } catch (error) {
      console.error("Role authorization error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
};

// Middleware to check if user has specific permission(s)
const authorizePermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate({
        path: "role",
        populate: { path: "permissions" },
      });

      if (!user || !user.role || !user.role.permissions) {
        return res.status(403).json({ message: "Access denied: no permissions" });
      }

      // Inject hasPermission method for use in controllers
      req.hasPermission = (permName) =>
        user.role.permissions.some((perm) => perm.name === permName);

      const hasPermission = req.hasPermission(permissionName);

      if (!hasPermission) {
        return res.status(403).json({ message: "Access denied: missing permission" });
      }

      next();
    } catch (error) {
      console.error("Permission authorization error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = { authorizeRole, authorizePermission };
