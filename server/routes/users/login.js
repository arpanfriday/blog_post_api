const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../../models/User');
const { loginValidateUser } = require('../../helpers/validation_schema')
const { signAccessToken, signRefreshToken } = require('../../helpers/jwt_helper')

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
    const accessToken = await signAccessToken(user._id, user.userName);
    const refreshToken = await signRefreshToken(user._id, user.userName);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })

    res.send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
})

module.exports = router;