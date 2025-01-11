require('dotenv').config()
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const axios = require('axios');

const signAccessToken = (userId, userName) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId: userId,
            userName: userName
        };
        const options = {
            issuer: 'abc.tech',
            expiresIn: '10m'
        };

        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (err, token) => {
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
    const accessToken = bearerToken[1];
    const refreshToken = req.cookies.refreshToken;

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                axios.post('http://localhost:4000/refresh', {}, {
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${refreshToken}` }
                }).then((refreshResponse) => {
                    const newAccessToken = refreshResponse.data.accessToken;
                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                    });
                    console.log('Created new access token');
                    jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                        if (!err) {
                            req.payload = payload;
                            next();
                        }
                    })
                }).catch((error) => {
                    res.status(401).send(error.response.data)
                })

            } else {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
        } else {
            console.log('Request authorized :)');
            req.payload = payload
            next()
        }
    })
}

const signRefreshToken = (userId, userName) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId: userId,
            userName: userName
        };
        const options = {
            issuer: 'abc.tech',
            expiresIn: '7d'
        };
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
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
                console.log('Refresh token error');

                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                if (message == 'jwt expired') reject('refresh token expired. Please re-login')
            }

            // TODO: check for refresh token in external db or cache
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