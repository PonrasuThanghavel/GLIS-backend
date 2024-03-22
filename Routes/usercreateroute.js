const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/user.js'); // Import User model

router.post('/add', async (req, res) => {
  try {
    const { Usr_name, Usr_email, Usr_phone, Usr_address, Usr_pass, role } = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(Usr_pass, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      Usr_name,
      Usr_email,
      Usr_phone,
      Usr_address,
      Usr_pass: hashedPassword, // Store the hashed password in the database
      role
    });

    await newUser.save(); // Save the user to the database

    const response = {
      message: 'User created successfully'
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
