const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const apiRoutes = require("./routes/api");
const CourseModal = require("./models/Course");

require("dotenv").config();
require("./config/passport")(passport); // Passport configuration

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api", apiRoutes);
app.get("/getcourses", (req, res) => {
  CourseModal.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
});

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Middleware to set Content-Type for JSON
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, err) => {
    if (err) {
      // Handle error
      console.error(err);
      res.status(500).send("Error during authentication");
    } else {
      // Successful authentication, redirect with token
      res.redirect(`https://freecodecamp-miniclone.onrender.com?token=${req.user.token}`);
    }
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
