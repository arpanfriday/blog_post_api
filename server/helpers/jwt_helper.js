require('dotenv').config()
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const signAccessToken = (userId, userName) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId: userId,
            userName: userName
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            issuer: 'abc.tech',
            expiresIn: '20s'
        };

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(createError.InternalServerError());
                return;
            }
            resolve(token);
        });
    });
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization'])
        return next(createError.Unauthorized())

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createError.Unauthorized(message))
        }
        console.log('Request authorized :)');

        req.payload = payload
        next()
    })
}

const signRefreshToken = (userId, userName) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId: userId,
            userName: userName
        };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            issuer: 'abc.tech',
            expiresIn: '30s'
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(createError.InternalServerError());
                return;
            }
            resolve(token);
        });
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;

                reject('jwt refresh token expired')
            }

            // check for refresh token in external db 
            userId = payload.userId
            userName = payload.userName
            console.log('Refresh token verified :)');
            return resolve(userId, userName);
        })
    })

}
module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}