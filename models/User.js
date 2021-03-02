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
      'Printer'
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
  requestedJobs: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  lastJobRequest: {
    type: mongoose.Schema.Types.ObjectId,
    
  }
});

module.exports = mongoose.model('User', UserSchema);
