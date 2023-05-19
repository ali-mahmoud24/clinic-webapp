const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
