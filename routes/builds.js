//
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
//const auth = require('');
const Build = require('../models/Build');

//@route POST api/builds
//@desc Add a build
//@access Public
router.post(
  '/',
  [
    check('id', 'ID needed').notEmpty(), //the ID of the associated job
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
    check('status', 'Please enter a status for the build').notEmpty(),
    check(
      'buildFileName',
      'Please provide the name of the build file'
    ).notEmpty(),
    check('buildFilePath', 'Please enter the build file path').notEmpty(),
    check(
      'operators',
      'Please provide the names of the operators for the build'
    ).notEmpty(),
  ],
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

module.exports = router;
