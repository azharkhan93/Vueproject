/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patientschema');
const Session = require('../Models/sessions');

const authMiddleware = async (req, res, next) => {
  const token = req.query.token;
  // if - else
  const session = await Session.findOne({
    token: token
  });

  if(!session) {
    res.send('kjhshjdhdhjkhjf');
    return;
  }

  if(session.valid === false) {
    // dafaa
    return;
  }

  next();
}

// Get all patients
router.get('/Getpatients', authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Error fetching patients' });
  }
});
router.post('/patients', async (req, res) => {
  try {
    const { name, address, phoneNumber, email } = req.body;
    const patient = new Patient({ name, address, phoneNumber, email });
    await patient.save();
    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Error creating patient' });
  }
});

// Get a patient by ID
router.get('/Getpatients/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).json({ message: 'Error fetching patient data' });
  }
});

// Update a patient by ID
router.post('/updatePatient', authMiddleware, async (req, res) => {

  try {
    const form = req.body.form;

    const updatedPatient = await Patient.findByIdAndUpdate(form._id, {
      name: form.name,
      address: form.address,
      email: form.email,
      phoneNumber: form.phoneNumber
    });

    // if query didn't work
    if(!updatedPatient) {
      return res.status(404).json({ message: 'Something went wrong' });
    }
    // otherwise
    res.send({ message: 'Job done', success: true});
  
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Error updating patient' });
  }
});


router.post('/logout', async (req, res) => {
  try {
    const token = req.body.token;

    
    await Session.findOneAndUpdate(
      { token: token },
      { valid: false }
    );

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
});

module.exports = router;

