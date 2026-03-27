const express = require("express");
const cors = require("cors");
require("dotenv").config();

const roadmapRoute = require("./routes/roadmapRoute");
const chatRoute = require("./routes/chatRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", roadmapRoute);
app.use("/api", chatRoute);

// test route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

module.exports = app;