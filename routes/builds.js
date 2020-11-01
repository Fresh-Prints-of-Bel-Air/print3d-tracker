//
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const auth = require('../middleware/auth');
const Build = require('../models/Build');
const { buildSanitizeFunction } = require('express-validator');

//@route GET api/builds
//@desc Get a build
//@access Public
router.get(
  '/:id', 
  // auth, 
  async (req, res) => {
  try {
      const build = await Build.findById(req.params.id);
      res.json(build);
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
    check('id', 'ID needed').notEmpty(), //the ID of the associated job, mongoose generates IDs
    check(
      ['partsBuilding', 'material', 'resolution'],
      'Please make sure the parts being built, the material, and the build resolution are all supplied'
    )
      .notEmpty()
      .isString(),
    check('dateStarted', 'Please enter the date the build was started')
      .notEmpty()
      .isDate(),
    check('dateDelivered', 'Please enter a valid date')
      .if(check('dateDelivered').exists)
      .isDate(),
    check(
      'estPrintTime',
      'Please enter a numeric value indicating the number of hours to completion for the current build'
    )
      .if(check('estPrintTime').exists)
      .isNumeric(),
    check('status', 'Please enter a status for the build').notEmpty(), //make sure it's an enum
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
    if (!errors.isEmpty) {
      //handle errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newBuild = new Build({
        ...req.body,
      });

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
      const {associatedJobs, partsBuilding, material, resolution, dateStarted, dateDelivered, estPrintTime, status, buildFileName, buildFilePath, operators} = req.body;
      
      const buildFields = {};
      if(associatedJobs) buildFields.associatedJobs = associatedJobs;
      if(partsBuilding) buildFields.partsBuilding = partsBuilding;
      if(material) buildFields.material = material;
      if(resolution) buildFields.resolution = resolution;
      if(dateStarted) buildFields.dateStarted = dateStarted;
      if(dateDelivered) buildFields.dateDelivered = dateDelivered;
      if(estPrintTime) buildFields.estPrintTime = estPrintTime;
      if(status) buildFields.status = status;
      if(buildFileName) buildFields.buildFileName = buildFileName;
      if(buildFilePath) buildFields.buildFilePath = buildFilePath;
      if(operators) buildFields.operators = operators;
      
      let build = await Build.findByIdAndUpdate(
        req.params.id, 
        { $set: buildFields },
        { new: true });
        res.json(build);
      } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
//@route PUT api/builds
//@desc Delete a build. Only operators associated with the build can delete the build.
//@access Public
router.delete('/:id',
//auth,
async (req, res) => {
  try {
    let build = await Build.findById(req.params.id);
    if(!build) return res.status(404).json({msg: 'Build not found'});
    let authorized = false;
    build.operators.forEach((operator) => {
      if(operator === req.user)
        authorized = true;
    });
    if(authorized === false)
      return res.status(401).json({msg: 'Not authorized'});
    await Build.findByIdAndRemove(req.params.id);
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;