const joi = require('joi')

function validateUser(user) {
    const schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        userName: joi.string().required(),
        email: joi.string().required().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }),
        password: joi.string().min(8).max(50).required()
    });

    return schema.validate(user);
}

function loginValidateUser(user) {
    const schema = joi.object({
        userName: joi.string(),
        email: joi.string().email(),
        password: joi.string()
    }).xor('userName', 'email');

    return schema.validate(user);
}
module.exports = { validateUser, loginValidateUser };