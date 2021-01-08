const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BuildSchema = mongoose.Schema({
  build_number: {type: Number, default: 0},
  associatedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs',
    },
  ],
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

  projects: [String], //a list of projects that this build belongs to

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

BuildSchema.plugin(AutoIncrement, { inc_field: "build_number" });


module.exports = mongoose.model('build', BuildSchema);
