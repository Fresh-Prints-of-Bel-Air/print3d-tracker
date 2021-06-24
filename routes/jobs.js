const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const Job = require("../models/Job");
const auth = require('../middleware/auth');

//find many (array of IDs)
// that don't have status: 'Complete'

router.get(
  '/multipleJobsById',
  auth,
  [],
  async (req, res) => {
    try {
      const jobs = await Job.find({ status: { $ne: 'Complete' }}).where('_id').in(req.query.jobIdArray).exec();
      // console.log(req);
      // console.log("req.query.jobIdArray");
      // console.log(req.query.jobIdArray);
      // console.log("multipleJobsById jobs");
      // console.log(jobs);
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
      console.log("Req.params.id");
      console.log(req.params.id);
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
    auth,
    [], 
    async (req, res) => {
    
    // console.log("routes jobs get");
    const filter = {
        status: { $ne: 'Cancelled' } // not equals
    }
    
    const { job_number, requester, projectName, dateRequestedLowerBound, dateRequestedUpperBound, jobStatus, filterType } = req.query;

    console.log(req.query);
    
    //if(dateRequestedLowerBound) filter.dateRequestedLowerBound = { $gte: dateRequestedLowerBound }; //add upperbound?

    if(dateRequestedLowerBound && dateRequestedUpperBound) {
      filter.$and = [
        { dateRequested: { $gte: dateRequestedLowerBound } }, 
        { dateRequested: { $lte: dateRequestedUpperBound } }
      ]
    } else if(dateRequestedLowerBound) {
      filter.dateRequested = {
        $gte: dateRequestedLowerBound
      }
    } else if(dateRequestedUpperBound) {
      filter.dateRequested = {
        $lte: dateRequestedUpperBound
      }
    }

    // if(dateRequestedLowerBound) filter.dateRequested = { $gte: dateRequestedLowerBound };
    
    // special filter for JobList
    if(filterType === "jobList") {
      filter.status = { $nin: ["Cancelled", "Complete"] };
    } else {
      if(job_number) filter.job_number = { $gte: job_number };
      if(jobStatus) filter.status = { $eq: jobStatus };
      if(requester) filter.requester = { $eq: requester };
      if(projectName) filter.projectName = { $eq: projectName };
    }
    
    console.log("job filter:");
    console.log(filter);
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
    auth,
    [],
    async (req, res) => {
      // const errors = validationResult(req);
    //   if (!errors.isEmpty) {
    //     //handle errors
    //     return res.status(400).json({ errors: errors.array() });
    //   }
  
      try {
        console.log("req.body.job_number");
        console.log(req.body.job_number);
        // TO DO: check if job_number is undefined for when e is input
        // also be sure to round it up or down
        const newJob = new Job({
          ...req.body,
          lastUpdated: Date.now()
        });
  
        const job = await newJob.save();
        res.json(job);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  //@route PUT api/jobs/updateMany
  //@desc Update multiple jobs. Expected to be supplied with the filter (ids of documents to update) and the update to apply
  
  //format of action containing filter and update: 
  // let action = {
  //   filter: { _id: { $in: associatedJobs } },
  //   updateToApply: { $push: { builds: buildRes._id } }
  // }

  //@access Public
  router.put(
    '/updateMany',
    auth,
    [],
   async (req, res) => {

    try {
      // console.log(req.body);
      let updatedJobs = await Job.updateMany(req.body.filter, req.body.updateToApply);
      res.json(updatedJobs);

    } catch (err) {

      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  //@route PUT api/jobs
  //@desc Update a job. Frontend prefills fields with existing values. User may update certain values (not empty).
  //@access Public
  router.put(
    '/:id', 
      auth,
      [],
    async (req, res) => {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty) {
    //     //handle errors
    //     return res.status(400).json({ errors: errors.array() });
    //   }

      const { projectName, dateRequested, dateNeeded, completionDate, folderLocation, 
        material, resolution, priority, deliverTo, status, lastUpdated, notes, acceptingOperators, requestedParts, builds } = req.body;
        
      const updateFields = {};
      updateFields.lastUpdated = Date.now;
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
      if(lastUpdated) updateFields.lastUpdated = lastUpdated;
      if(notes) updateFields.notes = notes;
      if(requestedParts) updateFields.requestedParts = requestedParts;
      if(acceptingOperators) updateFields.acceptingOperators = acceptingOperators;
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
  // console.log("job delete");
  
  try {
    let job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({msg: 'Job not found'});

    // console.log("req.user.id");
    // console.log(req.user.id);
    // console.log("job.requesterId");
    // console.log(job.requesterId);

    let authorized = (job.requesterId == req.user.id) ? true : false;

    // console.log("authorized:")
    // console.log(authorized);

    if(authorized === false)
      return res.status(401).json({msg: 'Not authorized'});

    // console.log('req.params.id');
    // console.log(req.params.id);

    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    // console.log(deletedJob);
    res.json(deletedJob);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  module.exports = router;