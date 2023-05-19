const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const dayjs = require('dayjs');

const { HttpError } = require('../models/http-error');

const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const User = require('../models/user');

exports.getDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
  }
};

exports.addDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { firstname, secondname, specialization, experience } = req.body;

  const newDoctor = new Doctor({
    firstname,
    secondname,
    image: req.file.path,
    specialization,
    experience,
  });

  try {
    await newDoctor.save();
  } catch (err) {
    const error = new HttpError(
      'Creating doctor failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ message: 'Doctor created!', doctorId: newDoctor._id });
};

exports.updateDoctor = async (req, res, next) => {
  const { firstname, secondname, specialization, experience } = req.body;
  const { doctorId } = req.params;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
  } catch (err) {
    console.log(err);
  }

  doctor.firstname = firstname;
  doctor.secondname = secondname;
  doctor.specialization = specialization;
  doctor.experience = experience;

  try {
    await doctor.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

exports.deleteDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  let doctor;
  try {
    doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
    res.status(200).json({ message: 'Deleted a doctor.' });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete doctor.',
      500
    );
    return next(error);
  }
};

exports.getAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({}).populate('doctorId');
  } catch (err) {
    const error = new HttpError(
      'Fetching appointments failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!appointments || appointments.length === 0) {
  //   return next(new HttpError('Could not find appointments.', 404));
  // }

  res.json({
    appointments: appointments.map(appointment => {
      const appointmentSeralized = appointment.toObject({ getters: true });
      const appointmentDateTime = dayjs(appointmentSeralized.time);

      return {
        ...appointmentSeralized,
        date: appointmentDateTime.format('DD/MM/YYYY'),
        time: appointmentDateTime.format('h:mm A'),
      };
    }),
  });
};

exports.deleteAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete appointment.',
      500
    );
    return next(error);
  }

  if (!appointment) {
    const error = new HttpError('Could not find appointment for this id.', 404);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(appointment.userId);
  } catch (err) {
    const error = new HttpError(
      'Deleting appointment failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user with this appointment.',
      404
    );
    return next(error);
  }

  // if (appointment.userId.id !== req.userData.userId) {
  //   const error = new HttpError(
  //     'You are not allowed to delete this appointment.',
  //     401
  //   );
  //   return next(error);
  // }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user.appointments.pull(appointment);
    await appointment.remove({ session: sess });
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete appointment.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted appointment.' });
};

// exports.deleteAppointment = async (req, res, next) => {
//   const { appointmentId } = req.params;

//   let appointment;
//   try {
//     appointment = await Appointment.findByIdAndDelete({ _id: appointmentId });
//     res.status(200).json({ message: 'Deleted an appointment.' });
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete appointment.',
//       500
//     );
//     return next(error);
//   }
// };
