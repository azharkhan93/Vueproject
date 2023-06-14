const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../Models/userSchema');



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
    const newSignup = new Signup({
      fullName,
      email,
      password: hashedPassword,
    });

    await newSignup.save();
     res.cookie('user', newSignup, { httpOnly: true });
   
    console.log('User signed up');
    return res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.log('Error signing up:', error.message);
    return res.status(500).json({ error: 'Error signing up' });
  }
});

module.exports = router;
