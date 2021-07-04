const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Build = require('../models/Build');

//used to check if filters are empty or not
const isEmpty = (object) => { for(let i in object) { return false; } return true; } 

//@route GET api/builds/multipleBuildsById
//@desc Get a build
//@access Public
router.get(
  '/multipleBuildsById',
  auth,
  [],
  async (req, res) => {
    try {
      const buildList = await Build.find().where('_id').in(req.query.buildIdArray).exec();
      res.json(buildList);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
});

router.get(
  '/', 
  auth, 
  async (req, res) => {
  try {
      // Filtering options: dateStarted, dateDelivered, projects (name:[string]), operators (name: [string])
      const filter = {};

      const { build_number, status, startedFrom, startedTo, deliveredFrom, deliveredTo, project, operator } = req.query; // filters
      // Filter date build was started
      if(startedFrom && startedTo)
      {
        filter.$and = [
          { dateStarted: { $gte: startedFrom } }, 
          { dateStarted: { $lte: startedTo } }
        ];
      }
      else if(startedFrom)
      {
        filter.dateStarted = {
          $gte: startedFrom
        }
      }
      else if(startedTo)
      {
        filter.dateStarted = {
          $lte: startedTo
        }
      }

      //Filter date of delivery
      if(deliveredFrom && deliveredTo)
      {
        filter.$and = [
          { dateDelivered: { $gte: deliveredFrom } }, 
          { dateDelivered: { $lte: deliveredTo } }
        ]
      }
      else if(deliveredFrom)
      {
        filter.dateDelivered = {
          $gte: deliveredFrom
        }
      }
      else if(deliveredTo)
      {
        filter.dateDelivered = {
          $lte: deliveredTo
        }
      }
      //Filter by project name
      if(project)
      {
        filter.projects = {$elemMatch: {$eq: project}};
      }
      //Filter by operator name
      if(operator)
      {
        filter.operators = {$elemMatch : {$eq: operator}};
      }
      if(status)
      {
        filter.status = {$eq: status};
      }
      if(build_number) 
      {
        filter.build_number = { $gte: build_number };
      }

      if (isEmpty(filter)) {
        let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; //ex 12/28/2020, need to change to 2020-12-18
        today = today.split('/');
        today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
        
        filter.$or = [
          { dateStarted: { $gte: today } }, 
          { dateDelivered: { $gte: today } } 
        ];
      }
      const builds = await Build.find(filter);
      res.json(builds);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
  }
});

//@route POST api/builds
//@desc Add a build
//@access Public
router.post(
  '/',
  [
    auth,
    check(
      ['material', 'resolution'],
      'Please make sure the material and the build resolution are supplied'
    )
      .notEmpty()
      .isString(),
    check('dateStarted', 'Please enter the date the build was started')
      .notEmpty()
      .isDate(),
    check(
      'estPrintTime',
      'Please enter a numeric value indicating the number of hours to completion for the current build'
    )
      .if(check('estPrintTime').exists)
      .isNumeric(),
    check(
      'buildFileName',
      'Please provide the name of the build file'
    ).notEmpty(),
    check('buildFilePath', 'Please enter the build file path').notEmpty(),
    check(
      'operators',
      'Please provide the names of the operators for the build'
    ).notEmpty(),
  ], //array of middlewares
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //handle errors
      return res.status(400).send(errors.array()[0].msg);
    }

    try {
      const newBuild = new Build({ ...req.body });
      const build = await newBuild.save();
      res.json(build);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PUT api/builds
//@desc Update a build. Frontend prefills fields with existing values. User may update certain values (not empty).
//@access Public
router.put(
  '/:id', 
  [ 
    auth,
    check(
      'partsBuilding',
      'Invalid format for Parts Building'
    )
      .notEmpty()
      .isString(),
    check(
      'material',
      'Invalid format for material'
    )
      .notEmpty()
      .isString(),
    check(
      'resolution',
      'Invalid format for resolution'
    )
      .notEmpty()
      .isString(),
    check(
      'dateStarted', 
      'Please enter the date the build was started'
    )
      .notEmpty()
      .isDate(),
    check(
      'dateDelivered', 
      'Please enter a valid date'
    )
      .notEmpty()
      .isDate(),
    check(
      'estPrintTime',
      'Please enter a numeric value indicating the number of hours to completion for the current build'
    )
      .notEmpty()
      .isNumeric(),
    check(
      'status', 
      'Please enter a status for the build'
    )
      .notEmpty()
      .isString(),
    check(
      'buildFileName',
      'Please provide the name of the build file as a string'
    )
      .notEmpty()
      .isString(),
    check(
      'buildFilePath', 
      'Please enter the build file path'
    )
      .notEmpty()
      .isString(),
    check(
      'operators',
      'Please provide the names of the operators for the build'
    )
      .notEmpty()
      .isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      //handle errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check if build is in the database
      const build = await Build.findById(req.params.id);
      if(!build) return res.status(404).json({msg: 'Build not found'});
 
      const {associatedJobs, partsBuilding, material, resolution, dateStarted, dateDelivered, estPrintTime, status, projects, buildFileName, buildFilePath, operators} = req.body;
      
      const buildFields = {};
      if(associatedJobs) buildFields.associatedJobs = associatedJobs;
      if(partsBuilding) buildFields.partsBuilding = partsBuilding;
      if(material) buildFields.material = material;
      if(resolution) buildFields.resolution = resolution;
      if(dateStarted) buildFields.dateStarted = dateStarted;
      if(dateDelivered) buildFields.dateDelivered = dateDelivered;
      if(estPrintTime) buildFields.estPrintTime = estPrintTime;
      if(status) buildFields.status = status;
      if(projects) buildFields.projects = projects;
      if(buildFileName) buildFields.buildFileName = buildFileName;
      if(buildFilePath) buildFields.buildFilePath = buildFilePath;
      if(operators) buildFields.operators = operators;
      
      let updatedBuild = await Build.findByIdAndUpdate(
        req.params.id, 
        { $set: buildFields },
        { new: true });
        res.json(updatedBuild);
      } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
//@route PUT api/builds
//@desc Delete a build. Only operators associated with the build can delete the build.
//@access Public
router.delete('/:id',
auth,
async (req, res) => {
  try {
    let build = await Build.findById(req.params.id);
    if(!build) return res.status(404).json({msg: 'Build not found'});
    const deletedBuild = await Build.findByIdAndRemove(req.params.id);
    res.json(deletedBuild);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


