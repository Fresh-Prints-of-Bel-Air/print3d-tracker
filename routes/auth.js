const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
//const config = require('config'); //commented out for heroku environment variables
const auth = require('../middleware/auth');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
// req is stuff we put in via Postman, the request
router.get('/', auth, async (req, res) => {
  try {
    // finds user by id and doesn't return the password
    // console.log('user id is: ');
    // console.log(req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    
    // user.notifications.filter((notification) => { //filter out read notifications that are more than 3 days old
    //   notification.isRead == false && notification.dateCreated
    // })
    // returns a user JSON object
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!NOTE: PLEASE ADD CHECKS FOR ALL PASSWORD RESET-RELATED ROUTES!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// @route POST /api/auth/forgotPassword
// @desc Get a password reset email with code
// @access Public
// req.body is expected to have a user email
// router.post(
//   `/forgotPassword`, 
//   [check('email', 'Please include a valid email').notEmpty().isEmail()], 
//   async (req, res) => { 
//   try {
//     const errors = validationResult(req);
//     // if we have errors, we return a status 400
//     if (!errors.isEmpty()) {
//       // 400 bad request
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }
//     //Step 1: Find a user with matching email
//     //Step 2a: If user with matching email is found, create UUID
//     //Step 2b: Post a new PasswordReset document containing the user's email and the UUID
//     //Step 3: Send an email to the user containing the UUID and some presentable looking HTML (CSS too?)
//     //Step 4: Return an indication of whether or not the password reset request was approved (i.e. the password reset object was created and the UUID was emailed to the user)
    
//     const { email } = req.body;
     
//     const user = await User.findOne({ email });

//     if(user){
//       let passwordResetRequestCode = uuidv4();
//       //Hash the password reset request code for storage
//       //const salt = await bcrypt.genSalt(10);
//       //let hashedResetRequestCode = await bcrypt.hash(passwordResetRequestCode, salt);
      

//       try { //post password reset document
        
//         const passwordResetObj = {
//           email,
//           passwordResetRequestCode,
//         }
//         // only want one password reset doc, if it doesn't exist it creates a new one
//         const passwordResetDoc = await PasswordReset.findOneAndReplace({ email: { $eq: email }}, passwordResetObj, { upsert: true });

//         try { //send email

//           let transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com", //ex: smtp.gmail.com
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//               user: `${config.get('altavizEmail')}`, 
//               pass: `${config.get('altavizPassword')}`, 
//             },
//           });
        
//           // send mail with defined transport object
//           let info = await transporter.sendMail({
//             from: `"Altaviz" <${config.get('altavizEmail')}>`, // sender address
//             to: `${email}`, // list of receivers
//             subject: "Password Reset Request", // Subject line
//             text: `Hello,\nThis is an automated message from Altaviz. We've received a password reset request for the account associated with your email address. ` + 
//             `If this was you, please use the password reset code provided at the link below:\n\n https://damp-ocean-95259.herokuapp.com \n\nYour password reset code: ${passwordResetRequestCode}\n\n Best,\nAltaViz`, // plain text body
//             html: `<b>Hello,<br>This is an automated message from Altaviz. We've received a password reset request for the account associated with your email address. ` + 
//             `If this was you, please use the password reset code provided at the link below:<br><br> https://damp-ocean-95259.herokuapp.com <br><br>Your password reset code: <br>${passwordResetRequestCode}<br><br> Best,<br><br>AltaViz</b>`, // html body
//           });
        
//           console.log("Message sent: %s", info.messageId);
//           // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
//           res.json({'msg': `Email sent to ${email}`});
        

//         } catch (err) {
//           console.error(err.message);
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       return res.status(401).json({ msg: 'Matching user not found.' });
//     }
//   } catch (err) {
//     console.error(err.message);
//   }

// });

// @route POST /api/auth/forgotPassword
// @desc Get a password reset email with code
// @access Public
// req.body is expected to have a user email
router.post(
  `/forgotPassword`, 
  [check('email', 'Please include a valid email').notEmpty().isEmail()], 
  async (req, res) => { 
  try {
    const errors = validationResult(req);
    // if we have errors, we return a status 400
    if (!errors.isEmpty()) {
      // 400 bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //Step 1: Find a user with matching email
    //Step 2a: If user with matching email is found, create UUID
    //Step 2b: Post a new PasswordReset document containing the user's email and the UUID
    //Step 3: Send an email to the user containing the UUID and some presentable looking HTML (CSS too?)
    //Step 4: Return an indication of whether or not the password reset request was approved (i.e. the password reset object was created and the UUID was emailed to the user)
    
    const { email } = req.body;
     
    const user = await User.findOne({ email });

    if(user){
      let passwordResetRequestCode = uuidv4();
      //Hash the password reset request code for storage
      //const salt = await bcrypt.genSalt(10);
      //let hashedResetRequestCode = await bcrypt.hash(passwordResetRequestCode, salt);
      

      try { //post password reset document
        
        const passwordResetObj = {
          email,
          passwordResetRequestCode,
        }
        // only want one password reset doc, if it doesn't exist it creates a new one
        const passwordResetDoc = await PasswordReset.findOneAndReplace({ email: { $eq: email }}, passwordResetObj, { upsert: true });

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
            subject: "Your Registration Request", // Subject line
            text: `Hello,\nThis is an automated message from Altaviz. We've received a password reset request for the account associated with your email address. ` + 
            `If this was you, please use the password reset code provided at the link below:\n\n https://damp-ocean-95259.herokuapp.com/resetPassword \n\nYour password reset code: ${passwordResetRequestCode}\n\n Best,\nAltaViz`, // plain text body
            html: `<b>Hello,<br>This is an automated message from Altaviz. We've received a password reset request for the account associated with your email address. ` + 
            `If this was you, please use the password reset code provided at the link below:<br><br> https://damp-ocean-95259.herokuapp.com/resetPassword <br><br>Your password reset code: <br>${passwordResetRequestCode}<br><br> Best,<br><br>AltaViz</b>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          res.json({'msg': `Email sent to ${email}`});
        

        } catch (err) {
          console.error(err.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      return res.status(401).json({ msg: 'Matching user not found.' });
    }
  } catch (err) {
    console.error(err.message);
  }

});

// @route POST /api/auth/checkPasswordResetCode
// @desc Get a password reset email with code
// @access Public
// req.body is expected to have a password reset code
router.post(
  `/checkPasswordResetCode`, 
  [check('resetPasswordCode', 'Please enter a password reset code.').notEmpty().isString()],
  async (req, res) => { 
  
    const errors = validationResult(req);
    // if we have errors, we return a status 400
    if (!errors.isEmpty()) {
      // 400 bad request
      return res.status(400).send(errors.array()[0].msg);
    }

  // const salt = await bcrypt.genSalt(10);
  // const hashedresetPasswordCode = await bcrypt.hash(req.body.resetPasswordCode, salt);
  // console.log("Hashed Code:");
  // console.log(hashedresetPasswordCode);
  
  try {
    const passwordResetDocument = await PasswordReset.findOne({passwordResetRequestCode: { $eq: req.body.resetPasswordCode}});
    if(!passwordResetDocument){
      res.status(401).json({ msg: 'Password reset code not valid.' });
    }
    else {
      res.json({msg: "Password reset code verified."});
    }

  } catch (err) {
    console.error(err.message);
    return;
  }
  

});


// @route POST /api/auth/passwordChange
// @desc Change a user password
// @access Public
// req.body is expected to have both the new password and a password reset code

router.post(
  `/passwordChange`, 
  [
    check('newPassword', 'newPassword validation error').notEmpty().isString(),
    check('resetPasswordCode', 'resetPasswordCode validation error').notEmpty().isString()
  ],
  async (req, res) => { //implement checks to verify that both the expected fields are supplied

    const errors = validationResult(req);
    // if we have errors, we return a status 400
    if (!errors.isEmpty()) {
      // 400 bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { newPassword, resetPasswordCode } = req.body;
    console.log("Password Change request object");
    console.log(req);
    try { //check if the code is valid
      const salt = await bcrypt.genSalt(10);
      // const hashedResetPasswordCode = await bcrypt.hash(resetPasswordCode, salt);
      // console.log(hashedResetPasswordCode);
      const passwordResetDocument = await PasswordReset.findOneAndDelete({passwordResetRequestCode: { $eq: resetPasswordCode}});
      if(!passwordResetDocument){
        return res.status(401).json({ msg: 'Matching user not found.' });
      }
      else {
        try {
          const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
          let updatedUser = await User.findOneAndUpdate(
            { email: { $eq: passwordResetDocument.email }}, 
            { $set: { password: hashedNewPassword} },
            { new: true });
          
          res.json({msg: "Password was changed."});
  
        } catch (err) {
          console.error(err);
          res.status(500).send('Server Error');
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: 'Password reset code invalid.' });
    }

});


// //@route  POST api/auth
// //@desc   Auth user & get token
// //@access Public
// // logs in the user
// router.post(
//   '/',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],

//   async (req, res) => {
//     console.log('auth: post request');
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // destructures email and password from the request
//     const { email, password } = req.body;

//     try {
//       // checks if user with that email exists
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res.status(401).json({ msg: 'User not found' });
//       }
//       // checks if the password is correct via bcrypt calling compare with the hashed password and the entered in password
//       const isMatch = await bcrypt.compare(password, user.password);

//       // returns error message if the password doesn't match
//       if (!isMatch) {
//         return res.status(401).json({ msg: 'Password not correct' });
//       }

//       // signing and returning a jwt
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       //be sure to lower the expiresIn value for production
//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         {
//           expiresIn: 36000, // 10 hours
//         },
//         (err, token) => {
//           if (err) throw err;
//           // returns the jwt
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

//@route  POST api/auth
//@desc   Auth user & get token
//@access Public
// logs in the user
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],

  async (req, res) => {
    console.log('auth: post request');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructures email and password from the request
    const { email, password } = req.body;

    try {
      // checks if user with that email exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
      // checks if the password is correct via bcrypt calling compare with the hashed password and the entered in password
      const isMatch = await bcrypt.compare(password, user.password);

      // returns error message if the password doesn't match
      if (!isMatch) {
        return res.status(401).json({ msg: 'Password not correct' });
      }

      // signing and returning a jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      //be sure to lower the expiresIn value for production
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 36000, // 10 hours
        },
        (err, token) => {
          if (err) throw err;
          // returns the jwt
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
