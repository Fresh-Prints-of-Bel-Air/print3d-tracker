const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const Job = require("../models/Job");
const auth = require('../middleware/auth');

//find many (array of IDs)

router.get(
  '/multipleJobsById',
  auth,
  [],
  async (req, res) => {
    try {
      const jobs = await Job.find().where('_id').in(req.query.jobIdArray).exec();
      console.log("req.query.jobIdArray");
      console.log(req.query.jobIdArray);
      console.log("multipleJobsById jobs");
      console.log(jobs);
      res.json(jobs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  });

// get by ID
router.get(
  '/:id', 
  auth,
  [], 
  async (req, res) => {
  try {
      const job = await Job.findById(req.params.id);
      res.json(job);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
  }
});

//@route GET api/jobs
//@desc Get a job
//@access Public
// get by filter
router.get(
    '/',
    // auth,
    [], 
    async (req, res) => {
    
    console.log("routes jobs get");
    const filter = {
        status: { $ne: 'Complete' } // not equals
    }
    
    const { job_number, requester, projectName, dateRequestedLowerBound, dateRequestedUpperBound, jobStatus } = req.query;
    
    if(dateRequestedLowerBound) filter.dateRequestedLowerBound = { $gte: dateRequestedLowerBound }; //add upperbound?

    if(job_number) filter.job_number = { $gte: job_number };
    if(jobStatus) filter.status = { $eq: jobStatus };
    if(requester) filter.requester = { $eq: requester };
    if(dateRequestedLowerBound) filter.dateRequested = { $gte: dateRequestedLowerBound };
    if(projectName) filter.projectName = { $eq: projectName };

    try {
        const jobs = await Job.find(filter);
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
  });

  //@route POST api/jobs
  //@desc Add a Job
  //@access Public
  router.post(
    '/',
    // auth,
    [],
    async (req, res) => {
      // const errors = validationResult(req);
    //   if (!errors.isEmpty) {
    //     //handle errors
    //     return res.status(400).json({ errors: errors.array() });
    //   }
  
      try {
        const newJob = new Job({
          ...req.body,
        });
  
        const job = await newJob.save();
        res.json(job);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  //@route PUT api/jobs
  //@desc Update a job. Frontend prefills fields with existing values. User may update certain values (not empty).
  //@access Public
  router.put(
    '/:id', 
      // auth,
      [],
    async (req, res) => {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty) {
    //     //handle errors
    //     return res.status(400).json({ errors: errors.array() });
    //   }

      const { requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, 
        material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = req.body;
        
      const updateFields = {};
      if(requester) updateFields.requester = requester;
      if(projectName) updateFields.projectName = projectName;
      if(dateRequested) updateFields.dateRequested = dateRequested;
      if(dateNeeded) updateFields.dateNeeded = dateNeeded;
      if(completionDate) updateFields.completionDate = completionDate;
      if(folderLocation) updateFields.folderLocation = folderLocation;
      if(material) updateFields.material = material;
      if(resolution) updateFields.resolution = resolution;
      if(priority) updateFields.priority = priority;
      if(deliverTo) updateFields.deliverTo = deliverTo;
      if(status) updateFields.status = status;
      if(notes) updateFields.notes = notes;
      if(requestedParts) updateFields.requestedParts = requestedParts;
      if(folderLocation) updateFields.folderLocation = folderLocation;
      if(builds) updateFields.builds = builds;
      
      try {
        let job = await Job.findByIdAndUpdate(
            req.params.id, 
            { $set: updateFields },
            { new: true }
        );
        res.json(job);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

//@route PUT api/jobs
//@desc Delete a job. Only the job requester can delete the job.
//@access Public
router.delete('/:id',
auth,
async (req, res) => {
  console.log("job delete");
  
  try {
    let job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({msg: 'Job not found'});

    console.log("req.user.id");
    console.log(req.user.id);
    console.log("job.requesterId");
    console.log(job.requesterId);

    let authorized = (job.requesterId == req.user.id) ? true : false;

    console.log("authorized:")
    console.log(authorized);

    if(authorized === false)
      return res.status(401).json({msg: 'Not authorized'});

    console.log('req.params.id');
    console.log(req.params.id);

    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    console.log(deletedJob);
    res.json(deletedJob);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  module.exports = router;