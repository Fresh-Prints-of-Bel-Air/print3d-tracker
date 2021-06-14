const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

router.get('/', auth, async (req, res) => {
    try {
        // finds "all" of them if it has no filter (there should only be one)
        const adminInfo = await Admin.find({});
        res.json(adminInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    } 
})

router.put('/pull', auth, async (req, res) => {
    try {
        await Admin.updateMany({}, { $pull: { registrationRequests: req.body } });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error: admin put /pull error');
    }
})

router.put('/', async (req, res) => {
    try {
        console.log("admin put / route");
        console.log(req.body);
        // hash the password

        // generates salt for hashing function
        const salt = await bcrypt.genSalt(10);
        // password is saved only as a hash code
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        const regRequest = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        //ex 12/28/2020, need to change to 2020-12-18
        let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; 
        today = today.split('/');
        today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
        
        let registrationRequestNotification = {
            text: `You have received a new registration request from ${req.body.name} (${req.body.email}).`,
            dateCreated: today,
            isRead: false,
        }
      
        console.log(updateFields);
        let res = await Admin.findByIdAndUpdate(
            { _id: '60c731de187465d31a399ca4' }, 
            { $push: 
                { 
                    registrationRequests: regRequest, 
                    notifications: registrationRequestNotification 
                }
            },
            { new: true },
        );
        console.log("mongooseReturnVal");
        console.log(res);
        // not returning anything because we're not dispatching the response to the redux state
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;