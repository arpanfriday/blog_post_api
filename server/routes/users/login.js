const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../../models/User');
const { loginValidateUser } = require('../../helpers/validation_schema')

router.post('/login', async (req, res) => {
    const { error } = await loginValidateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne(
        {
            $or: [
                { email: req.body.loginString },
                { userName: req.body.loginString }
            ]
        }
    );
    if (!user)
        throw createError.NotFound('User not registered');
    const result = await user.validatePassword(req.body.password);
    if (!result)
        throw createError.Unauthorized('Failed to authenticate. Please retry');

    res.send(result);
})

module.exports = router;