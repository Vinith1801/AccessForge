const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Permission = require("../models/Permission");
const Role = require("../models/Role");

const connectDB = require("../config/db");

const seedData = async () => {
  await connectDB();

  // Define permissions
  const permissionList = [
    { name: "create_user", description: "Create new users" },
    { name: "delete_user", description: "Delete existing users" },
    { name: "update_user", description: "Update any user" },
    { name: "view_users", description: "View all users" },
    { name: "manage_roles", description: "Manage roles" },
    { name: "manage_permissions", description: "Manage permissions" },
    { name: "view_self", description: "View own profile" },
    { name: "update_self", description: "Update own profile" },
  ];

  // Clear existing data
// await Permission.deleteMany({});
// await Role.deleteMany({});

  // Insert permissions
  const createdPermissions = await Permission.insertMany(permissionList);

  const findPermission = (name) =>
    createdPermissions.find((p) => p.name === name)._id;

  // Define roles and assign permissions
  const roles = [
    {
      name: "admin",
      permissions: [
        "create_user",
        "delete_user",
        "update_user",
        "view_users",
        "manage_roles",
        "manage_permissions",
      ].map(findPermission),
    },
    {
      name: "manager",
      permissions: ["view_users", "update_user"].map(findPermission),
    },
    {
      name: "user",
      permissions: ["view_self", "update_self"].map(findPermission),
    },
  ];

  await Role.insertMany(roles);

  console.log("✅ Roles & permissions seeded successfully!");
  mongoose.connection.close();
};

seedData().catch((err) => {
  console.error("❌ Error seeding roles/permissions:", err);
  mongoose.connection.close();
});
