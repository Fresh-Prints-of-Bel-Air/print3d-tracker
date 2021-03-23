const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const Job = require("../models/Job");

//@route GET api/jobs
//@desc Get a job
//@access Public
// get by filter
router.get(
    // auth,
    [], 
    async (req, res) => {
    
    console.log("routes jobs get");
    const filter = {
        status: { $ne: 'Complete' } // not equals
    }
    
    const { requester, status, dateRequested } = req.query;

    if(status) filter.status = { $eq: status};
    if(requester) filter.requester = { $eq: requester };
    if(dateRequested) filter.dateRequested = { $eq: dateRequested };

    try {
        const job = await Job.find(filter);
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
  });

  // get by ID
  router.get(
    '/:id', 
    // auth,
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
  
  //find many (array of IDs)

  router.get(
    '/userRequests',
    //auth,
    [],
    async (req, res) => {
      try {
        const jobs = await Job.find().where('_id').in(req.query).exec();
        res.json(jobs);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
      }
    }
  )
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
//auth,
async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if(!build) return res.status(404).json({msg: 'Job not found'});
    let authorized = (job.requester === req.user) ? true : false;
    if(authorized === false)
      return res.status(401).json({msg: 'Not authorized'});
    await Job.findByIdAndRemove(req.params.id);
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  module.exports = router;