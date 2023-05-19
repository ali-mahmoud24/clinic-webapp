const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
