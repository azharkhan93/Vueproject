/* eslint-disable no-undef */
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    required: true
  }

});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;


