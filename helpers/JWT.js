const JWT = require('jsonwebtoken');

const jwtGenerator = ( user ) => {

    // Data integer
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const token = JWT.sign(payload, 
                        '21172022-2',
                        { expiresIn: '1h' });

    return token;
}

module.exports = { jwtGenerator };