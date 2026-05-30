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

// MongoDB connection string (PUT YOUR REAL PASSWORD HERE)
const MONGO_URI = "mongodb+srv://Dcredence:Ayodele1305@cluster0.aabbocb.mongodb.net/?retryWrites=true&w=majority";

// connect DB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");

  // IMPORTANT: use Render port
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });

})
.catch((err) => {
  console.log("MongoDB connection error:", err.message);
});