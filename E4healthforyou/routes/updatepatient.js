// const express = require('express');
// const router = express.Router();
// const Patient = require('../Models/Patientschema');

// router.patch('/patients/:id', async (req, res) => {
//   try {
//     const patientId = req.params.id;
//     const { name, address, phoneNumber, email } = req.body;
//     const updatedPatient = await Patient.findByIdAndUpdate(
//       patientId,
//       { name, address, phoneNumber, email },
//       { new: true }
//     );
//     if (!updatedPatient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
//     res.json({ message: 'Patient updated successfully' });
//   } catch (error) {
//     console.error('Error updating patient:', error);
//     res.status(500).json({ message: 'Error updating patient' });
//   }
// });

//  module.exports = router;
