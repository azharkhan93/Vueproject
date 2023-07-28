const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  
  token: {
    type: String,
    default: function () {
      return crypto.randomBytes(32).toString('hex');
    },
    
  },
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;


