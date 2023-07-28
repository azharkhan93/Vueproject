/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Signup = require('../Models/userSchema');

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    
    const salt = await bcrypt.genSalt(10);
    

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const expirationDate = Date.now() + TOKEN_EXPIRATION_TIME;
    const token = crypto.randomBytes(32).toString('hex');
    const newSignup = new Signup({
      fullName,
      email,
      password: hashedPassword,
      token,
      // role: 'admin',
      tokenExpiration: expirationDate,
    });

    await newSignup.save();
    
    res.cookie('mytoken', email, { httpOnly: true });
   
    console.log('User signed up');
    return res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.log('Error signing up:', error.message);
    return res.status(500).json({ error: 'Error signing up' });
  }
});

module.exports = router;
