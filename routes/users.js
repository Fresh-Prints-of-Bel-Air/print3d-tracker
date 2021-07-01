const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config'); //commented out for heroku environment variables
const auth = require('../middleware/auth');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// @route   POST api/users
// @desc    Register
// @access

router.post(
  '/',
  // this parameter contains the middleware,
  // check calls from express-validator/check
  [
    auth,
    check('name', 'Please add name').not().isEmpty().isString(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter 6 or more characters').isLength({ min: 6 }).isString(),
  ],
  async (req, res) => {
    // contains errors as a result of the check calls
    const errors = validationResult(req);
    // if we have errors, we return a status 400
    if (!errors.isEmpty()) {
      // 400 bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // destructuring the fields from the request
    const { name, email, password } = req.body;

    try {
      // Mongoose call to find a User with that email, to see if it's already been registered
      user = await User.findOne({ email: email });

      // evaluates to true if a user with that email was found
      if (user) {
        return res.status(400).json({
          msg: 'User already exists',
        });
      }

      // Creates new user object out of the destructured variables from the request
      user = new User({
        name,
        email,
        password, // this password was already hashed in the /api/admin put, 
                  // when the user created the registration request
      });

      // // generates salt for hashing function
      // const salt = await bcrypt.genSalt(10);
      // // password is saved only as a hash code
      // user.password = await bcrypt.hash(password, salt);

      // saves user to the database
      await user.save();

      try { //send email

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com", //ex: smtp.gmail.com
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: `${process.env.altavizEmail}`, 
            pass: `${process.env.altavizPassword}`, 
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"Altaviz" <${process.env.altavizEmail}>`, // sender address
          to: `${email}`, // list of receivers
          subject: "Password Reset Request", // Subject line
          text: `Hello,\nThis is an automated message from Altaviz. We've accepted your registration request. You may login using your provided email address and password at  ` + 
          `${process.env.altavizURL}.\n\n Best,\nAltaViz`, // plain text body
          html: `<b>Hello,<br>This is an automated message from Altaviz.  We've accepted your registration request. You may login using your provided email address and password at  ` + 
          `${process.env.altavizURL}<br><br>Best,<br><br>AltaViz</b>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        res.json({'msg': `Email sent to ${email}`});
      

      } catch (err) {
        console.error(err.message);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//TODO: UPDATEMANY
router.put(
  '/updateMany',
  [
    auth,
  ],
  async (req, res) => {

    try{
      // The method collection.updateMany returns a document that contains:

      // A boolean acknowledged as true if the operation ran with write concern or false if write concern was disabled
      // matchedCount containing the number of matched documents
      // modifiedCount containing the number of modified documents
      // upsertedId containing the _id for the upserted document

      const userRes = await User.updateMany(req.body.filter, req.body.updateToApply);
      res.json(userRes);
    
    } catch (err) {
      
      console.error(err.message);
      res.status(500).send('Server Error');
    
    }
    
  }
);


// @route   PUT api/users
// @desc    Update a user
// @access
router.put(
  '/:id', 
  [ 
    //auth,
    //add checks?
  ],
  async (req, res) => {
    //const errors = validationResult(req);
    // if (!errors.isEmpty) {
    //   //handle errors
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      //check if build is in the database
      const user = await User.findById(req.params.id);
      if(!user) return res.status(404).json({msg: 'User not found'});
      console.log("updating user with the object: ");
      console.log(req.body);
      const {name, preferredView, email, password, jobQueue, requestedJobs, lastJobRequest, lastBuild, notifications, buildList} = req.body;
      
      const userFields = {};
      if(name) userFields.name = name;
      if(preferredView) userFields.preferredView = preferredView;
      if(email) userFields.email = email;
      if(password) userFields.password = password;
      if(jobQueue) userFields.jobQueue = jobQueue;
      if(requestedJobs) userFields.requestedJobs = requestedJobs;
      if(lastJobRequest) userFields.lastJobRequest = lastJobRequest;
      if(notifications) userFields.notifications = notifications;
      if(lastBuild) userFields.lastBuild = lastBuild;
      if(buildList) userFields.buildList = buildList;

      let updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        { $set: userFields },
        { new: true });
        res.json(updatedUser);
      } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
