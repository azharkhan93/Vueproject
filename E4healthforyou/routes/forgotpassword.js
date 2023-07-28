const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const Signup = require('../Models/userSchema');
const nodemailer = require('nodemailer');

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'azharkhan.work101@gmail.com',
      pass: 'vnnbhzxsqhbvfcgn',
    },
  });

router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new token and expiration date
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(Date.now() + TOKEN_EXPIRATION_TIME);

    // Update the user's token and token expiration in the database
    user.token = token;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    // Create a password reset URL with the token
    const resetURL = `http://your-website.com/forgotpassword?token=${token}`;

    // Compose the email message
    const mailOptions = {
      from: 'azharkhan.work101@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetURL}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Password reset email sent');
    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.log('Error sending password reset email:', error.message);
    return res.status(500).json({ error: 'Error sending password reset email' });
  }
});

module.exports = router;



// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'azharkhan.work101@gmail.com',
//     pass: 'vnnbhzxsqhbvfcgn',
//   },
// });
// // Define the email content
// const mailOptions = {
//   from: 'michealboi75@gmail.com',
//   to: 'ak305368@gmail.com',
//   subject: 'Test Email',
//   text: 'This is a test email sent using Nodemailer.',
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });


// router.post('/forgotpassword', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await Signup.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     if (!user.token) {
//       return res.status(400).json({ message: 'Token not found' });
//     }
    //  const token = user.token;
    // const token = crypto.randomBytes(32).toString('hex');
    // user.token = token;
    // await user.save();

    // const resetLink = `http://localhost:3000/forgotpassword/${user.token}`;

    // Define the email content
  //   const emailContent = `
  //     <h2>Password Reset</h2>
  //     <p>Click the following link to reset your password:</p>
  //     <a href="${resetLink}">Reset Password</a>
  //   `;
  //   transporter.sendMail({
  //     from: 'azhrkhn9@gmail.com',
  //     to: email,
  //     subject: 'Password Reset',
  //     html: emailContent,
  //   },
  //     (error, info) => {
  //       if (error) {
  //         console.error('Error sending email:', error);
  //         res.status(500).json({ message: 'Error sending email' });
  //       } else {
  //         console.log('Email sent:', info.response);
  //         console.log('Token:', user.token);
  //         res.status(200).json({ message: 'Password reset email sent' });
  //       }
  //     });
  // } catch (error) {
  //   console.error('Error resetting password:', error);
  //   res.status(500).json({ message: 'Error resetting password' });
  // }
  // const emailContent = `Click the following link to reset your password: http://your-website.com/reset-password/${token}`;
  // await transporter.sendMail({
  //   from: 'michealboi75@gmail.com', // Sender email address
  //   to: email, // Recipient email address
  //   subject: 'Password Reset',
  //   text: emailContent,

  // });

  // Send the password reset email with the token
  // Implement your email sending logic here

  //   res.status(200).json({ message: 'Password reset email sent' });
  // } catch (error) {
  //   console.error('Error resetting password:', error);
  //   res.status(500).json({ message: 'Error resetting password' });
  // }
// });



// module.exports = router;


