const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Permission = require("../models/Permission");
const Role = require("../models/Role");

dotenv.config();

const permissions = [
  { name: "manage_users", description: "Full control over users" },
  { name: "manage_roles", description: "Full control over roles" },
  { name: "view_users", description: "View list of users" },
  { name: "delete_user", description: "Delete users" },
  { name: "update_user", description: "Update any user" },
  { name: "view_self", description: "View own profile" },
  { name: "update_self", description: "Update own profile" },
];

const roles = [
  {
    name: "admin",
    permissions: ["manage_users", "manage_roles", "view_users", "delete_user"],
  },
  {
    name: "manager",
    permissions: ["view_users", "update_user"],
  },
  {
    name: "user",
    permissions: ["view_self", "update_self"],
  },
];

const seedRolesWithPermissions = async () => {
  try {
    await connectDB();

    // Seed permissions
    for (const perm of permissions) {
      const exists = await Permission.findOne({ name: perm.name });
      if (!exists) {
        await Permission.create(perm);
        console.log(`Created permission: ${perm.name}`);
      }
    }

    const allPermissions = await Permission.find();

    // Seed roles
    for (const role of roles) {
      let roleDoc = await Role.findOne({ name: role.name });

      // Get permission IDs for this role
      const permissionIds = allPermissions
        .filter((perm) => role.permissions.includes(perm.name))
        .map((perm) => perm._id);

      if (!roleDoc) {
        roleDoc = await Role.create({
          name: role.name,
          permissions: permissionIds,
        });
        console.log(`Created role: ${role.name}`);
      } else {
        roleDoc.permissions = permissionIds;
        await roleDoc.save();
        console.log(`Updated role: ${role.name}`);
      }
    }

    console.log("✅ Seeding completed.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding roles and permissions:", err);
    process.exit(1);
  }
};

seedRolesWithPermissions();
