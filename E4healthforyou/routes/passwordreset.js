const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../Models/userSchema');

// router.post('/resetpassword', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword, confirmPassword } = req.body;

//   try {
//     // Retrieve the user from the database using the provided token
//     const user = await Signup.findOne({ token });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid token' });
//     }

//     // Validate the new password and confirm password fields
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     user.token = null;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ message: 'Error resetting password' });
//   }
// });

// module.exports = router;




//  const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// // const crypto = require('crypto');
// //  const Pass = require('../Models/passwordSchema)');
// //  const Pass = require('../Models/passwordSchema');
// const Signup = require('../Models/userSchema');
// router.post('/api/passwordreset/:token', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword, confirmPassword } = req.body;

//   // Rest of the code...
// });

router.post('/passwordreset'), async (req, res) => {
   const { token } = req.params;
    // const { token, newPassword, confirmPassword } = req.body;
     const { newPassword, confirmPassword } = req.body;

  try {
    
    const user = await Signup.findOne({ token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

  
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.token = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
},
// });

module.exports = router;
