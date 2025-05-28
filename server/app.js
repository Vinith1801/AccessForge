const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes will be added here later
app.get("/", (req, res) => res.send("AccessForge API is running") );

module.exports = app;
