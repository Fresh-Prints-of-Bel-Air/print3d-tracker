const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    requester: { 
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    dateRequested: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateNeeded: {
        type: Date,
        default: Date.now
    },

    // Set when Job is complete, all parts delivered
    completionDate: Date,

    folderLocation: {
        type: String,
        required: true
    }, 
    material: String,
    resolution: String,

    // the "willingness fight someone" over printer time field
    priority: Number,
    deliverTo: {
        type: String,
        required: true
    },

    // completion status of Job, either Accepted, Requested, Complete, Cancelled
    status: { 
        type: String,
        enum: [
            'Accepted', 
            'Requested', 
            'Complete', 
            'Cancelled'
        ],
        required: true
    },

    // stipulations about the request, such as build orientation
    notes: String,
    
    // array of objects with a string for the name and a number for the quantity
    requestedParts: [{ 
        name: String,
        quantity: Number
    }],

    // array of Builds used complete the Job
    builds: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'builds'
    }] 
    
})

<<<<<<< HEAD
module.exports = mongoose.model('Job', JobSchema);
=======
module.exports = mongoose.model('jobs', JobSchema);
>>>>>>> e9f2d3a7f1b74f1e7ce2a79b988250e7f865fdb1
