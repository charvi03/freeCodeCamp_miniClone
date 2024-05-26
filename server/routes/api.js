const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const User = require("../models/User");
const Course = require("../models/Course"); // Assuming you have a Course model

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Request body:", req.body);
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === 11000) {
      res.status(400).send("Email already exists");
    } else if (error.name === "ValidationError") {
      res.status(400).send("Validation error");
    } else {
      res.status(500).send("Error creating user");
    }
  }
});

router.post("/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: jwtToken });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(500).send("Error authenticating with Google");
  }
});

module.exports = router;
