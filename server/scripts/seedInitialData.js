const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const connectDB = require("../config/db");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const User = require("../models/User");

const seedData = async () => {
  await connectDB();

  // Wipe existing
  await Permission.deleteMany();
  await Role.deleteMany();
  await User.deleteMany();

  // Create Permissions
  const permissions = await Permission.insertMany([
    { name: "view_users" },
    { name: "update_user" },
    { name: "delete_user" },
    { name: "view_self" },
    { name: "update_self" },
  ]);

  const permMap = {};
  permissions.forEach((perm) => (permMap[perm.name] = perm._id));

  // Create Roles
  const roles = await Role.insertMany([
    {
      name: "admin",
      permissions: permissions.map((p) => p._id), // all permissions
    },
    {
      name: "manager",
      permissions: [
        permMap["view_users"],
        permMap["update_user"],
        permMap["view_self"],
        permMap["update_self"],
      ],
    },
    {
      name: "user",
      permissions: [permMap["view_self"], permMap["update_self"]],
    },
  ]);

  const roleMap = {};
  roles.forEach((role) => (roleMap[role.name] = role._id));

  // Create Users
  const users = await User.insertMany([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: roleMap["admin"],
    },
    {
      name: "Manager User",
      email: "manager@example.com",
      password: await bcrypt.hash("manager123", 10),
      role: roleMap["manager"],
    },
    {
      name: "Regular User",
      email: "user@example.com",
      password: await bcrypt.hash("user123", 10),
      role: roleMap["user"],
    },
  ]);

  console.log("✅ Seeded roles, permissions, and users.");
  console.log("🔐 Admin:    admin@example.com / admin123");
  console.log("👨‍💼 Manager:  manager@example.com / manager123");
  console.log("👤 User:     user@example.com / user123");

  mongoose.connection.close();
};

seedData().catch((err) => {
  console.error("❌ Error seeding data:", err);
  mongoose.connection.close();
});
