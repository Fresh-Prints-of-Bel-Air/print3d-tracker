const mongoose = require('mongoose');

const BuildSchema = mongoose.Schema({
  // associatedJobs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'jobs',
  //   },
  // ],
  partsBuilding: [
    {
      name: String,
    },
  ],
  material: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
  dateStarted: {
    type: Date,
    required: true,
  },
  dateDelivered: {
    type: Date,
  },

  estPrintTime: Number,

  status: {
    type: String,
    enum: [
      'Build File Ready',
      'Build Started',
      'Build Complete',
      'Build Post-Processed',
      'Build Delivered',
    ],
    required: true,
  },

  projects: [String],

  buildFileName: {
    type: String,
    required: true,
  },

  buildFilePath: {
    type: String,
    required: true,
  },
  operators: [String],
});

module.exports = mongoose.model('build', BuildSchema);
