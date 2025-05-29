const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Role = require("../models/Role");

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@example.com" });
  if (existingAdmin) {
    console.log("⚠️ Admin user already exists.");
    return mongoose.connection.close();
  }

  const adminRole = await Role.findOne({ name: "admin" });
  if (!adminRole) {
    console.log("❌ Admin role not found. Please seed roles first.");
    return mongoose.connection.close();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const newAdmin = new User({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: adminRole._id,
  });

  await newAdmin.save();
  console.log("✅ Admin user created: admin@example.com / admin123");

  mongoose.connection.close();
};

createAdmin().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
