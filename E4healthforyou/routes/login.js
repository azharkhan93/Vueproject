const express = require('express');
const router = express.Router();

const Signup = require('../Models/userSchema');

// POST /api/login
router.post('/signup', async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password with the stored hash
    if (password === user.password) {
      req.session.user = user;
      // Passwords match, login successful
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Passwords do not match, login failed
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Error logging in:', error.message);
    return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
