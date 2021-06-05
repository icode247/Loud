const jwt = require('jsonwebtoken');
const config = require('../../config/config');
console.log(config.SECRET_KEY)
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.SECRET_KEY, (err, user) => {
            if (err) {
                return res.json({msg:"expired"});;
            }

            req.user = user;
            next();
        });
    } else {
        res.json({msg:"expired"});
    }
};
module.exports = authenticateJWT;