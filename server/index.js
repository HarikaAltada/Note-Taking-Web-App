
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth");
const noteRouter = require("./routes/notes");
const cors = require('cors');

dotenv.config();


const app = express();
app.use(cors());  // Add this line
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/notes", noteRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the blog API");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
