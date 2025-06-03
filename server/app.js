const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// to post roles to the database
// const seedRoles = require("./scripts/seedRoles");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));
app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/permissions", require("./routes/permissionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));


app.get("/", (req, res) => res.send("AccessForge API is running"));

// remove the comment to seed roles
// seedRoles()

module.exports = app;
