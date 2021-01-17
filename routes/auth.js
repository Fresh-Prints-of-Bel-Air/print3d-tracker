const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
// req is stuff we put in via Postman, the request
router.get('/', auth, async (req, res) => {
  try {
    // finds user by id and doesn't return the password
    const user = await User.findById(req.user.id).select('-password');
    // returns a user JSON object
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // checks if the password is correct via bcrypt calling compare with the hashed password and the entered in password
      const isMatch = await bcrypt.compare(password, user.password);

      // returns error message if the password doesn't match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // signing and returning a jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
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
