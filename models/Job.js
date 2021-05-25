const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSchema = mongoose.Schema({
    job_number: {type: Number, default: 0},
    requester: { //on card
        type: String,
        required: true
    },
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    projectName: { //on card
        type: String,
        required: true
    },
    dateRequested: { //on card
        type: Date,
    },
    dateNeeded: {
        type: Date,
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
    priority: Number, //on card
    deliverTo: {
        type: String,
        required: true
    },

    // completion status of Job, either Accepted, Requested, Complete, Cancelled
    status: { //on card
        type: String, 
        enum: [
            'Accepted', 
            'Requested', 
            'Complete', 
            'Cancelled'
        ],
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true,
    },

    // stipulations about the request, such as build orientation
    notes: String,
    
    // array of objects with a string for the name and a number for the quantity
    requestedParts: [{ //collapsible
        name: String,
        quantity: Number,
        building: Number,
        remaining: Number,
    }],
    
    //operators that have accepted the job, used to notify operators of job deletion/cancellation and remove the job from their job queue
    acceptingOperators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],

    // array of Builds used complete the Job
    builds: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'builds'
    }],
    
})

JobSchema.plugin(AutoIncrement, { inc_field: "job_number" });

module.exports = mongoose.model('Job', JobSchema);
