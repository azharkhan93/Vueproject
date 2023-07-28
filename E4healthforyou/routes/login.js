const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../Models/userSchema');
const Session = require('../Models/sessions');
const crypto = require('crypto');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the user exists in the database
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // create new token
    const token = crypto.randomBytes(32).toString('hex');
    // save new session in db
    await new Session({
      userId: user._id,
      token: token,
      valid: true
    }).save();
    console.log('Admin logged in');
    return res.status(200).json({ message: 'Admin logged in successfully', token: token });
  } catch (error) {
    console.log('Error logging in:', error.message);
    return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;

