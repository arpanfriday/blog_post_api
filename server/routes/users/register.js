const express = require('express')
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../helpers/validation_schema')

router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        user = await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
