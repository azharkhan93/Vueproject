const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const Signup = require('../Models/userSchema');

// POST /api/login
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // console.log(email)
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // console.log(passwordMatch)
      // console.log(res)
      // console.log(res)
      res.cookie('logincookie', user.email, { httpOnly: true });
      console.log('Cookie set:', user.email);
      // res.cookie('myCookie', 'Hello, World!', { httpOnly: true });
      //  res.cookie('user', user);
      // res.cookie('user', user, { httpOnly: true });
      
       return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Error logging in:', error.message);
    return res.status(500).json({ error: 'Error logging in' });
  }
});
module.exports = router;
