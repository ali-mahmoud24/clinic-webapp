const express = require('express');

const adminController = require('../controllers/admin');

const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// router.use(checkAuth);

router.get('/doctors/:doctorId', adminController.getDoctor);

router.post(
  '/add-doctor',
  fileUpload.single('image'),
  adminController.addDoctor
);

router.patch('/doctors/:doctorId', adminController.updateDoctor);

router.delete('/doctors/:doctorId', adminController.deleteDoctor);

router.get('/appointments', adminController.getAppointments);

// router.post('/edit-appointment/appointmentId', adminController.editAppointment);

router.delete(
  '/delete-appointment/:appointmentId',
  adminController.deleteAppointment
);

module.exports = router;
