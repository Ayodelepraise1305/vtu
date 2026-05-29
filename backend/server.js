const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("VTU Backend is running...");
});

// MongoDB connection
mongoose.connect("mongodb+srv://dcredence:<db_password>@cluster0.aabbocb.mongodb.net/")
.then(() => {
  console.log("MongoDB connected successfully");

  // start server ONLY after DB connects
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

})
.catch((err) => {
  console.log("MongoDB connection error:", err.message);
});