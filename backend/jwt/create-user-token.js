const jwt = require('jsonwebtoken');

const createUserToken = async(user, req, res) => {

    //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, '45&3NJIDdE2x')
    //return token
    res.status(200).json({
        message: 'Authentication',
        token: token,
        userId: user._id
    })

}
module.exports = createUserToken;