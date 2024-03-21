const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
  console.log('Connected to the database!');
}).catch(err => {
  console.error('Error connecting to the database:', err);
  process.exit(1); // Exit the process if unable to connect to the database
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// Start the server
const PORT = process.env.PORT || 5173; // Use the PORT from environment variable or default to 5004
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});

module.exports = app; 
