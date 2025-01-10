const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helpers/jwt_helper')

router.post('/refresh', async (req, res) => {
    if (!req.headers['authorization'])
        return next(createError.Unauthorized())

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    const result = verifyRefreshToken(token)
    // console.log("result === " + result);
    result.then(async (userId, userName) => {
        // userId = userId;
        // username = username;
        const accessToken = await signAccessToken(userId, userName);
        res.send({ 'accessToken': accessToken });
    }).catch((error) => {
        res.send({ 'unauthorized: ': error });
    })
    // const refreshToken = await signRefreshToken(userId, userName);
})

module.exports = router;