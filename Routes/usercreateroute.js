const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/user.js'); // Import User model

router.post('/add', async (req, res) => {
  try {
      const { Usr_name, Usr_email, Usr_phone, Usr_address, Usr_pass } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Usr_pass, salt);
      const newUser = new User({ Usr_name, Usr_email, Usr_phone, Usr_address, Usr_pass: hashedPassword  }); // Instantiate a new User

      await newUser.save(); 
      const response = {
          message: 'User created successfully'
      };
      res.status(200).json(response);
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  const Usr_email=req.body.email;

  try {
    const user = await User.findOne({ Usr_email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(pass, user.Usr_pass);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
