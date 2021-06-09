const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');

router.get('/', auth, async (req, res) => {
    try {
        // finds "all" of them if it has no filter (there should only be one)
        const adminInfo = await Admin.find();
        res.json(adminInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    } 
})

router.put('/', auth, async (req, res) => {
    try {
        // {} empty filter update "all" (there should only be one)
        const adminInfo = await Admin.updateMany({}, { $push: { registrationRequests: req }});
        res.json(adminInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;