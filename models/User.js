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
  jobQueue: [{
    type: mongoose.Schema.Types.ObjectId,
  }],

  completedJobs: [{ //Jobs are moved here from jobQueue after they are marked complete
    type: mongoose.Schema.Types.ObjectId,
  }],

  requestedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  lastJobRequest: {
    type: Object,
  },
  
  buildList: [{
    type: mongoose.Schema.Types.ObjectId,
  }],

  lastBuild:  Object,
  
  notifications: [{
    text: String,
    dateCreated: Date,
    isRead: {
      type: Boolean,
      default: false,
    }
  }]
});

module.exports = mongoose.model('User', UserSchema);
