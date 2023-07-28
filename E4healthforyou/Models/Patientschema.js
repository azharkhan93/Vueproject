const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return /^\d{10}$/.test(value);
    //   },
    //   message: 'Invalid phone number',
    // },
  },
  email: {
    type: String,
    required: true,
    unique: false,
    // validate: {
    //   validator: function (value) {
    //     return /\S+@\S+\.\S+/.test(value);
    //   },
    //   message: 'Invalid email address',
    // },
  },
});

module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);


