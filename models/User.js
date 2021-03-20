const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  preferredView: {
    type: String,
    enum: [
      'Engineer',
      'Operator'
    ],
    required: true,
    default: 'Engineer'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  jobQueue: {
    type: mongoose.Schema.Types.ObjectId,
  },
  requestedJobs: [],
  lastJobRequest: {
    type: Object,
  }
});

module.exports = mongoose.model('User', UserSchema);
