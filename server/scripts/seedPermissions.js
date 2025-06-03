// scripts/seedPermissions.js
const mongoose = require("mongoose");
const Permission = require("../models/Permission");
const connectDB = require("../config/db");
require("dotenv").config();

const seedPermissions = async () => {
  await connectDB();

  const permissions = [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "create:role",
    "read:role",
    "update:role",
    "delete:role",
    "create:permission",
    "read:permission",
    "update:permission",
    "delete:permission",
  ];

  for (const name of permissions) {
    const exists = await Permission.findOne({ name });
    if (!exists) {
      await Permission.create({ name });
      console.log(`Permission ${name} created.`);
    } else {
      console.log(`Permission ${name} already exists.`);
    }
  }

  mongoose.disconnect();
};

seedPermissions();
