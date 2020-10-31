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
router.get(
    '/:id', 
    // auth, 
    async (req, res) => {
    try {
        const Job = await Job.findById(req.params.id);
        res.json(Job);
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
  
        const Job = await newJob.save();
        res.json(Job);
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
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        //handle errors
        return res.status(400).json({ errors: errors.array() });
      }
      
      try {
        const { requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, 
            material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = req.body;
        let Job = await Job.findByIdAndUpdate(
          req.params.id, 
          {
            requester, 
            projectName, 
            dateRequested, 
            dateNeeded, 
            completionDate, 
            folderLocation, 
            material, 
            resolution, 
            priority, 
            deliverTo, 
            status, 
            notes, 
            requestedParts, 
            builds
          });
          res.json(Job);
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