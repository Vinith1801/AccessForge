// seedRoles.js
const Role = require('../models/Role');

const roles = ['user', 'admin', 'manager'];

async function seedRoles() {
  for (let name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
    }
  }
  console.log('Roles seeded');
}

module.exports = seedRoles;
