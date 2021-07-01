const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const AdminList = require('../models/AdminList');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/', 
    auth, 
    async (req, res) => {
        try {
            // finds "all" of them if it has no filter (there should only be one), user must be in the list of admins

            const adminList = await AdminList.findById('60caf69fc9c9365c28be5786');
            // console.log("Trying to get adminList");
            // console.log(adminList);
            // console.log(req.user);


            if(adminList.admins && adminList.admins.includes(req.user.id)){
                try {
                    const adminInfo = await Admin.find({});
                    // console.log(adminInfo);
                    res.json(adminInfo);
                } catch (error) {
                    // console.log(error.message);
                    res.status(500).send('server error or user is not an admin');
                }
            }
            
        } catch (error) {
            // console.log(error.message);
            res.status(500).send('server error');
        } 
})

router.put('/pull',
    [auth,
        check('name','admin put pull name error').isEmpty().isString(),
        check('email', 'admin put pull email error').isEmail(),
        check('password', 'admin put pull password error').isEmpty().isString()
    ], 
    async (req, res) => {
    try {
        const adminRes = await Admin.updateMany({}, { $pull: { registrationRequests: req.body } });
        // console.log("past await in pull");
        res.json(adminRes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error: admin put /pull error');
    }
})

//Handles registration requests
// occurs when somebody completes the register form to submit a registration requests
router.put('/register',
    [
        check('name', 'Please add name').not().isEmpty().isString(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter 6 or more characters').isLength({ min: 6 }).isString()
    ],
    async (req, res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array()[0].msg);
        };
    
        console.log("admin put / route");
        console.log(req.body);

        // if (req.body.password.length < 6){
        //     res.status(400).send('Please enter a password with a length of six characters or more');
        // }
        
        userWithThisEmail = await User.findOne({ email: { $regex: `^${req.body.email}$`, $options: 'i' } });

        if (!userWithThisEmail){
            // check if registration request for this user already exists
            const adminInfo = await Admin.find({});
            let userRequestAlreadyExists = false;
            console.log("ADMIN INFO");
            console.log(adminInfo);
            adminInfo[0].registrationRequests.forEach((regReq) => {
            if (regReq.email === req.body.email){
                userRequestAlreadyExists = true;
            }
            });

            //create the registration request if one with that email doesn't already exist
            if(!userRequestAlreadyExists){ 
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

                let updatedAdmin = await Admin.findByIdAndUpdate(
                    { _id: '60c731de187465d31a399ca4' }, 
                    { $push: 
                        { 
                            registrationRequests: { $each: [regRequest], $position: 0 }, 
                            notifications: { $each: [registrationRequestNotification], $position: 0 }
                        }
                    },
                    { new: true },
                );
                res.json({message: 'Request received.'});
                console.log("mongooseReturnVal");
                console.log(res);
            
            } else {
                return res.status(400).send('A registration request using that email already exists.');
            }
        } else {
            return res.status(400).send('A user with that email already exists.');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;